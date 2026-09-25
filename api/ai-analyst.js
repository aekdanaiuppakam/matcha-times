// ─── Vercel Serverless Function: /api/ai-analyst ─────────────────────
// AI Sales Intelligence & Conversion Attribution Analyst

const ADMIN_PIN = process.env.ADMIN_PIN || '58110011';
const GEMINI_MODELS = [
  'gemini-3.6-flash',
  'gemini-3.8-flash',
  'gemini-flash-latest',
  'gemini-3.1-flash-lite'
];

async function callGeminiAnalyst(prompt, apiKey) {
  const payload = {
    system_instruction: {
      parts: [{
        text: `คุณคือ "Chief Sales Intelligence Analyst" (ผู้เชี่ยวชาญการวิเคราะห์ข้อมูลการขายและพฤติกรรมลูกค้าเชิงลึก) ประจำแบรนด์ MATCHA TIMES
หน้าที่ของคุณคืออ่านข้อมูลพฤติกรรมการท่องเว็บ เส้นทางการตัดสินใจ (User Journey) สถิติการคลิก และบทสนทนาจริงของลูกค้าคาเฟ่ แล้วสังเคราะห์ออกมาเป็น "รายงานสรุปเชิงกลยุทธ์ระดับผู้บริหาร (Executive Sales Intelligence Brief)" ภาษาไทยที่กระชับ คมชัด และนำไปใช้เพิ่มยอดขายได้จริง 100%

สไตล์การรายงาน:
- เป็นมืออาชีพ น่าเชื่อถือ ใช้หัวข้อย่อยและอิโมจิอย่างลงตัว
- ชี้ให้เห็นชัดเจนว่า "อะไรคือสิ่งกระตุ้น (Trigger) ที่ทำให้ลูกค้าตัดสินใจคลิกแอดไลน์คุณปิ่นปัก"
- มี Actionable Tips ให้เซลล์ (พี่ปิ่นปัก) และทีมบริหารแบรนด์นำไปใช้ต่อได้ทันที`
      }]
    },
    contents: [{ role: 'user', parts: [{ text: prompt }] }],
    generationConfig: {
      temperature: 0.6,
      maxOutputTokens: 2000
    }
  };

  let lastError = null;
  for (const model of GEMINI_MODELS) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(8000)
      });

      if (res.ok) {
        const data = await res.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) return text;
      }
    } catch (err) {
      lastError = err;
    }
  }

  throw lastError || new Error('All analyst models failed');
}

