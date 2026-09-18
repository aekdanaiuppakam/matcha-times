// MATCHA TIMES — Sales & Product Enablement App v2

let selectedCompareIds = ["strong-nutty", "yurane"];
let currentFilterOrigin = "all";
let currentFilterUsage  = "all";
let currentFilterFlavor = "all";
let currentSort         = "featured";

// Pouch header gradient map (CSS class names)
const POUCH_STYLE = {
  "gold":        "pouch-gold",
  "black":       "pouch-black",
  "dark-green":  "pouch-dgreen",
  "light-green": "pouch-lgreen",
  "teal":        "pouch-teal",
  "cream":       "pouch-cream",
  "white":       "pouch-white",
  "silver":      "pouch-silver",
};

// Featured badge map — id → { label, cls }
const FEATURED_BADGES = {
  "strong-nutty":  { label: "🔥 Best Seller",  cls: "badge-bestseller" },
  "yurane":        { label: "⭐ Staff Pick",    cls: "badge-staffpick"  },
  "organic-black": { label: "👑 Flagship",      cls: "badge-flagship"   },
  "zenraku":       { label: "💰 Best Value",    cls: "badge-value"      },
  "organic-green": { label: "🌿 Organic",       cls: "badge-organic"    },
  "shouen":        { label: "✨ Ceremonial",    cls: "badge-ceremonial" },
};

// ─── Init ──────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  initLucide();
  initScrollReveal();
  renderProducts();
  renderComparisonTool();
  initCostCalculator();
  updateCompareDrawer();
  initMatchmaker();
  initNavScroll();
});

function initLucide() {
  if (window.lucide) window.lucide.createIcons();
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
        // animate taste bars inside
        e.target.querySelectorAll(".taste-bar-fill").forEach(bar => {
          const w = bar.getAttribute("data-width");
          if (w) bar.style.width = w;
        });
      }
    });
  }, { threshold: 0.1, rootMargin: "0px 0px -30px 0px" });
  els.forEach(el => obs.observe(el));
}

