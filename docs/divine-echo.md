# Divine Echo (Paladin) — ความรู้จากแหล่งสาธารณะ

อัปเดต: 2026-10-30  
ขอบเขต: สรุปจากทูลทิปในเกม MapleStory M + Patch Notes ทางการ — **ไม่ใช่** reverse engineering ไคลเอนต์

## แหล่งที่มา

1. **In-game skill tooltip** (Divine Echo / Echo, Skill Lv.30) — สกรีนช็อตผู้ใช้
2. **Nexon Forum · Patch Notes** (`board=2690`):
   [📜 09.24/25 Patch Notes Pt.1 (Character Rebalancing…)](https://forum.nexon.com/MapleStoryMGlobal/board_view?board=2690&thread=3150059)

## สิ่งที่แพตช์โน้ตกล่าวถึง

ใน 09.24/25 เรียกสกิลว่า **Divine Echo** (party synergy / bond):

- บัฟอื่นของ Paladin ที่ให้เพื่อน (เช่น Sacrosanctity, Divine Blessing) **หมดพร้อม Divine Echo Bond**
- Sacrosanctity ระยะบัฟเพื่อน: 30s → 10s
- Guardian CD: 60s → 120s
- Noble Demand: Crit RES / Crit DMG Reduction บนเป้า debuff −20% → −10%; เพิ่ม passive Crit DMG 10%
- ปรับซัพพอร์ตปาร์ตี้ แล้วชดเชย DPS ส่วนตัวของ Paladin

แพตช์โน้ต **ไม่ได้** ลงสูตรตัวเลข Final DMG ต่อ PHY ATK — ตัวเลขด้านล่างมาจากทูลทิปในเกม

## ค่าจากทูลทิป (Lv.30)

| รายการ | ค่า |
| --- | --- |
| Required MP | 1,200 |
| Reuse Cooldown | 120s |
| Target | Party (ตัวเอง + เพื่อนในปาร์ตี้) |
| Buff Duration | 60s |
| Additional DMG | 90% |
| Final DMG Increase (ฐาน) | 10% |
| Final DMG per 3,000 PHY ATK | 1% |
| Final DMG Additional Increase Limit | 20% |
| ข้อจำกัด | Cannot be used during auto-battle |

### ข้อความกลไกในทูลทิป

**[Stat Increase per PHY ATK]**  
Additionally increases Final DMG in proportion to your PHY ATK while the buff remains active. The **standard PHY ATK** value is calculated from the values indicated on the **character stats** and is **unaffected by the PHY ATK increase option**. Stat increase values have max limits.

**[Skills that Don't Apply Additional DMG]**  
Only applies to damage inflicted by **direct attacks**. Does **not** deal additional damage on top of damage inflicted by an **independent summon**.

## สูตร Final DMG จาก Echo

ให้ \(A\) = standard PHY ATK (flat จากหน้า Character Stats; ไม่รวม Atk %)

\[
\text{FD}_\text{Echo}
= 10\%
+ \min\left(\left\lfloor \frac{A}{3000} \right\rfloor \times 1\%,\ 20\%\right)
\]

- สูงสุด **+30% Final DMG** เมื่อ \(A \ge 60{,}000\)
- ค่าสเกลอิงสเตตของ **ผู้ใช้สกิล (Paladin caster)** แล้วกระจายให้เป้าปาร์ตี้ระหว่างบัฟ

### ตัวอย่าง

| Standard PHY ATK | ส่วนสเกล | FD รวมจาก Echo |
| --- | --- | --- |
| 0 – 2,999 | 0% | +10% |
| 3,000 | 1% | +11% |
| 30,000 | 10% | +20% |
| 57,000 – 59,999 | 19% | +29% |
| ≥ 60,000 | 20% (cap) | +30% |

## ผลต่อตัวเองและเพื่อน

- **Target: Party** — ผู้ใช้และสมาชิกปาร์ตี้ได้รับบัฟพร้อมกัน
- Final DMG ที่ได้ขึ้นกับ **PHY ATK ของ caster** ไม่ใช่ของเพื่อนแต่ละคน
- Additional DMG 90%: เฉพาะดาเมจโจมตีตรง; ไม่ซ้อนบน independent summon
- ใช้ตอน auto-battle ไม่ได้
- (จากแพตช์) bond ของ Divine Echo ผูกอายุบัฟซัพพอร์ตอื่นของ Paladin บนเพื่อน

## การตรวจกับเว็บ dpsBoss

โค้ดหลัก: [`src/domain/specialBuffs.ts`](../src/domain/specialBuffs.ts)  
UI: [`src/features/calculator/SpecialBuffGrid.tsx`](../src/features/calculator/SpecialBuffGrid.tsx)

| ความรู้จากทูลทิป / ฟอรัม | เว็บ | ผล |
| --- | --- | --- |
| Additional DMG 90% | `DIVINE_ECHO_ADDITIONAL_DMG = 90` | ตรง |
| FD ฐาน 10% | `DIVINE_ECHO_FD_BASE = 10` | ตรง |
| +1% FD ต่อ 3,000 flat ATK | `DIVINE_ECHO_FD_ATK_STEP = 3000` | ตรง |
| เพดานส่วนสเกล 20% → รวมสูงสุด 30% | `DIVINE_ECHO_FD_SCALE_CAP = 20` | ตรง |
| ใช้ standard / flat PHY ATK ของ **Paladin ที่ร่าย** ไม่ใช่ Atk % | ช่อง `paladinFlatAtk` ใน Special (ไม่ใช้ ATK ของตัวเอง) | ตรง |
| ชื่อ Divine Echo / Echo | label Divine Echo, abbr Echo | ตรง |
| Party target (เพื่อนร่ายใส่เรา) | ติ๊ก Echo + กรอก ATK ของ Paladin caster | ตรงกับเคสหลัก |
| Auto-battle ห้ามใช้ | ไม่โมเดลในเครื่องคิดเลข | ไม่กระทบสูตรไลน์ |
| ไม่ใช้ Additional DMG กับ summon | ไม่แยกประเภทสกิล | ไม่โมเดล |
| Additional DMG เป็นหมวดแยกจาก DMG% | map เข้า `dmgPercent` เพื่อประมาณ Boss Line | **ประมาณการ** (มีคอมเมนต์ในโค้ด) |
| Bond หมดพร้อมบัฟ Paladin อื่น | ไม่โมเดลอายุบัฟ | นอกขอบเขตเครื่องคิดเลขไลน์ |

### สูตรในโค้ด (เทียบเท่าความรู้)

```text
FD% = 10 + min(20, floor(paladinFlatAtk / 3000))
เมื่อเปิด Divine Echo:
  dmgPercent      += 90   // Additional DMG → ถัง DMG% ของ Boss Line
  finalDmgPercent += FD%  // สเกลจาก ATK ของ Paladin caster
```

### สรุปการตรวจ

ค่าคงที่และสูตร Final DMG ของเว็บ **ตรงกับทูลทิป Lv.30**  
เคสหลักของเครื่องคิดเลข: **เพื่อน Paladin ร่าย Echo ใส่เรา** — กรอก flat PHY ATK ของเพื่อนในช่อง Paladin flat PHY ATK  
ข้อต่างหลักคือ Additional DMG ถูกพับเข้า **DMG%** ของสูตร Boss Damage Line (ประมาณการ) ไม่ได้เป็นช่อง Additional DMG แยก และไม่จำลองข้อยกเว้น summon / auto-battle / อายุ bond

## อ้างอิงโค้ดทดสอบ

- [`src/domain/specialBuffs.test.ts`](../src/domain/specialBuffs.test.ts)
- [`src/domain/buffedStats.test.ts`](../src/domain/buffedStats.test.ts) — เคส Divine Echo
