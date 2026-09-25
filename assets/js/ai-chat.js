// ─── AI Matcha Sommelier Chat Client ───────────────────────────
(function() {
  const CHAT_STORAGE_KEY = "matcha_times_chat_history";
  let chatHistory = [];
  try {
    const saved = localStorage.getItem(CHAT_STORAGE_KEY) || sessionStorage.getItem(CHAT_STORAGE_KEY);
    if (saved) {
      chatHistory = JSON.parse(saved);
      if (!Array.isArray(chatHistory)) chatHistory = [];
    }
  } catch (e) {
    chatHistory = [];
  }

  let isSending = false;

  function persistChatHistory() {
    try {
      if (chatHistory.length > 30) chatHistory = chatHistory.slice(-30);
      localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(chatHistory));
      sessionStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(chatHistory));
    } catch (e) {}
  }

  const QUICK_QUESTIONS_I18N = {
    th: [
      { text: "🥜 แนะนำมัทฉะลาเต้โทนถั่วเข้มๆ", query: "ร้านกาแฟอยากได้มัทฉะชงลาเต้โทนถั่ว (Nutty) ชัดๆ บอดี้แน่น ไม่ขม แนะนำตัวไหนดี?" },
      { text: "💰 ตัวไหนคุมต้นทุนต่ำกว่า 20 ฿/แก้ว?", query: "อยากได้มัทฉะที่คุมต้นทุนต่อแก้วไม่เกิน 20 บาท สำหรับเมนูขายดีหน้าร้าน แนะนำตัวไหนบ้าง?" },
      { text: "⚖️ Strong Nutty vs Yurane ต่างกันยังไง?", query: "Strong Nutty กับ Yurane แตกต่างกันอย่างไร ตัวไหนเหมาะกับร้านแบบไหน?" },
      { text: "📦 ขอรับชุดทดลองชงยังไง?", query: "สนใจรับชุดทดลองไปทดลองชงที่ร้าน มีกี่ตัว และต้องทำอย่างไรบ้าง?" }
    ],
    en: [
      { text: "🥜 Best rich & nutty matcha for latte?", query: "Which matcha do you recommend for a rich, nutty latte with full body and zero bitterness?" },
      { text: "💰 Which SKU keeps cost < 20 THB/cup?", query: "Which matcha varieties keep cost under 20 THB per cup for high-margin cafe bestsellers?" },
      { text: "⚖️ Strong Nutty vs Yurane comparison?", query: "What is the difference between Strong Nutty and Yurane? Which one suits my cafe better?" },
      { text: "📦 How to request a Sample Kit?", query: "How can my cafe request a Sample Kit for test brewing? What are the details?" }
    ]
  };

  let teaserDismissTimer = null;

  function getActiveLang() {
    return localStorage.getItem("matcha_times_lang") || document.documentElement.lang || "th";
  }

  function initChat() {
    renderQuickQuestions();
    setupEventListeners();
    restoreChatHistoryUI();
    // Auto-dismiss floating teaser bubble after 14s on first load
    scheduleTeaserDismiss(14000);
  }

  function restoreChatHistoryUI() {
    if (!chatHistory || chatHistory.length === 0) return;

    const messagesEl = document.getElementById("ai-chat-messages");
    if (!messagesEl) return;

    // Hide quick questions container if there is already prior dialogue
    const quickEl = document.getElementById("ai-quick-container");
    if (quickEl) quickEl.classList.add("hidden");

    // Replay saved messages into the chat UI
    for (const msg of chatHistory) {
      if (msg && msg.role && msg.text) {
        appendMessage(msg.role, msg.text, false);
      }
    }

    setTimeout(() => {
      scrollChatToBottom();
      if (window.lucide) lucide.createIcons();
    }, 150);
  }

  function scheduleTeaserDismiss(ms = 10000) {
    if (teaserDismissTimer) {
      clearTimeout(teaserDismissTimer);
    }
    teaserDismissTimer = setTimeout(() => {
      dismissAiTeaser();
    }, ms);
  }

  function renderQuickQuestions() {
    const container = document.getElementById("ai-quick-questions");
    if (!container) return;
    const lang = getActiveLang();
    const questions = QUICK_QUESTIONS_I18N[lang] || QUICK_QUESTIONS_I18N.th;

    container.innerHTML = questions.map((q) => `
      <button onclick="window.sendQuickQuery('${q.query.replace(/'/g, "\\'")}')" 
              class="text-left text-[12px] px-3.5 py-2 rounded-xl border transition-all hover:bg-emerald-50 hover:border-emerald-600 active:scale-[0.98] shadow-2xs leading-snug"
              style="background:#fff;border-color:#e5e0d4;color:#2d5a27;">
        ${q.text}
      </button>
    `).join('');
  }

  window.updateAiChatLanguage = function(lang) {
    renderQuickQuestions();

    // Update welcome card text if available
    const greetingEl = document.querySelector('[data-i18n="ai_welcome_greeting"]');
    const p1El = document.querySelector('[data-i18n="ai_welcome_p1"]');
    const p2El = document.querySelector('[data-i18n="ai_welcome_p2"]');
    if (window.I18N_TEXTS && window.I18N_TEXTS[lang]) {
      if (greetingEl && window.I18N_TEXTS[lang].ai_welcome_greeting) {
        greetingEl.innerHTML = window.I18N_TEXTS[lang].ai_welcome_greeting;
      }
      if (p1El && window.I18N_TEXTS[lang].ai_welcome_p1) {
        p1El.innerHTML = window.I18N_TEXTS[lang].ai_welcome_p1;
      }
      if (p2El && window.I18N_TEXTS[lang].ai_welcome_p2) {
        p2El.innerHTML = window.I18N_TEXTS[lang].ai_welcome_p2;
      }
    }
  };

  function setupEventListeners() {
    const input = document.getElementById("ai-chat-input");
    const sendBtn = document.getElementById("ai-chat-send");

    if (input) {
      input.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();
          sendMessage();
        }
      });

      const form = input.closest("form");
      if (form) {
        form.addEventListener("submit", (e) => {
          e.preventDefault();
          sendMessage();
        });
      }
    }

    if (sendBtn) {
      sendBtn.addEventListener("click", (e) => {
        e.preventDefault();
        sendMessage();
      });
    }

    // Close on Escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        const modal = document.getElementById("ai-chat-modal");
        if (modal && !modal.classList.contains("hidden")) {
          closeAiChat();
        }
      }
    });

    // Touch swipe down on top of chat window to close on mobile
    const chatWindow = document.querySelector(".ai-chat-window");
    if (chatWindow) {
      let startY = 0;
      chatWindow.addEventListener("touchstart", (e) => {
        const scrollEl = document.getElementById("ai-chat-scroll");
        if (scrollEl && scrollEl.scrollTop <= 0) {
          startY = e.touches[0].clientY;
        } else {
          startY = 0;
        }
      }, { passive: true });

      chatWindow.addEventListener("touchend", (e) => {
        if (!startY) return;
        const endY = e.changedTouches[0].clientY;
        if (endY - startY > 90) {
          closeAiChat();
        }
        startY = 0;
      }, { passive: true });
    }
  }

  window.dismissAiTeaser = function() {
    if (teaserDismissTimer) {
      clearTimeout(teaserDismissTimer);
      teaserDismissTimer = null;
    }
    const el = document.getElementById("ai-fab-teaser");
    if (el) {
      el.style.opacity = "0";
      el.style.transform = "translateX(10px) scale(0.9)";
      setTimeout(() => {
        if (el) el.style.display = "none";
      }, 260);
    }
  };

  window.showAiTeaser = function(lang) {
    const currentLang = lang || getActiveLang();
    let el = document.getElementById("ai-fab-teaser");
    const container = document.querySelector(".fab-container");
    if (!container) return;

    // If chat modal is currently open, don't show the teaser bubble
    const modal = document.getElementById("ai-chat-modal");
    if (modal && !modal.classList.contains("hidden")) {
      return;
    }

    const titleText = (currentLang === "en") ? "Have tea questions?" : "มีคำถามเรื่องชา?";
    const subText = (currentLang === "en") ? "Tap to ask MATTY AI sommelier 🐼🍵" : "แตะถาม MATTY (แมตตี้) AI ได้เลยครับ 🐼🍵";
    const closeTitle = (currentLang === "en") ? "Close notification" : "ปิดการแจ้งเตือน";

    if (!el) {
      el = document.createElement("div");
      el.id = "ai-fab-teaser";
      el.className = "ai-fab-teaser flex items-center gap-2.5";
      el.setAttribute("onclick", "openAiChat()");
      el.innerHTML = `
        <img src="assets/images/matty.jpg" alt="MATTY" class="w-8 h-8 rounded-full object-cover border border-emerald-300 shadow-2xs shrink-0">
        <div>
          <div class="flex items-center gap-1">
            <span class="text-[12px] font-bold text-stone-800" data-i18n="ai_teaser_title">${titleText}</span>
          </div>
          <div class="text-[11px] text-stone-500 mt-0.5" data-i18n="ai_teaser_sub">${subText}</div>
        </div>
        <button onclick="event.stopPropagation(); dismissAiTeaser();" class="ai-teaser-close" title="${closeTitle}">×</button>
      `;
      container.insertBefore(el, container.firstChild);
    } else {
      const titleEl = el.querySelector('[data-i18n="ai_teaser_title"]');
      const subEl = el.querySelector('[data-i18n="ai_teaser_sub"]');
      const closeBtn = el.querySelector(".ai-teaser-close");
      if (titleEl) titleEl.textContent = titleText;
      if (subEl) subEl.textContent = subText;
      if (closeBtn) closeBtn.title = closeTitle;
      el.style.display = "flex";
    }

    // Force animation reset to replay pop-in
    el.style.animation = "none";
    void el.offsetWidth; // trigger reflow
    el.style.animation = "aiTeaserPop 0.45s cubic-bezier(0.16, 1, 0.3, 1) forwards";
    el.style.opacity = "1";
    el.style.transform = "";

    // Auto-dismiss after 10s
    scheduleTeaserDismiss(10000);
  };

  window.toggleAiChat = function() {
    const modal = document.getElementById("ai-chat-modal");
    if (!modal) return;
    const isHidden = modal.classList.contains("hidden");
    if (isHidden) {
      openAiChat();
    } else {
      closeAiChat();
    }
  };

  window.openAiChat = function() {
    dismissAiTeaser();
    const modal = document.getElementById("ai-chat-modal");
    if (!modal) return;
    modal.classList.remove("hidden");
    document.body.classList.add("ai-chat-open");
    
    if (typeof window.trackEvent === 'function') {
      window.trackEvent('chat_opened', { source: 'floating_button' });
    }
    
    // Only auto-focus on desktop devices.
    // On mobile phones, auto-focus opens the soft keyboard immediately, covering half the screen!
    if (window.innerWidth > 640) {
      setTimeout(() => {
        document.getElementById("ai-chat-input")?.focus();
      }, 150);
    }
    
    setTimeout(() => {
      scrollChatToBottom();
      if (window.lucide) lucide.createIcons();
    }, 100);
  };

  window.closeAiChat = function() {
    const modal = document.getElementById("ai-chat-modal");
    if (!modal) return;
    modal.classList.add("hidden");
    document.body.classList.remove("ai-chat-open");
    if (document.activeElement && document.activeElement.id === "ai-chat-input") {
      document.activeElement.blur();
    }
  };

  window.clearAiChat = function() {
    chatHistory = [];
    try {
      localStorage.removeItem(CHAT_STORAGE_KEY);
      sessionStorage.removeItem(CHAT_STORAGE_KEY);
      sessionStorage.removeItem('matcha_session_chat');
    } catch (e) {}

    const messagesEl = document.getElementById("ai-chat-messages");
    if (messagesEl) {
      // Keep only initial welcome card
      const welcome = document.getElementById("ai-chat-welcome");
      messagesEl.innerHTML = "";
      if (welcome) messagesEl.appendChild(welcome);
    }
    const quickEl = document.getElementById("ai-quick-container");
    if (quickEl) quickEl.classList.remove("hidden");
    window.updateAiChatLanguage(getActiveLang());
  };

  window.sendQuickQuery = function(text) {
    const input = document.getElementById("ai-chat-input");
    if (input) input.value = text;
    sendMessage();
  };

  window.sendAiMessage = function() {
    sendMessage();
  };

  async function sendMessage() {
    if (isSending) return;
    const input = document.getElementById("ai-chat-input");
    if (!input) return;
    const text = input.value.trim();
    if (!text) return;

    input.value = "";
    isSending = true;

    // Hide quick questions container after first question to save space
    const quickEl = document.getElementById("ai-quick-container");
    if (quickEl) quickEl.classList.add("hidden");

    // Record to global session chat
    if (typeof window.recordChatMessage === 'function') {
      window.recordChatMessage('user', text);
    }

    // Track user message event
    if (typeof window.trackEvent === 'function') {
      window.trackEvent('chat_message_sent', { message: text });
    }

    // 1. Append User Message
    appendMessage("user", text);
    chatHistory.push({ role: "user", text });
    persistChatHistory();

    // 2. Append Typing Indicator
    const typingId = showTypingIndicator();

    const lang = getActiveLang();
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, history: chatHistory, lang })
      });

      removeTypingIndicator(typingId);

      if (!res.ok) {
        throw new Error("HTTP error " + res.status);
      }

      const data = await res.json();
      const defaultErr = (lang === "en") ? "Sorry, I could not retrieve an answer at this moment." : "ขออภัยครับ ไม่สามารถรับคำตอบได้ในขณะนี้";
      const reply = data.reply || data.error || defaultErr;

      // Record model response to global session chat
      if (typeof window.recordChatMessage === 'function') {
        window.recordChatMessage('model', reply);
      }

      appendMessage("model", reply);
      chatHistory.push({ role: "model", text: reply });
      persistChatHistory();
    } catch (err) {
      console.error("AI Chat error:", err);
      removeTypingIndicator(typingId);
      const fallbackMsg = (lang === "en")
        ? "Sorry, our AI service is taking longer than usual. Please feel free to message Pinpuk (our dedicated Sales Representative) directly via [Pinpuk's LINE](https://line.me/ti/p/Q_YSqkj0Db) or call 098-603-5370 anytime! 🍵"
        : "ขออภัยครับ ขณะนี้ระบบกำลังประมวลผลคำตอบล่าช้า คุณลูกค้าสามารถกดส่งใหม่อีกครั้ง หรือทักคุยกับพี่ปิ่นปัก (ฝ่ายขาย) ได้โดยตรงทาง [LINE คุณปิ่นปัก](https://line.me/ti/p/Q_YSqkj0Db) หรือโทร 098-603-5370 ได้เลยนะครับ 🍵";
      
      if (typeof window.recordChatMessage === 'function') {
        window.recordChatMessage('model', fallbackMsg);
      }
      
      appendMessage("model", fallbackMsg);
      chatHistory.push({ role: "model", text: fallbackMsg });
      persistChatHistory();
    } finally {
      isSending = false;
      scrollChatToBottom();
      document.getElementById("ai-chat-input")?.focus();
    }
  }

  function appendMessage(role, content, shouldScroll = true) {
    const messagesEl = document.getElementById("ai-chat-messages");
    if (!messagesEl) return;

    const msgDiv = document.createElement("div");
    msgDiv.className = role === "user" ? "flex justify-end mb-3" : "flex justify-start mb-3 gap-2";

    if (role === "user") {
      msgDiv.innerHTML = `
        <div class="rounded-2xl rounded-tr-xs px-4 py-2.5 max-w-[85%] text-[13px] leading-relaxed shadow-xs text-white" 
             style="background:#1a3a16;">
          ${escapeHtml(content)}
        </div>
      `;
    } else {
      const formatted = formatMarkdown(content);
      const isEn = getActiveLang() === "en";
      const senderName = isEn ? "MATTY · Sommelier" : "MATTY (แมตตี้) · Sommelier";
      const lineBtnText = isEn ? "Chat with Pinpuk on LINE" : "ทัก LINE คุณปิ่นปัก";

      msgDiv.innerHTML = `
        <img src="assets/images/matty.jpg" alt="MATTY" class="w-8 h-8 rounded-full object-cover shrink-0 border border-emerald-300 shadow-2xs">
        <div class="rounded-2xl rounded-tl-xs p-4 max-w-[88%] text-[13px] leading-relaxed shadow-xs bg-white text-stone-800"
             style="border:1px solid #e5e0d4;">
          <div class="font-bold text-[11px] mb-1 uppercase tracking-wider" style="color:#2d5a27;">${senderName}</div>
          <div class="ai-msg-content">${formatted}</div>
          <div class="mt-3 pt-2 flex items-center gap-2 border-t border-stone-100">
            <a href="https://line.me/ti/p/Q_YSqkj0Db" target="_blank" rel="noopener noreferrer" 
               class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold text-white shadow-xs transition-opacity hover:opacity-90"
               style="background:#06C755;">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="white"><path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.494.25l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/></svg>
              <span>${lineBtnText}</span>
            </a>
          </div>
        </div>
      `;
    }

    messagesEl.appendChild(msgDiv);
    if (shouldScroll) {
      scrollChatToBottom();
    }
  }

  function showTypingIndicator() {
    const messagesEl = document.getElementById("ai-chat-messages");
    if (!messagesEl) return null;
    const id = "typing-" + Date.now();
    const div = document.createElement("div");
    div.id = id;
    div.className = "flex justify-start mb-3 gap-2 items-center";
    div.innerHTML = `
      <img src="assets/images/matty.jpg" alt="MATTY" class="w-8 h-8 rounded-full object-cover shrink-0 border border-emerald-300 shadow-2xs">
      <div class="rounded-2xl rounded-tl-xs px-4 py-3 bg-white shadow-xs flex items-center gap-1.5"
           style="border:1px solid #e5e0d4;">
        <span class="w-2 h-2 rounded-full animate-bounce" style="background:#2d5a27;animation-delay:0ms;"></span>
        <span class="w-2 h-2 rounded-full animate-bounce" style="background:#3d8535;animation-delay:150ms;"></span>
        <span class="w-2 h-2 rounded-full animate-bounce" style="background:#6db872;animation-delay:300ms;"></span>
      </div>
    `;
    messagesEl.appendChild(div);
    scrollChatToBottom();
    return id;
  }

  function removeTypingIndicator(id) {
    if (!id) return;
    const el = document.getElementById(id);
    if (el) el.remove();
  }

  function scrollChatToBottom() {
    const container = document.getElementById("ai-chat-scroll");
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }

  function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }

  // Simple Markdown Formatter for chat bubbles
  function formatMarkdown(text) {
    if (!text) return "";
    let html = escapeHtml(text);

    // Bold: **text**
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    // Italic: *text*
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');

    // Headers: ### text
    html = html.replace(/^### (.*$)/gim, '<div class="font-bold text-[14px] mt-2 mb-1 text-emerald-950">$1</div>');
    html = html.replace(/^## (.*$)/gim, '<div class="font-bold text-[15px] mt-2 mb-1 text-emerald-950">$1</div>');

    // Markdown Links: [text](url)
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-emerald-700 underline font-semibold">$1</a>');

    // Bullet points: - text or * text
    html = html.replace(/^\s*[-•]\s*(.*)$/gim, '<div class="flex items-start gap-1.5 my-1"><span class="text-emerald-600 mt-0.5">•</span><span>$1</span></div>');

    // Line breaks
    html = html.replace(/\n{2,}/g, '<div class="h-2"></div>');
    html = html.replace(/\n/g, '<br>');

    return html;
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initChat);
  } else {
    initChat();
  }
})();
