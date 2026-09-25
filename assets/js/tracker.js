// ─── MATCHA TIMES: Intelligent Customer Journey & Conversion Tracker ───
(function() {
  'use strict';

  // 1. Session & Visitor Identity
  function generateId(prefix) {
    return prefix + '_' + Math.random().toString(36).substring(2, 9) + '_' + Date.now().toString(36);
  }

  let visitorId = localStorage.getItem('matcha_visitor_id');
  if (!visitorId) {
    visitorId = generateId('vis');
    localStorage.setItem('matcha_visitor_id', visitorId);
  }

  let sessionId = sessionStorage.getItem('matcha_session_id');
  let sessionStartTime = parseInt(sessionStorage.getItem('matcha_session_start') || '0', 10);
  if (!sessionId || !sessionStartTime) {
    sessionId = generateId('sess');
    sessionStartTime = Date.now();
    sessionStorage.setItem('matcha_session_id', sessionId);
    sessionStorage.setItem('matcha_session_start', sessionStartTime.toString());
  }

  // 2. Device & Context Detection
  function detectDevice() {
    const ua = navigator.userAgent || '';
    const isIPad = /iPad/i.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    const isMobile = /iPhone|Android.*Mobile|webOS|BlackBerry|IEMobile|Opera Mini/i.test(ua);
    const isTablet = isIPad || (/Android/i.test(ua) && !/Mobile/i.test(ua));

    return {
      type: isIPad ? 'iPad' : isTablet ? 'Tablet' : isMobile ? 'Mobile' : 'Desktop',
      platform: navigator.platform || 'Unknown',
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight,
      referrer: document.referrer || 'Direct / Bookmark',
      lang: localStorage.getItem('matcha_times_lang') || document.documentElement.lang || 'th'
    };
  }

  // 3. User Journey Memory & Chat Transcript Memory
  let journey = [];
  try {
    const saved = sessionStorage.getItem('matcha_session_journey');
    if (saved) journey = JSON.parse(saved);
  } catch (e) {}

  let sessionChat = [];
  try {
    const savedChat = sessionStorage.getItem('matcha_session_chat');
    if (savedChat) sessionChat = JSON.parse(savedChat);
  } catch (e) {}

  function saveJourney() {
    try {
      // Keep last 40 events
      if (journey.length > 40) journey = journey.slice(-40);
      sessionStorage.setItem('matcha_session_journey', JSON.stringify(journey));
    } catch (e) {}
  }

  function saveChat() {
    try {
      if (sessionChat.length > 30) sessionChat = sessionChat.slice(-30);
      sessionStorage.setItem('matcha_session_chat', JSON.stringify(sessionChat));
    } catch (e) {}
  }

  window.recordChatMessage = function(role, text) {
    if (!text) return;
    sessionChat.push({
      role: role === 'user' ? 'user' : 'model',
      text: String(text).slice(0, 1000),
      time: Date.now()
    });
    saveChat();
  };

  window.getChatTranscript = function() {
    return sessionChat;
  };

  // 4. Attribution Analyzer (What drove the user to take action?)
  function determineAttribution(targetEvent = 'line_click') {
    const recent = journey.slice(-10).reverse();
    let primaryDriver = 'direct_interest';
    let catalyst = 'Website Content';
    let details = {};

    for (const step of recent) {
      if (step.name === 'chat_message_sent' || step.name === 'chat_opened') {
        primaryDriver = 'ai_sommelier';
        catalyst = 'คำแนะนำจากน้องแมตตี้ AI (Chat Sommelier)';
        details.lastChatMessage = step.data?.message || 'Chat Interaction';
        break;
      }
      if (step.name === 'calculator_adjusted') {
        primaryDriver = 'cost_calculator';
        catalyst = `เครื่องคิดเลขกำไร (คำนวณ Margin ${step.data?.margin || ''}%)`;
        details.calcGrams = step.data?.grams;
        details.calcPrice = step.data?.sellingPrice;
        details.calcProfit = step.data?.netProfit;
        break;
      }
      if (step.name === 'matchmaker_complete') {
        primaryDriver = 'matchmaker_quiz';
        catalyst = `ผลลัพธ์ Matchmaker Quiz (แนะนำ ${step.data?.recommended || ''})`;
        details.recommendedSku = step.data?.recommended;
        break;
      }
      if (step.name === 'product_view' || step.name === 'product_modal_open') {
        primaryDriver = 'product_card';
        catalyst = `ดูสเปกสินค้า ${step.data?.sku || step.data?.name || ''}`;
        details.sku = step.data?.sku;
        break;
      }
      if (step.name === 'sample_kit_click') {
        primaryDriver = 'sample_kit_intent';
        catalyst = 'สนใจขอรับชุดทดลองชง (Sample Kit)';
        break;
      }
    }

    return { primaryDriver, catalyst, details };
  }

  // 5. Send to Server (with Beacon fallback)
  function sendPayload(endpoint, payload) {
    const url = '/api/' + endpoint;
    const bodyStr = JSON.stringify(payload);

    if (navigator.sendBeacon) {
      try {
        const blob = new Blob([bodyStr], { type: 'application/json' });
        navigator.sendBeacon(url, blob);
        return;
      } catch (e) {}
    }

    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: bodyStr,
      keepalive: true
    }).catch(() => {});
  }

  // 6. Global trackEvent implementation
  window.trackEvent = function(eventName, eventData = {}) {
    const now = Date.now();
    const elapsedSec = Math.round((now - sessionStartTime) / 1000);
    const device = detectDevice();

    const entry = {
      name: eventName,
      time: now,
      elapsedSec,
      data: eventData
    };

    journey.push(entry);
    saveJourney();

    // Check if this is a conversion event
    const isConversion = (
      eventName === 'line_click' ||
      eventName === 'line_add_click' ||
      eventName === 'sample_kit_click' ||
      eventName === 'sample_request_submit' ||
      eventName === 'phone_click'
    );

    let attribution = null;
    if (isConversion) {
      attribution = determineAttribution(eventName);
      console.log('🎯 [CONVERSION TRIGGER DETECTED]:', attribution.catalyst, attribution);
    }

    const payload = {
      type: isConversion ? 'conversion' : 'event',
      visitorId,
      sessionId,
      sessionAgeSec: elapsedSec,
      device,
      event: eventName,
      data: eventData,
      attribution,
      recentJourney: journey.slice(-12),
      chatTranscript: sessionChat.slice(-20),
      timestamp: new Date().toISOString()
    };

    // Forward to backend
    sendPayload('analytics', payload);

    // Call standard gtag / dataLayer if available
    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName, eventData);
    }
    if (window.dataLayer && Array.isArray(window.dataLayer)) {
      window.dataLayer.push({ event: eventName, ...eventData });
    }
  };

  // 7. Auto-detect LINE & Tel clicks across entire document
  document.addEventListener('click', function(e) {
    const target = e.target.closest('a, button');
    if (!target) return;

    const href = target.getAttribute('href') || '';
    const onclick = target.getAttribute('onclick') || '';

    // Clicked LINE Link
    if (href.includes('line.me') || onclick.includes('line.me')) {
      const source = target.getAttribute('data-track-source') || 
                     (target.closest('#ai-chat-modal') ? 'ai_chat_modal' :
                      target.closest('header') ? 'sticky_header' :
                      target.closest('#hero') ? 'hero_section' :
                      target.closest('#contact-modal') ? 'contact_modal' :
                      target.closest('#compare-drawer') ? 'compare_drawer' :
                      target.closest('.card-product') ? 'product_card' : 'other_link');

      window.trackEvent('line_add_click', {
        href,
        source,
        text: target.innerText?.trim()?.slice(0, 30) || 'LINE Button'
      });
    }

    // Clicked Phone Number
    if (href.startsWith('tel:') || onclick.includes('098-603-5370')) {
      window.trackEvent('phone_click', {
        tel: href.replace('tel:', '') || '098-603-5370',
        source: target.closest('#ai-chat-modal') ? 'ai_chat' : 'web_body'
      });
    }

    // Clicked Sample Kit button
    if (target.id === 'btn-sample-kit' || onclick.includes('openContactModal')) {
      window.trackEvent('sample_kit_click', {
        source: target.closest('#hero') ? 'hero_cta' : 'product_or_nav'
      });
    }
  }, true);

  // 8. Track Initial Page View
  window.addEventListener('DOMContentLoaded', function() {
    window.trackEvent('page_view', {
      title: document.title,
      url: window.location.pathname,
      lang: detectDevice().lang
    });
  });

  // 9. Track Scroll Depth (25%, 50%, 75%, 100%)
  const scrollMilestones = { 25: false, 50: false, 75: false, 90: false };
  window.addEventListener('scroll', function() {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (scrollHeight <= 0) return;
    const currentPercent = Math.round((window.scrollY / scrollHeight) * 100);

    for (const threshold of [25, 50, 75, 90]) {
      if (currentPercent >= threshold && !scrollMilestones[threshold]) {
        scrollMilestones[threshold] = true;
        window.trackEvent('scroll_depth', { depth: threshold + '%' });
      }
    }
  }, { passive: true });

})();
