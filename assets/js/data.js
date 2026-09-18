// MATCHA TIMES Product & Heritage Database
const MATCHA_PRODUCTS = [
  {
    id: "shouen",
    name: "SHOUEN",
    kanji: "松苑",
    origin: "Nishio, Japan",
    region: "nishio",
    price: 1490,
    weight: "250g",
    weightGrams: 250,
    bagStyle: "gold",
    bagBg: "from-amber-100 via-amber-50 to-amber-200 border-amber-300 text-amber-900",
    badgeColor: "bg-amber-700 text-white",
    taste: {
      umami: 5,
      sweetness: 4,
      bitterness: 3,
      aroma: 4,
      nutty: 4
    },
    usages: ["Latte", "Usucha", "Koicha"],
    category: "ceremonial",
    tagline: "มัทฉะเกรดพิธีการพรีเมียม อูมามิแน่น สีเขียวสด ดื่มเพียวหรือลาเต้ทรงคุณค่า",
    description: "SHOUEN (松苑) ผ่านการคัดสรรยอดใบชาอ่อนแรกของฤดูจากนิชิโอะ ให้สีเขียวมรกตสดใส รสสัมผัสนุ่มลึก อูมามิเด่นชัดเต็ม 5 ไร้ความฝาดขมบาดคอ สามารถชงแบบพิธีการใส่น้ำร้อน Usucha หรือ Koicha ได้อย่างสมบูรณ์แบบ และทำลาเต้พรีเมียมแก้วซิกเนเจอร์ที่ยกระดับร้านคาเฟ่",
    recommendedFor: "ลูกค้าที่มองหาชาเกรดพิธีการที่ชงใสได้เยี่ยม และทำลาเต้พรีเมียมขายได้ราคาต่อแก้วสูง",
    highlight: "Umami 5/5 • ชง Usucha & Koicha ได้"
  },
  {
    id: "organic-black",
    name: "ORGANIC (Uji Black)",
    kanji: "オーガニック",
    origin: "Uji, Japan",
    region: "uji",
    price: 2600,
    weight: "250g",
    weightGrams: 250,
    bagStyle: "black",
    bagBg: "from-zinc-900 via-zinc-800 to-zinc-950 border-zinc-700 text-zinc-100",
    badgeColor: "bg-zinc-800 text-amber-300 border border-amber-400/40",
    taste: {
      umami: 5,
      sweetness: 4,
      bitterness: 3,
      aroma: 4,
      nutty: 4
    },
    usages: ["Latte", "Usucha", "Koicha"],
    category: "ceremonial",
    tagline: "ที่สุดแห่งมัทฉะออร์แกนิกแท้จากอุจิ เกียวโต เกรดสูงสุดของแบรนด์",
    description: "ORGANIC ซองดำคือตัวท็อปสุด (Flagship) ของ MATCHA TIMES ปลูกในสวนชาออร์แกนิกที่ได้รับการรับรองมาตรฐานสากลในเมืองอุจิ แหล่งกำเนิดมัทฉะอันดับ 1 ของโลก กลิ่นหอมลุ่มลึก อูมามิหวานละเมียดละไม มอบประสบการณ์ชิมชาระดับจิตวิญญาณแห่งเซน",
    recommendedFor: "ร้านชา Specialty หรือโรงแรมระดับ Luxury ที่ต้องการชูมัทฉะออร์แกนิกแท้ 100% ตัวท็อปสุด",
    highlight: "Top-Tier Flagship • 100% Organic Uji"
  },
  {
    id: "yurane",
    name: "YURANE",
    kanji: "ゆらね",
    origin: "Nishio, Japan",
    region: "nishio",
    price: 1050,
    weight: "250g",
    weightGrams: 250,
    bagStyle: "dark-green",
    bagBg: "from-emerald-900 via-emerald-800 to-emerald-950 border-emerald-700 text-emerald-100",
    badgeColor: "bg-emerald-800 text-emerald-100",
    taste: {
      umami: 4,
      sweetness: 4,
      bitterness: 3,
      aroma: 4,
      nutty: 4
    },
    usages: ["Latte", "Bakery"],
    category: "latte",
    tagline: "มัทฉะบาลานซ์ยอดนิยม รสชาตินวลกลมกล่อม ขวัญใจบาริสต้าทำลาเต้มาตรฐาน",
    description: "YURANE (ゆらね) ได้รับการออกแบบสัดส่วนรสชาติมาอย่างสมดุลที่สุดระหว่างความอูมามิ กลิ่นหอมใบชา และความนัตตี้ เมื่อนำมาตีฟองผสมกับนมสดจะได้บอดี้ชาที่เนียนนุ่ม ไม่หนักหรือเบาเกินไป รสสัมผัสดื่มง่าย ถูกปากคนไทยและคอกาแฟที่ชอบมัทฉะ",
    recommendedFor: "ร้านคาเฟ่ที่ต้องการมัทฉะตัวหลัก (House Blend / Standard Matcha Latte) ที่คุมคุณภาพได้คงที่และรสชาติดื่มง่าย",
    highlight: "Perfect Balance • Best All-Rounder Latte"
  },
  {
    id: "organic-green",
    name: "ORGANIC (Uji Green)",
    kanji: "オーガニック",
    origin: "Uji, Japan",
    region: "uji",
    price: 980,
    weight: "250g",
    weightGrams: 250,
    bagStyle: "light-green",
    bagBg: "from-green-100 via-emerald-50 to-green-200 border-green-300 text-green-900",
    badgeColor: "bg-green-700 text-white",
    taste: {
      umami: 4,
      sweetness: 4,
      bitterness: 4,
      aroma: 4,
      nutty: 4
    },
    usages: ["Latte", "Bakery"],
    category: "latte",
    tagline: "มัทฉะออร์แกนิกแท้จากอุจิในราคาจับต้องได้ บอดี้ชัดตัดนมดีเยี่ยม",
    description: "ORGANIC ซองเขียวอ่อน มัทฉะอินทรีย์จากอุจิ เกียวโต ที่ออกแบบมาเพื่อการชงเครื่องดื่มนมและทำขนมโดยเฉพาะ มีความเข้มข้นและความฝาดเล็กน้อยในระดับที่พอเหมาะ ทำให้กลิ่นชาไม่โดนนมกลบ เหมาะสำหรับลูกค้ายุคใหม่ที่ใส่ใจเรื่องสุขภาพและรักธรรมชาติ",
    recommendedFor: "คาเฟ่สายสุขภาพ (Healthy & Organic Cafe) ที่ต้องการมัทฉะแท้ที่มีเอกสารรับรองในราคาต่ำกว่าพันบาท",
    highlight: "Certified Organic • Value Uji Choice"
  },
  {
    id: "oikawa",
    name: "OIKAWA",
    kanji: "おいかわ",
    origin: "Shizuoka, Japan",
    region: "shizuoka",
    price: 800,
    weight: "250g",
    weightGrams: 250,
    bagStyle: "teal",
    bagBg: "from-teal-900 via-teal-800 to-teal-950 border-teal-700 text-teal-100",
    badgeColor: "bg-teal-800 text-teal-100",
    taste: {
      umami: 3,
      sweetness: 3,
      bitterness: 3,
      aroma: 3,
      nutty: 3
    },
    usages: ["Latte", "Bakery"],
    category: "latte",
    tagline: "โทนสดชื่น ดื่มง่ายรอบด้าน ผลผลิตจากสวนชาชิซูโอกะกว่า 150 ปี",
    description: "OIKAWA (おいかわ) ถือกำเนิดจากสวนชา Hamachaen จังหวัดชิซูโอกะ โดดเด่นด้วยโทนใบชาเขียวสดชื่นแบบธรรมชาติ รสชาติสะอาด บาลานซ์สม่ำเสมอในทุกมิติระดับ 3/5 เข้ากันได้ดีเลิศกับเมนูมัทฉะผลไม้ (เช่น Strawberry Matcha, Mango Matcha หรือ Yuzu Matcha Soda) รวมถึงเมนูเบเกอรี่",
    recommendedFor: "ร้านที่เน้นเมนูฟิวชัน ผลไม้ โซดา และเมนูขนมเบเกอรี่ที่ต้องการกลิ่นชาสดชื่นในราคาคุ้มค่า",
    highlight: "Fresh & Crisp • Great for Fruit Fusion"
  },
  {
    id: "zenraku",
    name: "ZENRAKU",
    kanji: "善楽",
    origin: "Nishio, Japan",
    region: "nishio",
    price: 750,
    weight: "250g",
    weightGrams: 250,
    bagStyle: "cream",
    bagBg: "from-stone-100 via-amber-50 to-stone-200 border-stone-300 text-stone-900",
    badgeColor: "bg-stone-700 text-white",
    taste: {
      umami: 3,
      sweetness: 3,
      bitterness: 3,
      aroma: 3,
      nutty: 3
    },
    usages: ["Latte", "Bakery"],
    category: "value",
    tagline: "ความคุ้มค่าสูงสุดสำหรับร้านคาเฟ่ คุมต้นทุนต่อแก้วได้ดีเยี่ยม",
    description: "ZENRAKU (善楽) ตัวเลือกอันดับ 1 สำหรับการบริหารจัดการต้นทุนของร้านคาเฟ่และโรงเรียนสอนเบเกอรี่ ชง 1 แก้ว (4g) ตกต้นทุนผงชาเพียง 12 บาท! ให้สีเขียวสวยและกลิ่นชาชัดเจน เหมาะมากสำหรับทำเมนูปั่น (Frappe), เบเกอรี่, ขนมเค้ก, คัสตาร์ด และไอศกรีม",
    recommendedFor: "ร้านที่มีปริมาณการขายสูง (High Volume), ร้านเบเกอรี่, คาเฟ่ที่ขายมัทฉะแก้วละไม่เกิน 65-80 บาท",
    highlight: "Best Cost-Efficiency • 12฿ / Cup"
  },
  {
    id: "strong-nutty",
    name: "STRONG NUTTY",
    kanji: "八女抹茶",
    origin: "Yame, Japan",
    region: "yame",
    price: 1000,
    weight: "250g",
    weightGrams: 250,
    bagStyle: "white",
    bagBg: "from-white via-zinc-50 to-zinc-100 border-zinc-300 text-zinc-900",
    badgeColor: "bg-zinc-900 text-white",
    taste: {
      umami: 4,
      sweetness: 5,
      bitterness: 4,
      aroma: 4,
      nutty: 5
    },
    usages: ["Latte", "Bakery"],
    category: "latte",
    tagline: "มัทฉะสายถั่วขวัญใจคนไทย นัตตี้เต็ม 5 หวานลึก เข้ากับนมโอ๊ตอย่างลงตัว",
    description: "STRONG NUTTY มัทฉะจากเมืองยาเมะ จังหวัดฟุกุโอกะ อันมีชื่อเสียงด้านความหวานลึกและกลิ่นถั่วคั่วชัดเจน คะแนน Nutty สูงสุด 5/5 และ Sweetness 5/5 เวลาชงกับนมสดหรือ Oat Milk รสชาจะไม่โดนนมกลืน แต่จะส่งกลิ่นหอมกรุ่นโทนนัทตี้ฟุ้งติดจมูก เป็นตัวขายดีที่สุดตัวหนึ่งของหน้าร้าน",
    recommendedFor: "ลูกค้าและร้านคาเฟ่ที่มองหามัทฉะ 'สายนัตตี้' โดยเฉพาะ ชอบกลิ่นถั่วชัดๆ ไม่เหม็นเขียว ดื่มง่ายมาก",
    highlight: "Nutty 5/5 • Sweetness 5/5 • Best Seller"
  },
  {
    id: "yame-a",
    name: "YAME A",
    kanji: "八女抹茶",
    origin: "Yame, Japan",
    region: "yame",
    price: 1410,
    weight: "250g",
    weightGrams: 250,
    bagStyle: "silver",
    bagBg: "from-slate-200 via-zinc-100 to-slate-300 border-slate-400 text-slate-900",
    badgeColor: "bg-slate-700 text-white",
    taste: {
      umami: 4,
      sweetness: 5,
      bitterness: 4,
      aroma: 4,
      nutty: 5
    },
    usages: ["Latte", "Bakery"],
    category: "latte",
    tagline: "พรีเมียมนัตตี้ยกระดับ ความลึกซึ้งและกลิ่นหอมซับซ้อนสไตล์ยาเมะระดับสูง",
    description: "YAME A นำเสนอเอกลักษณ์ขั้นสุดของใบชายาเมะเกรดสูง ให้ความหวานตามธรรมชาติระดับ 5/5 และความนัตตี้เข้มข้น 5/5 พร้อมมิติความซับซ้อนของอโรมาที่ยาวนานในลำคอ (Lingering Finish) ยกระดับแก้วมัทฉะลาเต้ให้มีมิติเทียบเท่า Specialty Coffee ชั้นเลิศ",
    recommendedFor: "ร้านคาเฟ่พรีเมียมที่ต้องการชูเมนู 'Premium Yame Nutty Latte' เป็นแก้ว Signature ราคาพรีเมียม",
    highlight: "Luxury Nutty • Complex Aroma"
  }
];

