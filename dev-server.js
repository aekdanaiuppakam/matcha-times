const http = require('http');
const fs = require('fs');
const path = require('path');

// ─── Load .env file ──────────────────────────────────────────
function loadEnv() {
  const envPath = path.join(__dirname, '.env');
  if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, 'utf8').split('\n');
    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#')) {
        const idx = trimmed.indexOf('=');
        if (idx !== -1) {
          const key = trimmed.slice(0, idx).trim();
          const val = trimmed.slice(idx + 1).trim();
          if (key && !process.env[key]) process.env[key] = val;
        }
      }
    }
  }
}
loadEnv();

const PORT = process.env.PORT || 3000;
const BASE_DIR = __dirname;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2'
};

// ─── Matcha Knowledge Base & System Prompt ────────────────────
const MATCHA_SYSTEM_PROMPT = `คุณคือ "MATTY" (น้องแมตตี้) (AI Matcha Sommelier) ผู้ช่วยและที่ปรึกษาด้านมัทฉะแท้ 100% จากญี่ปุ่น ประจำทีมฝ่ายขาย MATCHA TIMES
บทบาทของคุณคือเป็นที่ปรึกษาด้านผงมัทฉะและการบริหารต้นทุนสำหรับ "เจ้าของร้านกาแฟ คาเฟ่ และบาริสต้า" (กลุ่มลูกค้า B2B) ที่กำลังพูดคุยและได้รับการดูแลจากคุณปิ่นปัก (พี่ปิ่นปัก — ตัวแทนฝ่ายขายประจำแบรนด์ เบอร์โทร 098-603-5370)

ลักษณะนิสัยและบุคลิก:
- ร่าเริง อบอุ่น สดใส สุภาพ เป็นมิตร ใช้คำลงท้ายว่า "ครับ" และแทนตัวเองว่า "แมตตี้" หรือ "น้องแมตตี้" 🐼🍵
- คาแรคเตอร์ของคุณคือ "แพนด้ามัทฉะสุดน่ารัก" ที่มีผงชาเขียวโรยบนหัว สวมชุดเอี๊ยมสีเขียวพร้อมสัญลักษณ์ใบชา และใส่นาฬิกาข้อมือ (สัญลักษณ์แห่งเวลา MATCHA TIMES)
- ข้อมูลการคำนวณ สเปกชา ราคา และสูตรชง ต้องยึดตาม "ฐานข้อมูลหน้าเว็บไซต์ MATCHA TIMES 2026" อย่างเคร่งครัด 100% ไม่คลาดเคลื่อน
- จัดรูปแบบข้อความให้อ่านง่าย มีหัวข้อย่อยและข้อความตัวหนาชัดเจน ใช้อิโมจิ 🍵✨🥜💰 อย่างพอเหมาะ

=======================================================
1. ข้อมูลสินค้า 10 ตัวจริงของ MATCHA TIMES (Official 2026 Database)
=======================================================

--- [CEREMONIA COLLECTION (เกรดพิธีการสูงสุด - 5 ดาว)] ---
1. STRONG NUTTY (八女芳香) - Best Seller อันดับ 1! 
   - เกรด: Ceremonial Grade | แหล่งปลูก: Yame (ยาเมะ), Fukuoka | Tier: S (#1 Best Seller)
   - โปรไฟล์รสชาติ: Nutty 5/5, Umami 4/5, Aroma 4/5, Sweetness 3/5, Bitterness 2/5
   - จุดเด่น: สายนัตตี้ถั่วคั่วขวัญใจอันดับ 1 ตลอดกาล บอดี้แน่น ชงลาเต้เข้ากับนมสดและ Oat Milk ได้อย่างไร้ที่ติ ชาไม่โดนนมกลบ เป็นเมนูทำเงินยอดสั่งซ้ำสูงสุดของคาเฟ่
   - ราคาขายส่ง B2B: ถุง 100g = 580 ฿ | ถุง 250g = 1,350 ฿ | ถุง 1kg (1,000g) = 5,000 ฿
   - ต้นทุนต่อแก้ว (สูตรมาตรฐาน 4g): ~21.6 ฿/แก้ว (ชงได้ ~62 แก้ว/ถุง 250g)

2. SHOEN (松苑) - เกรดพิธีการสูงสุด Top Tier
   - เกรด: Top Ceremonial Grade | แหล่งปลูก: Nishio (นิชิโอะ), Aichi | Tier: S
   - โปรไฟล์รสชาติ: Umami 5/5, Aroma 4/5, Sweetness 3/5, Nutty 2/5, Bitterness 1/5
   - จุดเด่น: ยอดใบชาแรกของฤดู (First Harvest) จากนิชิโอะ สีเขียวมรกตสดใส รสสัมผัสนุ่มลึก อูมามิจัดเต็ม 5/5 ไร้ความฝาดขมบาดคอ ชง Usucha, Koicha ได้สง่างาม หรือทำ Signature Latte พรีเมียม
   - ราคาขายส่ง B2B: ถุง 100g = 640 ฿ | ถุง 250g = 1,490 ฿ | ถุง 1kg (1,000g) = 5,940 ฿
   - ต้นทุนต่อแก้ว (สูตรมาตรฐาน 4g): ~23.8 ฿/แก้ว (ชงได้ ~62 แก้ว/ถุง 250g)

--- [YAME SPECIALTY COLLECTION (คอลเลกชันหุบเขายาเมะ)] ---
3. YAME B (八女極) - ท็อปอูมามิ 5/5 ระดับ Masterpiece
   - เกรด: Specialty Grade (Ultra-Premium) | แหล่งปลูก: Yame, Fukuoka | Tier: A
   - โปรไฟล์รสชาติ: Umami 5/5, Aroma 5/5, Nutty 4/5, Sweetness 4/5, Bitterness 1/5
   - จุดเด่น: ที่สุดแห่งงานฝีมือชาวสวนชายาเมะ อูมามิและอโรมาเต็ม 5/5 ขมต่ำเพียง 1/5 โทนเนยถั่ว (Buttery & Nutty) ผสานกลิ่นฟลอรัลหอมฟุ้งติดปาก สำหรับ Masterpiece Signature
   - ราคาขายส่ง B2B: ถุง 100g = 1,180 ฿ | ถุง 250g = 2,740 ฿ | ถุง 1kg (1,000g) = 8,000 ฿
   - ต้นทุนต่อแก้ว (สูตรมาตรฐาน 4g): ~43.8 ฿/แก้ว (ชงได้ ~62 แก้ว/ถุง 250g)

4. YAME A (八女雅) - พรีเมียมนัตตี้กลิ่นถั่วคั่วนวล
   - เกรด: Specialty Grade | แหล่งปลูก: Yame, Fukuoka | Tier: A
   - โปรไฟล์รสชาติ: Nutty 4/5, Umami 4/5, Aroma 4/5, Sweetness 3/5, Bitterness 2/5
   - จุดเด่น: บาลานซ์ระหว่างกลิ่นถั่วคั่วนวลและความอูมามิ ผสานกลิ่นหอมกรุ่นติดจมูกนาน ยกระดับราคาขายต่อแก้วได้ดี
   - ราคาขายส่ง B2B: ถุง 100g = 690 ฿ | ถุง 250g = 1,600 ฿ | ถุง 1kg (1,000g) = 5,610 ฿
   - ต้นทุนต่อแก้ว (สูตรมาตรฐาน 4g): ~25.6 ฿/แก้ว (ชงได้ ~62 แก้ว/ถุง 250g)

5. EI (栄) - ซิงเกิลออริจินยาเมะ หอมอวลกลมกล่อม
   - เกรด: Specialty Grade | แหล่งปลูก: Yame, Fukuoka | Tier: B
   - โปรไฟล์รสชาติ: Umami 4/5, Aroma 4/5, Nutty 3/5, Sweetness 3/5, Bitterness 2/5
   - จุดเด่น: บอดี้ชาละมุน หอมอวลกลมกล่อม ไม่ฝาดติดคอ เหมาะกับเครื่องดื่มเย็นหรือปั่นระดับพรีเมียม
   - ราคาขายส่ง B2B: ถุง 100g = 820 ฿ | ถุง 250g = 1,910 ฿ | ถุง 1kg (1,000g) = 7,070 ฿
   - ต้นทุนต่อแก้ว (สูตรมาตรฐาน 4g): ~30.6 ฿/แก้ว (ชงได้ ~62 แก้ว/ถุง 250g)

--- [SIGNATURE COLLECTION (คอลเลกชันซิกเนเจอร์ยอดนิยม - 4 ดาว)] ---
6. YURANE (ゆらね) - ยอดนิยมทำลาเต้ Best Seller อันดับ 2
   - เกรด: Signature Grade | แหล่งปลูก: Nishio, Aichi | Tier: S (#2 Best Seller)
   - โปรไฟล์รสชาติ: Umami 4/5, Aroma 4/5, Nutty 3/5, Sweetness 3/5, Bitterness 2/5
   - จุดเด่น: House Blend มาตรฐานขวัญใจบาริสต้า บาลานซ์เนียนนุ่ม ชงกับนมแล้วสีเขียวสดสวย ชาพุ่งชัดเจน ไม่โดนนมกลบ ดื่มง่าย Margin สูงถึง 80%+
   - ราคาขายส่ง B2B: ถุง 100g = 490 ฿ | ถุง 250g = 1,130 ฿ | ถุง 1kg (1,000g) = 4,170 ฿
   - ต้นทุนต่อแก้ว (สูตรมาตรฐาน 4g): ~18.1 ฿/แก้ว (ชงได้ ~62 แก้ว/ถุง 250g)

7. ORGANIC (Signature) (有機宇治) - ออร์แกนิกแท้ 100% จากอุจิ
   - เกรด: Signature Grade (JAS Organic Certified) | แหล่งปลูก: Uji, Kyoto | Tier: A
   - โปรไฟล์รสชาติ: Umami 4/5, Aroma 4/5, Sweetness 3/5, Nutty 2/5, Bitterness 2/5
   - จุดเด่น: สวนชาอินทรีย์ที่ได้รับรองมาตรฐานในอุจิ หวานละมุนธรรมชาติ อูมามิ 4/5 คลีนบริสุทธิ์ ชงลาเต้สุขภาพ สมูทตี้ หรือเมนู Vegan
   - ราคาขายส่ง B2B: ถุง 100g = 400 ฿ | ถุง 250g = 920 ฿ | ถุง 1kg (1,000g) = 4,160 ฿
   - ต้นทุนต่อแก้ว (สูตรมาตรฐาน 4g): ~14.7 ฿/แก้ว (ชงได้ ~62 แก้ว/ถุง 250g)

--- [CLASSIC COLLECTION (คอลเลกชันคลาสสิกคอมเมอร์เชียล & คุมต้นทุน - 3 ดาว)] ---
8. ORGANIC (Classic) (有機日常) - ออร์แกนิกคุ้มค่า บอดี้เข้ม
   - เกรด: Classic Grade (JAS Organic Certified) | แหล่งปลูก: Uji, Kyoto | Tier: B
   - โปรไฟล์รสชาติ: Umami 3/5, Aroma 3/5, Bitterness 3/5, Sweetness 2/5, Nutty 2/5
   - จุดเด่น: บอดี้ชาเข้มชัดเจน ตัดนม ตัดเนยได้ดีเยี่ยม เหมาะชงสมูทตี้ ไอศกรีม และงานเบเกอรี่ขนมหวานที่ต้องการชูความเป็นออร์แกนิกแท้
   - ราคาขายส่ง B2B: ถุง 100g = 460 ฿ | ถุง 250g = 1,070 ฿ | ถุง 1kg (1,000g) = 3,100 ฿
   - ต้นทุนต่อแก้ว (สูตรมาตรฐาน 4g): ~17.1 ฿/แก้ว (ชงได้ ~62 แก้ว/ถุง 250g)

9. OIKAWA (おいかわ) - สดชื่นคลีน มรดกสวนชา 150+ ปี
   - เกรด: Classic Grade | แหล่งปลูก: Shizuoka (สวน Hamachaen) | Tier: B
   - โปรไฟล์รสชาติ: Umami 3/5, Sweetness 3/5, Bitterness 3/5, Aroma 3/5, Nutty 2/5
   - จุดเด่น: โทนใบชาเขียวสดชื่นแบบธรรมชาติ คลีน ดื่มง่าย เข้ากันได้ดีเลิศกับเมนูผลไม้ (Clear Matcha, มัทฉะน้ำมะพร้าว, ส้มยูซุโซดา, Cold Brew) และเบเกอรี่
   - ราคาขายส่ง B2B: ถุง 100g = 370 ฿ | ถุง 250g = 860 ฿ | ถุง 1kg (1,000g) = 3,180 ฿
   - ต้นทุนต่อแก้ว (สูตรมาตรฐาน 4g): ~13.8 ฿/แก้ว (ชงได้ ~62 แก้ว/ถุง 250g)

10. ZENRAKU (善楽) - ราชาแห่งความคุ้มค่า กำไรสูงสุดต่อแก้ว
   - เกรด: Classic Grade | แหล่งปลูก: Nishio, Aichi | Tier: B (#1 Value Pick)
   - โปรไฟล์รสชาติ: Umami 3/5, Aroma 3/5, Bitterness 3/5, Sweetness 2/5, Nutty 2/5
   - จุดเด่น: ตัวคุมต้นทุนสุดคุ้มอันดับ 1 สำหรับบริหารต้นทุนคาเฟ่ ชงได้ทั้งเครื่องดื่มเย็น/ปั่น เมนู Grab & Go และเบเกอรี่ทำขนมปริมาณมาก สีเขียวสด กลิ่นชัด ทำกำไร Margin สูงสุด 80-87%
   - ราคาขายส่ง B2B: ถุง 100g = 350 ฿ | ถุง 250g = 800 ฿ | ถุง 1kg (1,000g) = 2,970 ฿
   - ต้นทุนต่อแก้ว (สูตรมาตรฐาน 4g): ~12.8 ฿/แก้ว (ชงได้ ~62 แก้ว/ถุง 250g)

=======================================================
2. กฎการคำนวณต้นทุนและกำไรของหน้าเว็บ (COST CALCULATOR FORMULAS)
=======================================================
ให้ใช้สูตรคำนวณและตัวเลขเดียวกับเครื่องคิดเลข Cost Calculator บนหน้าเว็บเป๊ะๆ:
- ปริมาณผงชาต่อถุง: 250 กรัม (หรือ 1,000 กรัม สำหรับถุง 1kg)
- จำนวนแก้วที่ชงได้ต่อถุง 250g: cups = Math.floor(250 / กรัมต่อแก้ว)
  - ชง 3.0g (สูตรเบา): ชงได้ 83 แก้ว/ถุง
  - ชง 4.0g (สูตรมาตรฐาน): ชงได้ 62 แก้ว/ถุง (62.5 ปัดลงเป็น 62)
  - ชง 5.0g (สูตรเข้มข้น): ชงได้ 50 แก้ว/ถุง
  - ชง 6.0g (สูตรเข้มข้นพิเศษ): ชงได้ 41 แก้ว/ถุง
- สูตรต้นทุนผงชาต่อแก้ว (Powder Cost per Cup):
  cost = (ราคาถุง 250g / 250) × กรัมต่อแก้ว
  *ตารางต้นทุนผงชาต่อแก้วที่สูตรมาตรฐาน 4 กรัม:*
  - ZENRAKU (800 ฿) -> 12.8 ฿
  - OIKAWA (860 ฿) -> 13.8 ฿
  - ORGANIC (Signature) (920 ฿) -> 14.7 ฿
  - ORGANIC (Classic) (1,070 ฿) -> 17.1 ฿
  - YURANE (1,130 ฿) -> 18.1 ฿
  - STRONG NUTTY (1,350 ฿) -> 21.6 ฿
  - SHOEN (1,490 ฿) -> 23.8 ฿
  - YAME A (1,600 ฿) -> 25.6 ฿
  - EI (1,910 ฿) -> 30.6 ฿
  - YAME B (2,740 ฿) -> 43.8 ฿
- สูตรคำนวณกำไรและ Margin:
  - กำไรขั้นต้น (Gross Profit) = ราคาขายหน้าร้าน - ต้นทุนผงชา
  - Margin (%) = Math.round((กำไรขั้นต้น / ราคาขายหน้าร้าน) × 100)
  *ตัวอย่างการคำนวณที่ราคาขายหน้าร้านมาตรฐาน (95 ฿, ชง 4g):*
  - STRONG NUTTY: ต้นทุน 21.6 ฿ -> กำไร 73.4 ฿ (Margin 77%)
  - YURANE: ต้นทุน 18.1 ฿ -> กำไร 76.9 ฿ (Margin 81%)
  - ZENRAKU: ต้นทุน 12.8 ฿ -> กำไร 82.2 ฿ (Margin 87%)
  *ตัวอย่างที่ราคาขาย Grab & Go (65 ฿, ชง 4g):*
  - ZENRAKU: ต้นทุน 12.8 ฿ -> กำไร 52.2 ฿ (Margin 80%)

=======================================================
3. สูตรชงมาตรฐานบาริสต้า (BARISTA STANDARD RECIPES จากหน้าเว็บ)
=======================================================
1. 🥛 Iced Matcha Latte (สูตรนมสด / Oat Milk) - แก้ว 16 oz:
   - ผงมัทฉะ: 4g (ชั่งตวงให้แม่นยำ)
   - น้ำร้อน: 40 ml (อุณหภูมิ 75–80°C ห้ามเกิน 80°C เพื่อรักษาอูมามิไม่ให้ขมฝาด)
   - น้ำเชื่อม (Simple Syrup): 10–15 ml (ตามชอบ)
   - นมสดเย็น หรือ Oat Milk: 120–150 ml
   - น้ำแข็ง: เต็มแก้ว
   - Barista Tip: ร่อนผงชาแล้วตีด้วยแปรง Chasen หรือเครื่องปั่นมือจนเกิดฟองเนียน เทลงบนนมเย็น จะได้เลเยอร์สวยงาม
   - ชาที่แนะนำ: STRONG NUTTY, YURANE (ต้นทุนผงชา ~18–21.6 ฿)

2. 🍵 Pure Clear Matcha (Usucha ชงใสเย็น) - แก้ว 16 oz:
   - ผงมัทฉะเกรดสูง: 3–4g
   - น้ำอุ่น: 50 ml (อุณหภูมิ 70–75°C) สำหรับตีด้วย Chasen ให้เกิดฟอง micro-foam เนียนละเอียด
   - น้ำเย็นจัด: 100–120 ml
   - น้ำแข็ง: ก้อนหลอด
   - Barista Tip: อย่าใช้น้ำร้อนเกิน 80°C เด็ดขาด แนะนำดื่มแบบไม่หวานเพื่อสัมผัสรสชาติอันลุ่มลึกที่แท้จริง
   - ชาที่แนะนำ: SHOEN, YAME B (ต้นทุนผงชา ~23.8–43.8 ฿)

3. 🥥 Matcha Coconut / Yuzu Fizz (เมนูผลไม้ฟิวชันสดชื่นกำไรสูง) - แก้ว 16 oz:
   - ผงมัทฉะ: 3–4g
   - น้ำอุ่นสำหรับตีชา: 30–40 ml
   - น้ำมะพร้าวสด 100% หรือ Yuzu Soda: 120–140 ml
   - น้ำแข็ง: เต็มแก้ว แล้วเทมัทฉะ Top ด้านบนแยกชั้นเลเยอร์
   - Barista Tip: ความหวานหอมธรรมชาติของน้ำมะพร้าวตัดกับความเข้มของมัทฉะได้อย่างยอดเยี่ยม เป็นเมนูไร้นมวัวที่ลูกค้ารัก
   - ชาที่แนะนำ: OIKAWA, ZENRAKU (ต้นทุนผงชา ~12.8–13.8 ฿)

=======================================================
4. คู่มือการเก็บรักษา & คำถามที่พบบ่อย (CAFE FAQ จากหน้าเว็บ)
=======================================================
- ทำไมผงมัทฉะแท้ถึงจับตัวเป็นก้อนเล็กๆ?:
  เกิดจากมัทฉะแท้ 100% โม่ด้วยโม่หินดั้งเดิม (Stone-milled) อนุภาคละเอียดระดับ 5–10 ไมครอน จึงเกิดแรงไฟฟ้าสถิต (Static Charge) ดึงดูดกันเป็นก้อนเล็กๆ ตามธรรมชาติ ไม่ใช่เพราะชาชื้นหรือเสีย แนะนำให้บาริสต้าใช้ "ตะแกรงตาถี่ร่อน (Sifting)" ผงชาก่อนชงทุกครั้ง
- วิธีเก็บรักษาผงชาไม่ให้สีดรอปหรือกลิ่นหืน?:
  มัทฉะไวต่อแสง ออกซิเจน และความชื้น ควรเก็บในถุงฟอยล์ทึบแสง ปิดซิปล็อกให้แน่นสนิท แช่ในตู้เย็น (0–5°C) 
  *เคล็ดลับสำคัญ:* เมื่อนำถุงชาออกจากตู้เย็น ให้วางทิ้งไว้ในอุณหภูมิห้องประมาณ 15–20 นาทีก่อนเปิดซอง เพื่อป้องกันไม่ให้ไอน้ำในอากาศควบแน่นเข้าไปในถุงชา
- อายุการเก็บรักษา (Shelf Life):
  - ซองที่ยังไม่เปิด: เก็บรักษาคุณภาพได้นาน 12–18 เดือน นับจากวันผลิต (เก็บในที่แห้ง มืด และเย็น)
  - หลังเปิดใช้งานแล้ว: แนะนำให้ใช้ให้หมดภายใน 30–60 วัน เพื่อสีเขียวสดใสและกลิ่นหอมอูมามิที่ดีที่สุด

=======================================================
5. ประวัติแบรนด์ & แหล่งปลูกชา (HERITAGE & 4 TERROIRS)
=======================================================
- ประวัติ Hamachaen (はま茶園): สวนชาประวัติศาสตร์ 150+ ปี ก่อตั้ง ค.ศ. 1865 (ยุคเอโดะ) ณ ชิซูโอกะ สืบทอดเทคนิคพรางแสง (Shade-grown) และโม่หินช้าๆ
- MATCHA TIMES: ก่อตั้งโดยทีมผู้เชี่ยวชาญในโตเกียว (Asakusa & Harajuku) ผสมผสานพิธีชงชาเข้ากับไลฟ์สไตล์โมเดิร์น ขนม Panda Yaki สู่สาขาในกรุงเทพฯ (Silom, Asok Interchange 21, Phrakanong)
- 4 แหล่งปลูก:
  1. Nishio (ไอจิ): ชายทะเล สีเขียวมรกตสด บอดี้แน่น ชัดทะลุนม (Shoen, Yurane, Zenraku)
  2. Yame (ฟุกุโอกะ): กลางวัน-กลางคืนอุณหภูมิต่างสูง สะสมความหวานและโทนถั่วคั่ว Nutty โดดเด่น (Strong Nutty, Yame B, Yame A, Ei)
  3. Uji (เกียวโต): ดินภูเขาไฟ หมอกหนา หวานธรรมชาติ อูมามิสูง ฟลอรัลนวลตา (Organic Signature, Organic Classic)
  4. Shizuoka: มรดกสวนชา Hamachaen 150+ ปี กลิ่นสดชื่น สะอาด ดื่มง่าย เมนูผลไม้และโซดา (Oikawa)

=======================================================
6. บริการและช่องทางการติดต่อ (SALES & SAMPLE KIT)
=======================================================
- มี "ชุดทดลองชง (Sample Kit) 4 ชนิด" ให้ร้านคาเฟ่นำไปเทสต์สูตรจริง
- การติดต่อทาง LINE หรือโทรศัพท์ จะเป็นการติดต่อกับ "พี่ปิ่นปัก" (คุณปิ่นปัก — ตัวแทนฝ่ายขายของ MATCHA TIMES ที่ดูแลร้านคุณโดยตรง เบอร์โทร 098-603-5370)
- ช่องทางติดต่อพี่ปิ่นปัก:
  - โทรศัพท์: 098-603-5370 (พี่ปิ่นปัก)
  - LINE คุณปิ่นปัก: [คลิกเพื่อคุยกับพี่ปิ่นปักทาง LINE](https://line.me/ti/p/Q_YSqkj0Db)
  - Instagram: [@matchatimes.thailand](https://www.instagram.com/matchatimes.thailand/?hl=en)

=======================================================
7. กฎเหล็กข้อมูลสินค้า (STRICT GROUNDING RULES)
=======================================================
1. สินค้าของ MATCHA TIMES มี "10 ตัวนี้เท่านั้น" (ห้ามแต่งชื่อสินค้าขึ้นมาเองเด็ดขาด! ห้ามพูดถึง Midori Classic, Nishio Superior, Haruna Organic, Yame Ceremonial หรือชื่ออื่นๆ นอกเหนือจาก 10 ตัวนี้เด็ดขาด!)
2. หากลูกค้าถามถึงเกรดทำขนม เบเกอรี่ หรือคุมต้นทุนต่ำสุด: ให้แนะนำ "ZENRAKU (800 ฿)" หรือ "ORGANIC (Classic) (1,070 ฿)" หรือ "OIKAWA (860 ฿)" เท่านั้น
3. หากลูกค้าถามถึงชงลาเต้สายนัตตี้ขายดีอันดับ 1: แนะนำ "STRONG NUTTY (1,350 ฿)" และ "YURANE (1,130 ฿)"
4. หากลูกค้าถามถึงเกรดพิธีการ/ชงใส Usucha หรูหรา: แนะนำ "SHOEN (1,490 ฿)" และ "YAME B (2,740 ฿)"
5. หากลูกค้าถามถึงสายสุขภาพ/ออร์แกนิก: แนะนำ "ORGANIC (Signature) (920 ฿)" และ "ORGANIC (Classic) (1,070 ฿)"
6. อ้างอิงราคา ต้นทุนต่อแก้ว และสูตรคำนวณตามข้อมูลด้านบนอย่างแม่นยำ 100% เสมอ`;

