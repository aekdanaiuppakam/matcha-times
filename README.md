# 🍵 MATCHA TIMES — Sales Enablement & Product Guide Web App

เว็บแอปพลิเคชันนำเสนอสินค้า เปรียบเทียบโปรไฟล์รสชาติ และคำนวณต้นทุนต่อแก้วสำหรับมัทฉะแท้ 100% จากประเทศญี่ปุ่นของแบรนด์ **MATCHA TIMES Thailand**  
ออกแบบมาเพื่อเป็นเครื่องมือช่วยขาย (Sales Enablement Tool) ให้ฝ่ายขายนำไปเปิดให้ร้านกาแฟและลูกค้า B2B ดูได้อย่างมืออาชีพทั้งบนมือถือ แท็บเล็ต และคอมพิวเตอร์

---

## ✨ ฟีเจอร์หลัก (Key Features)

1. **🏛️ Brand Heritage & Philosophy**
   - ถ่ายทอดเรื่องราวประวัติศาสตร์ 150+ ปี จากสวนชาคู่บุญ *Hamachaen (はま茶園)* จังหวัดชิซูโอกะ สู่โตเกียว และ 3 สาขาใจกลางกรุงเทพฯ (สีลม, อโศก Interchange 21, พระโขนง)
   - 3 เสาหลักคุณค่า: Authenticity, Accessibility, Everyday Joy

2. **🔍 Interactive Matcha Matchmaker**
   - ระบบช่วยคัดกรองมัทฉะที่เหมาะสมใน 3 คลิก ตามประเภทเมนู (ลาเต้ / ชงใส / เบเกอรี่), โทนรสชาติ และงบประมาณ พร้อมปุ่มรีเซ็ตค่า

3. **📦 Product Catalog 8 SKUs**
   - แคตตาล็อกมัทฉะครบทั้ง 8 สายพันธุ์ พร้อมคะแนน Taste Profile 5 มิติ (Umami, Sweetness, Bitterness, Aroma, Nutty)
   - มีป้ายไฮไลต์ *Best Seller, Staff Pick, Flagship, Best Value, Ceremonial, Organic*
   - ระบบกรองตามแหล่งปลูก (Nishio, Uji, Yame, Shizuoka), สไตล์รสชาติ (Nutty vs Umami), และประเภทเมนู

4. **🥊 Side-by-Side Comparison Matrix**
   - วางมัทฉะเทียบกันแบบมวยต่อมวยได้สูงสุด 3 รายการพร้อมกัน
   - ไฮไลต์คะแนนสูงสุดของแต่ละคุณสมบัติแบบอัตโนมัติ พร้อมไกด์คำพูดสำหรับปิดการขาย

5. **📊 Real-time Cafe Cost & Margin Calculator**
   - เครื่องคิดเลขคำนวณต้นทุนและกำไรต่อแก้วแบบเรียลไทม์ ปรับสไลเดอร์กรัมผงชา (3-6g) และราคาขายหน้าร้านได้อิสระ
   - การ์ดสรุปอัตโนมัติ: ตัวที่ต้นทุนถูกที่สุด, ตัวที่ทำ Margin สูงสุด, และ Best Value Pick

6. **☕ Barista Standard Recipes**
   - สูตรชงมาตรฐานสำหรับร้านกาแฟ 3 เมนูยอดฮิต (Iced Matcha Latte, Pure Clear Matcha, Matcha Coconut) พร้อมเคล็ดลับบาริสต้า

7. **🛡️ Cafe Quality Care & FAQ**
   - ตอบข้อข้องใจร้านกาแฟเรื่องการจับตัวเป็นก้อนของผงโม่หินแท้, วิธีเก็บรักษาในตู้เย็นไม่ให้สีดรอป, อายุการเก็บรักษา, และการขอชุด Sample Kit

8. **📋 1-Click Copy Spec for LINE**
   - ปุ่มคัดลอกสรุปสเปกสินค้าลงคลิปบอร์ดในคลิกเดียว พร้อมนำไปวางส่งให้ลูกค้าในแชท LINE ได้ทันที

9. **📱 Mobile-First Responsive Design**
   - เมนู Drawer สำหรับมือถือ, ปุ่มลอยด่วน LINE (Floating Action Button), แถบเทียบสินค้าลอยตัว (Compare Drawer)

---

## 🛠️ โครงสร้างโปรเจกต์ (Project Structure)

```text
├── index.html                  # หน้าหลัก Single Page Application (SPA)
├── server.js                   # Zero-dependency Node.js HTTP file server
├── assets/
│   ├── css/
│   │   └── style.css           # Custom CSS (Zen Japanese Palette, animations, responsive)
│   ├── js/
│   │   ├── data.js             # ฐานข้อมูลสินค้าทั้ง 8 ตัว, ประวัติแบรนด์, แหล่งปลูก
│   │   └── app.js              # Business logic, reactive DOM, filters, calculator
│   └── images/
│       └── original-catalog.jpg # รูปใบราคาและแคตตาล็อกต้นฉบับ
├── .gitignore
└── README.md
```

---

## 🚀 วิธีเปิดใช้งานในเครื่อง (Local Setup)

โปรเจกต์นี้ใช้ **Vanilla JavaScript + Node.js (Built-in HTTP)** โดยไม่ต้องติดตั้ง `npm install` เพิ่มเติม:

```bash
# รันเซิร์ฟเวอร์
node server.js
```

เปิด Browser เข้าไปที่:
- **บนคอมพิวเตอร์:** [http://localhost:3000](http://localhost:3000)
- **บนมือถือ (ในเครือข่าย Wi-Fi เดียวกัน):** `http://<IP-เครื่องคอม>:3000`
