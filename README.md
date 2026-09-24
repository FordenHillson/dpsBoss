# Boss Line Calc

เว็บคำนวณ **Boss Damage Line** (ดาเมจต่อไลน์ใส่บอส) หลัง **Level Modifier** และ **IED** — ไม่ใช่ DPS ต่อวินาที

## รันโปรเจกต์

```bash
npm install
npm run dev
```

เปิด URL ที่ Vite แสดง (ปกติ `http://localhost:5173`)

```bash
npm test      # หน่วยทดสอบสูตร
npm run build # production build
```

## วิธีใช้ — นำเข้าจากภาพ stats

1. แคปหน้า **Character Stats** ในเกม
2. ในแอปกด **Copy prompt**
3. เปิด ChatGPT หรือ Gemini แนบภาพ + วาง prompt
4. คัดลอก JSON ที่โมเดลตอบ กลับมาวางในช่อง **วาง JSON**
5. กด **Apply Snapshot** — ระบบกรอก Captured Fields อัตโนมัติ
6. กรอกมือ: **Skill %**, **Monster Level**, **Boss PDR %**
7. อ่านผลทางขวา (มือถือจะอยู่ด้านล่าง)

เปอร์เซ็นต์ใน JSON ใช้แบบบนจอ เช่น `"bossPercent": 253.4` = 253.4%

## สูตรย่อ

1. Non-Crit Boss ดิบจาก ATK / ATK% / DMG% / Boss% / Skill% / FD%
2. Crit = Non-Crit × (1 + 0.25 + CritDmg%) สำหรับ mid (+0% / +50% สำหรับ low/high)
3. × Level Modifier จากตาราง Defense Rating
4. × `(1 - BossPDR × (1 - IED))`
5. แคปด้วย Max Dmg (ลำดับแคปตรงกับชีตอ้างอิง)

## สแตก

Vite + React + TypeScript + MUI  
ธีมอิง [Style UI v1.0](https://www.figma.com/design/O4519BqmnXl7wDTShIBddO/Style-UI-v1.0--Community-) · รองรับ Light / Dark mode (ปุ่มมุมขวาบน)
