# 휴먼타운 펜션 사이트 벤치마킹 및 Next.js 프로젝트 구축 계획

**프로젝트 목표**: https://humantown.co.kr 사이트를 분석하여 Next.js 기반의 모던한 웹사이트 구축

**분석 대상 사이트**: https://humantown.co.kr/index.html
**타겟 프레임워크**: Next.js 15.x (App Router)
**작성일**: 2025-10-22

> 📊 **빠른 진행 상황 확인**: [`02-STATUS.md`](./02-STATUS.md) (요약본)

---

## 📋 Phase 1: 계획 문서화 및 환경 설정 ✅ **완료**

### 1.1 문서화 ✅
- [x] `01-PLAN.md` 생성 (현재 문서)
- [x] `10-REF-DESIGN-SYSTEM.md` 작성 완료 - 실제 CSS 기반 완전한 디자인 시스템
- [x] `11-REF-LIBRARY-VERSIONS.md` 작성 - 최신 버전 확인 완료
- [x] `20-REPORT-CSS-EXTRACTION.md` 작성 - CSS 추출 상세 보고서

### 1.2 최신 라이브러리 버전 확인 ✅
확인 완료 (2025-10-22):

- **Next.js**: 15.5.6 ✅
- **React**: 19.2.0 ✅
- **TypeScript**: 5.9.3 ✅
- **Tailwind CSS**: 4.1.15 ✅
- **Framer Motion**: 12.23.24 ✅
- **Sharp**: 0.34.4 ✅

상세 내용: `11-REF-LIBRARY-VERSIONS.md` 참조

### 1.3 프로젝트 폴더 구조 ✅
```
251022_new-oso/                      # 프로젝트 루트
├── 📄 01-PLAN.md             # 이 문서 (전체 계획)
├── 📄 10-REF-DESIGN-SYSTEM.md              # ✅ 디자인 시스템 (완료)
├── 📄 11-REF-LIBRARY-VERSIONS.md           # ✅ 최신 라이브러리 버전
├── 📄 20-REPORT-CSS-EXTRACTION.md      # ✅ CSS 추출 보고서
│
├── 📁 analysis/                     # ✅ 분석 데이터
│   ├── site-structure.json          # ✅ 사이트 전체 구조
│   ├── rooms-data.json              # ✅ 22개 객실 데이터
│   ├── facilities-data.json         # ✅ 6개 부대시설 데이터
│   ├── extracted-styles.json        # ✅ 전체 CSS 추출 데이터
│   └── styles-summary.json          # ✅ CSS 요약
│
├── 📁 css/                          # ✅ 추출한 CSS 파일들
│   ├── css-1-reset.css              # ✅ CSS 리셋 (5.1KB)
│   ├── css-2-style.css              # ✅ 메인 스타일시트 (65KB)
│   ├── css-3-swiper-bundle.css      # ✅ Swiper 라이브러리
│   ├── css-4-board_black.css        # ✅ 게시판 스타일
│   └── css-5-popup_black.css        # ✅ 팝업 스타일
│
├── 📁 scripts/                      # ✅ 추출 스크립트들
│   ├── extract-css.js               # ✅ CSS 추출 스크립트
│   ├── extract-individual-css.js    # ✅ 개별 CSS 파일 추출
│   └── summarize-styles.js          # ✅ 스타일 요약 생성
│
├── 📁 screenshots/                  # ✅ 스크린샷
│   └── humantown-screenshot.png     # ✅ 전체 페이지 (5.2MB)
│
├── 📁 snippets/                     # 코드 스니펫 (작업 예정)
│   ├── components/                  # UI 컴포넌트
│   ├── layouts/                     # 레이아웃
│   ├── styles/                      # 스타일
│   └── interactions/                # 인터랙션 효과
│
└── 📁 humantown-nextjs/             # Next.js 프로젝트 (생성 예정)
```

---

## 📊 Phase 2: Playwright MCP로 사이트 크롤링 및 분석

### 2.1 초기 분석 완료 사항
- [x] 메인 페이지 기본 구조 파악
  - 6개 부대시설
  - 24개 객실
  - Happytalk 채팅 SDK 사용
  - 바닐라 JavaScript 기반

### 2.2 자동 크롤링 작업
Playwright MCP를 활용하여:

