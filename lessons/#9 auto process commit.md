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
  extends: ['@commitlint/config-conventional'],
  parserPreset: {
    parserOpts: {
      headerPattern: /^(\w*)\/#(\w*): (.*)$/,
      headerCorrespondence: ['type', 'scope', 'subject'],
    },
  },
  rules: {
    'type-enum': [
      2,
      'always',
      ['feat', 'fix', 'docs', 'style', 'refactor', 'test', 'chore', 'revert'],
    ],
    'header-min-length': [2, 'always', 10],
    'header-max-length': [2, 'always', 160],
    'body-max-line-length': [2, 'always', 120],
    'subject-case': [
      0,
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





