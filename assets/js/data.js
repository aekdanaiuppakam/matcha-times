// MATCHA TIMES Product, Heritage, and Bilingual Database — 2026 Edition

const MATCHA_PRODUCTS = [
  // ─── CEREMONIA COLLECTION (5 Stars) ───────────────────────────
  {
    id: "shoen",
    name: "SHOEN",
    kanji: "松苑",
    origin: "Nishio, Japan",
    region: "nishio",
    collection: "ceremonia",
    gradeLevel: 1, // Top Ceremonial
    tier: "S",
    tierRank: 3,
    badge: { th: "✨ เกรดพิธีการ", en: "✨ Ceremonial Grade", cls: "badge-ceremonial" },
    prices: { kg: 5940, g250: 1490, g100: 640 },
    price: 1490,
    weight: "250g",
    weightGrams: 250,
    bagStyle: "gold",
    taste: { umami: 5, sweetness: 3, bitterness: 1, aroma: 4, nutty: 2 },
    usages: ["Latte", "Usucha", "Koicha"],
    tagline: {
      th: "มัทฉะเกรดพิธีการสูงสุด อูมามิเด่นชัด สีเขียวมรกต ไร้ความฝาดขมบาดคอ",
      en: "Highest ceremonial grade matcha: intense umami, vibrant emerald green, zero harsh bitterness."
    },
    description: {
      th: "SHOEN (松苑) ผ่านการคัดสรรยอดใบชาอ่อนแรกของฤดู (First Harvest) จากนิชิโอะ ให้สีเขียวมรกตสดใส รสสัมผัสนุ่มลึก อูมามิเด่นชัดเต็ม 5/5 ไร้ความฝาดขมบาดคอ สามารถชงแบบพิธีการใส่น้ำร้อน Usucha หรือ Koicha ได้อย่างสมบูรณ์แบบ และทำลาเต้พรีเมียมแก้วซิกเนเจอร์ที่ยกระดับร้านคาเฟ่",
      en: "SHOEN (松苑) is crafted from first-flush spring leaves in Nishio. It exhibits a luminous emerald green hue, profound velvet body, and max 5/5 umami with virtually zero bitterness. Ideal for traditional Usucha or Koicha ceremonies, as well as ultra-premium signature cafe lattes."
    },
    recommendedFor: {
      th: "ร้านที่ต้องการมัทฉะเกรดพิธีการตัวท็อป ชงเพียวใส Usucha ได้สง่างาม และทำลาเต้พรีเมียมราคาสูง",
      en: "Specialty tea bars & luxury cafes looking for pure Usucha excellence and high-ticket premium lattes."
    },
    highlight: {
      th: "Umami 5/5 • ขมฝาดเพียง 1/5 • ชง Usucha & Koicha ได้ยอดเยี่ยม",
      en: "Umami 5/5 • Bitterness only 1/5 • Exceptional for Usucha & Koicha"
    }
  },
  {
    id: "strong-nutty",
    name: "STRONG NUTTY",
    kanji: "八女芳香",
    origin: "Yame, Japan",
    region: "yame",
    collection: "ceremonia",
    gradeLevel: 1, // Ceremonial
    tier: "S",
    tierRank: 1, // Best seller #1
    badge: { th: "🔥 ขายดีอันดับ 1", en: "🔥 #1 Best Seller", cls: "badge-bestseller" },
    prices: { kg: 5000, g250: 1350, g100: 580 },
    price: 1350,
    weight: "250g",
    weightGrams: 250,
    bagStyle: "amber",
    taste: { umami: 4, sweetness: 3, bitterness: 2, aroma: 4, nutty: 5 },
    usages: ["Latte", "Usucha", "Koicha"],
    tagline: {
      th: "มัทฉะสายถั่วคั่วขวัญใจอันดับ 1 นัตตี้แน่น 5/5 เข้ากับนมสดและโอ๊ตมิลค์อย่างไร้ที่ติ",
      en: "#1 Best seller roasted nutty matcha with 5/5 nut notes, harmonizing perfectly with dairy & oat milk."
    },
    description: {
      th: "STRONG NUTTY มัทฉะเกรดพิธีการจากเมืองยาเมะ จังหวัดฟุกุโอกะ โดดเด่นด้วยเอกลักษณ์โทนถั่วคั่วเข้มข้นที่สุด (Nutty 5/5) เมื่อนำมาตีกับนมสดหรือ Oat Milk รสชาจะหวานนวล อบอวลด้วยกลิ่นถั่วคั่วฟุ้งชัดเจนโดยไม่ต้องใส่ไซรัปเพิ่ม เป็นเมนูทำเงินที่ลูกค้าสั่งซ้ำสูงสุดของร้าน",
      en: "STRONG NUTTY from Yame, Fukuoka delivers the ultimate roasted nutty experience (Nutty 5/5). Blends gorgeously with fresh milk or oat milk, yielding a naturally sweet, aromatic profile that makes it the highest customer re-order item for cafes."
    },
    recommendedFor: {
      th: "ร้านคาเฟ่ที่ต้องการมัทฉะ 'สายนัตตี้' ยอดนิยม ดื่มง่าย เข้ากับนมวัวและนมพืช ทำยอดขายได้สูงที่สุด",
      en: "Cafes seeking the ultimate nutty matcha favorite: universally loved, sublime with dairy and oat milk."
    },
    highlight: {
      th: "Nutty 5/5 • Best Seller ตลอดกาล • อร่อยเด่นทั้งนมวัวและ Oat Milk",
      en: "Nutty 5/5 • All-time Best Seller • Outstanding with both Dairy & Oat Milk"
    }
  },

  // ─── YAME COLLECTION (NEW) ───────────────────────────────────
  {
    id: "yame-b",
    name: "YAME B",
    kanji: "八女極",
    origin: "Yame, Japan",
    region: "yame",
    collection: "yame",
    gradeLevel: 2, // Ultra-premium Specialty
    tier: "A",
    tierRank: 4,
    badge: { th: "👑 ท็อปอูมามิ 5/5", en: "👑 Top Umami 5/5", cls: "badge-flagship" },
    prices: { kg: 8000, g250: 2740, g100: 1180 },
    price: 2740,
    weight: "250g",
    weightGrams: 250,
    bagStyle: "purple",
    taste: { umami: 5, sweetness: 4, bitterness: 1, aroma: 5, nutty: 4 },
    usages: ["Latte", "Smoothie", "Bakery", "Foodservice"],
    tagline: {
      th: "มัทฉะระดับอัลตร้าพรีเมียมจากยาเมะ อูมามิ 5/5 กลิ่นหอมฟุ้ง 5/5 นุ่มละมุนที่สุด",
      en: "Ultra-premium Yame single origin: 5/5 umami, 5/5 lingering floral aroma, sublime softness."
    },
    description: {
      th: "YAME B คือที่สุดแห่งงานฝีมือชาวสวนชายาเมะ ให้คะแนน Umami 5/5 และ Aroma 5/5 ในขณะที่ Bitterness ต่ำเพียง 1/5 มอบรสสัมผัสที่ซับซ้อน ลึกซึ้ง หวานธรรมชาติยาวนานในลำคอ เหมาะสำหรับตั้งเป็นแก้ว Signature ระดับ Masterpiece",
      en: "YAME B represents the pinnacle of Yame terroir craftsmanship. Boasting 5/5 Umami and 5/5 Aroma with only 1/5 Bitterness, it delivers an intensely layered, lingering natural sweetness worthy of a master-grade cafe signature."
    },
    recommendedFor: {
      th: "Specialty Cafe หรือ Omakase Tea Bar ที่ต้องการมัทฉะเกรดสูงสุดสำหรับเสิร์ฟแก้วพิเศษราคาสูง",
      en: "Specialty tea bars & omakase tea lounges crafting flagship drinks at luxury price points."
    },
    highlight: {
      th: "Umami 5/5 • Aroma 5/5 • ขมเพียง 1/5 • รสสัมผัสระดับ Masterpiece",
      en: "Umami 5/5 • Aroma 5/5 • Bitterness 1/5 • Masterpiece sensory experience"
    }
  },
  {
    id: "ei",
    name: "EI",
    kanji: "栄",
    origin: "Yame, Japan",
    region: "yame",
    collection: "yame",
    gradeLevel: 2,
    tier: "B",
    tierRank: 9,
    badge: { th: "✨ หอมอวลกลมกล่อม", en: "✨ Smooth & Aromatic", cls: "badge-staffpick" },
    prices: { kg: 7070, g250: 1910, g100: 820 },
    price: 1910,
    weight: "250g",
    weightGrams: 250,
    bagStyle: "charcoal",
    taste: { umami: 4, sweetness: 3, bitterness: 2, aroma: 4, nutty: 3 },
    usages: ["Latte", "Smoothie", "Bakery", "Foodservice"],
    tagline: {
      th: "เอกลักษณ์เฉพาะตัวจากยาเมะ บอดี้ชาละมุน หอมอวล เหมาะกับเครื่องดื่มระดับพรีเมียม",
      en: "Distinct regional Yame profile with smooth, aromatic, and well-rounded body."
    },
    description: {
      th: "EI (栄) นำเสนอคาแรกเตอร์ชาเขียวชั้นเลิศจากหุบเขายาเมะ มีความสมดุลระหว่างความอูมามิและกลิ่นหอมเฉพาะตัว บอดี้ชาละมุนไม่ฝาดติดคอ ผสมเครื่องดื่มเย็นหรือปั่นได้รสชาติที่นิ่งและมีระดับ",
      en: "EI (栄) embodies the refined character of Yame mountain tea gardens. Harmonious balance between savory umami and delicate floral fragrance, rendering smooth lattes and premium blended drinks."
    },
    recommendedFor: {
      th: "ร้านเครื่องดื่มพรีเมียมที่ต้องการมัทฉะสายพันธุ์เดี่ยวจากยาเมะที่รสชาตินุ่มละมุนและมีเอกลักษณ์ชัดเจน",
      en: "Premium drink concepts demanding single-origin Yame quality with a gentle, sophisticated cup."
    },
    highlight: {
      th: "Distinct Yame Terroir • บอดี้ชาละมุน • ขมต่ำเพียง 2/5",
      en: "Distinct Yame Terroir • Velvety Body • Low Bitterness (2/5)"
    }
  },
  {
    id: "yame-a",
    name: "YAME A",
    kanji: "八女雅",
    origin: "Yame, Japan",
    region: "yame",
    collection: "yame",
    gradeLevel: 2,
    tier: "A",
    tierRank: 5,
    badge: { th: "🥜 พรีเมียมนัตตี้", en: "🥜 Premium Nutty", cls: "badge-staffpick" },
    prices: { kg: 5610, g250: 1600, g100: 690 },
    price: 1600,
    weight: "250g",
    weightGrams: 250,
    bagStyle: "silver",
    taste: { umami: 4, sweetness: 3, bitterness: 2, aroma: 4, nutty: 4 },
    usages: ["Latte", "Smoothie", "Bakery", "Foodservice"],
    tagline: {
      th: "มัทฉะยาเมะสายหอมนัตตี้บาลานซ์ ความกลมกล่อมลงตัว ยกระดับเมนูซิกเนเจอร์",
      en: "Balanced nutty Yame matcha with rich aroma, elevated for cafe signature menus."
    },
    description: {
      th: "YAME A ถ่ายทอดความสมดุลระหว่างกลิ่นถั่วคั่วนวล (Nutty 4/5) และความอูมามิ (4/5) ผสานกลิ่นหอมใบชากรุ่นที่ติดจมูกนาน เหมาะมากสำหรับคาเฟ่ที่ต้องการมัทฉะโทนนัตตี้ระดับพรีเมียมที่รสชาติมีมิติซับซ้อน",
      en: "YAME A harmonizes creamy roasted nuttiness (Nutty 4/5) with deep umami (4/5) and a lingering roasted finish. An ideal pick for cafes curating high-profile nutty specialty lattes."
    },
    recommendedFor: {
      th: "ร้านคาเฟ่ที่ต้องการมัทฉะโทนนัตตี้ระดับพรีเมียม กลิ่นหอมซับซ้อน ยกระดับราคาขายต่อแก้วได้ดี",
      en: "Cafes looking to offer an elevated nutty profile with multi-layered aroma and higher margins."
    },
    highlight: {
      th: "Nutty 4/5 • Umami 4/5 • มิตินัตตี้พรีเมียมซับซ้อน",
      en: "Nutty 4/5 • Umami 4/5 • Complex nutty aroma & smooth finish"
    }
  },

  // ─── SIGNATURE COLLECTION (4 Stars) ───────────────────────────
  {
    id: "yurane",
    name: "YURANE",
    kanji: "ゆらね",
    origin: "Nishio, Japan",
    region: "nishio",
    collection: "signature",
    gradeLevel: 3,
    tier: "S",
    tierRank: 2,
    badge: { th: "⭐ ยอดนิยมทำลาเต้", en: "⭐ #1 Latte Pick", cls: "badge-staffpick" },
    prices: { kg: 4170, g250: 1130, g100: 490 },
    price: 1130,
    weight: "250g",
    weightGrams: 250,
    bagStyle: "dgreen",
    taste: { umami: 4, sweetness: 3, bitterness: 2, aroma: 4, nutty: 3 },
    usages: ["Latte", "Smoothie", "Bakery", "Foodservice"],
    tagline: {
      th: "มัทฉะบาลานซ์ยอดนิยมอันดับ 1 สำหรับลาเต้ บอดี้เนียนนุ่ม ขวัญใจบาริสต้าหน้าร้าน",
      en: "#1 Balanced all-rounder for lattes: velvety texture, full umami, barista's top daily choice."
    },
    description: {
      th: "YURANE (ゆらね) คือตัวเลือก House Blend ที่บาริสต้าไว้วางใจที่สุด ด้วยสัดส่วนอูมามิ 4/5 และอโรมา 4/5 ที่ลงตัวพอดี ชงกับนมสดแล้วได้สีเขียวสวย กลิ่นชาพุ่งชัดเจน บอดี้เนียนนุ่ม ไม่โดนนมกลบ ดื่มง่ายถูกใจลูกค้าทุกกลุ่ม",
      en: "YURANE (ゆらね) is our most trusted House Blend for cafe lattes. Balanced 4/5 umami and 4/5 aroma slice through fresh milk, delivering a vibrant green presentation and smooth, memorable mouthfeel."
    },
    recommendedFor: {
      th: "ร้านคาเฟ่ที่ต้องการมัทฉะตัวยืนพื้น (House Blend Standard) สำหรับทำเมนู Matcha Latte ให้ลูกค้าติดใจ",
      en: "Cafes seeking the perfect house-standard matcha latte with reliable daily consistency."
    },
    highlight: {
      th: "Perfect Latte Balance • อูมามิ 4/5 • สีเขียวสดเนียนตา",
      en: "Perfect Latte Balance • Umami 4/5 • Vibrant green hue"
    }
  },
  {
    id: "organic-signature",
    name: "ORGANIC (Signature)",
    kanji: "有機宇治",
    origin: "Uji, Japan",
    region: "uji",
    collection: "signature",
    gradeLevel: 3,
    tier: "A",
    tierRank: 6,
    badge: { th: "🌿 ออร์แกนิกอุจิ", en: "🌿 Organic Uji", cls: "badge-organic" },
    prices: { kg: 4160, g250: 920, g100: 400 },
    price: 920,
    weight: "250g",
    weightGrams: 250,
    bagStyle: "olive",
    taste: { umami: 4, sweetness: 3, bitterness: 2, aroma: 4, nutty: 2 },
    usages: ["Latte", "Smoothie", "Bakery", "Foodservice"],
    tagline: {
      th: "มัทฉะออร์แกนิกพรีเมียมจากอุจิ กลิ่นหอมฟลอรัล สำหรับคาเฟ่สายสุขภาพและพรีเมียม",
      en: "Premium organic Uji matcha with delicate floral notes, ideal for organic & specialty cafes."
    },
    description: {
      th: "ORGANIC (Signature) ปลูกในสวนชาอินทรีย์ที่ได้รับรองมาตรฐานในอุจิ เกียวโต ให้ความหวานละมุนตามธรรมชาติ อูมามิ 4/5 กลิ่นหอมคลีนบริสุทธิ์ ชงลาเต้สุขภาพหรือสมูทตี้ได้ยอดเยี่ยมในราคาเพียง 920 บาท/250g",
      en: "Cultivated in certified organic soil in Uji, Kyoto. Offers natural mellow sweetness, 4/5 umami, and pristine floral tea essence for health-conscious menus at an accessible 920 THB/250g."
    },
    recommendedFor: {
      th: "คาเฟ่สาย Healthy, โรงแรม หรือร้านมัทฉะที่ต้องการชูวัตถุดิบ Organic 100% จากอุจิ",
      en: "Healthy lifestyle cafes, boutique hotels, and concepts spotlighting 100% certified organic Uji tea."
    },
    highlight: {
      th: "100% Certified Organic • อุจิแท้ • คุ้มค่าในเกรดซิกเนเจอร์",
      en: "100% Certified Organic • Genuine Uji • Superb value in signature grade"
    }
  },

  // ─── CLASSIC COLLECTION (3 Stars) ─────────────────────────────
  {
    id: "organic-classic",
    name: "ORGANIC (Classic)",
    kanji: "有機日常",
    origin: "Uji, Japan",
    region: "uji",
    collection: "classic",
    gradeLevel: 4,
    tier: "B",
    tierRank: 10,
    badge: { th: "🌱 ออร์แกนิกคุ้มค่า", en: "🌱 Organic Value", cls: "badge-organic" },
    prices: { kg: 3100, g250: 1070, g100: 460 },
    price: 1070,
    weight: "250g",
    weightGrams: 250,
    bagStyle: "lgreen",
    taste: { umami: 3, sweetness: 2, bitterness: 3, aroma: 3, nutty: 2 },
    usages: ["Latte", "Smoothie", "Bakery", "Foodservice"],
    tagline: {
      th: "มัทฉะออร์แกนิกอุจิรุ่นคลาสสิก บอดี้เข้มตัดนมและเบเกอรี่ ชูความเป็นออร์แกนิกได้เต็มที่",
      en: "Everyday organic Uji matcha with assertive body to pierce milk and pastry applications."
    },
    description: {
      th: "ORGANIC (Classic) ออกแบบมาสำหรับการใช้งานเชิงพาณิชย์ที่ต้องการวัตถุดิบออร์แกนิกแท้ มีบอดี้ชาชัดเจนและความฝาดเล็กน้อย (3/5) ทำให้กลิ่นชาไม่จมเมื่อนำไปผสมกับนม นมพืช หรือทำไอศกรีมและเบเกอรี่",
      en: "Engineered for versatile foodservice needs demanding certified organic matcha. Features solid body and subtle astringency (3/5), ensuring authentic tea character shines in smoothies, gelatos, and bakery."
    },
    recommendedFor: {
      th: "ร้านเบเกอรี่ ร้านไอศกรีม หรือคาเฟ่ที่ต้องการใช้มัทฉะออร์แกนิกทำเมนูผสมปริมาณมาก",
      en: "Bakeries, dessert shops, and cafes needing certified organic matcha for daily batch production."
    },
    highlight: {
      th: "Certified Organic • บอดี้ชาชัด • เหมาะกับเครื่องดื่มปั่นและขนม",
      en: "Certified Organic • Robust Body • Ideal for Blended Drinks & Pastry"
    }
  },
  {
    id: "oikawa",
    name: "OIKAWA",
    kanji: "おいかわ",
    origin: "Shizuoka, Japan",
    region: "shizuoka",
    collection: "classic",
    gradeLevel: 4,
    tier: "B",
    tierRank: 8,
    badge: { th: "🍃 สดชื่นคลีนรอบด้าน", en: "🍃 Fresh & Crisp", cls: "badge-value" },
    prices: { kg: 3180, g250: 860, g100: 370 },
    price: 860,
    weight: "250g",
    weightGrams: 250,
    bagStyle: "teal",
    taste: { umami: 3, sweetness: 3, bitterness: 3, aroma: 3, nutty: 2 },
    usages: ["Latte", "Smoothie", "Bakery", "Foodservice"],
    tagline: {
      th: "รสชาเขียวสดชื่น คลีน ดื่มง่าย ผลผลิตจากชิซูโอกะ เหมาะกับเมนูผลไม้และโซดา",
      en: "Crisp, refreshing Shizuoka green tea tone, exceptional for fruit mocktails, sodas, and pastries."
    },
    description: {
      th: "OIKAWA (おいかわ) ถือกำเนิดจากสวนชา Hamachaen จังหวัดชิซูโอกะ โดดเด่นด้วยโทนใบชาเขียวสดชื่นแบบธรรมชาติ รสชาติสะอาด บาลานซ์สม่ำเสมอ เข้ากันได้ดีเลิศกับเมนูมัทฉะผลไม้ (เช่น Strawberry Matcha, Yuzu Matcha Soda) และขนมหวาน",
      en: "OIKAWA (おいかわ) originates from Hamachaen tea gardens in Shizuoka. Characterized by clean vegetal brightness and balanced crispness, making it a star performer in fruit fusions (e.g. Yuzu Matcha, Strawberry Latte)."
    },
    recommendedFor: {
      th: "ร้านที่เน้นเมนูฟิวชัน ผลไม้ โซดา และเมนูขนมเบเกอรี่ที่ต้องการกลิ่นชาสดชื่นในราคาคุ้มค่า",
      en: "Cafes specializing in fruit tea layers, refreshing spritzers, and refreshing chilled beverages."
    },
    highlight: {
      th: "Fresh Shizuoka Character • เหมาะกับผลไม้และโซดา • ต้นทุนสบายกระเป๋า",
      en: "Fresh Shizuoka Character • Great with Fruit & Soda • Budget friendly"
    }
  },
  {
    id: "zenraku",
    name: "ZENRAKU",
    kanji: "善楽",
    origin: "Nishio, Japan",
    region: "nishio",
    collection: "classic",
    gradeLevel: 4,
    tier: "B",
    tierRank: 7,
    badge: { th: "💰 กำไรสูงสุด / แก้ว", en: "💰 Highest Profit Margin", cls: "badge-value" },
    prices: { kg: 2970, g250: 800, g100: 350 },
    price: 800,
    weight: "250g",
    weightGrams: 250,
    bagStyle: "cream",
    taste: { umami: 3, sweetness: 2, bitterness: 3, aroma: 3, nutty: 2 },
    usages: ["Latte", "Smoothie", "Bakery", "Foodservice"],
    tagline: {
      th: "ความคุ้มค่าสูงสุดสำหรับร้านคาเฟ่ ต้นทุนต่อแก้วประหยัดที่สุด สีเขียวสด กลิ่นชัด",
      en: "Unbeatable cafe cost-efficiency: lowest cost per cup, bright green color, steady high profit margin."
    },
    description: {
      th: "ZENRAKU (善楽) คือราชาแห่งความคุ้มค่า ตัวเลือกอันดับ 1 สำหรับบริหารต้นทุนของร้านคาเฟ่และร้านเบเกอรี่ ชง 1 แก้ว (4g) ตกต้นทุนผงชาเพียง ~12.8 บาท! ให้สีเขียวสวยและกลิ่นชาชัดเจน ทำกำไรต่อแก้วสูงถึง 80%+",
      en: "ZENRAKU (善楽) is our champion of cafe margins. At 4g per serving, tea powder cost is only ~12.8 THB! Gives deep green visual appeal and assertive tea notes, ensuring 80%+ profit margins for high-volume sales."
    },
    recommendedFor: {
      th: "ร้านที่ต้องการมัทฉะทำโปรโมชั่น แก้วละ 65-85 ฿ หรือร้านที่ทำขนม เบเกอรี่ ไอศกรีมปริมาณมาก",
      en: "High-volume cafes running attractive entry price points (65-85 THB) or bakery batch operations."
    },
    highlight: {
      th: "ต้นทุนเพียง ~12.8 ฿/แก้ว • Margin สูงสุด • สีเขียวสดชัด",
      en: "Cost only ~12.8 THB/cup • Highest Profit Margin • Bright green"
    }
  }
];