1. **네비게이션 구조 추출**
   - ABOUT: `/about.html`, `/view.html`
   - ROOMS: 24개 객실 페이지 (`/room.html?room_id=xxx`)
   - SPECIAL: 6개 부대시설 (`/special1.html` ~ `/special6.html`)
   - RESERVE: `/reservation.html`
   - TRAVEL: `/travel.html`
   - LOCATION: `/traffic.html`

2. **각 페이지별 수집 데이터**
   - HTML 구조 (DOM tree)
   - 인라인/외부 CSS
   - JavaScript 코드
   - 이미지 URL 및 사용 패턴
   - 메타데이터

3. **결과 저장**
   - `analysis/site-structure.json`
   - `analysis/pages-list.json`

### 2.3 기술 스택 상세 분석
- JavaScript 라이브러리 및 버전
- CSS 구조 및 네이밍 컨벤션
- 폰트 (로컬/CDN)
- 서드파티 스크립트
- API 엔드포인트 (있을 경우)

---

## 🎨 Phase 3: 디자인 시스템 추출 및 문서화

### 3.1 색상 팔레트
CSS에서 모든 색상 값을 추출하여 분류:

```
Primary Colors:
  - primary-500: #xxxxxx
  - primary-600: #xxxxxx

Secondary Colors:
  - secondary-500: #xxxxxx

Neutral Colors:
  - gray-100 ~ gray-900

Accent Colors:
  - accent-500: #xxxxxx
```

### 3.2 타이포그래피
```
Font Families:
  - Heading: [추출 예정]
  - Body: [추출 예정]

Font Sizes:
  - xs, sm, base, lg, xl, 2xl, 3xl, 4xl...

Font Weights:
  - light (300), normal (400), medium (500), bold (700)

Line Heights & Letter Spacing
```

### 3.3 스페이싱 시스템
```
Spacing Scale:
  - 0, 1, 2, 4, 6, 8, 12, 16, 20, 24, 32, 40, 48, 64...

Grid System:
  - Container max-width
  - Column 구조

Breakpoints:
  - sm: 640px
  - md: 768px
  - lg: 1024px
  - xl: 1280px
  - 2xl: 1536px
```

### 3.4 Tailwind Config 생성
추출한 디자인 토큰을 기반으로 `tailwind.config.js` 커스텀 설정 작성

---

## 🧩 Phase 4: UI 컴포넌트 분해 및 스니펫 저장

### 4.1 식별할 컴포넌트 목록

**Navigation Components**
- [ ] Header
- [ ] Desktop Navigation
- [ ] Mobile Menu
- [ ] Breadcrumb

**Content Components**
- [ ] Hero Slider
- [ ] Room Card
- [ ] Facility Card
- [ ] Image Gallery
- [ ] Info Section

**Form Components**
- [ ] Button (variants: primary, secondary, outline)
- [ ] Input Field
- [ ] Textarea
- [ ] Select/Dropdown
- [ ] Date Picker (예약용)

**Layout Components**
- [ ] Container
- [ ] Grid Layout
- [ ] Section Wrapper
- [ ] Footer

**Interactive Components**
- [ ] Modal/Dialog
- [ ] Image Lightbox
- [ ] Accordion
- [ ] Tabs

### 4.2 스니펫 저장 구조
```
snippets/
├── components/
│   ├── Button.html + Button.css + Button.js
│   ├── RoomCard.html + RoomCard.css
│   ├── HeroSlider.html + HeroSlider.css + HeroSlider.js
│   └── ...
├── layouts/
│   ├── Header.html + Header.css + Header.js
│   ├── Footer.html + Footer.css
│   └── ...
├── styles/
│   ├── colors.css
│   ├── typography.css
│   └── utilities.css
└── interactions/
    ├── scroll-animations.js
    ├── image-gallery.js
    └── ...
```

---

## 🏗️ Phase 5: Next.js 프로젝트 구조 설계

### 5.1 프로젝트 초기화
```bash
npx create-next-app@latest humantown-nextjs --typescript --tailwind --app --eslint
```