// Brand Heritage Story Data
const BRAND_HERITAGE = {
  foundation: {
    year: "1865",
    title: "Hamachaen Heritage (はま茶園)",
    subtitle: "ประวัติศาสตร์การปลูกชาเขียว 150+ ปี",
    desc: "จุดเริ่มต้นของวัตถุดิบคุณภาพเริ่มต้นที่จังหวัดชิซูโอกะ สวนชา Hamachaen ก่อตั้งขึ้นตั้งแต่ปลายยุคเอโดะ ถ่ายทอดภูมิปัญญาการคลุมพรางแสงและโม่บดหินแบบโบราณเพื่อรักษาคุณค่าธรรมชาติไว้สูงสุด"
  },
  tokyo: {
    year: "Tokyo Origin",
    title: "MATCHA TIMES Co., Ltd.",
    subtitle: "ปฏิวัติวัฒนธรรมมัทฉะสู่ไลฟ์สไตล์ร่วมสมัย",
    desc: "ทีมผู้เชี่ยวชาญด้านมัทฉะชาวญี่ปุ่นได้รวมตัวกันที่โตเกียว ด้วยวิสัยทัศน์ที่จะทำให้มัทฉะไม่ได้จำกัดอยู่แค่ในห้องพิธีชงชา แต่เป็น 'Accessible Luxury' ที่ทุกคนสามารถเพลิดเพลินได้ทุกวันด้วยความสนุกและรอยยิ้ม"
  },
  bangkok: {
    year: "Bangkok Expansion",
    title: "สู่ใจกลางกรุงเทพมหานคร",
    subtitle: "Silom • Asok (Interchange 21) • Phrakanong",
    desc: "ส่งตรงใบชาแท้ 100% จากสวนในญี่ปุ่น สู่คอมมูนิตี้คนรักชาและร้านคาเฟ่ในไทย พร้อมเมนูสร้างสรรค์อย่าง Panda Yaki และ Fruit Layered Matcha ที่ครองใจลูกค้าทั้งคนไทยและชาวต่างชาติ"
  },
  pillars: [
    {
      title: "Authenticity",
      subtitle: "ความแท้จริง 100%",
      desc: "ไม่ผสมแป้ง ไม่แต่งสี ไม่ใส่สารเคมี มีเฉพาะใบชาคัดสรรจาก 4 แหล่งปลูกที่ดีที่สุดของญี่ปุ่น",
      icon: "shield-check"
    },
    {
      title: "Accessibility",
      subtitle: "เข้าถึงง่าย คุ้มค่า",
      desc: "ตั้งราคาที่ร้านกาแฟและผู้บริโภคเข้าถึงได้จริง ช่วยให้ร้านมีกำไรและลูกค้าได้ดื่มชาคุณภาพดีทุกวัน",
      icon: "smile"
    },
    {
      title: "Everyday Joy",
      subtitle: "ความสุขในทุกๆ วัน",
      desc: "เปลี่ยนช่วงเวลาดื่มชาให้เป็นจังหวะพักผ่อน คลายความเหนื่อยล้า เติมพลังสะอาดแบบสงบไม่ใจสั่น",
      icon: "sparkles"
    }
  ]
};

