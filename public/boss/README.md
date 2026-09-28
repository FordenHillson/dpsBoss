# Boss AF / SC bonus

แก้ไขค่าใน `afScBonus.json` แล้วรีเฟรชเว็บ — ไม่ต้องแก้โค้ด

## โครงสร้าง

```
AF
  └─ base (220 / 660 / 700 / 720 / 880 / 1320)
       └─ tier force = base × (110%…150%)
            └─ stats: atkPercent, maxDmg

SC
  └─ base (200)
       └─ tier force = base + (10…50)
            └─ stats: bossPercent, critDmgPercent, maxDmg
```

ค่า `stats` ตอนนี้เป็น `0` (placeholder) — ใส่เลขจริงจากเกมได้เลย

## UI

1. Dropdown ซ้าย: เลือก base เช่น `220 AF` / `200 SC`
2. Dropdown ขวา: เลือก tier เช่น `242 AF · 0% atk + 0 max`