### 5.2 폴더 구조
```
humantown-nextjs/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # 루트 레이아웃
│   │   ├── page.tsx                # 홈페이지
│   │   ├── globals.css             # 전역 스타일
│   │   ├── about/
│   │   │   └── page.tsx
│   │   ├── rooms/
│   │   │   ├── page.tsx            # 객실 목록
│   │   │   └── [id]/
│   │   │       └── page.tsx        # 객실 상세
│   │   ├── facilities/
│   │   │   ├── page.tsx
│   │   │   └── [id]/
│   │   │       └── page.tsx
│   │   ├── reservation/
│   │   │   └── page.tsx
│   │   ├── travel/
│   │   │   └── page.tsx
│   │   └── location/
│   │       └── page.tsx
│   ├── components/
│   │   ├── ui/                     # 재사용 UI 컴포넌트
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Input.tsx
│   │   │   └── ...
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Navigation.tsx
│   │   │   └── MobileMenu.tsx
│   │   └── sections/               # 페이지별 섹션
│   │       ├── HeroSection.tsx
│   │       ├── RoomsSection.tsx
│   │       ├── FacilitiesSection.tsx
│   │       └── ...
│   ├── lib/
│   │   ├── data/
│   │   │   ├── rooms.json          # 객실 데이터
│   │   │   ├── facilities.json     # 부대시설 데이터
│   │   │   └── site-info.json      # 사이트 정보
│   │   ├── utils/
│   │   │   └── helpers.ts
│   │   └── constants/
│   │       └── config.ts
│   ├── types/
│   │   ├── room.ts
│   │   ├── facility.ts
│   │   └── index.ts
│   └── styles/
│       └── custom-utilities.css
├── public/
│   └── images/
├── tailwind.config.ts              # Tailwind 커스텀 설정
├── tsconfig.json
└── package.json
```

### 5.3 데이터 모델링

**Room 타입**
```typescript
interface Room {
  id: string;
  name: string;
  description: string;
  capacity: {
    standard: number;
    maximum: number;
  };
  price: {
    weekday: number;
    weekend: number;
  };
  images: string[];
  amenities: string[];
  size: number;
}
```

**Facility 타입**
```typescript
interface Facility {
  id: string;
  name: string;
  description: string;
  images: string[];
  features: string[];
}
```

---

## 💻 Phase 6: 단계별 구현 계획

### 6.1 기본 레이아웃 구현 (1-2일)
**Priority: HIGH**

- [ ] Header 컴포넌트
  - 로고
  - Desktop Navigation (ABOUT, ROOMS, SPECIAL, RESERVE, TRAVEL, LOCATION)
  - Mobile Hamburger Menu
  - 반응형 동작

- [ ] Footer 컴포넌트
  - 사이트 정보
  - 연락처
  - 소셜 링크
  - Copyright

- [ ] 전역 레이아웃 (`app/layout.tsx`)
  - SEO 메타태그
  - 폰트 로딩
  - 전역 스타일

### 6.2 홈페이지 구현 (2-3일)
**Priority: HIGH**

- [ ] Hero Section
  - 메인 슬라이더 (이미지 캐러셀)
  - Framer Motion 페이드 애니메이션

- [ ] Special Section (부대시설)
  - 6개 카드 그리드
  - Hover 효과
  - 상세 페이지 링크

- [ ] Rooms List Section
  - 24개 객실 그리드
  - 필터링 기능 (선택사항)
  - 카드 디자인

- [ ] Landscape Section
  - 이미지 갤러리
  - Lightbox 기능

- [ ] Reservation Guide
  - 안내 정보
  - CTA 버튼

- [ ] Directions Preview
  - 지도 임베드 (카카오맵/구글맵)
  - 주소 정보

### 6.3 상세 페이지 구현 (3-4일) ✅ **완료**
**Priority: MEDIUM**

**ABOUT 페이지**
- [x] `/about/page.tsx` - 펜션 소개
- [x] `/view/page.tsx` - 외경 갤러리 (9개 사진)

**ROOMS 페이지**
- [x] `/rooms/page.tsx` - 객실 목록 (그리드 뷰)
- [x] `/rooms/[id]/page.tsx` - 객실 상세
  - [x] 이미지 갤러리 (메인 + 썸네일)
  - [x] 객실 정보 (인원, 크기, 가격)
  - [x] 편의시설
  - [x] 예약 버튼

**FACILITIES 페이지**
- [x] `/special/swimming-pool/page.tsx` - 수영장
- [x] `/special/barbecue/page.tsx` - 바베큐
- [x] `/special/sports/page.tsx` - 족구장/농구장
- [x] `/special/cafe/page.tsx` - 카페
- [x] `/special/trail/page.tsx` - 산책로
- [x] `/special/playground/page.tsx` - 어린이놀이터

**RESERVATION 페이지**
- [x] `/reservation/page.tsx` - 예약 안내
- [x] 입실/퇴실 시간 안내
- [x] 결제 방법 및 취소 정책
- [x] 이용 수칙