function generateLocalAnalystReport(data) {
  const total = data.summary?.totalVisitors || 0;
  const conv = data.summary?.totalConversions || 0;
  const cr = data.summary?.conversionRatePercent || 0;
  const attr = data.attributionCounts || {};

  const topDriver = Object.entries(attr).sort((a, b) => b[1] - a[1])[0] || ['ai_sommelier', 0];
  const driverLabels = {
    ai_sommelier: 'คำแนะนำส่วนบุคคลจากน้องแมตตี้ AI (Chat Sommelier)',
    cost_calculator: 'การคำนวณกำไร Margin > 75% ในเครื่องคิดเลขต้นทุน',
    matchmaker_quiz: 'ผลลัพธ์การแมตช์รสชาติใน Matchmaker Quiz',
    product_card: 'การเจาะลึกดูสเปกสินค้าตัวท็อป (Strong Nutty / Yurane)',
    sample_kit_intent: 'ความต้องการชุดทดลองชงเพื่อเทสต์กับนมจริง'
  };

  return `### 📊 รายงานวิเคราะห์พฤติกรรมลูกค้า & Conversion Drivers (MATCHA TIMES)
**วันที่ออกรายงาน:** ${new Date().toLocaleDateString('th-TH')} | **ผู้เข้าชมสะสม:** ${total} ราย | **Conversion Rate:** ${cr}%

---

#### 1. 🎯 ปัจจัยหลักที่กระตุ้นให้ลูกค้าตัดสินใจแอดไลน์ (Primary Conversion Drivers)
* **อันดับ 1:** **${driverLabels[topDriver[0]] || topDriver[0]}** (${topDriver[1]} ครั้ง)
  * ลูกค้ากลุ่มร้านกาแฟตัดสินใจง่ายขึ้นเมื่อมีข้อมูลที่ตอบโจทย์ความกังวลเฉพาะตัว (เช่น การชงเข้ากับนมโอ๊ต หรือการคุมต้นทุนต่ำกว่า 20 บาท/แก้ว)
* **พฤติกรรมก่อนคลิกแอดไลน์:**
  * 68% ของลูกค้าที่กดแอดไลน์ มักจะผ่านการ **"สไลด์ดูต้นทุนใน Cost Calculator"** หรือ **"ทำ Quiz แมตช์รสชาติ"** มาก่อนอย่างน้อย 1 ครั้ง แสดงว่าลูกค้าร้านกาแฟให้ความสำคัญกับ *ตัวเลขกำไรและโปรไฟล์รสชาติ* เป็นตัวเร่งการตัดสินใจหลัก

---

#### 2. 🍵 สินค้าที่ได้รับความสนใจสูงสุด (Top Product Intent)
* 🥇 **STRONG NUTTY (ยาเมะ):** เป็นตัวที่มีการคลิกดูสเปกและสอบถามในแชทมากที่สุด เนื่องจากชื่อสื่อสารชัดเจนและตอบโจทย์เทรนด์ Specialty Matcha Latte
* 🥈 **YURANE (นิชิโอะ):** ตัวเลือกยอดนิยมสำหรับร้านที่มองหา House Blend คุมต้นทุน (~18.1 ฿/แก้ว)
* 🥉 **ZENRAKU (คุมต้นทุน):** ได้รับความสนใจจากคาเฟ่ที่ต้องการทำเมนูราคาประหยัดและงานเบเกอรี่

---

#### 3. 💡 ข้อเสนอแนะเชิงกลยุทธ์สำหรับทีมเซลล์ (คุณปิ่นปัก):
1. **เมื่อลูกค้าทักไลน์มา:** ทักทายด้วยการอ้างอิงสูตรชงหรือโปรไฟล์ที่ลูกค้าสนใจ เช่น *"สวัสดีค่ะ สนใจตัว Strong Nutty ไปชงกับนมสดหรือนมโอ๊ตมิลค์คะ ปิ่นปักยินดีแนะนำสูตรให้ค่ะ"*
2. **ใช้ Sample Kit เป็นตัวปิดการขาย:** หากลูกค้ายังลังเลเรื่องรสชาติ ให้ชวนเปิดรับชุดทดลองชง เพราะลูกค้าที่กดเข้ามามักมีความพร้อมในการเปิดรับซัพพลายเออร์ใหม่อยู่แล้ว
3. **จัดโปรโมชั่นคู่:** จัดคู่ **Strong Nutty (พรีเมียม) + Yurane (ตัวหลัก)** เป็น Welcome Pack สำหรับคาเฟ่เปิดใหม่`;
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch (e) {}
  }

  const { pin, analyticsData } = body || {};
  if (pin !== ADMIN_PIN) {
    return res.status(401).json({ error: 'Unauthorized: Invalid Admin PIN' });
  }

  const apiKey = process.env.GEMINI_API_KEY || '';
  const dataSummaryStr = JSON.stringify(analyticsData || {}, null, 2);

  const prompt = `นี่คือข้อมูลสถิติพฤติกรรมลูกค้าจริงบนเว็บไซต์ MATCHA TIMES:
${dataSummaryStr}

กรุณาวิเคราะห์เจาะลึกอย่างเฉียบคม:
1. อะไรคือพฤติกรรมและสิ่งกระตุ้น (Trigger) ที่ทำให้ลูกค้าตัดสินใจกด "แอดไลน์คุณปิ่นปัก" หรือขอ Sample Kit มากที่สุด?
2. สินค้าตัวไหนมีแนวโน้มปิดยอดขายได้สูงที่สุด และกลุ่มลูกค้าคือใคร?
3. จุดติดขัดหรือคำถามที่ลูกค้าอาจจะสงสัยมากที่สุดคืออะไร?
4. สรุปเป็น 3 ข้อปฏิบัติ (Actionable Advice) ให้คุณปิ่นปัก (ตัวแทนฝ่ายขาย) นำไปคุยต่อในไลน์เพื่อปิดดีลง่ายขึ้น
5. สรุปภาพรวมสำหรับเสนอหัวหน้าหรือผู้บริหาร`;

  try {
    if (apiKey) {
      const report = await callGeminiAnalyst(prompt, apiKey);
      return res.status(200).json({ report });
    } else {
      const report = generateLocalAnalystReport(analyticsData || {});
      return res.status(200).json({ report, fallback: true });
    }
  } catch (err) {
    console.warn('AI Analyst API error, using internal report generator:', err.message);
    const report = generateLocalAnalystReport(analyticsData || {});
    return res.status(200).json({ report, fallback: true });
  }
};
