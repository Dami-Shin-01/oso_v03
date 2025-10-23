# Humantown Pension - Next.js 15 Project

가평 휴먼타운 펜션 웹사이트 - Next.js 15 + TypeScript + Tailwind CSS v4

## 🚀 기술 스택

- **Framework**: Next.js 15.5.6 (App Router)
- **Language**: TypeScript 5.9.3
- **Styling**: Tailwind CSS 4.1.15
- **UI Library**: React 19.2.0
- **Animation**: Framer Motion 12.23.24
- **Slider**: Swiper
- **Image Optimization**: Sharp 0.34.4

## 📁 프로젝트 구조

```
humantown-nextjs/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx         # Root layout (fonts, metadata)
│   │   ├── page.tsx           # Homepage
│   │   └── globals.css        # Global styles + Design System
│   │
│   ├── components/            # React Components
│   │   ├── layout/           # Header, Footer
│   │   ├── ui/               # Button, Gallery, etc.
│   │   └── sections/         # RoomCard, FacilityCard
│   │
│   ├── lib/                  # Utilities & Data
│   │   └── data/            # JSON data files
│   │       ├── rooms-data.json
│   │       ├── facilities-data.json
│   │       └── site-structure.json
│   │
│   ├── types/                # TypeScript Types
│   │   ├── room.ts
│   │   ├── facility.ts
│   │   └── index.ts
│   │
│   └── styles/               # Additional styles
│
├── public/                   # Static assets
└── package.json
```

## 🎨 디자인 시스템

### 색상
- **Primary Gold**: `#DEC48E` (Light), `#B2946B` (Main), `#A08560` (Dark)
- **Neutral**: `#1F1D1C` (Dark), `#333` (Text), `#F5F5F5` (Light BG)

### 타이포그래피
- **로고/헤딩**: Cinzel (세리프)
- **제목**: Lora (세리프)
- **본문**: Noto Sans KR (산세리프)

### 브레이크포인트
- `xs`: 479px
- `sm`: 640px
- `md`: 768px
- `lg`: 860px
- `xl`: 1024px
- `2xl`: 1200px
- `3xl`: 1280px
- `4xl`: 1650px

## 🛠️ 개발 시작하기

### 설치
```bash
npm install
```

### 개발 서버 실행
```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 접속

### 빌드
```bash
npm run build
```

### 프로덕션 실행
```bash
npm start
```

## 📊 데이터 구조

### Room (객실)
```typescript
interface Room {
  id: string;
  name: string;
  name_english: string;
  size_pyeong: number;
  capacity: {
    standard: number;
    maximum: number;
  };
  pricing: {
    peak: { weekday, friday, weekend };
    off_season: { weekday, friday, weekend };
    standard: { weekday, friday, weekend };
  };
  amenities: string[];
}
```

### Facility (부대시설)
```typescript
interface Facility {
  id: number;
  name: string;
  name_english: string;
  description: string;
  type: string;
}
```

## 🎯 다음 단계 (Phase 6)

- [ ] Header 컴포넌트 구현
- [ ] Footer 컴포넌트 구현
- [ ] 홈페이지 섹션 구현
- [ ] 객실 목록/상세 페이지
- [ ] 부대시설 페이지
- [ ] 애니메이션 추가

## 📝 주요 기능

- ✅ 반응형 디자인 (Mobile-first)
- ✅ SEO 최적화
- ✅ 이미지 최적화 (Next.js Image)
- ✅ 타입 안전성 (TypeScript)
- ✅ 모던 UI (Tailwind CSS v4)
- 🔲 애니메이션 (Framer Motion)
- 🔲 이미지 갤러리 (Lightbox)
- 🔲 예약 시스템

## 📚 참고 문서

- **디자인 시스템**: `../10-REF-DESIGN-SYSTEM.md`
- **컴포넌트 스니펫**: `../snippets/`
- **원본 사이트 분석**: `../analysis/`

---

**프로젝트 시작일**: 2025-10-22
**현재 Phase**: 5/8 완료 (Next.js 프로젝트 초기화)
**다음 단계**: Phase 6 - 단계별 구현