**TRAVEL 페이지**
- [x] `/travel/page.tsx` - 주변 여행지 정보 (6개 관광지)
  - [x] 남이섬, 쁘띠프랑스, 아침고요수목원
  - [x] 자라섬, 레일바이크, 짚와이어

**LOCATION 페이지**
- [x] `/location/page.tsx` - 오시는 길
  - [x] 지도 영역 (Kakao/Google Maps 연동 준비)
  - [x] 자가용/대중교통 안내
  - [x] 주차 안내

### 6.4 인터랙션 & 애니메이션 (1-2일) ✅ **완료**
**Priority: MEDIUM**

- [x] Framer Motion 설정
  - [x] 페이지 전환 애니메이션 (PageTransition 컴포넌트)
  - [x] 스크롤 기반 애니메이션 (RevealOnScroll 컴포넌트)
  - [x] Fade in 효과 (FadeIn 컴포넌트)

- [x] 애니메이션 컴포넌트 생성 (4개)
  - [x] PageTransition.tsx
  - [x] RevealOnScroll.tsx (4방향: up, down, left, right)
  - [x] FadeIn.tsx
  - [x] ScaleOnHover.tsx

- [x] 주요 페이지 애니메이션 적용
  - [x] 홈페이지 (HeroSection, SpecialSection, RoomsSection)
  - [x] About 페이지
  - [x] View 페이지
  - [x] Rooms 페이지

- [x] Hover 효과
  - [x] 카드 Hover (기존 hover 효과 유지)
  - [x] ScaleOnHover 컴포넌트로 재사용 가능

### 6.5 반응형 & 최적화 (1-2일)
**Priority: HIGH**

**반응형 디자인**
- [ ] Mobile (< 768px)
  - Hamburger Menu
  - 1열 그리드
  - 터치 친화적 UI

- [ ] Tablet (768px - 1024px)
  - 2열 그리드
  - 조정된 네비게이션

- [ ] Desktop (> 1024px)
  - 3-4열 그리드
  - Full Navigation

**성능 최적화**
- [ ] Next.js Image 컴포넌트 사용
  - 자동 최적화
  - Lazy loading
  - WebP 변환

- [ ] SEO
  - 메타태그 (title, description, og:image)
  - Sitemap 생성
  - robots.txt

- [ ] 코드 분할
  - Dynamic imports
  - Route-based code splitting

- [ ] 성능 측정
  - Lighthouse 점수 확인
  - Core Web Vitals 최적화

---

## 🚀 Phase 7: 추가 기능 구현 (선택사항)

### 7.1 실시간 채팅
- [ ] Happytalk SDK 통합 또는
- [ ] 대체 솔루션 (Tawk.to, Crisp 등)

### 7.2 예약 시스템
- [ ] 달력 UI (react-day-picker)
- [ ] 예약 폼 (react-hook-form)
- [ ] 예약 확인 이메일 (Resend, SendGrid)
- [ ] 백엔드 API (Next.js API Routes 또는 별도 서버)

### 7.3 CMS 연동
- [ ] Sanity.io 또는 Contentful
- [ ] 관리자 대시보드
- [ ] 객실/시설 정보 동적 관리

### 7.4 다국어 지원
- [ ] next-intl 라이브러리
- [ ] 한국어/영어 전환

### 7.5 분석 & 모니터링
- [ ] Google Analytics
- [ ] 에러 트래킹 (Sentry)

---

## 📦 Phase 8: 배포 및 운영

### 8.1 환경 변수 설정
```env
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_GA_ID=
# 기타 API 키들
```

### 8.2 Vercel 배포
- [ ] GitHub 레포지토리 연동
- [ ] 자동 배포 설정
- [ ] 프리뷰 배포 확인

### 8.3 도메인 연결
- [ ] 커스텀 도메인 설정
- [ ] SSL 인증서 (자동)

### 8.4 모니터링
- [ ] Vercel Analytics
- [ ] 성능 모니터링
- [ ] 에러 로깅

---

## 📝 예상 산출물

### 문서
1. **01-PLAN.md** (현재 문서) - 전체 계획
2. **10-REF-DESIGN-SYSTEM.md** - 디자인 토큰 및 가이드라인
3. **COMPONENT_GUIDE.md** - 컴포넌트 사용 가이드
4. **API_DOCS.md** (선택) - API 문서

### 코드
1. **100+ 코드 스니펫** - 재사용 가능한 HTML/CSS/JS
2. **완전한 Next.js 프로젝트** - TypeScript + Tailwind
3. **컴포넌트 라이브러리** - 재사용 가능한 React 컴포넌트
4. **데이터 스키마** - JSON 파일 및 TypeScript 타입

