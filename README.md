# User Manager (ระบบจัดการ User)
### Features
- เพิ่ม/ลบ User, Table, Row
- แก้ไขข้อมูล Row ใน Table ได้
- เพิ่ม Tag แต่ละวิชาให้แต่ละ User
- นับจำนวน Row, Tag ทั้งหมด
- Add Date จะ update ตามวันที่ได้ add row
- Search by name
- ระบบ Tag เลือก Tag ได้
- Sorting


## How To 
1. สร้างหรือเลือก user
2. สร้างหรือเลือก table
3. สร้างข้อมูลได้โดยการพิมพ์ในช่อง Input Name เงื่อนไขคือ ต้องมีขื่อเป็นอย่างน้อย และ หามีอีเมลต้องพิมพ์รูปแบบให้ถูกต้อง
4. แก้ไขข้อมูลได้โดยการนำเมาส์ไปชี้เพื่อโชว์ icon แก้

## Views
- Home: จัดการกับ user
- MyTable: จัดการกับ Table ของ user
- TableManager: จัดการกับตาราง

## Component
### Table.vue
- เป็นหน้าตารางทั้งหมด
- สามารถแก้ไขข้อมูลต่าง ๆ แต่ละ Row ได้
- ส่งคำสั่ง sorting selecting ออกมาให้ TableManager
- ส่งข้อมูล row ออกมาให้ TableManager เพื่อสร้าง row ใหม่ได้
### StatusDisplay.vue
- จัดการกับ tag
- สร้างลบ tag ได้ สามารถเลือกสีได้
- ส่ง selecting ออกไปว่าเลือกตัวไหน
### RegisterUser.vue
- สลับโหมดระหว่างสร้าง user เเละ edit user
- input สำหรับใส่ username เเละ password เพื่อรับค่าเข้า json-server
## Group Member
- 067 นฤบดินทร์ อะมีนี 
- 083 ปุรเชษฐ์ เจิ้น
- 094 ภูมินทร์ ชุมภู
- 097 ยุทธศาสตร์ ประจักษ์สุวรรณ
- 107 วิชญพัฒน์ พัทธิกานต์สกุล