const TIER_LIST = [
  {
    tier: "S",
    tierTitle: { th: "👑 TIER S — All-Star Best Sellers (ขายดีอันดับ 1 & ซิกเนเจอร์)", en: "👑 TIER S — All-Star Best Sellers & Flagships" },
    desc: { th: "กลุ่มสินค้าขายดีที่สุด ลูกค้าสั่งซ้ำสูงสุด และเกรดพิธีการตัวท็อปที่ทุกร้านต้องมี", en: "Highest customer re-orders, top ceremonial grade, and essential cafe stars." },
    badgeCls: "tier-badge-s",
    itemIds: ["strong-nutty", "yurane", "shoen"]
  },
  {
    tier: "A",
    tierTitle: { th: "💎 TIER A — Specialty & High-Margin (พรีเมียม & อัตรากำไรสูง)", en: "💎 TIER A — Specialty & High-Margin Icons" },
    desc: { th: "สายพันธุ์เฉพาะทางจากยาเมะและออร์แกนิกอุจิ สำหรับเมนู Signature พรีเมียม", en: "Single-origin Yame craftsmanship and certified organic Uji for premium high-ticket drinks." },
    badgeCls: "tier-badge-a",
    itemIds: ["yame-b", "yame-a", "organic-signature"]
  },
  {
    tier: "B",
    tierTitle: { th: "💰 TIER B — High-Volume Daily & Maximum Value (คุ้มค่า & กำไรสูงสุด)", en: "💰 TIER B — High-Volume Daily & Value Heroes" },
    desc: { th: "กลุ่มคุมต้นทุนยอดเยี่ยม ประหยัดต่อแก้ว เหมาะสำหรับขายดีจำนวนมากและเบเกอรี่", en: "Optimal cost-per-cup control, dependable consistency, perfect for daily service & bakery." },
    badgeCls: "tier-badge-b",
    itemIds: ["zenraku", "oikawa", "ei", "organic-classic"]
  }
];