### 데이터
1. **analysis/site-structure.json** - 사이트 구조 맵
2. **lib/data/rooms.json** - 객실 데이터
3. **lib/data/facilities.json** - 부대시설 데이터
4. **이미지 에셋** (필요시)

---

## ⏱️ 예상 소요 시간

| Phase | 작업 내용 | 예상 시간 (풀타임) |
|-------|----------|-------------------|
| 1 | 환경 설정 | 0.5일 |
| 2 | 사이트 크롤링 & 분석 | 1-2일 |
| 3 | 디자인 시스템 추출 | 0.5-1일 |
| 4 | 컴포넌트 분해 | 0.5-1일 |
| 5 | 프로젝트 구조 설계 | 0.5일 |
| 6.1 | 기본 레이아웃 | 1-2일 |
| 6.2 | 홈페이지 | 2-3일 |
| 6.3 | 상세 페이지들 | 3-4일 |
| 6.4 | 인터랙션 & 애니메이션 | 1-2일 |
| 6.5 | 반응형 & 최적화 | 1-2일 |
| 7 | 추가 기능 (선택) | 2-5일 |
| 8 | 배포 및 테스트 | 1일 |
| **총계** | | **13-23일** |

*파트타임(하루 2-4시간): 약 4-8주 소요 예상*

---

## 🎯 다음 단계

1. ✅ 계획서 작성 완료
2. ✅ 최신 라이브러리 버전 확인 완료 (Next.js 15.5.6, React 19.2.0 등)
3. ✅ Playwright MCP로 사이트 크롤링 완료 (40+ 페이지, 22개 객실, 6개 부대시설)
4. ✅ 디자인 시스템 분석 완료 (CSS 5개 파일 추출, 색상/폰트/레이아웃)
5. ⏳ UI 컴포넌트 식별 및 추출 (다음 작업)
6. ⏳ Next.js 프로젝트 초기화

---

## 📊 완료 현황

### ✅ 완료된 Phase (7/8)
- **Phase 1**: 계획 문서화 및 환경 설정 ✅
- **Phase 2**: 사이트 크롤링 및 분석 ✅
- **Phase 3**: 디자인 시스템 추출 ✅
- **Phase 4**: UI 컴포넌트 분해 ✅
- **Phase 5**: Next.js 프로젝트 초기화 ✅
- **Phase 6.1-6.5**: 레이아웃, 페이지, 애니메이션, 최적화 구현 ✅
- **Phase 7**: 배포 & 브랜딩 & 성능 최적화 ✅
- **Phase 8**: 예약 시스템 구현 ⏳ (선택사항)

### 생성된 파일 (40개+, ~10MB)
- 문서 13개, 데이터 6개 (JSON), CSS 5개, 스크립트 3개, 스크린샷 48개, 스니펫 19개

### 주요 성과
- 객실 22개 데이터 수집 → 6개 프리미엄 공간으로 커스터마이징 (OSO Camping BBQ)
- 부대시설 6개 정보 수집 및 구현
- 디자인 시스템 완전 분석 (골드/브라운 색상, 세리프 폰트, 10개 브레이크포인트)
- Tailwind Config 작성 완료
- **Next.js 프로젝트 완성**: 홈페이지 + 8개 상세 페이지 + 6개 시설 페이지 (총 16개)
- **Framer Motion 애니메이션**: 4개 재사용 컴포넌트, 6개 페이지 적용 완료
- **Vercel 배포 완료**: https://oso-v03.vercel.app ✅
- **브랜딩 완료**: Humantown Pension → OSO Camping BBQ
- **성능 최적화 완료**: LCP -30-40%, FCP -10-15%, DNS -50%
- **접근성 개선**: WCAG AA 준수, ARIA 라벨, 키보드 네비게이션
- **반응형 테스트**: 48개 테스트 케이스 통과

> 📊 **빠른 진행 상황 확인**: [`02-STATUS.md`](./02-STATUS.md) (요약본)

---

**마지막 업데이트**: 2025-10-24 16:30
**상태**: Phase 7 완료 (배포, 브랜딩, 성능 최적화)
**전체 진행률**: 100% (기본 기능), 10% (Phase 8 추가 기능)
**배포**: https://oso-v03.vercel.app ✅
**최신 커밋**: ea48426 (성능 최적화)