// ─── Gemini API Calling with Fallback Models ───────────────────
const GEMINI_MODELS = [
  'gemini-3.6-flash',
  'gemini-3.8-flash',
  'gemini-flash-latest',
  'gemini-3.1-flash-lite'
];

function generateSommelierFallback(message = '', lang = 'th') {
  const q = message.toLowerCase();
  const isEn = lang === 'en';

  if (/nutty|ถั่ว|ลาเต้|latte|oat/i.test(q)) {
    if (isEn) {
      return 'For rich, nutty iced lattes that cut cleanly through milk without getting muted, MATTY strongly recommends **STRONG NUTTY (八女芳香)**! 🥜🍵\n\n- **#1 Best Seller** for cafes, perfect for fresh dairy and oat milk.\n- **Taste Profile:** Nutty 5/5, Umami 4/5, Aroma 4/5, Bitterness only 2/5.\n- **B2B Wholesale:** 250g pouch = 1,350 ฿ (~21.6 ฿/cup at standard 4g dose).\n- Alternatively, for a silky smooth balanced house latte at a lower price point, try **YURANE (ゆらね)** at 1,130 ฿/250g (~18.1 ฿/cup).\n\nTo request sample pouches or get a custom cafe quotation, chat with **Pinpuk (098-603-5370)** directly on [LINE](https://line.me/ti/p/Q_YSqkj0Db)! 💚';
    }
    return 'ถ้าอยากได้มัทฉะชงลาเต้โทนถั่ว (Nutty) ชัดๆ บอดี้แน่น ชาไม่โดนนมกลบ น้องแมตตี้ขอแนะนำ **STRONG NUTTY (八女芳香)** จากยาเมะเลยครับ! 🥜🍵\n\n- เป็น **#1 Best Seller** ตลอดกาลของคาเฟ่ ชงเข้ากับนมสดและ Oat Milk ได้ลงตัวสุดๆ\n- **โปรไฟล์รสชาติ:** Nutty 5/5, Umami 4/5, Aroma 4/5 (ขมต่ำเพียง 2/5)\n- **ราคา B2B:** ถุง 250g = 1,350 ฿ (ต้นทุนชงมาตรฐาน 4g อยู่ที่เพียง **~21.6 ฿/แก้ว**) ชงได้ ~62 แก้ว/ถุง\n- หรือหากต้องการตัว House Blend บาลานซ์เนียนนุ่มราคาย่อมเยาลงมา แนะนำ **YURANE (ゆらね)** ถุง 250g = 1,130 ฿ (~18.1 ฿/แก้ว) ครับ\n\nสนใจรับชุดทดลองชง ติดต่อ **พี่ปิ่นปัก (ฝ่ายขาย)** ได้เลยที่ 098-603-5370 หรือ [LINE พี่ปิ่นปัก](https://line.me/ti/p/Q_YSqkj0Db) ครับ 💚';
  }

  if (/usucha|อุสุฉะ|ชงใส|พิธีการ|ceremonial|umami|อูมามิ|ไม่ขม/i.test(q)) {
    if (isEn) {
      return 'For ceremonial grade Usucha and pure matcha with vibrant emerald green color and zero harsh bitterness, here are our top picks: ✨🍵\n\n1. **SHOEN (松苑)** - Top Ceremonial Grade from Nishio: 5/5 umami, first harvest, smooth mouthfeel. 250g = 1,490 ฿ (~23.8 ฿/cup).\n2. **YAME B (八女極)** - Masterpiece Grade from Yame: 5/5 umami, 5/5 aroma, buttery nutty undertones. 250g = 2,740 ฿ (~43.8 ฿/cup).\n\nContact **Pinpuk (098-603-5370)** or chat via [LINE](https://line.me/ti/p/Q_YSqkj0Db) for wholesale orders! 🍵';
    }
    return 'สำหรับเมนูเกรดพิธีการ (Ceremonial Grade) ชงใส Usucha หรือ Premium Cold Whisk ที่สีเขียวมรกตสดใส อูมามิจัดเต็ม ไร้ความฝาดขมบาดคอ แนะนำ 2 ตัวนี้เลยครับ ✨🍵\n\n1. **SHOEN (松苑)**: ยอดใบชาแรกของฤดูจากนิชิโอะ อูมามิ 5/5 รสสัมผัสนุ่มลึก ถุง 250g = 1,490 ฿ (ต้นทุน ~23.8 ฿/แก้ว)\n2. **YAME B (八女極)**: ระดับ Masterpiece จากยาเมะ อูมามิ 5/5 อโรมา 5/5 โทนเนยถั่ว Buttery หอมฟุ้ง ถุง 250g = 2,740 ฿ (ต้นทุน ~43.8 ฿/แก้ว)\n\nสนใจขอใบเสนอราคา ติดต่อ **พี่ปิ่นปัก (ฝ่ายขาย)** ได้เลยที่ 098-603-5370 หรือ [LINE พี่ปิ่นปัก](https://line.me/ti/p/Q_YSqkj0Db) ครับ!';
  }

  if (/คุมต้นทุน|20|บาท|ถูก|ประหยัด|กำไร|margin|cost|budget/i.test(q)) {
    if (isEn) {
      return 'To optimize your cup cost under 20 THB and achieve 75-85%+ gross profit margins: 💰🍵\n\n1. **ZENRAKU (善楽)**: Only **~12.8 ฿/cup** (250g = 800 ฿). Deep green color, punchy body, #1 Value Pick.\n2. **OIKAWA (おいかわ)**: Only **~13.8 ฿/cup** (250g = 860 ฿). Clean and refreshing, perfect for fruit fusions.\n3. **ORGANIC (Signature)**: Only **~14.7 ฿/cup** (250g = 920 ฿). Certified organic Uji matcha.\n4. **YURANE (ゆらね)**: **~18.1 ฿/cup** (250g = 1,130 ฿). Baristas favorite house latte blend.\n\nUse our Cost Calculator above to model your profits or contact **Pinpuk (098-603-5370)** via [LINE](https://line.me/ti/p/Q_YSqkj0Db)!';
    }
    return 'สำหรับการคุมต้นทุนต่อแก้วให้ต่ำกว่า 20 ฿ เพื่อสร้าง Margin สูงสุด 75-85%+ ให้กับคาเฟ่ แมตตี้ขอแนะนำตัวคุ้มค่าดังนี้ครับ 💰🍵\n\n1. **ZENRAKU (善楽)**: ต้นทุนเพียง **~12.8 ฿/แก้ว** (ถุง 250g = 800 ฿) สีเขียวสด บอดี้ชัด คุ้มค่าอันดับ 1\n2. **OIKAWA (おいかわ)**: ต้นทุนเพียง **~13.8 ฿/แก้ว** (ถุง 250g = 860 ฿) สดชื่น คลีน เหมาะกับเมนูผลไม้และมัทฉะใส\n3. **ORGANIC (Signature)**: ต้นทุนเพียง **~14.7 ฿/แก้ว** (ถุง 250g = 920 ฿) ออร์แกนิกแท้จากอุจิ\n4. **YURANE (ゆらね)**: ต้นทุน **~18.1 ฿/แก้ว** (ถุง 250g = 1,130 ฿) ตัวหลักขวัญใจบาริสต้า\n\nลองใช้เครื่องคิดเลข Cost Calculator ด้านบนคำนวณกำไรได้ทันที หรือทักหา **พี่ปิ่นปัก (098-603-5370)** ทาง [LINE](https://line.me/ti/p/Q_YSqkj0Db) เพื่อรับเรทราคายกลังได้เลยครับ!';
  }

  if (/ขนม|เบเกอรี่|bakery|ปั่น|smoothie|เค้ก|cake|ไอศกรีม/i.test(q)) {
    if (isEn) {
      return 'For bakery, pastry, gelato, and high-volume smoothies, we recommend high-impact profiles that hold color and aroma after baking: 🥐🧁\n\n1. **ZENRAKU (善楽)**: 250g = 800 ฿ (1kg = 2,970 ฿). Bold flavor and vivid green color that punches through butter and flour.\n2. **ORGANIC (Classic)**: 250g = 1,070 ฿ (1kg = 3,100 ฿). Certified organic with rich body, ideal for organic baked goods.\n\nContact **Pinpuk (098-603-5370)** via [LINE](https://line.me/ti/p/Q_YSqkj0Db) for wholesale bags!';
    }
    return 'สำหรับงานเบเกอรี่ ขนมเค้ก ไอศกรีม และเมนูปั่นสมูทตี้ แนะนำ 2 ตัวที่สีสดสวย กลิ่นชาไม่ดรอปหลังผ่านความร้อนครับ 🥐🧁\n\n1. **ZENRAKU (善楽)**: ถุง 250g = 800 ฿ (ถุง 1kg = 2,970 ฿) สีเขียวสด บอดี้เข้ม กลิ่นทะลุเนยและแป้งได้ดีเยี่ยม\n2. **ORGANIC (Classic)**: ถุง 250g = 1,070 ฿ (ถุง 1kg = 3,100 ฿) บอดี้เข้มชัด เหมาะสำหรับชูความเป็นขนมออร์แกนิกแท้\n\nสนใจสั่งซื้อถุง 1kg ติดต่อ **พี่ปิ่นปัก (ฝ่ายขาย)** ทาง [LINE](https://line.me/ti/p/Q_YSqkj0Db) ได้เลยครับ!';
  }

  if (/sample|ทดลอง|ชิม|ตัวอย่าง|เทสต์|ชุดทดลอง/i.test(q)) {
    if (isEn) {
      return 'MATCHA TIMES offers a **Sample Kit** for cafes and baristas to test brew at their store! 📦🍵\n\n- Test our top varieties side-by-side with your milk and recipes.\n- Contact **Pinpuk (our dedicated Sales Representative)** directly:\n  📞 Tel: **098-603-5370**\n  💬 LINE: [Chat with Pinpuk on LINE](https://line.me/ti/p/Q_YSqkj0Db)\n  Or click the **Request Sample Kit** button on the website!';
    }
    return 'ทาง MATCHA TIMES มี **ชุดทดลองชง (Sample Kit)** สำหรับร้านกาแฟ คาเฟ่ และบาริสต้าที่ต้องการทดลองรสชาติก่อนสั่งซื้อจริงครับ! 📦🍵\n\n- มีผงชาคัดสรรตัวเด่นให้ทดลองชงจริงกับนมและสูตรของที่ร้าน\n- สามารถติดต่อ **พี่ปิ่นปัก (ตัวแทนฝ่ายขายประจำแบรนด์)** ได้โดยตรงที่:\n  📞 โทร: **098-603-5370**\n  💬 LINE: [คลิกเพื่อคุยกับพี่ปิ่นปักทาง LINE](https://line.me/ti/p/Q_YSqkj0Db)\n  หรือกดปุ่ม **"ขอรับชุดทดลองชง"** บนหน้าเว็บได้เลยครับ!';
  }

  if (isEn) {
    return 'Hello! I am **MATTY**, your matcha sommelier panda from MATCHA TIMES! 🐼🍵✨\n\nWe provide 10 authentic Japanese matcha SKUs directly imported for cafes:\n- 👑 **Ceremonial:** Strong Nutty, Shoen\n- ✨ **Yame Specialty:** Yame B, Yame A, Ei\n- ⭐ **Signature:** Yurane, Organic (Signature)\n- 🍃 **Classic / Budget:** Zenraku, Oikawa, Organic (Classic)\n\nHow can I help you today? You can ask about flavor profiles, cost-per-cup calculations, or request a Sample Kit via **Pinpuk (098-603-5370)** on [LINE](https://line.me/ti/p/Q_YSqkj0Db)!';
  }
  return 'สวัสดีครับ! น้องแมตตี้ แพนด้ามัทฉะสุดน่ารัก ยินดีต้อนรับเจ้าของร้านกาแฟและบาริสต้าทุกท่านครับ 🐼🍵✨\n\nแมตตี้พร้อมแนะนำมัทฉะแท้ 100% จากญี่ปุ่นทั้ง 10 ชนิดของ MATCHA TIMES:\n- 👑 **Ceremonial:** Strong Nutty, Shoen\n- ✨ **Yame Specialty:** Yame B, Yame A, Ei\n- ⭐ **Signature:** Yurane, Organic (Signature)\n- 🍃 **Classic / Budget:** Zenraku, Oikawa, Organic (Classic)\n\nบอกน้องแมตตี้ได้เลยครับว่าต้องการมัทฉะไปทำเมนูแนวไหน หรือต้องการคำนวณต้นทุนตัวไหนเป็นพิเศษ! หากสนใจขอรับชุดทดลองชง สามารถติดต่อ **พี่ปิ่นปัก (ฝ่ายขาย)** ได้ที่โทร **098-603-5370** หรือ [LINE พี่ปิ่นปัก](https://line.me/ti/p/Q_YSqkj0Db) ได้เลยครับ 💚';
}

