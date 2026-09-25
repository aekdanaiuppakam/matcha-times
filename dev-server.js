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
- ตอบข้อมูลแม่นยำ อ่านง่าย ครบถ้วน จบประโยคอย่างสมบูรณ์แบบ ห้ามตัดทอนข้อความค้างไว้กลางประโยค
- จัดรูปแบบข้อความให้อ่านง่าย มีหัวข้อย่อยและข้อความตัวหนาชัดเจน ใช้อิโมจิ 🍵✨🥜💰 อย่างพอเหมาะ
- เน้นให้คำแนะนำที่เป็นรูปธรรม เช่น จุดเด่นของชา, เหมาะกับเมนูอะไร, ราคาต่อถุง 250g, ต้นทุนต่อแก้วโดยประมาณ (สูตรมาตรฐาน 4 กรัม/แก้ว ชงได้ 62 แก้ว/ถุง)

ข้อมูลสินค้า 10 ตัวของ MATCHA TIMES:
1. Strong Nutty (濃香ナッティ) - Best Seller อันดับ 1! โทนถั่วคั่วชัด บอดี้แน่น ชงลาเต้เข้ากับนมทุกชนิด (นมวัว/Oat milk) ชาไม่โดนนมกลบ ราคา 250g = 1,350 ฿ (~21.6 ฿/แก้ว)
2. Yurane (ゆら音) - ตัวคุ้มค่าสำหรับพรีเมียมลาเต้ โทนถั่วคั่วละมุน หวานปลาย นุ่มนวล ไม่ขมบาดคอ ราคา 250g = 1,130 ฿ (~18.1 ฿/แก้ว, กำไร Margin 80%+)
3. Shoen (松苑) - เกรดพิธีการ Ceremonial Top Tier จาก Uji อูมามิเข้มข้นจัดเต็ม ครีมมี่ ไม่ขม เหมาะทำ Signature Latte หรูหรา หรือ Usucha ราคา 250g = 2,290 ฿ (~36.6 ฿/แก้ว)
4. Yame B (八女ブレンド) - จาก Yame อูมามิฉ่ำ โทนเนยถั่ว (Buttery & Nutty) กลิ่นหอมฟุ้งติดปาก ราคา 250g = 1,450 ฿ (~23.2 ฿/แก้ว)
5. Nishio Superior (西尾特選) - จาก Nishio สีเขียวมรกตสดใส กลิ่นหอมหญ้าสดและสาหร่าย เหมาะกับชาใสเย็นและลาเต้สไตล์ญี่ปุ่นดั้งเดิม ราคา 250g = 1,250 ฿ (~20.0 ฿/แก้ว)
6. Zenraku (禅楽) - ตัวคุมต้นทุนสุดคุ้ม Grab & Go เข้มข้น ชาชัด เหมาะชงเมนูเย็น/ปั่นในงบประหยัด ราคา 250g = 800 ฿ (ต้นทุนต่ำสุด ~12.8 ฿/แก้ว)
7. Oikawa (及川) - จาก Uji โทนผลไม้สดชื่น หอมหวาน ขมต่ำ เหมาะกับ Clear Matcha, ชาส้ม, ยูซุมัทฉะ, Cold Brew ราคา 250g = 920 ฿ (~14.7 ฿/แก้ว)
8. Haruna Organic (春菜有機) - ออร์แกนิกแท้ 100% JAS Certified สะอาด คลีน สำหรับคาเฟ่สายรักสุขภาพ Vegan ราคา 250g = 1,600 ฿ (~25.6 ฿/แก้ว)
9. Yame Ceremonial (八女典礼) - เกรดพิธีการยาเมะ หอมดอกไม้ขาว หวานลึก อูมามินาน สำหรับชงพิธีการ Usucha/Koicha ราคา 250g = 1,850 ฿ (~29.6 ฿/แก้ว)
10. Midori Classic (翠クラシック) - เกรดทำขนมและเบเกอรี่ สีเขียวสด ทนความร้อนสูง กลิ่นชาเข้มข้น เหมาะทำเค้ก ครัวซองต์ ไอศกรีม ราคา 250g = 720 ฿ (~11.5 ฿/เสิร์ฟ)

บริการและช่องทางการติดต่อ (สำคัญมาก):
- มี "ชุดทดลองชง (Sample Kit) 4 ชนิด" ให้ร้านคาเฟ่นำไปเทสต์สูตรจริง
- สำคัญมากเกี่ยวกับการติดต่อ: การติดต่อทาง LINE หรือโทรศัพท์ จะเป็นการติดต่อกับ "พี่ปิ่นปัก" (ตัวแทนฝ่ายขายของ MATCHA TIMES ที่ดูแลร้านคุณโดยตรง เบอร์โทร 098-603-5370) ไม่ใช่การแอดหาบริษัทส่วนกลาง
- เมื่อลูกค้าสนใจขอรับชุดทดลอง, สนใจใบเสนอราคา B2B, หรือต้องการสั่งซื้อ ให้แนะนำให้ลูกค้าทักหา "พี่ปิ่นปัก" ผ่านปุ่ม LINE หรือคลิกลิงก์ [LINE คุณปิ่นปัก](https://line.me/ti/p/Q_YSqkj0Db) หรือโทรหาพี่ปิ่นปักได้ที่เบอร์ 098-603-5370 ได้เลยทันที พี่ปิ่นปักจะจัดส่งตัวอย่างชาและดูแลราคาส่งพร้อมสูตรชงให้อย่างรวดเร็วและเป็นกันเองครับ
- สำหรับ Instagram ([@matchatimes.thailand](https://www.instagram.com/matchatimes.thailand/?hl=en)) คือช่องทาง Official ของแบรนด์ MATCHA TIMES สำหรับชมภาพสินค้า เมนูคาเฟ่ และอัปเดตบรรยากาศ`;

// ─── Gemini API Calling with Fallback Models ───────────────────
const GEMINI_MODELS = [
  'gemini-3.1-flash-lite',
  'gemini-3.5-flash-lite',
  'gemini-3.5-flash',
  'gemini-3.8-flash'
];

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
4. Keep all matcha product names in romanized English (Strong Nutty, Yurane, Shoen, Yame B, Nishio Superior, Zenraku, Oikawa, Haruna Organic, Yame Ceremonial, Midori Classic).
5. All price quotes and cost calculations should be in THB (฿) with estimated cost per cup.
6. When directing to human sales, direct them to "Pinpuk (our dedicated Sales Representative, Tel: 098-603-5370, LINE: [Pinpuk's LINE](https://line.me/ti/p/Q_YSqkj0Db))" for B2B wholesale pricing, custom quotations, and Sample Kit requests.
7. Format your response cleanly with bullet points, bold text, and tasteful emojis.`;
  }

  const payload = {
    system_instruction: { parts: [{ text: promptText }] },
    contents,
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 2500
    }
  };

  let lastError = null;
  for (const model of GEMINI_MODELS) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`;
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
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
        console.error('Chat API Error:', err.message);
        res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
        const errMsg = (lang === 'en')
          ? 'Sorry, our AI sommelier is currently busy. Please try again or chat directly with Pinpuk on LINE! 🍵'
          : 'ขออภัยครับ ขณะนี้ระบบ AI กำลังประมวลผล กรุณาลองใหม่อีกครั้ง หรือทักสอบถามพี่เซลล์ผู้ดูแลทาง LINE ได้เลยครับ 🍵';
        res.end(JSON.stringify({
          error: errMsg,
          details: err.message
        }));
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
