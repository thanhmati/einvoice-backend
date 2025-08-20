# 🚀 Lesson: Tự động hóa quy trình commit với Husky, Lint-Staged và Commitlint

## 📌 Mục tiêu bài học
- Hiểu **Husky** là gì và vì sao nên dùng.  
- Sử dụng **lint-staged** để tự động format/lint file thay đổi.  
- Dùng **commitlint** để enforce quy tắc commit message (chuẩn Conventional Commit).  
- Thực hành thiết lập bộ công cụ trong dự án thực tế.  

---

## 1️⃣ Giới thiệu về Husky
### ❓ Husky là gì?
- Husky là một công cụ giúp **quản lý Git hooks** dễ dàng trong Node.js project.  
- Git hooks là các script chạy tự động khi bạn thực hiện hành động trong Git (vd: `pre-commit`, `commit-msg`, `pre-push`).  

### ⚡ Tại sao cần Husky?
- Đảm bảo code **được kiểm tra tự động** trước khi commit/push.  
- Ngăn chặn commit **code lỗi, không format, hoặc không theo convention**.  
- Tạo môi trường làm việc **đồng nhất trong team**.  

### 📍 Ví dụ:
- Tự động chạy `eslint --fix` trước khi commit.  
- Ngăn commit có message sai format.  

---

## 2️⃣ Giới thiệu về Lint-Staged
### ❓ Lint-Staged là gì?
- Lint-Staged cho phép **chỉ chạy linter/formatter trên những file được staged** (file chuẩn bị commit).  
- Tích hợp cùng Husky để **tăng tốc độ** (không cần lint toàn bộ project).  

### ⚡ Lợi ích:
- Tiết kiệm thời gian (chỉ check file thay đổi).  
- Code commit luôn được format/lint đúng chuẩn.  

### 📍 Ví dụ:
```json
{
  "lint-staged": {
    "*.ts": ["eslint --fix", "prettier --write"]
  }
}
```
## 3️⃣ Giới thiệu về Commitlint
### ❓ Commitlint là gì?
- Commitlint giúp **kiểm tra commit message** theo một quy tắc nhất định.  
- Thường kết hợp với **Conventional Commits** để tạo Git history rõ ràng, dễ dùng với **semantic release** hoặc **changelog tự động**.

### ❗ Thực trạng commit message hiện nay
- Trong nhiều dự án, commit message thường **không thống nhất**, ví dụ:  
```text
fix bug
update invoice
add feature login
```
### ❗ Vấn đề gặp phải
- Lịch sử git khó đọc, không biết commit nào sửa bug, commit nào thêm tính năng.  
- Khó tự động tạo **CHANGELOG** hoặc thực hiện **Semantic Release**.  
- Team lớn → commit message lộn xộn, gây khó khăn khi review hoặc rollback code.  

### 🔑 Giải pháp
- Sử dụng **Commitlint + Husky** để bắt buộc commit message theo chuẩn.  
- Kết hợp với **Conventional Commits** để:  
  - Phân loại commit: `feat`, `fix`, `chore`, `refactor`…  
  - Tự động tạo changelog và versioning.


### ⚡ Conventional Commit Format:
```text
<type>(scope?): <subject>
```

Ví dụ:
- `feat(auth): thêm chức năng login với JWT`
- `fix(invoice): sửa bug hiển thị số tiền`
- `chore: update dependencies`

### 📍 Lợi ích:
- Git history rõ ràng → dễ theo dõi thay đổi.  
- Tự động tạo **CHANGELOG**.  
- Hỗ trợ **Semantic Versioning** (tăng version tự động theo type: feat, fix, breaking).  
## 4️⃣ Thực hành setup trong dự án
### 🛠️ Bước 1: Cài đặt dependencies
```bash
npm install husky lint-staged @commitlint/config-conventional @commitlint/cli -D
```
### 🛠️ Bước 2: Khởi tạo Husky
```bash
npx husky install
```
Thêm script vào package.json:
```json
{
  "scripts": {
    "prepare": "husky install"
  }
}
```
### 🛠️ Bước 3: Tạo Git hook cho pre-commit (lint-staged)
```bash
npx husky add .husky/pre-commit "npx lint-staged"
```
### 🛠️ Bước 4: Cấu hình lint-staged (package.json)
```json
{
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": [
      "eslint --fix",
      "prettier --write"
    ],
    "*.{md,json,yml,yaml,html}": [
      "prettier --write"
    ]
  }
}
```
### 🛠️ Bước 5: Cấu hình commitlint
File commitlint.config.js:
```js
module.exports = {
  // Kế thừa rules cơ bản từ bộ quy tắc Conventional Commits
  extends: ['@commitlint/config-conventional'],

  // Custom parser để định nghĩa format commit header
  parserPreset: {
    parserOpts: {
      // Regex parse commit message
      // Format: <type>/#<scope>: <subject>
      // Ví dụ: feat/#auth: thêm chức năng đăng nhập với JWT
      headerPattern: /^(\w*)\/#(\w*): (.*)$/,

      // Ánh xạ các group trong regex vào field của commitlint
      headerCorrespondence: ['type', 'scope', 'subject'],
    },
  },

  // Các rules để enforce commit message
  rules: {
    // Chỉ cho phép type thuộc danh sách này
    // feat = thêm chức năng, fix = sửa bug, docs = tài liệu,
    // style = format code, refactor = tối ưu, test = test code,
    // chore = việc vặt, revert = rollback commit
    'type-enum': [
      2, // level 2 = error (reject commit nếu sai)
      'always',
      ['feat', 'fix', 'docs', 'style', 'refactor', 'test', 'chore', 'revert'],
    ],

    // Header (toàn bộ commit message dòng đầu) tối thiểu 10 ký tự
    'header-min-length': [2, 'always', 10],

    // Header tối đa 160 ký tự
    'header-max-length': [2, 'always', 160],

    // Body (nội dung chi tiết commit) mỗi dòng tối đa 120 ký tự
    'body-max-line-length': [2, 'always', 120],

    // Subject (phần mô tả ngắn) không bị ép theo style nào
    // Đang disable (0 = off), nên có thể viết hoa/viết thường tự do
    // Ví dụ: "thêm chức năng login" hoặc "Thêm chức năng login" đều pass
    'subject-case': [
      0, // off
      'never',
      ['sentence-case', 'start-case', 'pascal-case', 'upper-case'],
    ],
  },
};
```
Thêm Git hook commit-msg:
```bash
npx husky add .husky/commit-msg 'pnpm commitlint --edit ${1}'
```
## 5️⃣ Demo workflow
1. Developer chỉnh sửa code.  
2. Khi `git commit`:  
   - Husky chạy `lint-staged` → format + lint code.  
   - Commitlint kiểm tra message.  
   - Nếu pass → commit thành công. Nếu fail → commit bị chặn.  

---

## 6️⃣ Kết luận
- **Husky** giúp gắn Git hook vào dự án.  
- **Lint-Staged** tối ưu quá trình lint/format.  
- **Commitlint** đảm bảo commit message theo chuẩn.  
- Bộ ba này giúp **quản lý chất lượng code + Git history chuẩn mực** trong team.  





