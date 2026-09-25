// ─── Vercel Serverless Function: /api/analytics ──────────────────────
const fs = require('fs');
const path = require('path');

// In-memory buffer for stateless serverless runtimes
if (!global.__matcha_analytics_store) {
  global.__matcha_analytics_store = {
    events: [],
    conversions: [],
    chatLogs: [],
    sessions: {}
  };
}

const store = global.__matcha_analytics_store;
const ADMIN_PIN = process.env.ADMIN_PIN || '888888';

// Local storage file paths (for local dev server)
const DATA_DIR = path.join(process.cwd(), 'data');
const EVENTS_FILE = path.join(DATA_DIR, 'analytics_events.json');

function saveToDisk(entry) {
  try {
    if (fs.existsSync(DATA_DIR)) {
      let existing = [];
      if (fs.existsSync(EVENTS_FILE)) {
        try { existing = JSON.parse(fs.readFileSync(EVENTS_FILE, 'utf8')); } catch (e) {}
      }
      existing.unshift(entry);
      if (existing.length > 500) existing = existing.slice(0, 500);
      fs.writeFileSync(EVENTS_FILE, JSON.stringify(existing, null, 2), 'utf8');
    }
  } catch (e) {}
}

function loadFromDisk() {
  try {
    if (fs.existsSync(EVENTS_FILE)) {
      return JSON.parse(fs.readFileSync(EVENTS_FILE, 'utf8'));
    }
  } catch (e) {}
  return [];
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(200).end();

  // ─── 1. RECORD EVENT (POST) ──────────────────────────────────────────
  if (req.method === 'POST') {
    let body = req.body;
    if (typeof body === 'string') {
      try { body = JSON.parse(body); } catch (e) {}
    }

    if (!body || !body.event) {
      return res.status(400).json({ error: 'Event name is required' });
    }

    const record = {
      id: 'evt_' + Math.random().toString(36).substring(2, 9),
      type: body.type || 'event',
      event: body.event,
      visitorId: body.visitorId || 'anon',
      sessionId: body.sessionId || 'anon',
      sessionAgeSec: body.sessionAgeSec || 0,
      device: body.device || {},
      data: body.data || {},
      attribution: body.attribution || null,
      recentJourney: body.recentJourney || [],
      timestamp: body.timestamp || new Date().toISOString()
    };

    // Store in memory
    store.events.unshift(record);
    if (store.events.length > 1000) store.events.pop();

    if (record.type === 'conversion' || record.attribution) {
      store.conversions.unshift(record);
      if (store.conversions.length > 300) store.conversions.pop();
    }

    // Keep session index
    if (!store.sessions[record.sessionId]) {
      store.sessions[record.sessionId] = {
        sessionId: record.sessionId,
        visitorId: record.visitorId,
        startedAt: record.timestamp,
        device: record.device,
        eventCount: 0,
        hasConverted: false,
        conversionTriggers: []
      };
    }
    const s = store.sessions[record.sessionId];
    s.eventCount++;
    s.lastSeen = record.timestamp;
    if (record.type === 'conversion') {
      s.hasConverted = true;
      if (record.attribution?.catalyst) {
        s.conversionTriggers.push(record.attribution.catalyst);
      }
    }

    // Also persist to local file if available
    saveToDisk(record);

    return res.status(200).json({ status: 'ok', id: record.id });
  }

  // ─── 2. RETRIEVE ANALYTICS (GET) ──────────────────────────────────────
  if (req.method === 'GET') {
    const pin = req.query.pin || req.headers['x-admin-pin'];
    if (pin !== ADMIN_PIN) {
      return res.status(401).json({ error: 'Unauthorized: Invalid Admin PIN' });
    }

    // Merge disk data if memory is empty
    let allEvents = store.events;
    if (allEvents.length === 0) {
      allEvents = loadFromDisk();
    }

    const totalEvents = allEvents.length;
    const conversions = allEvents.filter(e => e.type === 'conversion' || e.event === 'line_add_click' || e.event === 'sample_kit_click');
    const uniqueSessions = new Set(allEvents.map(e => e.sessionId)).size || 1;
    const convertedSessions = new Set(conversions.map(e => e.sessionId)).size;
    const conversionRate = ((convertedSessions / uniqueSessions) * 100).toFixed(1);

    // Attribution breakdown
    const attributionCounts = {
      ai_sommelier: 0,
      cost_calculator: 0,
      matchmaker_quiz: 0,
      product_card: 0,
      sample_kit_intent: 0,
      direct_interest: 0
    };

    conversions.forEach(c => {
      const driver = c.attribution?.primaryDriver || 'direct_interest';
      if (attributionCounts[driver] !== undefined) {
        attributionCounts[driver]++;
      } else {
        attributionCounts.direct_interest++;
      }
    });

    // Device breakdown
    const deviceCounts = { Mobile: 0, iPad: 0, Tablet: 0, Desktop: 0 };
    allEvents.forEach(e => {
      const t = e.device?.type || 'Mobile';
      if (deviceCounts[t] !== undefined) deviceCounts[t]++;
    });

    // Product interests
    const productViews = {};
    allEvents.forEach(e => {
      const sku = e.data?.sku || e.data?.recommended || (e.event === 'product_modal_open' ? e.data?.id : null);
      if (sku) {
        productViews[sku] = (productViews[sku] || 0) + 1;
      }
    });

    // Top recent conversions with journey stories
    const recentConversions = conversions.slice(0, 30).map(c => ({
      id: c.id,
      timestamp: c.timestamp,
      event: c.event,
      device: c.device?.type || 'Device',
      timeOnSiteSec: c.sessionAgeSec || 0,
      catalyst: c.attribution?.catalyst || 'เปิดดูเนื้อหาหน้าเว็บ',
      primaryDriver: c.attribution?.primaryDriver || 'direct_interest',
      details: c.attribution?.details || {},
      recentJourney: c.recentJourney || []
    }));

    return res.status(200).json({
      summary: {
        totalVisitors: uniqueSessions,
        totalEvents,
        totalConversions: conversions.length,
        convertedVisitors: convertedSessions,
        conversionRatePercent: parseFloat(conversionRate)
      },
      attributionCounts,
      deviceCounts,
      productViews,
      recentConversions,
      recentRawEvents: allEvents.slice(0, 50)
    });
  }

  return res.status(405).json({ error: 'Method Not Allowed' });
};