const I18N_TEXTS = {
  th: {
    // Navigation
    nav_brand: "ประวัติแบรนด์",
    nav_tier: "อันดับ Best Seller",
    nav_matchmaker: "ช่วยเลือกชา",
    nav_catalog: "สินค้า 10 ชนิด",
    nav_compare: "เปรียบเทียบ",
    nav_calculator: "คำนวณต้นทุน",
    nav_recipes: "สูตรชงคาเฟ่",
    nav_terroirs: "4 แหล่งปลูก",
    nav_faq: "FAQ & เก็บรักษา",
    nav_flyer: "ใบราคาต้นฉบับ",
    nav_contact: "ติดต่อฝ่ายขาย",

    // Hero
    hero_badge: "🍃 WHOLESALE PRICE LIST | 2026 MATCHA COLLECTION",
    hero_title_1: "มัทฉะแท้ 100% จากญี่ปุ่น",
    hero_title_2: "เครื่องมือช่วยขาย & คู่มือสินค้าสำหรับร้านคาเฟ่",
    hero_desc: "คัดสรรสุดยอดมัทฉะเกรดพิธีการสู่เชิงพาณิชย์ ส่งตรงจากนิชิโอะ อุจิ ยาเมะ และชิซูโอกะ ออกแบบให้ร้านกาแฟคำนวณต้นทุนง่าย คุมกำไรได้สูงสุด และเลือกสเปกได้ตรงใจ",
    hero_scroll_hint: "เลื่อนลงเพื่อสำรวจอันดับ Best Seller และสินค้า 10 ชนิด",
    hero_cta_catalog: "สำรวจสินค้า 10 ชนิด",
    hero_cta_calc: "คำนวณกำไรต่อแก้ว",
    stat_skus: "10 สายพันธุ์คัดสรร",
    stat_skus_sub: "เกรดพิธีการสู่คอมเมอร์เชียล",
    stat_regions: "4 แหล่งปลูกชั้นนำ",
    stat_regions_sub: "Nishio, Uji, Yame, Shizuoka",
    stat_direct: "100% Direct Import",
    stat_direct_sub: "นำเข้าตรง โม่หินแท้ FOB Japan",
    stat_margin: "กำไรสูงถึง 80%+",
    stat_margin_sub: "ต้นทุนเริ่มต้นเพียง ~12.8 ฿/แก้ว",

    // Brand Story
    story_badge: "伝統と現代の調和 • Heritage & Philosophy",
    story_heading: "เรื่องราวของ MATCHA TIMES",
    story_subheading: "จากสวนชาเก่าแก่กว่า 150 ปีในประเทศญี่ปุ่น สู่แนวคิดที่ต้องการเปลี่ยนให้<br><em>&ldquo;มัทฉะแท้คุณภาพสูง&rdquo;</em> เป็นสิ่งที่ทุกคนเข้าถึงได้ด้วยความสุขทุกวัน",
    story_c1_era: "① 1865 · ยุคเอโดะ",
    story_c1_title: "Hamachaen (はま茶園)",
    story_c1_sub: "สวนชาประวัติศาสตร์ 150+ ปี ณ จังหวัดชิซูโอกะ",
    story_c1_desc: "ความไว้วางใจเริ่มต้นที่สวนชา Hamachaen ผู้สืบทอดเทคนิคการปลูกชาแบบพรางแสง (Shade-grown) และโม่หินช้าๆ กว่า 150 ปี เพื่อรักษาคลอโรฟิลล์และอูมามิไว้ในผงชาอย่างบริสุทธิ์ที่สุด",
    story_c1_tag: "伝統の石臼挽き — โม่หินแบบดั้งเดิม",
    story_c2_era: "② Tokyo, Japan",
    story_c2_title: "MATCHA TIMES Co., Ltd.",
    story_c2_sub: "มัทฉะคาเฟ่ยุคใหม่ — Asakusa & Harajuku",
    story_c2_desc: "ทีมผู้เชี่ยวชาญในโตเกียวก่อตั้งแบรนด์เพื่อเปลี่ยนความเคร่งขรึมของพิธีชงชาให้กลายเป็น Accessible Luxury ที่สนุกและทันสมัย ผ่านเมนูมัทฉะฟิวชันและขนม Panda Yaki อันโด่งดัง",
    story_c2_tag: "日常をちょっと楽しく — สุขได้ทุกวัน",
    story_c3_era: "③ Bangkok, Thailand",
    story_c3_title: "สู่ใจกลางกรุงเทพฯ",
    story_c3_sub: "สีลม • อโศก (Interchange 21) • พระโขนง",
    story_c3_desc: "ส่งตรงผงมัทฉะแท้สู่ประเทศไทย เพื่อให้คาเฟ่และผู้บริโภคชาวไทยได้สัมผัสรสชาติต้นตำรับ พร้อมเมนูซิกเนเจอร์ยอดฮิตอย่าง Panda Yaki และมัทฉะผลไม้หลากชนิด",
    story_c3_tag: "本物の日本茶 — ชาญี่ปุ่นแท้ 100%",
    story_pillars_badge: "CORE VALUES",
    story_pillars_heading: "3 ค่านิยมหลักที่ MATCHA TIMES ยึดมั่น",
    pillar_1_title: "Authenticity",
    pillar_1_desc: "วัตถุดิบมัทฉะแท้ 100% จากสวนในญี่ปุ่น ไม่ผสมแป้ง ไม่แต่งสีสังเคราะห์ ได้สารต้านอนุมูลอิสระและ L-Theanine สูงสุด",
    pillar_2_title: "Accessibility",
    pillar_2_desc: "ตั้งราคาจริงใจและคุ้มค่า ผู้ประกอบการร้านกาแฟมีกำไรมั่นคง ลูกค้าดื่มชาคุณภาพดีในทุกวันได้โดยไม่เป็นภาระ",
    pillar_3_title: "Everyday Joy",
    pillar_3_desc: "มัทฉะคือ Calm Focus ให้พลังงานสะอาด ไม่ใจสั่น สร้างความผ่อนคลายและรอยยิ้มในชีวิตประจำวัน",

    // Matchmaker Quiz
    quiz_badge: "✦ Matcha Matchmaker ✦",
    quiz_heading: "ค้นหามัทฉะที่ตรงใจใน 3 คลิก",
    quiz_subheading: "ให้ระบบช่วยคัดกรองมัทฉะที่เหมาะที่สุดสำหรับการใช้งานและรสชาติที่คุณต้องการ",
    quiz_q1_title: "1. นำไปทำเมนูอะไรหลัก?",
    quiz_q1_o1: "🥛 มัทฉะลาเต้ (ใส่นม)",
    quiz_q1_o2: "🍵 ชงใสเพียวๆ (Usucha / Koicha)",
    quiz_q1_o3: "🥐 เบเกอรี่ / ปั่น / ไอศกรีม",
    quiz_q2_title: "2. โทนรสชาติที่ชอบ?",
    quiz_q2_o1: "🥜 หอมถั่วคั่วชัด (Nutty)",
    quiz_q2_o2: "⚖️ บาลานซ์ กลมกล่อมนุ่มนวล",
    quiz_q2_o3: "🌿 ออร์แกนิกแท้ คลีนๆ",
    quiz_q3_title: "3. งบต่อถุง 250g?",
    quiz_q3_o1: "⭐ มาตรฐาน (900–1,200 ฿)",
    quiz_q3_o2: "👑 พรีเมียมท็อปเทียร์ (1,400+ ฿)",
    quiz_q3_o3: "💰 คุมต้นทุนสุดคุ้ม (< 850 ฿)",
    quiz_result_tag: "✦ แนะนำสำหรับคุณ",
    quiz_btn_reset: "รีเซ็ตค่า",
    quiz_btn_view: "ดูสเปกเต็ม",

    // Tier List
    tier_badge: "B2B Cafe Selection Guide",
    tier_heading: "อันดับ Best Seller & แนะนำสำหรับร้านคาเฟ่",
    tier_subheading: "จัดลำดับตามความนิยม ยอดขายหน้าร้าน และความคุ้มค่าในการบริหารต้นทุน เพื่อช่วยให้เลือกชาได้แม่นยำที่สุด",

    // Catalog
    catalog_badge: "2026 CATALOGUE",
    catalog_heading: "คอลเลกชันมัทฉะทั้ง 10 ชนิด (เรียงตามเกรด)",
    catalog_subheading: "เรียงจากเกรดพิธีการ (Ceremonia) ลงมาสู่เกรดยาเมะ ซิกเนเจอร์ และคลาสสิกคอมเมอร์เชียล",
    filter_grade_label: "เกรดสินค้า:",
    filter_origin_label: "แหล่งปลูก:",
    filter_flavor_label: "สไตล์รสชาติ:",
    filter_usage_label: "การใช้งาน:",
    filter_all: "ทั้งหมด (10)",
    filter_ceremonia: "👑 Ceremonia (2)",
    filter_yame: "✨ Yame Collection (3)",
    filter_signature: "⭐ Signature (2)",
    filter_classic: "🍃 Classic (3)",
    filter_origin_all: "ทั้งหมด",
    filter_flavor_all: "ทั้งหมด",
    filter_flavor_nutty: "🥜 สายนัตตี้ถั่วคั่ว (Nutty 4-5)",
    filter_flavor_umami: "✨ สายอูมามิกลมกล่อม (Umami 4-5)",
    filter_flavor_organic: "🌿 สายออร์แกนิกแท้ (2)",
    filter_usage_all: "ทั้งหมด",
    filter_usage_latte: "🥛 ลาเต้",
    filter_usage_usucha: "🍵 Usucha",
    filter_usage_smoothie: "🥤 สมูทตี้ / ปั่น",
    filter_usage_bakery: "🥐 เบเกอรี่",
    sort_label: "เรียงตาม:",
    sort_grade: "👑 เรียงตามเกรด (Ceremonial ลงมา)",
    sort_price_asc: "ราคา: น้อย → มาก",
    sort_price_desc: "ราคา: มาก → น้อย",
    sort_umami: "Umami สูงสุด",
    sort_nutty: "Nutty สูงสุด",
    cost_per_cup: "ต้นทุน / แก้ว (4g)",
    btn_detail: "เจาะลึก",
    btn_compare: "เทียบ",
    btn_compared: "เลือกแล้ว",
    btn_copy_line: "คัดลอกสรุปสเปกส่ง LINE",

    // Comparison
    cmp_badge: "Side-by-Side Comparison",
    cmp_heading: "เครื่องมือเปรียบเทียบมวยต่อมวย",
    cmp_subheading: "ไขข้อข้องใจให้ลูกค้าเห็นชัดว่าแต่ละตัวต่างกันอย่างไร ทั้งโปรไฟล์รสชาติ แหล่งปลูก และความเหมาะสมกับการใช้งาน",
    cmp_drawer_btn: "ดูผลเปรียบเทียบ",

    // Calculator
    calc_badge: "Café Cost Calculator",
    calc_heading: "คำนวณต้นทุนต่อแก้วสำหรับร้านคาเฟ่",
    calc_subheading: "ปรับสูตรกรัมและราคาขาย เพื่อดูต้นทุนผงชาต่อแก้วและกำไรขั้นต้นทันที",
    calc_grams_label: "ปริมาณผงชาต่อแก้ว (g)",
    calc_price_label: "ราคาขายหน้าร้านเฉลี่ย",
    calc_grams_light: "3g (เบา)",
    calc_grams_std: "4g (มาตรฐาน)",
    calc_grams_rich: "6g (เข้มข้น)",
    calc_price_grab: "65 ฿ (Grab & Go)",
    calc_price_spec: "95 ฿ (Specialty)",
    calc_price_prem: "160 ฿ (Premium)",
    calc_col_sku: "ชื่อสินค้า",
    calc_col_origin: "แหล่งผลิต",
    calc_col_price: "ราคา / 250g",
    calc_col_cups: "ชงได้ (แก้ว)",
    calc_col_cost: "ต้นทุนชา / แก้ว",
    calc_col_profit: "กำไรหักผงชา",
    calc_col_margin: "Margin",
    calc_tip: "<strong>💡 แนะนำสำหรับคาเฟ่:</strong> ใช้ <strong>Strong Nutty</strong> หรือ <strong>Yurane</strong> เป็นตัวหลักหน้าร้าน ต้นทุนเพียง ~18-21 ฿/แก้ว ขายที่ 85-95 ฿ จะมี Margin เฉพาะผงชามากกว่า 75-80% และเสริมด้วย <strong>Shoen</strong> หรือ <strong>Yame B</strong> เป็นซิกเนเจอร์พรีเมียม",

    // Recipes
    recipes_badge: "Barista Standard Recipes",
    recipes_heading: "สูตรชงมาตรฐานสำหรับร้านกาแฟ",
    recipes_subheading: "อัตราส่วนมาตรฐานที่ออกแบบมาเพื่อดึงเอกลักษณ์ของมัทฉะแต่ละสายพันธุ์ออกมาได้สมบูรณ์แบบ ควบคุมต้นทุนง่าย รสชาตินิ่งทุกแก้ว",
    recipe_1_badge: "เมนูขายดีอันดับ 1",
    recipe_1_cost: "ต้นทุน ~18-21 ฿",
    recipe_1_title: "🥛 Iced Matcha Latte",
    recipe_1_sub: "สูตรนมสด / Oat Milk หอมถั่วคั่ว บอดี้แน่น ทะลุนมชัดเจน",
    recipe_1_ratio_label: "อัตราส่วนมาตรฐาน (แก้ว 16 oz)",
    recipe_1_tip: "<strong>💡 Barista Tip:</strong> ร่อนผงชาแล้วตีด้วยแปรง Chasen หรือเครื่องปั่นมือจนเกิดฟองเนียน เทลงบนนมเย็น จะได้เลเยอร์สีเขียวมรกตตัดกับสีขาวสวยงาม<br><strong>ชาที่แนะนำ:</strong> Strong Nutty, Yurane",
    recipe_2_badge: "สายชงใสพรีเมียม",
    recipe_2_cost: "ต้นทุน ~18-35 ฿",
    recipe_2_title: "🍵 Pure Clear Matcha (Usucha)",
    recipe_2_sub: "ชงใสเย็น ดื่มด่ำรสอูมามิ กลิ่นหอมฟลอรัล และความหวานธรรมชาติ",
    recipe_2_ratio_label: "อัตราส่วนมาตรฐาน (แก้ว 16 oz)",
    recipe_2_tip: "<strong>💡 Barista Tip:</strong> อย่าใช้น้ำร้อนเกิน 80°C เด็ดขาด เพราะจะดึงรสฝาดขมออกมา แนะนำดื่มแบบไม่หวานเพื่อสัมผัสรสชาติอันลุ่มลึกที่แท้จริง<br><strong>ชาที่แนะนำ:</strong> Shoen, Yame B",
    recipe_3_badge: "เมนูสดชื่นกำไรสูง",
    recipe_3_cost: "ต้นทุน ~12-14 ฿",
    recipe_3_title: "🥥 Matcha Coconut / Yuzu Fizz",
    recipe_3_sub: "ผสมน้ำมะพร้าวสดหรือโซดาผลไม้ รีเฟรชชิ่ง คาเฟอีนเบาสบาย",
    recipe_3_ratio_label: "อัตราส่วนมาตรฐาน (แก้ว 16 oz)",
    recipe_3_tip: "<strong>💡 Barista Tip:</strong> ความหวานหอมตามธรรมชาติของน้ำมะพร้าวตัดกับความเข้มของมัทฉะได้อย่างยอดเยี่ยม เป็นเมนูทางเลือกสำหรับลูกค้าที่แพ้นมวัว<br><strong>ชาที่แนะนำ:</strong> Oikawa, Zenraku",
    recipe_ing_matcha: "ผงมัทฉะ (Matcha)",
    recipe_ing_water_hot: "น้ำร้อน (อุณหภูมิ 75–80°C)",
    recipe_ing_milk: "นมสด หรือ Oat Milk",
    recipe_ing_syrup: "น้ำเชื่อม (Simple Syrup)",
    recipe_ing_ceremonial_matcha: "ผงมัทฉะเกรดสูง",
    recipe_ing_water_warm: "น้ำอุ่น (อุณหภูมิ 70–75°C)",
    recipe_ing_water_cold: "น้ำเย็นจัด (Cold Water)",
    recipe_ing_ice: "น้ำแข็งก้อนหลอด",
    recipe_ing_water_whisk: "น้ำอุ่นสำหรับตีชา",
    recipe_ing_coconut: "น้ำมะพร้าว 100% หรือ Yuzu Soda",
    recipe_ing_ice_fill: "น้ำแข็งเต็มแก้ว",
    recipe_ing_top: "Top ด้านบนด้วยชา",

    // Terroirs
    terroirs_badge: "Japanese Tea Terroir",
    terroirs_heading: "ทำความรู้จัก 4 แหล่งปลูกชา",
    terroirs_subheading: "สภาพดิน อากาศ และกรรมวิธีดูแลใบชาของแต่ละภูมิภาค สร้างเอกลักษณ์กลิ่นรสที่แตกต่างกันอย่างน่าทึ่ง",
    terroir_items_label: "สินค้าในคอลเลกชัน:",
    terroir_uji_title: "Uji (อุจิ), Kyoto",
    terroir_uji_sub: "เมืองหลวงแห่งมัทฉะดั้งเดิม",
    terroir_uji_desc: "สายน้ำ หมอกหนา และดินภูเขาไฟ ทำให้อุจิผลิตชาที่มีความหวานตามธรรมชาติและอูมามิสูงมาก กลิ่นหอมฟลอรัลนวลตา ไร้ความฝาด",
    terroir_uji_items: "Organic (Sig.), Organic (Cla.)",
    terroir_nishio_title: "Nishio (นิชิโอะ), Aichi",
    terroir_nishio_sub: "ราชาแห่งสีเขียวสดและบอดี้แน่น",
    terroir_nishio_desc: "สภาพอากาศชายทะเลทำให้ได้ใบชาสีเขียวสด รสชาติเข้มข้น ลุ่มลึก ทะลุนมได้ดีเยี่ยม มีชื่อเสียงระดับโลกในการผลิตมัทฉะเกรดสูง",
    terroir_nishio_items: "Shoen, Yurane, Zenraku",
    terroir_yame_title: "Yame (ยาเมะ), Fukuoka",
    terroir_yame_sub: "ขวัญใจสายนัตตี้และหวานลึก",
    terroir_yame_desc: "อุณหภูมิกลางวัน-กลางคืนต่างกันสูง ใบชาสะสมความหวานและกลิ่นถั่วคั่ว (Nutty) เป็นเอกลักษณ์ เข้ากับนมโอ๊ตได้มหัศจรรย์",
    terroir_yame_items: "Strong Nutty, Yame B, Ei, Yame A",
    terroir_shizuoka_title: "Shizuoka (ชิซูโอกะ)",
    terroir_shizuoka_sub: "มรดกสวนชา Hamachaen 150+ ปี",
    terroir_shizuoka_desc: "แหล่งผลิตชาเขียวใหญ่สุดของญี่ปุ่น ใต้ร่มเงาฟูจิ กลิ่นหอมสดชื่น สะอาด รสชาติกลมกล่อมรอบด้าน ดื่มง่ายทุกวัน",
    terroir_shizuoka_items: "Oikawa (おいかわ)",

    // FAQ
    faq_badge: "Cafe Quality Care & FAQ",
    faq_heading: "คู่มือการเก็บรักษา & คำถามที่พบบ่อย",
    faq_subheading: "ไขข้อข้องใจเรื่องการดูแลรักษาผงมัทฉะแท้ เพื่อรักษาความเขียวสดและกลิ่นหอมให้คงที่ตลอดการใช้งานที่ร้าน",
    faq_q1_title: "ทำไมผงมัทฉะแท้ถึงจับตัวเป็นก้อนเล็กๆ?",
    faq_q1_desc: "ผงมัทฉะแท้ 100% ที่บดด้วยโม่หิน (Stone-milled) มีอนุภาคละเอียดระดับ <strong>5–10 ไมครอน</strong> จึงเกิดแรงไฟฟ้าสถิต (Static Charge) ดึงดูดกันเป็นก้อนเล็กๆ ตามธรรมชาติ ซึ่งไม่ใช่เพราะชาชื้นหรือเสีย แนะนำให้บาริสต้าใช้ <strong>ตะแกรงตาถี่ร่อน (Sifting)</strong> ผงชาก่อนชงทุกครั้ง เพื่อให้ละลายง่ายและเนื้อโฟมเนียนนุ่มที่สุด",
    faq_q2_title: "วิธีเก็บรักษาผงชาไม่ให้สีดรอปหรือกลิ่นหืน?",
    faq_q2_desc: "มัทฉะไวต่อ <strong>แสง ออกซิเจน และความชื้น</strong> ควรเก็บในถุงฟอยล์ทึบแสง ปิดซิปล็อกให้แน่นสนิท แช่ในตู้เย็น (0–5°C) <br><strong style=\"color:#1a3a16;\">⚠️ เคล็ดลับสำคัญ:</strong> เมื่อนำถุงชาออกจากตู้เย็น ให้วางทิ้งไว้ในอุณหภูมิห้องประมาณ 15–20 นาทีก่อนเปิดซอง เพื่อป้องกันไม่ให้ไอน้ำในอากาศควบแน่นเข้าไปในถุงชา",
    faq_q3_title: "อายุการเก็บรักษา (Shelf Life) นานแค่ไหน?",
    faq_q3_desc: "• <strong>ซองที่ยังไม่เปิด:</strong> สามารถเก็บรักษาคุณภาพได้นาน <strong>12 – 18 เดือน</strong> นับจากวันผลิต (เก็บในที่แห้ง มืด และเย็น)<br>• <strong>หลังเปิดใช้งานแล้ว:</strong> แนะนำให้ใช้ให้หมดภายใน <strong>30 – 60 วัน</strong> เพื่อสัมผัสสีเขียวมรกตที่สดใสและกลิ่นหอมอูมามิที่ดีที่สุดของใบชา",
    faq_q4_title: "ราคาส่งคาเฟ่ & การขอชุดตัวอย่าง (Sample Kit)?",
    faq_q4_desc: "สำหรับผู้ประกอบการที่เปิดร้านกาแฟ หรือกำลังจะเปิดร้าน สามารถติดต่อฝ่ายขายผ่าน LINE <strong>@matchatimes.thailand</strong> เพื่อแจ้งขอรับชุด <strong>Matcha Times Sample Kit</strong> สำหรับทดลองชงจริงที่ร้านได้ทันที ทีมงานพร้อมให้คำแนะนำเรื่องอัตราส่วนและคำนวณต้นทุนต่อแก้วให้ฟรี",

    // Sample Kit Banner
    banner_badge: "✦ B2B Cafe Partnership",
    banner_title: "เปิดร้านกาแฟ หรือต้องการยกระดับเมนูมัทฉะ?",
    banner_desc: "ขอรับชุด <strong>Matcha Times Sample Kit</strong> สำหรับทดลองชงจริงที่ร้าน พร้อมรับคำปรึกษาเรื่องอัตราส่วนและคำนวณต้นทุนต่อแก้วฟรีจากผู้เชี่ยวชาญ",
    banner_btn_kit: "ขอรับชุด Sample Kit",
    banner_btn_flyer: "ดูใบราคาเต็ม",

    // Modals & Floating
    flyer_modal_title: "ใบแคตตาล็อกต้นฉบับ MATCHA TIMES",
    contact_modal_title: "ติดต่อฝ่ายขาย MATCHA TIMES",
    contact_modal_sub: "สั่งซื้อราคาส่ง B2B, ขอใบเสนอราคา หรือนัดชิมตัวอย่างชาสำหรับเปิดร้าน",
    contact_qr_text: "สแกน QR Code ผ่าน LINE",
    contact_tip_box: "<strong>สำหรับร้านเปิดใหม่:</strong> แจ้งแอดมินว่า <em>&ldquo;ขอรับชุด Sample Kit ทดลองชงที่ร้าน&rdquo;</em> เพื่อรับตัวอย่างชาและคำแนะนำอัตราส่วน",
    contact_btn_line: "แอด LINE: @matchatimes.thailand",
    contact_btn_ig: "ติดตาม Instagram: @matchatimes.thailand",
    contact_branches: "📍 <strong>สาขา:</strong> Silom, Asok (Interchange 21), Phrakanong",
    fab_line: "ติดต่อ LINE",
    fab_ig: "ติดตาม IG",
    toast_copied: "คัดลอกสรุปสเปกส่ง LINE แล้ว!",

    // Footer
    footer_tagline: "นำเข้ามัทฉะแท้ 100% จากสวนชาญี่ปุ่นสู่ประเทศไทย · โตเกียว · กรุงเทพฯ",
    footer_story: "ประวัติแบรนด์",
    footer_catalog: "สินค้า",
    footer_compare: "เปรียบเทียบ",
    footer_calculator: "คำนวณต้นทุน",
    footer_contact: "ติดต่อฝ่ายขาย",
    footer_rights: "© 2026 MATCHA TIMES Co., Ltd. สงวนลิขสิทธิ์ทุกประการ · คู่มือสินค้า B2B"
  },

  en: {
    // Navigation
    nav_brand: "Brand Story",
    nav_tier: "Best Seller Tier List",
    nav_matchmaker: "Matchmaker",
    nav_catalog: "10 Matcha SKUs",
    nav_compare: "Compare Matrix",
    nav_calculator: "Cost Calculator",
    nav_recipes: "Cafe Recipes",
    nav_terroirs: "4 Terroirs",
    nav_faq: "FAQ & Care",
    nav_flyer: "Original Flyer",
    nav_contact: "Contact Sales",

    // Hero
    hero_badge: "🍃 WHOLESALE PRICE LIST | 2026 MATCHA COLLECTION",
    hero_title_1: "100% Japanese Sourced Matcha",
    hero_title_2: "Sales Enablement & Cafe Product Guide",
    hero_desc: "Direct import from premier tea gardens in Nishio, Uji, Yame, and Shizuoka. Designed for cafe owners, baristas, and B2B buyers to evaluate taste profiles, calculate cup margins, and choose the perfect match.",
    hero_scroll_hint: "Scroll to explore Best Sellers & 10 Matcha SKUs",
    hero_cta_catalog: "Explore 10 SKUs",
    hero_cta_calc: "Calculate Cup Margin",
    stat_skus: "10 Selected SKUs",
    stat_skus_sub: "Ceremonial to Commercial",
    stat_regions: "4 Renowned Terroirs",
    stat_regions_sub: "Nishio, Uji, Yame, Shizuoka",
    stat_direct: "100% Direct Import",
    stat_direct_sub: "Granite Stone Milled, FOB Japan",
    stat_margin: "Up to 80%+ Margin",
    stat_margin_sub: "Starting at only ~12.8 ฿ / cup",

    // Brand Story
    story_badge: "伝統と現代の調和 • Heritage & Philosophy",
    story_heading: "The Story of MATCHA TIMES",
    story_subheading: "From a 150-year-old historic tea estate in Japan to a modern movement: making<br><em>&ldquo;Authentic Premium Matcha&rdquo;</em> an accessible daily joy for everyone.",
    story_c1_era: "① 1865 · Edo Era",
    story_c1_title: "Hamachaen (はま茶園)",
    story_c1_sub: "150+ Years Heritage in Shizuoka",
    story_c1_desc: "Quality begins at Hamachaen tea gardens. Inheriting 150+ years of traditional shade-growing and slow granite stone-milling techniques to lock in maximum chlorophyll, L-theanine, and pure umami.",
    story_c1_tag: "伝統の石臼挽き — Traditional Stone Milled",
    story_c2_era: "② Tokyo, Japan",
    story_c2_title: "MATCHA TIMES Co., Ltd.",
    story_c2_sub: "Modern Matcha Culture — Asakusa & Harajuku",
    story_c2_desc: "Founded in Tokyo by tea artisans aiming to evolve rigid tea ceremonies into an approachable, vibrant lifestyle brand with creative layered drinks and signature Panda Yaki.",
    story_c2_tag: "日常をちょっと楽しく — Everyday Cheer",
    story_c3_era: "③ Bangkok, Thailand",
    story_c3_title: "To the Heart of Bangkok",
    story_c3_sub: "Silom • Asok (Interchange 21) • Phrakanong",
    story_c3_desc: "Importing 100% genuine Japanese tea to Thailand's thriving cafe community. Serving thousands of matcha lovers with iconic house recipes, fruit matcha, and artisan bakery items.",
    story_c3_tag: "本物の日本茶 — 100% Authentic Japanese Tea",
    story_pillars_badge: "CORE VALUES",
    story_pillars_heading: "3 Core Pillars Behind MATCHA TIMES",
    pillar_1_title: "Authenticity",
    pillar_1_desc: "100% pure Japanese tea with zero fillers, no cornstarch, and no artificial coloring. Retaining maximum natural antioxidants and calm-focus L-theanine.",
    pillar_2_title: "Accessibility",
    pillar_2_desc: "Fair, transparent B2B pricing ensuring sustainable profitability for cafes and accessible daily wellness for your customers.",
    pillar_3_title: "Everyday Joy",
    pillar_3_desc: "Matcha provides smooth, calm-alert focus without caffeine jitters. Turning every cup into a serene, uplifting daily ritual.",

    // Matchmaker Quiz
    quiz_badge: "✦ Matcha Matchmaker ✦",
    quiz_heading: "Find Your Perfect Match in 3 Clicks",
    quiz_subheading: "Let our system filter the ideal matcha based on your menu concept, flavor profile, and target budget.",
    quiz_q1_title: "1. Primary Menu Application?",
    quiz_q1_o1: "🥛 Matcha Latte (With Milk)",
    quiz_q1_o2: "🍵 Pure Usucha / Koicha (Water)",
    quiz_q1_o3: "🥐 Bakery / Blended / Gelato",
    quiz_q2_title: "2. Preferred Flavor Tone?",
    quiz_q2_o1: "🥜 Deep Roasted Nutty",
    quiz_q2_o2: "⚖️ Smooth & Balanced Umami",
    quiz_q2_o3: "🌿 Certified Clean Organic",
    quiz_q3_title: "3. Budget per 250g Pouch?",
    quiz_q3_o1: "⭐ Standard (900–1,200 THB)",
    quiz_q3_o2: "👑 Ultra-Premium (1,400+ THB)",
    quiz_q3_o3: "💰 Max Cost Value (< 850 THB)",
    quiz_result_tag: "✦ RECOMMENDED FOR YOU",
    quiz_btn_reset: "Reset",
    quiz_btn_view: "View Full Spec",

    // Tier List
    tier_badge: "B2B Cafe Selection Guide",
    tier_heading: "Best Seller Tier List & Cafe Recommendations",
    tier_subheading: "Ranked by consumer demand, re-order frequency, and cafe profit efficiency to help you choose with confidence.",

    // Catalog
    catalog_badge: "2026 CATALOGUE",
    catalog_heading: "10-Matcha Portfolio (Ceremonial Grade Downwards)",
    catalog_subheading: "From top ceremonial Usucha down to versatile latte and culinary foodservice grades.",
    filter_grade_label: "Grade Tiers:",
    filter_origin_label: "Terroir:",
    filter_flavor_label: "Flavor Notes:",
    filter_usage_label: "Application:",
    filter_all: "All (10)",
    filter_ceremonia: "👑 Ceremonia (2)",
    filter_yame: "✨ Yame Collection (3)",
    filter_signature: "⭐ Signature (2)",
    filter_classic: "🍃 Classic (3)",
    filter_origin_all: "All",
    filter_flavor_all: "All",
    filter_flavor_nutty: "🥜 Roasted Nutty (4-5)",
    filter_flavor_umami: "✨ Deep Umami (4-5)",
    filter_flavor_organic: "🌿 100% Organic (2)",
    filter_usage_all: "All",
    filter_usage_latte: "🥛 Latte",
    filter_usage_usucha: "🍵 Usucha",
    filter_usage_smoothie: "🥤 Smoothie / Frappe",
    filter_usage_bakery: "🥐 Bakery",
    sort_label: "Sort By:",
    sort_grade: "👑 Grade: Ceremonial First",
    sort_price_asc: "Price: Low → High",
    sort_price_desc: "Price: High → Low",
    sort_umami: "Highest Umami",
    sort_nutty: "Highest Nutty",
    cost_per_cup: "Powder Cost / Cup (4g)",
    btn_detail: "Details",
    btn_compare: "Compare",
    btn_compared: "Selected",
    btn_copy_line: "Copy Spec for LINE",

    // Comparison
    cmp_badge: "Side-by-Side Comparison",
    cmp_heading: "Side-by-Side Comparison Matrix",
    cmp_subheading: "Compare aroma notes, umami intensity, terroir advantages, and multi-tier pricing side by side.",
    cmp_drawer_btn: "View Compare",

    // Calculator
    calc_badge: "Café Cost Calculator",
    calc_heading: "Cost-per-Cup Calculator for Cafes",
    calc_subheading: "Adjust powder grams and retail menu price to see instant cost-per-cup and gross profit margin.",
    calc_grams_label: "Matcha Powder per Cup (g)",
    calc_price_label: "Average Retail Menu Price",
    calc_grams_light: "3g (Light)",
    calc_grams_std: "4g (Standard)",
    calc_grams_rich: "6g (Rich)",
    calc_price_grab: "65 ฿ (Grab & Go)",
    calc_price_spec: "95 ฿ (Specialty)",
    calc_price_prem: "160 ฿ (Premium)",
    calc_col_sku: "Matcha SKU",
    calc_col_origin: "Origin",
    calc_col_price: "Price / 250g",
    calc_col_cups: "Yield (Cups)",
    calc_col_cost: "Powder Cost / Cup",
    calc_col_profit: "Gross Profit / Cup",
    calc_col_margin: "Margin",
    calc_tip: "<strong>💡 Recommendation for Cafes:</strong> Use <strong>Strong Nutty</strong> or <strong>Yurane</strong> as your primary house latte offering (~18-21 THB powder cost). Selling at 85-95 THB achieves 75-80%+ gross margin. Pair with <strong>Shoen</strong> or <strong>Yame B</strong> for high-ticket signature specials.",

    // Recipes
    recipes_badge: "Barista Standard Recipes",
    recipes_heading: "Barista Standard Cafe Recipes",
    recipes_subheading: "Standardized brewing ratios designed to express the unique profile of each matcha grade with consistent quality in every cup.",
    recipe_1_badge: "#1 Best Seller Menu",
    recipe_1_cost: "Cost ~18-21 ฿",
    recipe_1_title: "🥛 Iced Matcha Latte",
    recipe_1_sub: "Dairy / Oat Milk formula with bold roasted nutty presence that pierces through milk.",
    recipe_1_ratio_label: "Standard Ratio (16 oz cup)",
    recipe_1_tip: "<strong>💡 Barista Tip:</strong> Sift powder, whisk with Chasen or electric frother until smooth micro-foam forms, then pour gently over cold milk for a striking layered presentation.<br><strong>Recommended Tea:</strong> Strong Nutty, Yurane",
    recipe_2_badge: "Premium Usucha Choice",
    recipe_2_cost: "Cost ~18-35 ฿",
    recipe_2_title: "🍵 Pure Clear Matcha (Usucha)",
    recipe_2_sub: "Chilled clear matcha: savor delicate floral fragrance, rich umami, and lingering natural sweetness.",
    recipe_2_ratio_label: "Standard Ratio (16 oz cup)",
    recipe_2_tip: "<strong>💡 Barista Tip:</strong> Never exceed 80°C water temperature to prevent tannin astringency. Best enjoyed unsweetened to appreciate the authentic Japanese terroir.<br><strong>Recommended Tea:</strong> Shoen, Yame B",
    recipe_3_badge: "High-Margin Refreshing",
    recipe_3_cost: "Cost ~12-14 ฿",
    recipe_3_title: "🥥 Matcha Coconut / Yuzu Fizz",
    recipe_3_sub: "Blended with 100% pure coconut water or sparkling fruit soda for refreshing, clean energy.",
    recipe_3_ratio_label: "Standard Ratio (16 oz cup)",
    recipe_3_tip: "<strong>💡 Barista Tip:</strong> The natural sweetness of coconut water balances the earthy depth of matcha exquisitely. A stellar dairy-free signature.<br><strong>Recommended Tea:</strong> Oikawa, Zenraku",
    recipe_ing_matcha: "Matcha Powder",
    recipe_ing_water_hot: "Hot Water (75–80°C)",
    recipe_ing_milk: "Fresh Milk or Oat Milk",
    recipe_ing_syrup: "Simple Syrup (To taste)",
    recipe_ing_ceremonial_matcha: "Ceremonial Grade Matcha",
    recipe_ing_water_warm: "Warm Water (70–75°C)",
    recipe_ing_water_cold: "Chilled Water",
    recipe_ing_ice: "Ice Cubes",
    recipe_ing_water_whisk: "Warm Water for whisking",
    recipe_ing_coconut: "100% Pure Coconut Water / Soda",
    recipe_ing_ice_fill: "Full Cup of Ice",
    recipe_ing_top: "Top with whisked matcha",

    // Terroirs
    terroirs_badge: "Japanese Tea Terroir",
    terroirs_heading: "Explore 4 Premier Tea Terroirs",
    terroirs_subheading: "Regional soil, morning mists, and shading heritage bestow remarkably distinct aroma and umami signatures.",
    terroir_items_label: "Featured SKUs:",
    terroir_uji_title: "Uji, Kyoto (宇治)",
    terroir_uji_sub: "The Historic Cradle of Matcha",
    terroir_uji_desc: "River mists and mineral volcanic soils yield high natural sweetness and concentrated umami with delicate floral notes and virtually zero bitterness.",
    terroir_uji_items: "Organic (Sig.), Organic (Cla.)",
    terroir_nishio_title: "Nishio, Aichi (西尾)",
    terroir_nishio_sub: "King of Vibrant Green & Heavy Body",
    terroir_nishio_desc: "Maritime breezes foster deep emerald leaf coloration and a bold, deep body that punches cleanly through milk and baking recipes.",
    terroir_nishio_items: "Shoen, Yurane, Zenraku",
    terroir_yame_title: "Yame, Fukuoka (八女)",
    terroir_yame_sub: "Beloved Roasted Nutty & Sweetness",
    terroir_yame_desc: "Wide diurnal temperature swings allow tea leaves to synthesize rich natural sweetness and signature roasted nutty undertones. Outstanding with oat milk.",
    terroir_yame_items: "Strong Nutty, Yame B, Ei, Yame A",
    terroir_shizuoka_title: "Shizuoka (静岡)",
    terroir_shizuoka_sub: "150+ Years Hamachaen Estate Heritage",
    terroir_shizuoka_desc: "Japan's largest tea producing region beneath Mt. Fuji: crisp, clean vegetal freshness, exceptionally refreshing and balanced for everyday sipping.",
    terroir_shizuoka_items: "Oikawa (おいかわ)",

    // FAQ
    faq_badge: "Cafe Quality Care & FAQ",
    faq_heading: "Cafe Care Guide & Frequent Questions",
    faq_subheading: "Best practices for handling stone-milled Japanese matcha to maintain vivid green color and peak aroma at your bar.",
    faq_q1_title: "Why does authentic matcha form tiny clumps?",
    faq_q1_desc: "Genuine 100% stone-milled matcha is micro-ground to <strong>5–10 microns</strong>. At this microscopic fineness, natural static electrical charges cause particles to attract into loose clumps. This is a hallmark of authentic quality, not moisture spoilage. Always <strong>sift through a fine mesh sieve</strong> before whisking for silky-smooth lattes.",
    faq_q2_title: "How to prevent matcha from losing color or oxidizing?",
    faq_q2_desc: "Matcha is vulnerable to <strong>light, oxygen, and ambient humidity</strong>. Store in an opaque airtight pouch inside a refrigerator (0–5°C). <br><strong style=\"color:#1a3a16;\">⚠️ Crucial Barista Rule:</strong> Allow the pouch to sit at room temperature for 15–20 minutes before opening to prevent humid air from condensing inside.",
    faq_q3_title: "What is the official shelf life of MATCHA TIMES powder?",
    faq_q3_desc: "• <strong>Unopened Foil Pouches:</strong> <strong>12 to 18 months</strong> from milling date when stored in cool, dark, dry conditions.<br>• <strong>Once Opened:</strong> We recommend consuming within <strong>30 to 60 days</strong> for optimal vibrant green color and peak umami fragrance.",
    faq_q4_title: "How can my cafe request a B2B Sample Kit?",
    faq_q4_desc: "Cafe owners and beverage developers can connect directly with our wholesale team via LINE <strong>@matchatimes.thailand</strong> to request our comprehensive <strong>Matcha Times Sample Kit</strong> for on-site test brewing, complete with recipe ratio sheets.",

    // Sample Kit Banner
    banner_badge: "✦ B2B Cafe Partnership",
    banner_title: "Opening a Cafe or Upgrading Your Matcha Menu?",
    banner_desc: "Request a <strong>Matcha Times Sample Kit</strong> for test brewing at your bar, paired with complimentary recipe consulting and margin analysis from our team.",
    banner_btn_kit: "Request Sample Kit",
    banner_btn_flyer: "View Full Price List",

    // Modals & Floating
    flyer_modal_title: "MATCHA TIMES Original Wholesale Price List",
    contact_modal_title: "Contact MATCHA TIMES Wholesale",
    contact_modal_sub: "B2B wholesale pricing, custom quotations, or sample tasting appointments for cafes.",
    contact_qr_text: "Scan QR Code on LINE",
    contact_tip_box: "<strong>For New Cafe Openings:</strong> Mention <em>\"Requesting Sample Kit for Cafe Tasting\"</em> to receive complimentary samples and ratio guides.",
    contact_btn_line: "Add LINE: @matchatimes.thailand",
    contact_btn_ig: "Follow Instagram: @matchatimes.thailand",
    contact_branches: "📍 <strong>Branches:</strong> Silom, Asok (Interchange 21), Phrakanong",
    fab_line: "Chat on LINE",
    fab_ig: "Follow on IG",
    toast_copied: "Product spec copied to clipboard!",

    // Footer
    footer_tagline: "We bring calm and cheerful vibes to your everyday life. 100% Japanese Sourced Matcha · Tokyo · Bangkok · Shizuoka",
    footer_story: "Brand Story",
    footer_catalog: "10 Matcha SKUs",
    footer_compare: "Comparison",
    footer_calculator: "Cost Calculator",
    footer_contact: "Contact Sales",
    footer_rights: "© 2026 MATCHA TIMES Co., Ltd. All Rights Reserved · B2B Sales Enablement Guide"
  }
};