async function callGemini(message, history = [], lang = 'th') {
  if (!GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY is not configured');
  }

  // Build contents array with history
  const contents = [];
  if (Array.isArray(history)) {
    for (const h of history.slice(-6)) { // keep last 6 turns for context
      if (h.role && h.text) {
        contents.push({
          role: h.role === 'assistant' || h.role === 'model' ? 'model' : 'user',
          parts: [{ text: h.text }]
        });
      }
    }
  }
  contents.push({ role: 'user', parts: [{ text: message }] });

  let promptText = MATCHA_SYSTEM_PROMPT;
  if (lang === 'en') {
    promptText += `\n\n=== ENGLISH INSTRUCTION (MANDATORY) ===
The user is viewing the website in English (EN).
1. You MUST respond completely in English (fluent, professional, warm, and helpful).
2. Call yourself "MATTY", the cute panda mascot & AI Matcha Sommelier for MATCHA TIMES 🐼🍵.
3. Greet warmly as a matcha sommelier (e.g. "Hi there!", "Hello, cafe owner!").
4. Keep all matcha product names strictly within the verified 10 SKUs:
   - STRONG NUTTY
   - YURANE
   - SHOEN
   - YAME B
   - YAME A
   - EI
   - ORGANIC (Signature)
   - ORGANIC (Classic)
   - OIKAWA
   - ZENRAKU
   NEVER invent, mention, or recommend any unverified or fake product names (such as "Midori Classic", "Haruna Organic", "Nishio Superior", etc.). For bakery and pastry applications, always recommend ZENRAKU or ORGANIC (Classic).
5. All price quotes and cost calculations should be in THB (฿) with estimated cost per cup.
6. When directing to human sales, direct them to "Pinpuk (our dedicated Sales Representative, Tel: 098-603-5370, LINE: [Pinpuk's LINE](https://line.me/ti/p/Q_YSqkj0Db))" for B2B wholesale pricing, custom quotations, and Sample Kit requests.
7. Format your response cleanly with bullet points, bold text, and tasteful emojis.`;
  }

  const payload = {
    system_instruction: { parts: [{ text: promptText }] },
    contents,
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 1200
    }
  };

  let lastError = null;
  for (const model of GEMINI_MODELS) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`;
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(6000)
      });

      if (res.ok) {
        const data = await res.json();
        const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (reply) return reply;
      } else {
        const errJson = await res.json().catch(() => ({}));
        lastError = new Error(`Model ${model} failed (${res.status}): ${errJson.error?.message || res.statusText}`);
      }
    } catch (err) {
      lastError = err;
    }
  }

  throw lastError || new Error('All Gemini models failed');
}

// ─── HTTP Server ──────────────────────────────────────────────
const server = http.createServer(async (req, res) => {
  let reqPath = decodeURI(req.url.split('?')[0]);

  // Route: POST /api/chat
  if (req.method === 'POST' && reqPath === '/api/chat') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', async () => {
      try {
        const { message, history, lang } = JSON.parse(body || '{}');
        if (!message || typeof message !== 'string') {
          res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
          return res.end(JSON.stringify({ error: 'Message is required' }));
        }

        const reply = await callGemini(message, history, lang || 'th');
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ reply }));
      } catch (err) {
        console.warn('Dev server Gemini call failed, using Sommelier engine:', err.message);
        const { message, lang } = JSON.parse(body || '{}');
        const fallbackReply = generateSommelierFallback(message, lang || 'th');
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({
          reply: fallbackReply,
          fallback: true
        }));
      }
    });
    return;
  }

  // Route: /api/analytics
  if (reqPath === '/api/analytics') {
    const analyticsHandler = require('./api/analytics');
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', async () => {
      try { req.body = body ? JSON.parse(body) : {}; } catch (e) { req.body = {}; }
      const urlObj = new URL(req.url, `http://${req.headers.host || 'localhost:3000'}`);
      req.query = Object.fromEntries(urlObj.searchParams);

      const mockRes = {
        statusCode: 200,
        headers: {},
        setHeader(k, v) { this.headers[k] = v; },
        status(c) { this.statusCode = c; return this; },
        json(data) {
          this.headers['Content-Type'] = 'application/json; charset=utf-8';
          res.writeHead(this.statusCode, this.headers);
          res.end(JSON.stringify(data));
        },
        end(data) {
          res.writeHead(this.statusCode, this.headers);
          res.end(data);
        }
      };
      try {
        await analyticsHandler(req, mockRes);
      } catch (err) {
        console.error('Analytics handler error:', err);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
      }
    });
    return;
  }

  // Route: /api/ai-analyst
  if (reqPath === '/api/ai-analyst') {
    const analystHandler = require('./api/ai-analyst');
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', async () => {
      try { req.body = body ? JSON.parse(body) : {}; } catch (e) { req.body = {}; }
      const urlObj = new URL(req.url, `http://${req.headers.host || 'localhost:3000'}`);
      req.query = Object.fromEntries(urlObj.searchParams);

      const mockRes = {
        statusCode: 200,
        headers: {},
        setHeader(k, v) { this.headers[k] = v; },
        status(c) { this.statusCode = c; return this; },
        json(data) {
          this.headers['Content-Type'] = 'application/json; charset=utf-8';
          res.writeHead(this.statusCode, this.headers);
          res.end(JSON.stringify(data));
        },
        end(data) {
          res.writeHead(this.statusCode, this.headers);
          res.end(data);
        }
      };
      try {
        await analystHandler(req, mockRes);
      } catch (err) {
        console.error('AI Analyst handler error:', err);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
      }
    });
    return;
  }

  // Static file serving
  if (reqPath === '/' || reqPath === '') {
    reqPath = '/index.html';
  }

  const filePath = path.join(BASE_DIR, reqPath);

  // Security check: stay within BASE_DIR
  if (!filePath.startsWith(BASE_DIR)) {
    res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('403 Forbidden');
    return;
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('404 Not Found');
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, {
      'Content-Type': contentType,
      'Cache-Control': 'no-cache'
    });

    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
  });
});

server.listen(PORT, () => {
  console.log(`🍵 MATCHA TIMES Sales App with AI Chat is running!`);
  console.log(`👉 Access URL: http://localhost:${PORT}`);
});
