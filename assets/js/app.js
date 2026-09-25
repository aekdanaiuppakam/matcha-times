// MATCHA TIMES — Sales & Product Enablement App v2.6 (Bilingual & 2026 Wholesale Edition)

let currentLang = localStorage.getItem("matcha_times_lang") || "th";
let selectedCompareIds = [];
let currentFilterCategory = "all";
let currentFilterOrigin = "all";
let currentFilterUsage  = "all";
let currentFilterFlavor = "all";
let currentSort         = "grade"; // Default sort by ceremonial grade downwards

// Pouch header gradient map
const POUCH_STYLE = {
  "gold":     "pouch-gold",
  "amber":    "pouch-amber",
  "purple":   "pouch-purple",
  "charcoal": "pouch-charcoal",
  "silver":   "pouch-silver",
  "dgreen":   "pouch-dgreen",
  "olive":    "pouch-olive",
  "lgreen":   "pouch-lgreen",
  "teal":     "pouch-teal",
  "cream":    "pouch-cream",
  "white":    "pouch-white"
};

// Helper for i18n translation
function t(key) {
  if (I18N_TEXTS[currentLang] && I18N_TEXTS[currentLang][key]) {
    return I18N_TEXTS[currentLang][key];
  }
  return I18N_TEXTS["th"][key] || key;
}

// ─── Init ──────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  applyLanguage(currentLang);
  initLucide();
  initScrollReveal();
  renderTierList();
  renderProducts();
  renderComparisonTool();
  initCostCalculator();
  updateCompareDrawer();
  initMatchmaker();
  initNavScroll();
  initComparisonObserver();
});

function initLucide() {
  if (window.lucide) window.lucide.createIcons();
}

// ─── Language Switching ────────────────────────────────────────
function setLanguage(lang) {
  if (lang !== "th" && lang !== "en") return;
  currentLang = lang;
  localStorage.setItem("matcha_times_lang", lang);
  applyLanguage(lang);
  renderTierList();
  renderProducts();
  renderComparisonTool();
  updateCompareDrawer();
  updateMatchmakerResult();
  const gi = document.getElementById("calc-grams");
  if (gi) gi.dispatchEvent(new Event("input"));
  initLucide();
}

function applyLanguage(lang) {
  document.documentElement.lang = lang;

  // Sync lang switcher buttons
  document.querySelectorAll(".lang-btn").forEach(btn => {
    if (btn.getAttribute("data-lang") === lang) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });

  // Page title
  if (lang === "th") {
    document.title = "MATCHA TIMES — คู่มือสินค้ามัทฉะแท้จากญี่ปุ่น (2026 Wholesale)";
  } else {
    document.title = "MATCHA TIMES — 100% Japanese Matcha Wholesale & Cafe Guide";
  }

  // Update elements with data-i18n
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (I18N_TEXTS[lang] && I18N_TEXTS[lang][key]) {
      el.innerHTML = I18N_TEXTS[lang][key];
    }
  });

  // Update Compare Drawer labels
  updateCompareDrawer();
}

// ─── Nav shadow on scroll ───────────────────────────────────────
function initNavScroll() {
  const nav = document.getElementById("main-nav");
  if (!nav) return;
  window.addEventListener("scroll", () => {
    if (window.scrollY > 20) nav.classList.add("scrolled");
    else nav.classList.remove("scrolled");
  }, { passive: true });
}

// ─── Scroll Reveal ─────────────────────────────────────────────
function initScrollReveal() {
  const els = document.querySelectorAll(".sr");
  if (!("IntersectionObserver" in window)) {
    els.forEach(el => el.classList.add("visible"));
    return;
  }
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        e.target.querySelectorAll(".taste-bar-fill").forEach(bar => {
          const w = bar.getAttribute("data-width");
          if (w) bar.style.width = w;
        });
        obs.unobserve(e.target); // stop observing once revealed
      }
    });
  }, { threshold: 0.05, rootMargin: "60px 0px 0px 0px" });
  els.forEach(el => {
    // Immediately reveal if already in viewport (handles anchor nav)
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      el.classList.add("visible");
    } else {
      obs.observe(el);
    }
  });
}

