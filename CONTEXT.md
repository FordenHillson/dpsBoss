# Boss Line Calc

เว็บคำนวณดาเมจต่อไลน์ใส่บอส (Boss Damage Line) จากสเตตตัวละคร หลัง Level Modifier และ IED

## Language

**Boss Damage Line**:
ดาเมจต่อไลน์ใส่บอสหลังโมดิฟายเออร์ที่ระบบรองรับ
_Avoid_: DPS, damage per second

**Stat Snapshot**:
JSON ที่สกัดจากภาพหน้า Character Stats
_Avoid_: OCR result, import blob

**Captured Field**:
ฟิลด์ในฟอร์มที่มาจาก Stat Snapshot
_Avoid_: auto field, OCR field

**Manual Field**:
ฟิลด์ที่ผู้ใช้กรอกเองและไม่ถูกทับตอน Apply Snapshot (`skillPercent`, `monsterLevel`, `bossPdrPercent`)
_Avoid_: custom field

**Level Modifier**:
สัดส่วนดาเมจที่เหลือหลังเทียบ Defense Rating ของเลเวลผู้เล่นกับเป้าหมาย
_Avoid_: level penalty, DR percent (alone)

**Defense Rating**:
ค่าจากตาราง datamine ตามเลเวล ใช้ในสูตร Level Modifier
_Avoid_: defense, PDR

**DIR / IED**:
อัตรา ignore defense ของตัวละคร (`iedPercent`)
_Avoid_: Boss IED (เมื่อหมายถึงของตัวละคร)

**IED Modifier**:
ตัวคูณดาเมจหลัง PDR×DIR คือ `(1 - PDR × (1 - DIR))` — คนละค่ากับ DIR %
_Avoid_: IED (เมื่อหมายถึงตัวคูณ)

**Boss PDR**:
อัตราลดดาเมจด้านบอสในสูตร `(1 - PDR × (1 - DIR))`
_Avoid_: Boss IED (ชื่อในชีตเดิมที่สับสน)

**Party Buff**:
บัฟปาร์ตี้ที่ติ๊กจากการ์ด แล้วบวกเข้า Buffed stats
_Avoid_: link skill (เมื่อหมายถึงปาร์ตี้ทั่วไป)

**Food Buff**:
บัฟอาหารที่ติ๊กจากการ์ด แล้วบวกเข้า Buffed stats
_Avoid_: consumable, meal buff

**Node IED**:
บัฟ IED +15% แบบคูณ จาก skill node — ใช้เมื่อ node ของสกิลนั้น Lv.40+
_Avoid_: ติ๊กทุกสกิลโดยไม่ดูเลเวล node

**Buffed Stats**:
สเตตหลังรวม base + food + party + hyper ที่ใช้คำนวณ Boss Damage Line
_Avoid_: final stats, total stats