// ─── Render Products ───────────────────────────────────────────
function renderProducts() {
  const container = document.getElementById("product-grid");
  if (!container) return;

  let filtered = [...MATCHA_PRODUCTS];

  if (currentFilterOrigin !== "all")
    filtered = filtered.filter(p => p.region === currentFilterOrigin);
  if (currentFilterUsage !== "all")
    filtered = filtered.filter(p => p.usages.includes(currentFilterUsage));

  if (currentFilterFlavor === "nutty") {
    filtered = filtered.filter(p => p.taste.nutty >= 4);
  } else if (currentFilterFlavor === "umami") {
    filtered = filtered.filter(p => p.taste.umami >= 4 && p.taste.nutty < 5);
  } else if (currentFilterFlavor === "organic") {
    filtered = filtered.filter(p => p.name.toUpperCase().includes("ORGANIC"));
  }

  if (currentSort === "price-asc")   filtered.sort((a,b) => a.price - b.price);
  if (currentSort === "price-desc")  filtered.sort((a,b) => b.price - a.price);
  if (currentSort === "umami-desc")  filtered.sort((a,b) => b.taste.umami  - a.taste.umami);
  if (currentSort === "nutty-desc")  filtered.sort((a,b) => b.taste.nutty  - a.taste.nutty);

  const badge = document.getElementById("product-count-badge");
  if (badge) badge.textContent = `${filtered.length} รายการ`;

  container.innerHTML = filtered.map((item, i) => {
    const isChecked  = selectedCompareIds.includes(item.id);
    const costPerCup = ((item.price / 250) * 4).toFixed(1);
    const pouchCls   = POUCH_STYLE[item.bagStyle] || "pouch-cream";
    const delay      = (i % 4) + 1;
    const badge      = FEATURED_BADGES[item.id];
    // Higher contrast origin badge on light pouches
    const lightPouch = item.bagStyle === "white" || item.bagStyle === "silver" || item.bagStyle === "light-green" || item.bagStyle === "cream";
    const originBadgeBg = lightPouch ? "rgba(0,0,0,0.32)" : "rgba(0,0,0,0.20)";
    const originBadgeColor = lightPouch ? "#fff" : "inherit";

    return `
      <div class="tea-card sr sr-d${delay}">

        <!-- Coloured header strip -->
        <div class="${pouchCls} relative" style="padding:20px 20px 16px;border-bottom:1px solid;">
          ${badge ? `<span class="featured-badge ${badge.cls}">${badge.label}</span>` : ''}

          <!-- Origin badge top-left, kanji top-right -->
          <div class="flex items-start justify-between mb-4 ${badge ? 'mt-6' : ''}">
            <span class="text-[10px] font-bold px-2.5 py-1 rounded-full" style="background:${originBadgeBg};color:${originBadgeColor};letter-spacing:0.06em;">${item.origin.split(',')[0]}</span>
            <span class="text-[22px] font-bold opacity-80" style="font-family:serif;line-height:1;">${item.kanji}</span>
          </div>

          <!-- Product name large -->
          <h3 class="text-[20px] font-bold leading-tight mb-1" style="font-family:'Plus Jakarta Sans',sans-serif;letter-spacing:-0.01em;">${item.name}</h3>
          <p class="text-[11px] opacity-80 leading-snug line-clamp-2">${item.tagline}</p>

          <!-- Price row -->
          <div class="flex items-baseline justify-between mt-4">
            <div>
              <span class="text-[22px] font-bold" style="font-family:'Plus Jakarta Sans',sans-serif;">${item.price.toLocaleString()}</span>
              <span class="text-[11px] opacity-70 ml-1">฿ / 250g</span>
            </div>
            <div class="text-right opacity-80">
              <div class="text-[10px]">ต้นทุน / แก้ว (4g)</div>
              <div class="text-[13px] font-bold">~${costPerCup} ฿</div>
            </div>
          </div>
        </div>

        <!-- Body -->
        <div class="p-4 flex-1 flex flex-col justify-between bg-white">
          <div>
            <!-- Taste bars -->
            <div class="space-y-2 mb-4">
              ${renderBar("Umami", item.taste.umami, "#3d8535")}
              ${renderBar("Sweetness", item.taste.sweetness, "#c9a84c")}
              ${renderBar("Bitterness", item.taste.bitterness, "#7a7468")}
              ${renderBar("Aroma", item.taste.aroma, "#0e8080")}
              ${renderBar("Nutty", item.taste.nutty, "#7a5010")}
            </div>

            <!-- Usage tags -->
            <div class="flex flex-wrap gap-1.5 mb-4">
              ${item.usages.map(u => `
                <span class="text-[11px] font-semibold px-2.5 py-1 rounded-full" style="background:#f2ede3;color:#5a5040;border:1px solid #e5ddd0;">
                  ${u === 'Usucha' ? '🍵 Usucha' : u === 'Koicha' ? '✨ Koicha' : u === 'Latte' ? '🥛 Latte' : '🥐 Bakery'}
                </span>
              `).join('')}
            </div>
          </div>

          <!-- Action row -->
          <div class="flex gap-2 pt-3" style="border-top:1px solid #ede8df;">
            <button onclick="openProductModal('${item.id}')" class="btn-ghost flex-1 justify-center">
              <i data-lucide="info" class="w-3.5 h-3.5"></i> เจาะลึก
            </button>
            <label class="flex-1 cursor-pointer select-none">
              <input type="checkbox" class="sr-only" onchange="toggleCompare('${item.id}', this)" ${isChecked ? 'checked' : ''}>
              <div class="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-[12px] font-semibold transition-all ${isChecked ? 'text-white' : 'text-stone-600'}" style="${isChecked ? 'background:#1a3a16;border:1.5px solid #1a3a16;' : 'background:#fff;border:1.5px solid #e5e0d4;'}">
                <i data-lucide="${isChecked ? 'check-square' : 'git-compare'}" class="w-3.5 h-3.5"></i>
                ${isChecked ? 'เลือกแล้ว' : 'เทียบ'}
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

// ─── Filters & Sort ───────────────────────────────────────────
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

// ─── Compare logic ────────────────────────────────────────────
function toggleCompare(id, checkbox) {
  if (selectedCompareIds.includes(id)) {
    selectedCompareIds = selectedCompareIds.filter(x => x !== id);
  } else {
    if (selectedCompareIds.length >= 3) {
      alert("เลือกได้สูงสุด 3 รายการพร้อมกัน กรุณายกเลิกตัวเดิมก่อน");
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

function updateCompareDrawer() {
  const drawer = document.getElementById("compare-drawer");
  const count  = document.getElementById("compare-drawer-count");
  const names  = document.getElementById("compare-drawer-names");
  if (!drawer || !count) return;

  count.textContent = selectedCompareIds.length;

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
}

// ─── Comparison Table ─────────────────────────────────────────
function renderComparisonTool() {
  const container = document.getElementById("comparison-table-container");
  if (!container) return;

  if (selectedCompareIds.length < 2) {
    container.innerHTML = `
      <div class="text-center py-14 px-6 rounded-3xl" style="background:#fff;border:2px dashed #ddd8cc;">
        <div style="width:56px;height:56px;background:#f5f0e8;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 16px;">
          <i data-lucide="git-compare" style="width:24px;height:24px;color:#9a9a90;"></i>
        </div>
        <h4 class="font-bold text-[16px] mb-2" style="color:#3a3d38;">เลือกชา 2 รายการเพื่อเริ่มเปรียบเทียบ</h4>
        <p class="text-[13px] mb-6 mx-auto" style="color:#7a7468;max-width:360px;">กดปุ่ม "เทียบ" บนการ์ดสินค้าด้านบน หรือเลือกคู่แมทช์ยอดฮิตด้านล่าง</p>
        <div class="flex flex-wrap justify-center gap-2.5">
          <button onclick="selectCompareTeas('strong-nutty','yurane')" class="btn-primary text-[12px] py-2.5 px-4">
            🔥 Strong Nutty vs Yurane
          </button>
          <button onclick="selectCompareTeas('shouen','organic-black')" class="btn-secondary text-[12px] py-2.5 px-4">
            ✨ Shouen vs Organic Black
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
    { label: "✨ Umami (กลมกล่อม)",      key: "umami",      color: "#3d8535" },
    { label: "🍯 Sweetness (หวานธรรมชาติ)", key: "sweetness",  color: "#c9a84c" },
    { label: "🍃 Bitterness (ขมฝาด)",    key: "bitterness", color: "#7a7468" },
    { label: "🌸 Aroma (กลิ่นหอม)",      key: "aroma",      color: "#0e8080" },
    { label: "🥜 Nutty (โทนถั่วคั่ว)",   key: "nutty",      color: "#7a5010" },
  ];

  container.innerHTML = `
    <div class="bg-white rounded-3xl overflow-hidden" style="border:1px solid #e5e0d4;box-shadow:0 2px 24px rgba(0,0,0,0.05);">

      <!-- Header -->
      <div class="flex items-center justify-between flex-wrap gap-4 p-6" style="border-bottom:1px solid #e5e0d4;background:#fafaf8;">
        <div>
          <h3 class="font-bold text-[16px]" style="color:#1a3a16;font-family:'Plus Jakarta Sans',sans-serif;">เปรียบเทียบ ${items.length} รายการ</h3>
          <p class="text-[12px] mt-0.5" style="color:#7a7468;">โปรไฟล์รสชาติ · แหล่งปลูก · ความเหมาะสม</p>
        </div>
        <button onclick="selectedCompareIds=[];renderProducts();renderComparisonTool();updateCompareDrawer();" class="btn-ghost text-[12px]">
          <i data-lucide="x" class="w-3.5 h-3.5"></i> ล้างการเปรียบเทียบ
        </button>
      </div>

      <!-- Mobile scroll hint -->
      <div class="table-scroll-hint px-6 pb-1">
        <i data-lucide="move-horizontal" style="width:14px;height:14px;"></i>
        <span>กวาดซ้าย-ขวาเพื่อดูตารางเต็ม</span>
      </div>

      <div class="overflow-x-auto">
        <table class="cmp-table min-w-[560px]">
          <!-- Column headers -->
          <thead>
            <tr style="background:#fafaf8;border-bottom:2px solid #e5e0d4;">
              <th class="text-[11px] font-bold uppercase tracking-wider" style="color:#9a9a90;width:160px;">คุณสมบัติ</th>
              ${items.map(item => {
                const pCls = POUCH_STYLE[item.bagStyle] || "pouch-cream";
                return `
                  <th class="text-center">
                    <div class="${pCls} inline-block px-5 py-3 rounded-xl mb-2" style="border:1px solid rgba(0,0,0,0.08);">
                      <div class="text-[13px] opacity-70 mb-0.5" style="font-family:serif;">${item.kanji}</div>
                      <div class="text-[16px] font-bold" style="font-family:'Plus Jakarta Sans',sans-serif;">${item.name}</div>
                    </div>
                    <div class="text-[20px] font-bold" style="color:#1a3a16;">${item.price.toLocaleString()} ฿</div>
                    <div class="text-[11px]" style="color:#9a9a90;">250g · ~${((item.price/250)*4).toFixed(1)} ฿/แก้ว</div>
                  </th>
                `;
              }).join('')}
            </tr>
          </thead>
          <tbody>

            <!-- Origin -->
            <tr>
              <td class="text-[12px] font-semibold" style="color:#5a5a50;background:#fafaf8;">
                <i data-lucide="map-pin" class="w-3.5 h-3.5 inline mr-1" style="color:#3d8535;"></i> แหล่งกำเนิด
              </td>
              ${items.map(item => `
                <td class="text-center">
                  <span class="text-[11px] font-bold px-3 py-1 rounded-full text-white" style="background:#2d5a27;">${item.origin}</span>
                </td>
              `).join('')}
            </tr>

            <!-- Usages -->
            <tr>
              <td class="text-[12px] font-semibold" style="color:#5a5a50;background:#fafaf8;">
                <i data-lucide="coffee" class="w-3.5 h-3.5 inline mr-1" style="color:#3d8535;"></i> เมนูที่แนะนำ
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
                💡 ไกด์สำหรับเซลล์
              </td>
              ${items.map(item => `
                <td class="text-[12px] align-top" style="color:#5a5a50;line-height:1.6;">${item.recommendedFor}</td>
              `).join('')}
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
    if (gv) gv.textContent = `${grams.toFixed(1)} กรัม`;
    if (pv) pv.textContent = `${selling} บาท`;

    const body = document.getElementById("calc-table-body");
    if (!body) return;

    // Compute all data first for summary
    const rows = MATCHA_PRODUCTS.map(item => {
      const cups   = Math.floor(250 / grams);
      const cost   = parseFloat(((item.price / 250) * grams).toFixed(1));
      const profit = parseFloat((selling - cost).toFixed(1));
      const margin = parseFloat((profit / selling * 100).toFixed(0));
      return { item, cups, cost, profit, margin };
    });

    // Summary highlights
    const cheapest   = [...rows].sort((a,b) => a.cost - b.cost)[0];
    const bestMargin = [...rows].sort((a,b) => b.margin - a.margin)[0];
    const bestValue  = [...rows].sort((a,b) => (b.margin - b.cost*0.5) - (a.margin - a.cost*0.5))[0];

    const summaryEl = document.getElementById("calc-summary");
    if (summaryEl) {
      summaryEl.innerHTML = `
        <div class="calc-summary-grid">
          <div class="rounded-2xl p-4 text-center" style="background:#f0f8f0;border:1.5px solid #b8dec0;">
            <div class="text-[10px] font-bold uppercase tracking-wider mb-1" style="color:#3d8535;">💰 ต้นทุนถูกสุด</div>
            <div class="text-[16px] font-bold" style="color:#1a3a16;">${cheapest.item.name}</div>
            <div class="text-[20px] font-bold mt-1" style="color:#2d5a27;">${cheapest.cost} ฿/แก้ว</div>
            <div class="text-[11px] mt-1" style="color:#6b7068;">${cheapest.margin}% margin</div>
          </div>
          <div class="rounded-2xl p-4 text-center" style="background:#f8f5e8;border:1.5px solid #d4c080;">
            <div class="text-[10px] font-bold uppercase tracking-wider mb-1" style="color:#a07020;">📈 Margin ดีสุด</div>
            <div class="text-[16px] font-bold" style="color:#1a3a16;">${bestMargin.item.name}</div>
            <div class="text-[20px] font-bold mt-1" style="color:#a07020;">${bestMargin.margin}%</div>
            <div class="text-[11px] mt-1" style="color:#6b7068;">ต้นทุน ${bestMargin.cost} ฿</div>
          </div>
          <div class="rounded-2xl p-4 text-center" style="background:#f5f0fa;border:1.5px solid #c8b0d8;">
            <div class="text-[10px] font-bold uppercase tracking-wider mb-1" style="color:#6a40a0;">⭐ แนะนำ Best Pick</div>
            <div class="text-[16px] font-bold" style="color:#1a3a16;">Strong Nutty</div>
            <div class="text-[20px] font-bold mt-1" style="color:#6a40a0;">${rows.find(r=>r.item.id==='strong-nutty')?.margin || '—'}%</div>
            <div class="text-[11px] mt-1" style="color:#6b7068;">ขายดี + กำไรดี</div>
          </div>
        </div>
      `;
    }

    body.innerHTML = rows.map(({item, cups, cost, profit, margin}) => {
      const marginGood = margin >= 75;
      return `
        <tr>
          <td class="py-3 pr-4 font-bold" style="color:#1a3a16;">${item.name}</td>
          <td class="py-3 px-3 text-center text-[12px]" style="color:#6b7068;">${item.origin.split(',')[0]}</td>
          <td class="py-3 px-3 text-right font-bold" style="color:#3a3d38;">${item.price.toLocaleString()} ฿</td>
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
    id = quizAnswers.budget === "high" ? "organic-black" : "shouen";
  } else if (quizAnswers.usage === "bakery") {
    if (quizAnswers.budget === "low") id = "zenraku";
    else if (quizAnswers.flavor === "nutty") id = "strong-nutty";
    else id = "organic-green";
  } else {
    if (quizAnswers.flavor === "nutty")   id = quizAnswers.budget === "high" ? "yame-a" : "strong-nutty";
    else if (quizAnswers.flavor === "organic") id = "organic-green";
    else id = "yurane";
  }

  const tea = MATCHA_PRODUCTS.find(p => p.id === id) || MATCHA_PRODUCTS[0];
  const pCls = POUCH_STYLE[tea.bagStyle] || "pouch-cream";

  card.innerHTML = `
    <div class="rounded-2xl overflow-hidden" style="border:1px solid #e5e0d4;">
      <div class="${pCls} p-5 flex items-center gap-4">
        <div class="shrink-0 text-center">
          <div class="text-[28px] opacity-80" style="font-family:serif;line-height:1;">${tea.kanji}</div>
          <div class="text-[11px] font-bold mt-1">${tea.name}</div>
        </div>
        <div>
          <div class="text-[10px] font-bold tracking-widest uppercase opacity-70 mb-1">✦ แนะนำสำหรับคุณ</div>
          <div class="text-[18px] font-bold leading-tight" style="font-family:'Plus Jakarta Sans',sans-serif;">${tea.name}</div>
          <div class="text-[12px] opacity-80 mt-1 line-clamp-2">${tea.tagline}</div>
        </div>
        <div class="ml-auto text-right shrink-0">
          <div class="text-[22px] font-bold" style="font-family:'Plus Jakarta Sans',sans-serif;">${tea.price.toLocaleString()}</div>
          <div class="text-[10px] opacity-70">฿ / 250g</div>
        </div>
      </div>
      <div class="bg-white p-4 flex flex-wrap items-center justify-between gap-3" style="border-top:1px solid #e5e0d4;">
        <p class="text-[12px] leading-relaxed" style="color:#6b7068;flex:1;min-width:200px;">${tea.highlight}</p>
        <div class="flex items-center gap-2 shrink-0">
          <button onclick="resetMatchmaker()" class="quiz-reset-btn" title="รีเซ็ตตัวเลือกทั้งหมด">
            <i data-lucide="rotate-ccw" class="w-3.5 h-3.5"></i>
            <span>รีเซ็ตค่า</span>
          </button>
          <button onclick="openProductModal('${tea.id}')" class="btn-primary text-[12px] py-2 px-4">
            ดูสเปกเต็ม <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
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

  const costPerCup = ((item.price / 250) * 4).toFixed(1);
  const pCls = POUCH_STYLE[item.bagStyle] || "pouch-cream";

  content.innerHTML = `
    <!-- Gradient header -->
    <div class="${pCls} relative p-6" style="border-bottom:1px solid rgba(0,0,0,0.08);">
      <button onclick="closeModal('product-modal')" class="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center transition-colors" style="background:rgba(0,0,0,0.15);">
        <i data-lucide="x" class="w-4 h-4"></i>
      </button>
      <div class="text-[30px] opacity-70 mb-2" style="font-family:serif;line-height:1;">${item.kanji}</div>
      <h3 class="text-[22px] font-bold mb-1" style="font-family:'Plus Jakarta Sans',sans-serif;">${item.name}</h3>
      <p class="text-[12px] opacity-80">${item.tagline}</p>
    </div>

    <!-- Detail body -->
    <div class="p-6 space-y-5 bg-white">

      <!-- Price strip -->
      <div class="flex items-baseline justify-between pb-4" style="border-bottom:1px solid #ede8df;">
        <div>
          <span class="text-[30px] font-bold" style="color:#1a3a16;">${item.price.toLocaleString()}</span>
          <span class="text-[13px] ml-1" style="color:#7a7468;">฿ / 250g</span>
        </div>
        <div class="text-right">
          <div class="text-[11px]" style="color:#7a7468;">ต้นทุน / แก้ว (4g)</div>
          <div class="text-[16px] font-bold" style="color:#3d8535;">~${costPerCup} ฿</div>
        </div>
      </div>

      <!-- Description -->
      <div>
        <div class="text-[10px] font-bold tracking-wider uppercase mb-2" style="color:#9a9a90;">คำอธิบาย</div>
        <p class="text-[13px] leading-relaxed" style="color:#5a5a50;">${item.description}</p>
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
        <div class="text-[10px] font-bold tracking-wider uppercase mb-1.5" style="color:#3d8535;">💡 ไกด์สำหรับเซลล์</div>
        <p class="text-[12px] leading-relaxed" style="color:#2d5a27;">${item.recommendedFor}</p>
      </div>

      <!-- Buttons -->
      <div class="space-y-2 pt-2">
        <button onclick="copyProductSpec('${item.id}')" class="w-full py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 text-[12px] font-bold transition-all" style="background:#f2f8f0;border:1.5px solid #2d5a27;color:#2d5a27;">
          <i data-lucide="copy" class="w-3.5 h-3.5"></i> คัดลอกสรุปสเปกส่ง LINE
        </button>
        <div class="flex gap-2.5">
          <button onclick="toggleCompare('${item.id}'); closeModal('product-modal');" class="btn-secondary flex-1 justify-center text-[12px]">
            ${selectedCompareIds.includes(item.id) ? 'นำออกจากเปรียบเทียบ' : '+ เพิ่มในตารางเปรียบ'}
          </button>
          <button onclick="closeModal('product-modal'); openContactModal();" class="btn-primary flex-1 justify-center text-[12px]">
            สั่งซื้อ / ขอตัวอย่าง
          </button>
        </div>
      </div>
    </div>
  `;

  modal.classList.add("open");
  initLucide();

  // Animate taste bars immediately
  setTimeout(() => {
    content.querySelectorAll(".taste-bar-fill").forEach(bar => {
      const w = bar.getAttribute("data-width");
      if (w) bar.style.width = w;
    });
  }, 80);
}

function openFlyerModal() {
  document.getElementById("flyer-modal")?.classList.add("open");
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

// Close modals or drawer on ESC key
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
  const costPerCup = ((item.price / 250) * 4).toFixed(1);

  const text = `🍵 MATCHA TIMES — ${item.name} (${item.kanji})
📍 แหล่งกำเนิด: ${item.origin}
💰 ราคา: ${item.price.toLocaleString()} บาท / 250g (ต้นทุน ~${costPerCup} ฿/แก้ว ที่ 4g)
✨ รสสัมผัส: อูมามิ ${item.taste.umami}/5 | หวาน ${item.taste.sweetness}/5 | ถั่วคั่ว ${item.taste.nutty}/5 | กลิ่นหอม ${item.taste.aroma}/5 | ขมฝาด ${item.taste.bitterness}/5
🥛 เหมาะสำหรับ: ${item.usages.join(', ')}
💡 จุดเด่นสำหรับร้าน: ${item.recommendedFor}
🌐 MATCHA TIMES Thailand | LINE: @matchatimes.thailand`;

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