// ─── Render Tier List Section ──────────────────────────────────
function renderTierList() {
  const container = document.getElementById("tier-list-container");
  if (!container) return;

  container.innerHTML = TIER_LIST.map(group => {
    const title = group.tierTitle[currentLang] || group.tierTitle.th;
    const desc  = group.desc[currentLang] || group.desc.th;
    const items = group.itemIds.map(id => MATCHA_PRODUCTS.find(p => p.id === id)).filter(Boolean);

    return `
      <div class="tier-row sr">
        <!-- Tier badge column -->
        <div class="tier-badge-col ${group.badgeCls}">
          <div class="tier-letter">${group.tier}</div>
          <div class="text-[11px] font-bold tracking-wider mt-1 opacity-90">TIER ${group.tier}</div>
        </div>

        <!-- Tier items column -->
        <div class="p-4 sm:p-5 flex-1 flex flex-col justify-center bg-white">
          <div class="flex flex-wrap items-center justify-between gap-2 mb-3">
            <h4 class="font-bold text-[15px] sm:text-[16px]" style="color:#1a3a16;">${title}</h4>
            <span class="text-[11px] px-2.5 py-0.5 rounded-full font-medium" style="background:#f2ede3;color:#6b7068;">${desc}</span>
          </div>

          <div class="flex flex-wrap gap-3">
            ${items.map(item => {
              const pCls = POUCH_STYLE[item.bagStyle] || "pouch-cream";
              const badgeTxt = item.badge[currentLang] || item.badge.th;
              const costPerCup = ((item.prices.g250 / 250) * 4).toFixed(1);
              const cupUnit = currentLang === 'th' ? 'แก้ว' : 'cup';
              return `
                <div onclick="scrollToProduct('${item.id}')" class="tier-item-chip" title="${currentLang === 'th' ? 'คลิกเพื่อดูสินค้าในแคตตาล็อก' : 'Click to view product'}">
                  <div class="${pCls} px-2.5 h-10 min-w-[58px] rounded-xl flex items-center justify-center shrink-0 font-bold whitespace-nowrap text-center shadow-xs" style="font-family:'Noto Serif JP', 'Hiragino Mincho ProN', 'Yu Mincho', serif; font-size:12.5px; line-height:1; letter-spacing:0.02em;">
                    ${item.kanji}
                  </div>
                  <div class="flex-1 min-w-0">
                    <div class="flex items-center gap-1.5 flex-wrap">
                      <span class="font-bold text-[13px] text-stone-900 truncate">${item.name}</span>
                      <span class="text-[10px] font-bold px-1.5 py-0.2 rounded" style="background:rgba(45,90,39,0.1);color:#2d5a27;">${item.origin.split(',')[0]}</span>
                    </div>
                    <div class="text-[11px] text-stone-500 truncate mt-0.5">
                      ${badgeTxt} · <strong class="text-stone-700">${item.prices.g250.toLocaleString()} ฿</strong>/250g (~${costPerCup}฿/${cupUnit})
                    </div>
                  </div>
                  <i data-lucide="chevron-right" class="w-4 h-4 text-stone-400 shrink-0"></i>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      </div>
    `;
  }).join('');

  initLucide();
  initScrollReveal(); // re-observe newly rendered .sr elements
}

function scrollToProduct(id) {
  const card = document.getElementById(`product-card-${id}`);
  if (card) {
    card.scrollIntoView({ behavior: "smooth", block: "center" });
    card.classList.add("ring-4", "ring-matcha-500", "transition-all");
    setTimeout(() => {
      card.classList.remove("ring-4", "ring-matcha-500");
    }, 2000);
  } else {
    openProductModal(id);
  }
}

// ─── Render Products Catalog ───────────────────────────────────
function renderProducts() {
  const container = document.getElementById("product-grid");
  if (!container) return;

  let filtered = [...MATCHA_PRODUCTS];

  // Category filter
  if (currentFilterCategory !== "all") {
    filtered = filtered.filter(p => p.collection === currentFilterCategory);
  }

  // Origin filter
  if (currentFilterOrigin !== "all") {
    filtered = filtered.filter(p => p.region === currentFilterOrigin);
  }

  // Usage filter
  if (currentFilterUsage !== "all") {
    filtered = filtered.filter(p => p.usages.includes(currentFilterUsage));
  }

  // Flavor/Style filter
  if (currentFilterFlavor === "nutty") {
    filtered = filtered.filter(p => p.taste.nutty >= 4);
  } else if (currentFilterFlavor === "umami") {
    filtered = filtered.filter(p => p.taste.umami >= 4);
  } else if (currentFilterFlavor === "organic") {
    filtered = filtered.filter(p => p.name.toUpperCase().includes("ORGANIC"));
  }

  // Sorting
  if (currentSort === "grade") {
    filtered.sort((a, b) => {
      if (a.gradeLevel !== b.gradeLevel) return a.gradeLevel - b.gradeLevel;
      return b.prices.g250 - a.prices.g250;
    });
  } else if (currentSort === "price-asc") {
    filtered.sort((a, b) => a.prices.g250 - b.prices.g250);
  } else if (currentSort === "price-desc") {
    filtered.sort((a, b) => b.prices.g250 - a.prices.g250);
  } else if (currentSort === "umami-desc") {
    filtered.sort((a, b) => b.taste.umami - a.taste.umami);
  } else if (currentSort === "nutty-desc") {
    filtered.sort((a, b) => b.taste.nutty - a.taste.nutty);
  }

  const badge = document.getElementById("product-count-badge");
  if (badge) {
    badge.textContent = currentLang === "th" ? `${filtered.length} รายการ` : `${filtered.length} Items`;
  }

  container.innerHTML = filtered.map((item, i) => {
    const isChecked  = selectedCompareIds.includes(item.id);
    const costPerCup = ((item.prices.g250 / 250) * 4).toFixed(1);
    const pouchCls   = POUCH_STYLE[item.bagStyle] || "pouch-cream";
    const delay      = (i % 4) + 1;
    const badgeTxt   = item.badge[currentLang] || item.badge.th;
    const tagline    = item.tagline[currentLang] || item.tagline.th;

    const lightPouch = ["silver", "white", "cream", "lgreen"].includes(item.bagStyle);
    const originBadgeBg = lightPouch ? "rgba(0,0,0,0.28)" : "rgba(0,0,0,0.22)";
    const originBadgeColor = lightPouch ? "#1a1a1a" : "#ffffff";

    return `
      <div id="product-card-${item.id}" class="tea-card sr sr-d${delay}">

        <!-- Coloured header strip -->
        <div class="${pouchCls} relative" style="padding:20px 20px 16px;border-bottom:1px solid;">
          <span class="featured-badge ${item.badge.cls}">${badgeTxt}</span>

          <!-- Origin badge top-left, kanji top-right -->
          <div class="flex items-start justify-between mb-4 mt-6">
            <span class="text-[10px] font-bold px-2.5 py-1 rounded-full" style="background:${originBadgeBg};color:${originBadgeColor};letter-spacing:0.06em;">${item.origin}</span>
            <span class="text-[20px] font-bold opacity-85 whitespace-nowrap" style="font-family:'Noto Serif JP',serif;line-height:1;">${item.kanji}</span>
          </div>

          <!-- Product name large -->
          <h3 class="text-[21px] font-bold leading-tight mb-1" style="font-family:'Plus Jakarta Sans',sans-serif;letter-spacing:-0.01em;">${item.name}</h3>
          <p class="text-[11px] opacity-85 leading-snug line-clamp-2 min-h-[30px]">${tagline}</p>

          <!-- Price row -->
          <div class="flex items-baseline justify-between mt-4">
            <div>
              <span class="text-[23px] font-extrabold" style="font-family:'Plus Jakarta Sans',sans-serif;">${item.prices.g250.toLocaleString()}</span>
              <span class="text-[11px] opacity-80 ml-1">฿ / 250g</span>
            </div>
            <div class="text-right opacity-90">
              <div class="text-[10px] font-medium">${t('cost_per_cup')}</div>
              <div class="text-[14px] font-bold">~${costPerCup} ฿</div>
            </div>
          </div>

          <!-- Extra weight tags -->
          <div class="flex items-center gap-2 mt-2 pt-2 border-t border-black/10 text-[10px] opacity-80">
            <span>1kg: <strong>${item.prices.kg.toLocaleString()} ฿</strong></span>
            <span>·</span>
            <span>100g: <strong>${item.prices.g100.toLocaleString()} ฿</strong></span>
          </div>
        </div>

        <!-- Body -->
        <div class="p-4 flex-1 flex flex-col justify-between bg-white">
          <div>
            <!-- Taste bars -->
            <div class="space-y-2 mb-4">
              ${renderBar("Umami",      item.taste.umami,      "#3d8535")}
              ${renderBar("Sweetness",  item.taste.sweetness,  "#c9a84c")}
              ${renderBar("Bitterness", item.taste.bitterness, "#7a7468")}
              ${renderBar("Aroma",      item.taste.aroma,      "#0e8080")}
              ${renderBar("Nutty",      item.taste.nutty,      "#7a5010")}
            </div>

            <!-- Usage tags -->
            <div class="flex flex-wrap gap-1.5 mb-4">
              ${item.usages.map(u => `
                <span class="text-[11px] font-semibold px-2.5 py-1 rounded-full" style="background:#f2ede3;color:#5a5040;border:1px solid #e5ddd0;">
                  ${u === 'Usucha' ? '🍵 Usucha' : u === 'Koicha' ? '✨ Koicha' : u === 'Latte' ? '🥛 Latte' : u === 'Smoothie' ? '🥤 Smoothie' : '🥐 Bakery'}
                </span>
              `).join('')}
            </div>
          </div>

          <!-- Action row -->
          <div class="flex gap-2 pt-3" style="border-top:1px solid #ede8df;">
            <button onclick="openProductModal('${item.id}')" class="btn-ghost flex-1 justify-center text-[12px]">
              <i data-lucide="info" class="w-3.5 h-3.5"></i> ${t('btn_detail')}
            </button>
            <label class="flex-1 cursor-pointer select-none">
              <input type="checkbox" class="sr-only" onchange="toggleCompare('${item.id}', this)" ${isChecked ? 'checked' : ''}>
              <div class="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-[12px] font-semibold transition-all ${isChecked ? 'text-white' : 'text-stone-600'}" style="${isChecked ? 'background:#1a3a16;border:1.5px solid #1a3a16;' : 'background:#fff;border:1.5px solid #e5e0d4;'}">
                <i data-lucide="${isChecked ? 'check-square' : 'git-compare'}" class="w-3.5 h-3.5"></i>
                ${isChecked ? t('btn_compared') : t('btn_compare')}
              </div>
            </label>
          </div>
        </div>

      </div>
    `;
  }).join('');

  initLucide();
  initScrollReveal();
}

function renderBar(label, score, color) {
  const pct = (score / 5) * 100;
  return `
    <div>
      <div class="flex justify-between items-center mb-1">
        <span class="text-[11px] font-medium" style="color:#6b7068;">${label}</span>
        <span class="text-[11px] font-bold" style="color:#3a3d38;">${score}/5</span>
      </div>
      <div class="taste-bar-track">
        <div class="taste-bar-fill" data-width="${pct}%" style="background:${color};"></div>
      </div>
    </div>
  `;
}

// ─── Filters & Sort Handlers ──────────────────────────────────
function setCategoryFilter(category) {
  currentFilterCategory = category;
  syncPills("category-filters", category);
  renderProducts();
}

function setOriginFilter(origin) {
  currentFilterOrigin = origin;
  syncPills("origin-filters", origin);
  renderProducts();
}

function setUsageFilter(usage) {
  currentFilterUsage = usage;
  syncPills("usage-filters", usage);
  renderProducts();
}

function setFlavorFilter(flavor) {
  currentFilterFlavor = flavor;
  syncPills("flavor-filters", flavor);
  renderProducts();
}

function setSort(val) {
  currentSort = val;
  renderProducts();
}

function syncPills(containerId, activeVal) {
  const wrap = document.getElementById(containerId);
  if (!wrap) return;
  wrap.querySelectorAll(".pill").forEach(btn => {
    if (btn.getAttribute("data-val") === activeVal) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });
}

// ─── Compare Logic ────────────────────────────────────────────
function toggleCompare(id, checkbox) {
  if (selectedCompareIds.includes(id)) {
    selectedCompareIds = selectedCompareIds.filter(x => x !== id);
  } else {
    if (selectedCompareIds.length >= 3) {
      alert(currentLang === 'th' ? "เลือกได้สูงสุด 3 รายการพร้อมกัน กรุณายกเลิกตัวเดิมก่อนครับ" : "Maximum 3 items can be compared at once. Please uncheck an item first.");
      if (checkbox) checkbox.checked = false;
      return;
    }
    selectedCompareIds.push(id);
  }
  renderProducts();
  renderComparisonTool();
  updateCompareDrawer();
}

function selectCompareTeas(id1, id2) {
  selectedCompareIds = [id1, id2];
  renderProducts();
  renderComparisonTool();
  updateCompareDrawer();
  document.getElementById("comparison-section")?.scrollIntoView({ behavior: "smooth" });
}

function clearCompareSelection() {
  selectedCompareIds = [];
  renderProducts();
  renderComparisonTool();
  updateCompareDrawer();
}

function updateCompareDrawer() {
  const drawer = document.getElementById("compare-drawer");
  const countText = document.getElementById("compare-drawer-text");
  const names  = document.getElementById("compare-drawer-names");
  if (!drawer) return;

  if (countText) {
    countText.innerHTML = currentLang === 'th'
      ? `เลือกแล้ว <span class="font-bold" style="color:#c9a84c;">${selectedCompareIds.length}</span>/3 รายการ`
      : `Selected <span class="font-bold" style="color:#c9a84c;">${selectedCompareIds.length}</span>/3 items`;
  }

  if (selectedCompareIds.length > 0) {
    drawer.classList.add("visible");
    if (names) {
      const labels = selectedCompareIds.map(id => {
        const p = MATCHA_PRODUCTS.find(x => x.id === id);
        return p ? `<span style="background:rgba(255,255,255,0.12);padding:2px 8px;border-radius:99px;">${p.name}</span>` : '';
      });
      names.innerHTML = labels.join('');
    }
  } else {
    drawer.classList.remove("visible");
  }

  initLucide();
}

function initComparisonObserver() {
  const section = document.getElementById("comparison-section");
  const drawer  = document.getElementById("compare-drawer");
  if (!section || !drawer) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        drawer.classList.add("hidden-in-section");
      } else {
        drawer.classList.remove("hidden-in-section");
      }
    });
  }, { threshold: 0.12 });

  observer.observe(section);
}

// ─── Comparison Matrix Table ──────────────────────────────────
function renderComparisonTool() {
  const container = document.getElementById("comparison-table-container");
  if (!container) return;

  if (selectedCompareIds.length < 2) {
    container.innerHTML = `
      <div class="text-center py-14 px-6 rounded-3xl" style="background:#fff;border:2px dashed #ddd8cc;">
        <div style="width:56px;height:56px;background:#f5f0e8;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 16px;">
          <i data-lucide="git-compare" style="width:24px;height:24px;color:#9a9a90;"></i>
        </div>
        <h4 class="font-bold text-[16px] mb-2" style="color:#3a3d38;">${currentLang === 'th' ? 'เลือกชา 2-3 รายการเพื่อเริ่มเปรียบเทียบ' : 'Select 2-3 items to compare side-by-side'}</h4>
        <p class="text-[13px] mb-6 mx-auto" style="color:#7a7468;max-width:380px;">${currentLang === 'th' ? 'กดปุ่ม "เทียบ" บนการ์ดสินค้าด้านบน หรือเลือกคู่แมทช์ยอดฮิตด้านล่าง' : 'Tap "Compare" on product cards above, or pick one of our recommended match-ups below.'}</p>
        <div class="flex flex-wrap justify-center gap-2.5">
          <button onclick="selectCompareTeas('strong-nutty','yurane')" class="btn-primary text-[12px] py-2.5 px-4">
            🔥 Strong Nutty vs Yurane
          </button>
          <button onclick="selectCompareTeas('shoen','yame-b')" class="btn-secondary text-[12px] py-2.5 px-4">
            ✨ Shoen vs Yame B
          </button>
          <button onclick="selectCompareTeas('zenraku','oikawa')" class="btn-ghost text-[12px] py-2.5 px-4">
            💰 Zenraku vs Oikawa
          </button>
        </div>
      </div>
    `;
    initLucide();
    return;
  }

  const items = selectedCompareIds.map(id => MATCHA_PRODUCTS.find(p => p.id === id)).filter(Boolean);

  const tasteRows = [
    { label: currentLang === 'th' ? "✨ Umami (กลมกล่อม)" : "✨ Umami (Savory)", key: "umami", color: "#3d8535" },
    { label: currentLang === 'th' ? "🍯 Sweetness (หวานธรรมชาติ)" : "🍯 Sweetness", key: "sweetness", color: "#c9a84c" },
    { label: currentLang === 'th' ? "🍃 Bitterness (ขมฝาด)" : "🍃 Bitterness", key: "bitterness", color: "#7a7468" },
    { label: currentLang === 'th' ? "🌸 Aroma (กลิ่นหอม)" : "🌸 Aroma", key: "aroma", color: "#0e8080" },
    { label: currentLang === 'th' ? "🥜 Nutty (โทนถั่วคั่ว)" : "🥜 Roasted Nutty", key: "nutty", color: "#7a5010" },
  ];

  container.innerHTML = `
    <div class="bg-white rounded-3xl overflow-hidden" style="border:1px solid #e5e0d4;box-shadow:0 2px 24px rgba(0,0,0,0.05);">

      <!-- Header -->
      <div class="flex items-center justify-between flex-wrap gap-4 p-6" style="border-bottom:1px solid #e5e0d4;background:#fafaf8;">
        <div>
          <h3 class="font-bold text-[16px]" style="color:#1a3a16;font-family:'Plus Jakarta Sans',sans-serif;">${currentLang === 'th' ? `เปรียบเทียบ ${items.length} รายการ` : `Comparing ${items.length} Matcha SKUs`}</h3>
          <p class="text-[12px] mt-0.5" style="color:#7a7468;">${currentLang === 'th' ? 'โปรไฟล์รสชาติ · แหล่งปลูก · สเปกราคา 3 ขนาด' : 'Taste Profiles · Terroirs · 3 Weight Tiers'}</p>
        </div>
        <button onclick="clearCompareSelection()" class="btn-ghost text-[12px]">
          <i data-lucide="x" class="w-3.5 h-3.5"></i> ${currentLang === 'th' ? 'ล้างการเปรียบเทียบ' : 'Clear Compare'}
        </button>
      </div>

      <!-- Mobile scroll hint -->
      <div class="table-scroll-hint px-6 pb-1">
        <i data-lucide="move-horizontal" style="width:14px;height:14px;"></i>
        <span>${currentLang === 'th' ? 'กวาดซ้าย-ขวาเพื่อดูตารางเต็ม' : 'Swipe horizontally to view full table'}</span>
      </div>

      <div class="overflow-x-auto">
        <table class="cmp-table min-w-[560px]">
          <thead>
            <tr style="background:#fafaf8;border-bottom:2px solid #e5e0d4;">
              <th class="text-[11px] font-bold uppercase tracking-wider" style="color:#9a9a90;width:160px;">${currentLang === 'th' ? 'คุณสมบัติ' : 'Attributes'}</th>
              ${items.map(item => {
                const pCls = POUCH_STYLE[item.bagStyle] || "pouch-cream";
                return `
                  <th class="text-center">
                    <div class="${pCls} inline-block px-5 py-3 rounded-xl mb-2" style="border:1px solid rgba(0,0,0,0.08);">
                      <div class="text-[13px] opacity-75 mb-0.5 whitespace-nowrap" style="font-family:'Noto Serif JP',serif;">${item.kanji}</div>
                      <div class="text-[16px] font-bold" style="font-family:'Plus Jakarta Sans',sans-serif;">${item.name}</div>
                    </div>
                    <div class="text-[20px] font-bold" style="color:#1a3a16;">${item.prices.g250.toLocaleString()} ฿</div>
                    <div class="text-[11px]" style="color:#9a9a90;">250g · ~${((item.prices.g250/250)*4).toFixed(1)} ฿/${currentLang==='th'?'แก้ว':'cup'}</div>
                    <div class="text-[10px] text-stone-500 mt-1">1kg: ${item.prices.kg.toLocaleString()}฿ | 100g: ${item.prices.g100.toLocaleString()}฿</div>
                  </th>
                `;
              }).join('')}
            </tr>
          </thead>
          <tbody>

            <!-- Origin -->
            <tr>
              <td class="text-[12px] font-semibold" style="color:#5a5a50;background:#fafaf8;">
                <i data-lucide="map-pin" class="w-3.5 h-3.5 inline mr-1" style="color:#3d8535;"></i> ${currentLang === 'th' ? 'แหล่งกำเนิด' : 'Origin'}
              </td>
              ${items.map(item => `
                <td class="text-center">
                  <span class="text-[11px] font-bold px-3 py-1 rounded-full text-white" style="background:#2d5a27;">${item.origin}</span>
                </td>
              `).join('')}
            </tr>

            <!-- Tier -->
            <tr>
              <td class="text-[12px] font-semibold" style="color:#5a5a50;background:#fafaf8;">
                <i data-lucide="award" class="w-3.5 h-3.5 inline mr-1" style="color:#c9a84c;"></i> Tier Ranking
              </td>
              ${items.map(item => `
                <td class="text-center">
                  <span class="text-[11px] font-bold px-2.5 py-0.5 rounded-full ${item.tier==='S'?'tier-badge-s text-white':item.tier==='A'?'tier-badge-a text-white':'tier-badge-b text-white'}">
                    TIER ${item.tier}
                  </span>
                </td>
              `).join('')}
            </tr>

            <!-- Usages -->
            <tr>
              <td class="text-[12px] font-semibold" style="color:#5a5a50;background:#fafaf8;">
                <i data-lucide="coffee" class="w-3.5 h-3.5 inline mr-1" style="color:#3d8535;"></i> ${currentLang === 'th' ? 'เมนูที่แนะนำ' : 'Application'}
              </td>
              ${items.map(item => `
                <td class="text-center">
                  <div class="flex flex-wrap justify-center gap-1">
                    ${item.usages.map(u => `<span class="text-[11px] px-2 py-0.5 rounded-full font-medium" style="background:#f2ede3;color:#5a5040;border:1px solid #ddd8cc;">${u}</span>`).join('')}
                  </div>
                </td>
              `).join('')}
            </tr>

            <!-- Taste rows -->
            ${tasteRows.map(row => {
              const maxScore = Math.max(...items.map(item => item.taste[row.key]));
              return `
                <tr>
                  <td class="text-[12px] font-semibold" style="color:#5a5a50;background:#fafaf8;">${row.label}</td>
                  ${items.map(item => {
                    const s = item.taste[row.key];
                    const isWinner = s === maxScore && maxScore >= 4;
                    return `
                      <td class="text-center ${isWinner ? 'cmp-winner' : ''}">
                        <div class="font-bold text-[16px]" style="color:${isWinner ? row.color : '#3a3d38'};">
                          ${s}/5${isWinner ? ' <span class="cmp-winner-badge">Best</span>' : ''}
                        </div>
                        <div class="w-20 mx-auto h-1.5 rounded-full mt-1.5 overflow-hidden" style="background:#ede8df;">
                          <div class="h-full rounded-full" style="width:${(s/5)*100}%;background:${row.color};"></div>
                        </div>
                      </td>
                    `;
                  }).join('')}
                </tr>
              `;
            }).join('')}

            <!-- Sales tips -->
            <tr style="background:#f8f5f0;">
              <td class="text-[12px] font-semibold align-top" style="color:#5a5a50;">
                💡 ${currentLang === 'th' ? 'ไกด์สำหรับเซลล์' : 'Sales Pitch'}
              </td>
              ${items.map(item => {
                const pitch = item.recommendedFor[currentLang] || item.recommendedFor.th;
                return `
                  <td class="text-[12px] align-top" style="color:#5a5a50;line-height:1.6;">${pitch}</td>
                `;
              }).join('')}
            </tr>

          </tbody>
        </table>
      </div>
    </div>
  `;

  initLucide();
}

// ─── Cost Calculator ──────────────────────────────────────────
function initCostCalculator() {
  const gi  = document.getElementById("calc-grams");
  const gv  = document.getElementById("calc-grams-val");
  const pi  = document.getElementById("calc-selling-price");
  const pv  = document.getElementById("calc-selling-price-val");
  if (!gi || !pi) return;

  function recalc() {
    const grams   = parseFloat(gi.value);
    const selling = parseFloat(pi.value);
    if (gv) gv.textContent = currentLang === 'th' ? `${grams.toFixed(1)} กรัม` : `${grams.toFixed(1)} g`;
    if (pv) pv.textContent = currentLang === 'th' ? `${selling} บาท` : `${selling} THB`;

    const body = document.getElementById("calc-table-body");
    if (!body) return;

    const rows = MATCHA_PRODUCTS.map(item => {
      const cups   = Math.floor(250 / grams);
      const cost   = parseFloat(((item.prices.g250 / 250) * grams).toFixed(1));
      const profit = parseFloat((selling - cost).toFixed(1));
      const margin = parseFloat((profit / selling * 100).toFixed(0));
      return { item, cups, cost, profit, margin };
    });

    // Summary highlights
    const cheapest   = [...rows].sort((a,b) => a.cost - b.cost)[0];
    const bestMargin = [...rows].sort((a,b) => b.margin - a.margin)[0];
    const bestPick   = rows.find(r => r.item.id === "strong-nutty") || rows[0];

    const summaryEl = document.getElementById("calc-summary");
    if (summaryEl) {
      summaryEl.innerHTML = `
        <div class="calc-summary-grid">
          <div class="rounded-2xl p-4 text-center" style="background:#f0f8f0;border:1.5px solid #b8dec0;">
            <div class="text-[10px] font-bold uppercase tracking-wider mb-1" style="color:#3d8535;">💰 ${currentLang === 'th' ? 'ต้นทุนถูกสุด' : 'Lowest Cost / Cup'}</div>
            <div class="text-[16px] font-bold" style="color:#1a3a16;">${cheapest.item.name}</div>
            <div class="text-[20px] font-bold mt-1" style="color:#2d5a27;">${cheapest.cost} ฿/${currentLang==='th'?'แก้ว':'cup'}</div>
            <div class="text-[11px] mt-1" style="color:#6b7068;">${cheapest.margin}% margin</div>
          </div>
          <div class="rounded-2xl p-4 text-center" style="background:#f8f5e8;border:1.5px solid #d4c080;">
            <div class="text-[10px] font-bold uppercase tracking-wider mb-1" style="color:#a07020;">📈 ${currentLang === 'th' ? 'Margin ดีสุด' : 'Best Profit Margin'}</div>
            <div class="text-[16px] font-bold" style="color:#1a3a16;">${bestMargin.item.name}</div>
            <div class="text-[20px] font-bold mt-1" style="color:#a07020;">${bestMargin.margin}%</div>
            <div class="text-[11px] mt-1" style="color:#6b7068;">${currentLang === 'th' ? `ต้นทุน ${bestMargin.cost} ฿` : `Cost ${bestMargin.cost} ฿`}</div>
          </div>
          <div class="rounded-2xl p-4 text-center" style="background:#f5f0fa;border:1.5px solid #c8b0d8;">
            <div class="text-[10px] font-bold uppercase tracking-wider mb-1" style="color:#6a40a0;">⭐ ${currentLang === 'th' ? 'แนะนำ Best Pick' : 'Editor Pick #1'}</div>
            <div class="text-[16px] font-bold" style="color:#1a3a16;">${bestPick.item.name}</div>
            <div class="text-[20px] font-bold mt-1" style="color:#6a40a0;">${bestPick.margin}%</div>
            <div class="text-[11px] mt-1" style="color:#6b7068;">${currentLang === 'th' ? 'ขายดีอันดับ 1 + กำไรสูง' : '#1 Best Seller + High Margin'}</div>
          </div>
        </div>
      `;
    }

    body.innerHTML = rows.map(({item, cups, cost, profit, margin}) => {
      const marginGood = margin >= 75;
      return `
        <tr>
          <td class="py-3 pr-4 font-bold" style="color:#1a3a16;">
            ${item.name}
            <span class="text-[10px] font-normal text-stone-500 ml-1">(${item.kanji})</span>
          </td>
          <td class="py-3 px-3 text-center text-[12px]" style="color:#6b7068;">${item.origin.split(',')[0]}</td>
          <td class="py-3 px-3 text-right font-bold" style="color:#3a3d38;">${item.prices.g250.toLocaleString()} ฿</td>
          <td class="py-3 px-3 text-center" style="color:#6b7068;">${cups}</td>
          <td class="py-3 px-3 text-right font-bold" style="color:#2d5a27;">${cost} ฿</td>
          <td class="py-3 px-3 text-right font-bold" style="color:#3a3d38;">${profit} ฿</td>
          <td class="py-3 pl-3 text-right">
            <span class="margin-badge ${marginGood ? 'margin-good' : 'margin-ok'}">${margin}%</span>
          </td>
        </tr>
      `;
    }).join('');
  }

  gi.addEventListener("input", recalc);
  pi.addEventListener("input", recalc);
  recalc();
}

// ─── Matchmaker Quiz ──────────────────────────────────────────
let quizAnswers = { usage: "latte", flavor: "nutty", budget: "medium" };

function initMatchmaker() {
  updateMatchmakerResult();
}

function selectQuizOption(category, value, el) {
  quizAnswers[category] = value;
  el.parentElement?.querySelectorAll(".quiz-option").forEach(b => b.classList.remove("selected"));
  el.classList.add("selected");
  updateMatchmakerResult();
}

function resetMatchmaker() {
  quizAnswers = { usage: "latte", flavor: "nutty", budget: "medium" };
  document.querySelectorAll("#matchmaker .quiz-option").forEach(btn => {
    const cat = btn.getAttribute("data-quiz-cat");
    const val = btn.getAttribute("data-quiz-val");
    if (quizAnswers[cat] === val) {
      btn.classList.add("selected");
    } else {
      btn.classList.remove("selected");
    }
  });
  updateMatchmakerResult();
}

function updateMatchmakerResult() {
  const card = document.getElementById("quiz-result-card");
  if (!card) return;

  let id = "strong-nutty";
  if (quizAnswers.usage === "usucha") {
    if (quizAnswers.budget === "high") id = "shoen";
    else if (quizAnswers.budget === "medium") id = "yurane";
    else id = "zenraku";
  } else if (quizAnswers.usage === "bakery") {
    if (quizAnswers.budget === "low") id = "zenraku";
    else if (quizAnswers.budget === "medium") id = "organic-classic";
    else if (quizAnswers.flavor === "nutty") id = "strong-nutty";
    else id = "organic-signature";
  } else {
    // latte / default
    if (quizAnswers.budget === "high") {
      if (quizAnswers.flavor === "nutty") id = "strong-nutty";
      else if (quizAnswers.flavor === "organic") id = "yame-a";
      else id = "shoen";
    } else if (quizAnswers.budget === "medium") {
      // 900-1,200 THB range: yurane=1130, organic-signature=920, organic-classic=1070
      if (quizAnswers.flavor === "organic") id = "organic-signature";
      else id = "yurane";
    } else {
      // low budget < 850 THB: zenraku=800, oikawa=860
      if (quizAnswers.flavor === "organic") id = "organic-classic";
      else id = "zenraku";
    }
  }

  const tea = MATCHA_PRODUCTS.find(p => p.id === id) || MATCHA_PRODUCTS[0];
  const pCls = POUCH_STYLE[tea.bagStyle] || "pouch-cream";
  const tagline = tea.tagline[currentLang] || tea.tagline.th;
  const highlight = tea.highlight[currentLang] || tea.highlight.th;

  card.innerHTML = `
    <div class="rounded-2xl overflow-hidden" style="border:1px solid #e5e0d4;">
      <div class="${pCls} p-5 flex items-center gap-4">
        <div class="shrink-0 text-center">
          <div class="text-[26px] opacity-85 whitespace-nowrap" style="font-family:'Noto Serif JP',serif;line-height:1;">${tea.kanji}</div>
          <div class="text-[11px] font-bold mt-1">${tea.name}</div>
        </div>
        <div>
          <div class="text-[10px] font-bold tracking-widest uppercase opacity-75 mb-1">${t('quiz_result_tag')}</div>
          <div class="text-[18px] font-bold leading-tight" style="font-family:'Plus Jakarta Sans',sans-serif;">${tea.name}</div>
          <div class="text-[12px] opacity-85 mt-1 line-clamp-2">${tagline}</div>
        </div>
        <div class="ml-auto text-right shrink-0">
          <div class="text-[22px] font-bold" style="font-family:'Plus Jakarta Sans',sans-serif;">${tea.prices.g250.toLocaleString()}</div>
          <div class="text-[10px] opacity-75">฿ / 250g</div>
        </div>
      </div>
      <div class="bg-white p-4 flex flex-wrap items-center justify-between gap-3" style="border-top:1px solid #e5e0d4;">
        <p class="text-[12px] leading-relaxed" style="color:#6b7068;flex:1;min-width:200px;">${highlight}</p>
        <div class="flex items-center gap-2 shrink-0">
          <button onclick="resetMatchmaker()" class="quiz-reset-btn" title="รีเซ็ต">
            <i data-lucide="rotate-ccw" class="w-3.5 h-3.5"></i>
            <span>${t('quiz_btn_reset')}</span>
          </button>
          <button onclick="openProductModal('${tea.id}')" class="btn-primary text-[12px] py-2 px-4">
            ${t('quiz_btn_view')} <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
          </button>
        </div>
      </div>
    </div>
  `;
  initLucide();
}

// ─── Modals ───────────────────────────────────────────────────
function openProductModal(id) {
  const item = MATCHA_PRODUCTS.find(p => p.id === id);
  if (!item) return;

  const modal   = document.getElementById("product-modal");
  const content = document.getElementById("product-modal-content");
  if (!modal || !content) return;

  const costPerCup = ((item.prices.g250 / 250) * 4).toFixed(1);
  const pCls = POUCH_STYLE[item.bagStyle] || "pouch-cream";
  const tagline = item.tagline[currentLang] || item.tagline.th;
  const description = item.description[currentLang] || item.description.th;
  const pitch = item.recommendedFor[currentLang] || item.recommendedFor.th;

  content.innerHTML = `
    <!-- Gradient header -->
    <div class="${pCls} relative p-6" style="border-bottom:1px solid rgba(0,0,0,0.08);">
      <button onclick="closeModal('product-modal')" class="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center transition-colors" style="background:rgba(0,0,0,0.15);">
        <i data-lucide="x" class="w-4 h-4"></i>
      </button>
      <div class="text-[28px] opacity-80 mb-2 whitespace-nowrap" style="font-family:'Noto Serif JP',serif;line-height:1;">${item.kanji}</div>
      <h3 class="text-[22px] font-bold mb-1" style="font-family:'Plus Jakarta Sans',sans-serif;">${item.name}</h3>
      <p class="text-[12px] opacity-85">${tagline}</p>
    </div>

    <!-- Detail body -->
    <div class="p-6 space-y-5 bg-white">

      <!-- 3-tier Price strip -->
      <div class="grid grid-cols-3 gap-2 p-3 rounded-2xl text-center" style="background:#f8f5f0;border:1px solid #ede8df;">
        <div>
          <div class="text-[10px] text-stone-500 font-bold uppercase">1 kg (Bulk)</div>
          <div class="text-[16px] font-bold text-matcha-900">${item.prices.kg.toLocaleString()} ฿</div>
        </div>
        <div class="border-x border-stone-200">
          <div class="text-[10px] text-matcha-700 font-bold uppercase">250g (Standard)</div>
          <div class="text-[17px] font-extrabold text-matcha-900">${item.prices.g250.toLocaleString()} ฿</div>
          <div class="text-[10px] text-stone-500">~${costPerCup}฿/${currentLang==='th'?'แก้ว':'cup'}</div>
        </div>
        <div>
          <div class="text-[10px] text-stone-500 font-bold uppercase">100g (Sample)</div>
          <div class="text-[16px] font-bold text-matcha-900">${item.prices.g100.toLocaleString()} ฿</div>
        </div>
      </div>

      <!-- Description -->
      <div>
        <div class="text-[10px] font-bold tracking-wider uppercase mb-2" style="color:#9a9a90;">${currentLang === 'th' ? 'คำอธิบาย' : 'Description'}</div>
        <p class="text-[13px] leading-relaxed" style="color:#5a5a50;">${description}</p>
      </div>

      <!-- Taste bars -->
      <div>
        <div class="text-[10px] font-bold tracking-wider uppercase mb-3" style="color:#9a9a90;">Taste Profile</div>
        <div class="space-y-2.5 p-4 rounded-2xl" style="background:#f8f5f0;border:1px solid #ede8df;">
          ${renderBar("Umami",      item.taste.umami,      "#3d8535")}
          ${renderBar("Sweetness",  item.taste.sweetness,  "#c9a84c")}
          ${renderBar("Bitterness", item.taste.bitterness, "#7a7468")}
          ${renderBar("Aroma",      item.taste.aroma,      "#0e8080")}
          ${renderBar("Nutty",      item.taste.nutty,      "#7a5010")}
        </div>
      </div>

      <!-- Sales tips -->
      <div class="p-4 rounded-2xl" style="background:#f2f8f0;border:1px solid #c8dec4;">
        <div class="text-[10px] font-bold tracking-wider uppercase mb-1.5" style="color:#3d8535;">💡 ${currentLang === 'th' ? 'ไกด์สำหรับเซลล์ & เจ้าของร้าน' : 'Sales Pitch & Cafe Fit'}</div>
        <p class="text-[12px] leading-relaxed" style="color:#2d5a27;">${pitch}</p>
      </div>

      <!-- Buttons -->
      <div class="space-y-2 pt-2">
        <button onclick="copyProductSpec('${item.id}')" class="w-full py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 text-[12px] font-bold transition-all" style="background:#f2f8f0;border:1.5px solid #2d5a27;color:#2d5a27;">
          <i data-lucide="copy" class="w-3.5 h-3.5"></i> ${t('btn_copy_line')}
        </button>
        <div class="flex gap-2.5">
          <button onclick="toggleCompare('${item.id}'); closeModal('product-modal');" class="btn-secondary flex-1 justify-center text-[12px]">
            ${selectedCompareIds.includes(item.id) ? (currentLang==='th'?'นำออกจากเปรียบเทียบ':'Remove from Compare') : (currentLang==='th'?'+ เพิ่มในตารางเปรียบ':'+ Add to Compare')}
          </button>
          <button onclick="closeModal('product-modal'); openContactModal();" class="btn-primary flex-1 justify-center text-[12px]">
            ${currentLang === 'th' ? 'สั่งซื้อ / ขอตัวอย่าง' : 'Order / Sample Kit'}
          </button>
        </div>
      </div>
    </div>
  `;

  modal.classList.add("open");
  initLucide();

  setTimeout(() => {
    content.querySelectorAll(".taste-bar-fill").forEach(bar => {
      const w = bar.getAttribute("data-width");
      if (w) bar.style.width = w;
    });
  }, 80);
}

function openFlyerModal() {
  // Flyer modal removed
}

function openContactModal() {
  document.getElementById("contact-modal")?.classList.add("open");
}

function closeModal(id) {
  document.getElementById(id)?.classList.remove("open");
}

// ─── Mobile Menu Handlers ─────────────────────────────────────
function toggleMobileMenu() {
  const overlay = document.getElementById("mobile-overlay");
  const drawer  = document.getElementById("mobile-drawer");
  const btn     = document.getElementById("hamburger-btn");
  if (!overlay || !drawer) return;

  const isOpen = drawer.classList.contains("open");
  if (isOpen) {
    closeMobileMenu();
  } else {
    overlay.classList.add("open");
    drawer.classList.add("open");
    if (btn) btn.classList.add("open");
    document.body.style.overflow = "hidden";
  }
}

function closeMobileMenu() {
  const overlay = document.getElementById("mobile-overlay");
  const drawer  = document.getElementById("mobile-drawer");
  const btn     = document.getElementById("hamburger-btn");
  if (overlay) overlay.classList.remove("open");
  if (drawer) drawer.classList.remove("open");
  if (btn) btn.classList.remove("open");
  document.body.style.overflow = "";
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    document.querySelectorAll(".modal-overlay.open").forEach(m => m.classList.remove("open"));
    closeMobileMenu();
  }
});

// ─── 1-Click Copy Spec for Sales (LINE / Chat) ─────────────────
function copyProductSpec(id) {
  const item = MATCHA_PRODUCTS.find(p => p.id === id);
  if (!item) return;
  const costPerCup = ((item.prices.g250 / 250) * 4).toFixed(1);
  const pitch = item.recommendedFor[currentLang] || item.recommendedFor.th;

  let text = "";
  if (currentLang === "th") {
    text = `🍵 MATCHA TIMES — ${item.name} (${item.kanji})
📍 แหล่งกำเนิด: ${item.origin}
💰 ราคา: 250g = ${item.prices.g250.toLocaleString()} ฿ (ต้นทุน ~${costPerCup} ฿/แก้ว ที่ 4g)
📦 ขนาดอื่น: 1kg = ${item.prices.kg.toLocaleString()} ฿ | 100g = ${item.prices.g100.toLocaleString()} ฿
✨ รสสัมผัส: อูมามิ ${item.taste.umami}/5 | หวาน ${item.taste.sweetness}/5 | ถั่วคั่ว ${item.taste.nutty}/5 | กลิ่นหอม ${item.taste.aroma}/5 | ขมฝาด ${item.taste.bitterness}/5
🥛 เหมาะสำหรับ: ${item.usages.join(', ')}
💡 จุดเด่นสำหรับร้าน: ${pitch}
📲 เซลล์ผู้ดูแล: คุณปิ่นปัก 098-603-5370 | LINE: https://line.me/ti/p/Q_YSqkj0Db | Official IG: https://www.instagram.com/matchatimes.thailand/?hl=en`;
  } else {
    text = `🍵 MATCHA TIMES — ${item.name} (${item.kanji})
📍 Origin: ${item.origin}
💰 Pricing: 250g = ${item.prices.g250.toLocaleString()} THB (Cost ~${costPerCup} THB/cup at 4g)
📦 Bulk/Sample: 1kg = ${item.prices.kg.toLocaleString()} THB | 100g = ${item.prices.g100.toLocaleString()} THB
✨ Taste: Umami ${item.taste.umami}/5 | Sweetness ${item.taste.sweetness}/5 | Nutty ${item.taste.nutty}/5 | Aroma ${item.taste.aroma}/5 | Bitterness ${item.taste.bitterness}/5
🥛 Best For: ${item.usages.join(', ')}
💡 Sales Pitch: ${pitch}
📲 Dedicated Sales Rep: Pinpuk 098-603-5370 | LINE: https://line.me/ti/p/Q_YSqkj0Db | Official IG: https://www.instagram.com/matchatimes.thailand/?hl=en`;
  }

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(showCopyToast).catch(() => fallbackCopy(text));
  } else {
    fallbackCopy(text);
  }
}

function fallbackCopy(text) {
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.style.position = "fixed";
  ta.style.opacity = "0";
  document.body.appendChild(ta);
  ta.select();
  try {
    document.execCommand("copy");
    showCopyToast();
  } catch (err) {}
  document.body.removeChild(ta);
}

function showCopyToast() {
  const toast = document.getElementById("copy-toast");
  if (!toast) return;
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 2400);
}