// Terroir Overview Data
const TERROIRS = {
  uji: {
    name: "Uji (宇治), Kyoto",
    characteristics: "แหล่งกำเนิดมัทฉะเก่าแก่ที่สุด กลิ่นหอมฟลอรัล อูมามิสูง ละมุน แทบไม่ขม",
    bestFor: "การชงพิธีการ (Usucha / Koicha) และมัทฉะลาเต้เนื้อเนียนนุ่ม"
  },
  nishio: {
    name: "Nishio (西尾), Aichi",
    characteristics: "สีเขียวมรกตเข้มสด รสชาติเข้มข้น ลุ่มลึก บอดี้หนา ทะลุความหวานมันของนม",
    bestFor: "มัทฉะลาเต้สากล ขนมหวาน และเบเกอรี่ที่ต้องการสีเขียวสวยโดดเด่น"
  },
  yame: {
    name: "Yame (八女), Fukuoka",
    characteristics: "เอกลักษณ์ความหวานลึก (Natural Sweetness) และกลิ่นถั่วคั่วชัดเจน (Strong Nutty)",
    bestFor: "คอกาแฟและสายลาเต้ที่ชอบโทนถั่ว นัว เข้ากับนมโอ๊ตได้อย่างมหัศจรรย์"
  },
  shizuoka: {
    name: "Shizuoka (静岡)",
    characteristics: "ธรรมชาติอันอุดมสมบูรณ์รอบภูเขาไฟฟูจิ โทนชาสดชื่น คลีน สดใส บาลานซ์เยี่ยม",
    bestFor: "เมนูฟรุตตี้ลาเต้ ผลไม้ โซดา และมัทฉะดื่มง่ายประจำวัน"
  }
};
