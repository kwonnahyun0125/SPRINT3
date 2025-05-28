
# 🛠 SPRINT3-1 백엔드 프로젝트 실전 작업 순서 정리

## ✅ 1. 프로젝트 초기 설정

```bash
mkdir SPRINT3-1
cd SPRINT3-1
npm init -y
npm install express cors dotenv multer
npm install prisma @prisma/client
npx prisma init
```

## ✅ 2. Prisma 설정

### 📁 `prisma/schema.prisma` 수정

```prisma
model Product {
  id          Int      @id @default(autoincrement())
  name        String
  description String
  price       Int
  tags        String[]
  imageUrl    String
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  comments    Comment[]
}

model Article {
  id        Int      @id @default(autoincrement())
  title     String
  content   String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  comments  Comment[]
}

model Comment {
  id        Int      @id @default(autoincrement())
  content   String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  product   Product? @relation(fields: [productId], references: [id], onDelete: Cascade)
  productId Int?
  article   Article? @relation(fields: [articleId], references: [id], onDelete: Cascade)
  articleId Int?
}
```

### 마이그레이션 및 클라이언트 생성

```bash
npx prisma migrate dev --name init
npx prisma generate
node src/server.js =>
```

## ✅ 3. 프로젝트 디렉토리 구성

```
SPRINT3-1/
├── prisma/
├── src/
│   ├── controllers/
│   ├── routes/
│   ├── middlewares/
│   ├── utils/
│   ├── app.js
│   └── server.js
└── .env
```

## ✅ 4. API 기능 구현

| 기능 | 파일 | 미들웨어 |
|------|------|-----------|
| 상품 CRUD | `product.controller.js` | `validateProduct` |
| 게시글 CRUD | `article.controller.js` | `validateArticle` |
| 댓글 CRUD | `comment.controller.js` | `validateComment` |
| 이미지 업로드 | `upload.routes.js` (multer 사용) | - |

## ✅ 5. 유효성 검사 & 에러 핸들러

```js
// src/middlewares/validation.js
export const validateProduct = (req, res, next) => { ... }
export const validateArticle = (req, res, next) => { ... }
export const validateComment = (req, res, next) => { ... }

// src/utils/errorHandler.js
export const errorHandler = (err, req, res, next) => { ... }
```

## ✅ 6. Git 설정 & GitHub 연동

```bash
cd ~/SPRINT3-1
git init
git add .
git commit -m "🎉 초기 커밋"
git branch -M main
git remote add origin https://github.com/사용자명/SPRINT3-1.git
git push -u origin main
```

`.gitignore`에 추가:

```
.env
node_modules/
uploads/
generated/
```

## ✅ 7. Render.com 배포 준비

- Build Command: `npm install && npx prisma generate`
- Start Command: `node src/server.js`
- 환경변수:
  - `DATABASE_URL=...`
  - `NODE_ENV=production`
  - `PORT=3000` (optional)

## ✅ 8. WSL에서 VS Code 단독 폴더 열기

```bash
cd ~/SPRINT3-1
code .
```

## ✅ 자주 쓰는 Git 명령어 요약

```bash
git reset --soft HEAD~1     # 마지막 커밋 되돌리기
git push -f origin main     # 강제 푸시
git branch -D master        # master 브랜치 삭제
git remote -v               # 원격 주소 확인
```

## ✅ 테스트 팁

- Postman으로 `GET /products`, `POST /articles`, `POST /upload/image` 테스트
- Render 배포 후 `https://your-app-name.onrender.com/products` 등 호출
