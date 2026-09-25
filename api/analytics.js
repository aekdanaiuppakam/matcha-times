// ─── Vercel Serverless Function: /api/analytics ──────────────────────
// Persistent Cloud Storage via @vercel/blob + Local Disk Fallback

const fs = require('fs');
const path = require('path');

let blobMod = null;
try {
  blobMod = require('@vercel/blob');
} catch (e) {}

const BLOB_PATH = 'analytics/matcha_analytics_store.json';
const ADMIN_PIN = process.env.ADMIN_PIN || '58110011';

// In-memory cache
if (!global.__matcha_analytics_store) {
  global.__matcha_analytics_store = {
    events: [],
    conversions: [],
    lastSync: 0
  };
}

const store = global.__matcha_analytics_store;

// Local storage file paths (for local dev server)
const DATA_DIR = path.join(process.cwd(), 'data');
const EVENTS_FILE = path.join(DATA_DIR, 'analytics_events.json');

// Cloud Sync Helpers
async function loadFromCloud() {
  if (process.env.BLOB_READ_WRITE_TOKEN && blobMod) {
    try {
      const { head } = blobMod;
      const meta = await head(BLOB_PATH);
      if (meta && meta.url) {
        const res = await fetch(meta.url, {
          headers: { 'Authorization': 'Bearer ' + process.env.BLOB_READ_WRITE_TOKEN }
        });
        if (res.ok) {
          return await res.json();
        }
      }
    } catch (e) {
      // file might not exist on first run
    }
  }
  return null;
}

async function saveToCloud(data) {
  if (process.env.BLOB_READ_WRITE_TOKEN && blobMod) {
    try {
      const { put } = blobMod;
      await put(BLOB_PATH, JSON.stringify(data), {
        access: 'private',
        addRandomSuffix: false,
        allowOverwrite: true
      });
    } catch (e) {
      console.warn('Vercel Blob save warning:', e.message);
    }
  }
}

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

    // Always fetch latest cloud events to ensure 100% persistent accumulation across all instances
    const cloudData = await loadFromCloud();
    let currentEvents = [];
    if (cloudData && Array.isArray(cloudData.events)) {
      currentEvents = cloudData.events;
    } else if (store.events.length > 0) {
      currentEvents = store.events;
    } else {
      currentEvents = loadFromDisk();
    }

    // Add to list
    currentEvents.unshift(record);
    if (currentEvents.length > 500) currentEvents = currentEvents.slice(0, 500);
    store.events = currentEvents;

    // Save to local disk (for dev server)
    saveToDisk(record);

    // Save to Vercel Blob Cloud (Persistent across cold starts & all containers)
    await saveToCloud({
      events: currentEvents,
      updatedAt: new Date().toISOString()
    });

    return res.status(200).json({ status: 'ok', id: record.id });
  }

  // ─── 2. RETRIEVE ANALYTICS (GET) ──────────────────────────────────────
  if (req.method === 'GET') {
    const pin = req.query.pin || req.headers['x-admin-pin'];
    if (pin !== ADMIN_PIN) {
      return res.status(401).json({ error: 'Unauthorized: Invalid Admin PIN' });
    }

    // Always fetch latest from Cloud Storage first to guarantee persistence
    let allEvents = [];
    const cloudData = await loadFromCloud();
    if (cloudData && Array.isArray(cloudData.events) && cloudData.events.length > 0) {
      allEvents = cloudData.events;
      store.events = cloudData.events;
    } else if (store.events.length > 0) {
      allEvents = store.events;
    } else {
      allEvents = loadFromDisk();
    }

    const totalEvents = allEvents.length;
    const conversions = allEvents.filter(e => e.type === 'conversion' || e.event === 'line_add_click' || e.event === 'sample_kit_click');
    const uniqueSessions = new Set(allEvents.map(e => e.sessionId)).size || (totalEvents > 0 ? 1 : 0);
    const convertedSessions = new Set(conversions.map(e => e.sessionId)).size;
    const conversionRate = uniqueSessions > 0 ? ((convertedSessions / uniqueSessions) * 100).toFixed(1) : '0';

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
      recentRawEvents: allEvents.slice(0, 50),
      storageMode: process.env.BLOB_READ_WRITE_TOKEN ? 'Vercel Blob (Persistent Cloud)' : 'Local File / Memory'
    });
  }

  return res.status(405).json({ error: 'Method Not Allowed' });
};
