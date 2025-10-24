# 프로젝트 진행 상황 요약

**프로젝트**: 휴먼타운 펜션 사이트 벤치마킹 및 Next.js 재구축
**최종 업데이트**: 2025-10-24 02:00
**상세 계획**: [`01-PLAN.md`](./01-PLAN.md) 참조

---

## 📊 전체 진행률: **100%** (기본 기능) / **10%** (Phase 8 추가 기능)

```
✅ Phase 1: 계획 문서화 및 환경 설정     [████████████] 100%
✅ Phase 2: 사이트 크롤링 및 분석       [████████████] 100%
✅ Phase 3: 디자인 시스템 추출         [████████████] 100%
✅ Phase 4: UI 컴포넌트 분해          [████████████] 100%
✅ Phase 5: Next.js 프로젝트 구조     [████████████] 100%
✅ Phase 6: 단계별 구현              [████████████] 100%
   ✅ 6.1 기본 레이아웃              [████████████] 100%
   ✅ 6.2 홈페이지 섹션              [████████████] 100%
   ✅ 6.3 상세 페이지                [████████████] 100%
   ✅ 6.4 애니메이션                 [████████████] 100%
   ✅ 6.5 최적화                     [████████████] 100%
✅ Phase 7: 배포 & 모니터링           [████████████] 100%
⏳ Phase 8: 예약 시스템 구현          [░░░░░░░░░░░░]  0%
```

---

## ✅ 완료된 작업

### Phase 1: 계획 문서화 (100%)
- [x] 프로젝트 계획서 작성
- [x] 최신 라이브러리 버전 확인 (Next.js 15.5.6, React 19.2.0, etc.)
- [x] 폴더 구조 생성 및 정리

### Phase 2: 사이트 분석 (100%)
- [x] 40+ 페이지 자동 크롤링 (Playwright MCP)
- [x] 네비게이션 구조 매핑
- [x] 22개 객실 데이터 수집
- [x] 6개 부대시설 정보 수집
- [x] 전체 페이지 스크린샷

### Phase 3: 디자인 시스템 (100%)
- [x] CSS 파일 5개 추출 (102KB)
- [x] 색상 팔레트 분석 (골드/브라운 계열)
- [x] 타이포그래피 시스템 (Cinzel, Lora, Noto Sans KR)
- [x] 10개 브레이크포인트 매핑
- [x] Tailwind Config 작성

### Phase 4: UI 컴포넌트 분해 (100%)
- [x] Header 컴포넌트 (HTML/CSS/JS)
- [x] Footer 컴포넌트 (HTML/CSS/JS)
- [x] Button 3가지 변형 (Primary, Dark, Text)
- [x] Room Card 컴포넌트 (일반 + 컴팩트)
- [x] Facility Card 컴포넌트
- [x] Hero Slider 컴포넌트
- [x] Image Gallery 컴포넌트 (라이트박스 포함)
- [x] snippets 폴더 구조 생성
- [x] 컴포넌트 추출 보고서 작성

### Phase 5: Next.js 프로젝트 초기화 (100%)
- [x] Next.js 16.0.0 프로젝트 생성
- [x] TypeScript 설정
- [x] Tailwind CSS v4.1.15 설정
- [x] App Router 구조 설정
- [x] Turbopack 활성화
- [x] src/ 디렉토리 구조 생성
- [x] 디자인 시스템 globals.css 적용
- [x] Google Fonts 설정 (Cinzel, Lora, Noto Sans KR)
- [x] TypeScript 타입 정의 (Room, Facility)
- [x] JSON 데이터 마이그레이션

### Phase 6.1: 기본 레이아웃 구현 (100%)
- [x] Header 컴포넌트 React 변환
- [x] Footer 컴포넌트 React 변환
- [x] RootLayout 통합
- [x] 스크롤 감지 및 모바일 메뉴 구현
- [x] 개발 서버 실행 및 테스트

### Phase 6.2: 홈페이지 섹션 구현 (100%)
- [x] HeroSection 컴포넌트 (Swiper 슬라이더)
- [x] SpecialSection 컴포넌트 (6개 부대시설)
- [x] FacilityCard 컴포넌트
- [x] RoomsSection 컴포넌트 (22개 객실)
- [x] RoomCard 컴포넌트
- [x] 반응형 캐러셀 구현
- [x] 모든 CSS 스타일 적용

### Phase 6.3: 상세 페이지 구현 (100%)
- [x] About 페이지 - 펜션 소개 (`/about/page.tsx`)
- [x] View 페이지 - 외경 갤러리 (`/view/page.tsx`)
- [x] Rooms 목록 페이지 (`/rooms/page.tsx`)
- [x] Room Detail 페이지 - 동적 라우팅 (`/rooms/[id]/page.tsx`)
- [x] Facilities 상세 페이지 6개
  - [x] 수영장 (`/special/swimming-pool/page.tsx`)
  - [x] 바베큐 (`/special/barbecue/page.tsx`)
  - [x] 족구장/농구장 (`/special/sports/page.tsx`)
  - [x] 카페 (`/special/cafe/page.tsx`)
  - [x] 산책로 (`/special/trail/page.tsx`)
  - [x] 어린이놀이터 (`/special/playground/page.tsx`)
- [x] Reservation 페이지 (`/reservation/page.tsx`)
- [x] Travel 페이지 - 6개 관광지 (`/travel/page.tsx`)
- [x] Location 페이지 - 지도 & 교통편 (`/location/page.tsx`)
- [x] 객실 데이터 헬퍼 함수 (`src/lib/rooms.ts`)
- [x] Unsplash 이미지 확장 (외경, 여행지)

### Phase 6.4: 애니메이션 & 인터랙션 (100%)
- [x] Framer Motion 라이브러리 설치 및 설정
- [x] 애니메이션 컴포넌트 생성 (4개)
  - [x] `PageTransition.tsx` - 페이지 전환 애니메이션
  - [x] `RevealOnScroll.tsx` - 스크롤 기반 reveal (4방향 지원)
  - [x] `FadeIn.tsx` - 간단한 페이드 인 효과
  - [x] `ScaleOnHover.tsx` - 호버 스케일 효과
- [x] 홈페이지 애니메이션 적용
  - [x] `HeroSection.tsx` - 텍스트 오버레이 및 스크롤 인디케이터
  - [x] `SpecialSection.tsx` - 헤더 fade, Swiper reveal
  - [x] `RoomsSection.tsx` - 헤더, 캐러셀, CTA 버튼 staggered 애니메이션
- [x] 상세 페이지 애니메이션 적용
  - [x] About 페이지 - 헤더, 섹션별 reveal 애니메이션
  - [x] View 페이지 - 갤러리 그리드 reveal
  - [x] Rooms 페이지 - 객실 목록 reveal

### Phase 6.5: 최적화 & 배포 준비 (100%)
- [x] SEO 메타데이터 추가 (모든 페이지)
  - [x] 7개 route별 layout.tsx 파일 생성 (about, view, rooms, reservation, travel, location, special)
  - [x] OpenGraph 메타데이터 설정
  - [x] 페이지별 title, description, keywords 최적화
- [x] 빌드 테스트 & 에러 수정
  - [x] Room 타입 정의 수정 (선택적 속성으로 변경)
  - [x] Framer Motion 애니메이션 타입 에러 수정 (cubic-bezier 배열 사용)
  - [x] TypeScript null safety 체크 추가
  - [x] Client Component 지정 (이벤트 핸들러 포함 페이지)
  - [x] 프로덕션 빌드 성공 (16개 페이지 생성)
- [x] 이미지 최적화
  - [x] Next.js Image 컴포넌트 적용 확인
  - [x] AVIF, WebP 포맷 지원 설정
  - [x] 반응형 이미지 사이즈 최적화 (deviceSizes, imageSizes)
- [x] 반응형 테스트 (모바일/태블릿 완료)
- [x] 404/500 에러 해결
  - [x] facilities-data.json URL 수정 (/special{N}.html → /special/{slug})
  - [x] site-structure.json 모든 .html URL → Next.js 라우트 변경
  - [x] rooms-data.json room 26270 pricing 데이터 완성

### Phase 7: 배포 & 모니터링 (100%)
- [x] Vercel 배포 (GitHub 연동)
  - [x] 자동 배포 설정 완료
  - [x] https://oso-v03.vercel.app 배포 완료
- [x] 프로덕션 환경 테스트
  - [x] Playwright를 통한 전체 사이트 크롤링
  - [x] 모든 링크 HTTP 상태 코드 확인
  - [x] 404/500 에러 진단 및 해결
  - [x] 재배포 후 에러 0개 확인
- [x] 배포 후 에러 해결
  - [x] Special Facilities 6개 페이지 404 → 200 OK
  - [x] Room 26270 500 에러 → 200 OK

### Phase 7.5: 브랜딩 일관성 개선 (100%) ✅ **완료** (2025-10-24)
- [x] 부대시설 URL/이름 불일치 해결
  - [x] `/special/trail` 페이지를 "산책로"에서 "식당"으로 변경
  - [x] Header 네비게이션 "산책로" → "식당" 업데이트
  - [x] `/special/playground` 페이지 "어린이놀이터" → "키즈존" 변경
- [x] 브랜딩 텍스트 정리
  - [x] "Humantown Pension" → "OSO Camping BBQ" 전체 교체
  - [x] layout.tsx, globals.css, types/index.ts 주석 업데이트
  - [x] special/layout.tsx 메타데이터 업데이트
  - [x] travel/layout.tsx 메타데이터 업데이트 (가평 → 평택)
  - [x] travel/page.tsx 설명 텍스트 업데이트
- [x] 데이터 파일 정리
  - [x] `analysis/` 폴더의 오래된 Humantown 데이터 아카이브
  - [x] `analysis/archived/` 폴더 생성 및 README 작성
  - [x] 원본 rooms-data.json, facilities-data.json 보존
- [x] 빌드 테스트 & 배포
  - [x] 프로덕션 빌드 성공 (16개 페이지)
  - [x] Git 커밋: 90afdf4 (브랜딩 일관성 수정)
  - [x] GitHub 푸시 및 Vercel 자동 배포

### Phase 6.5 추가: 접근성 개선 (100%) ✅ **완료**
- [x] Header ARIA 라벨 추가
  - [x] `role="banner"` on header element
  - [x] `aria-label` on logo links: "휴먼타운 펜션 홈"
  - [x] `aria-label` on navigation: "메인 메뉴"
  - [x] `aria-haspopup`, `aria-expanded` on dropdown triggers
  - [x] `role="menu"`, `role="menuitem"` on menu items
  - [x] Keyboard support: Escape key to close mobile menu
- [x] Footer ARIA 라벨 추가
  - [x] `role="contentinfo"` on footer
  - [x] `aria-label` on phone, address, privacy links
  - [x] `role="region"` on address section
  - [x] Floating reservation button with aria-label
- [x] 모든 이미지에 alt 텍스트 및 ARIA 라벨 추가
  - [x] HeroSection: Added `altText` field + `role="img"` + `aria-label`
  - [x] RoomCard: Main image + thumbnail images with `role="img"` + `aria-label`
  - [x] FacilityCard: Images with `role="img"` + `aria-label`
  - [x] Page images: All Image components have proper alt text
  - [x] SVG elements: Scroll indicator with aria-label, navigation arrows with roles
- [x] 모든 대화형 요소에 ARIA 라벨 추가
  - [x] Location page: Phone call link, address copy button, map links
  - [x] Room detail: Image viewer close button
  - [x] View page: Photo viewer close button
  - [x] Header: Menu toggle button with aria-controls, aria-expanded
- [x] 색상 대비 개선 (WCAG AA 표준)
  - [x] 텍스트 색상: #666 → #444, #999 → #666
  - [x] Footer 색상: 투명도 증가로 대비 개선
  - [x] 모든 텍스트 요소 WCAG AA 준수
- [x] 빌드 및 재배포
  - [x] 프로덕션 빌드 성공 (npm run build)
  - [x] Git 커밋: bb2148e (alt text/ARIA), 3e95bc9 (buttons/forms ARIA)
  - [x] Vercel 재배포 완료 (HTTP 200 상태)

### Phase 6.5 추가: 반응형 테스트 (100%) ✅ **완료**
- [x] Playwright 반응형 테스트 스크립트 개발
- [x] 8개 기기 프로필 × 6개 페이지 = 48개 테스트 케이스
- [x] 레이아웃 최적화 (Grid minmax 수정)
- [x] Swiper overflow 처리 (CSS 강화)
- [x] 반응형 스크린샷 캡처 (48개 이미지)
- [x] 테스트 보고서 생성 (31-REPORT-RESPONSIVE-TEST.md)

**결과**: 48/48 테스트 성공 (100%)

### Phase 6.5 추가: 성능 최적화 (100%) ✅ **완료**
- [x] next.config.ts 최적화
  - [x] Gzip 압축 활성화 (compress: true)
  - [x] 보안 헤더 개선 (poweredByHeader: false)
  - [x] 이미지 캐싱 TTL 설정 (minimumCacheTTL: 60)
  - [x] 패키지 import 최적화 (framer-motion, swiper)
  - [x] HTTP 캐싱 헤더 설정 (1년 TTL)
- [x] 이미지 최적화
  - [x] Unsplash URL quality 파라미터 추가 (q=80)
  - [x] 이미지 파일 크기 30-40% 감소 (AVIF/WebP)
  - [x] 반응형 device sizes 설정 검증
- [x] 성능 최적화 계획 문서 (32-PERFORMANCE-OPTIMIZATION-PLAN.md)
- [x] 성능 최적화 완료 보고서 (33-PERFORMANCE-OPTIMIZATION-REPORT.md)

**예상 개선**:
- LCP: 9.7s → 3-5s (-50%)
- 이미지 크기: -30-40%
- Performance Score: 60 → 80-85 (+20-25)

---

## 📁 생성된 파일 (40개+ 분석/보고서, ~10MB)

### 📄 문서 (9개)
1. **01-PLAN.md** - 전체 프로젝트 계획 (583줄)
2. **02-STATUS.md** - 진행 상황 요약 (현재 문서)
3. **10-REF-DESIGN-SYSTEM.md** - 완전한 디자인 시스템
4. **11-REF-LIBRARY-VERSIONS.md** - 라이브러리 버전 정보
5. **20-REPORT-CSS-EXTRACTION.md** - CSS 추출 보고서
6. **30-REPORT-COMPONENT-EXTRACTION.md** - 컴포넌트 추출 보고서
7. **31-REPORT-RESPONSIVE-TEST.md** - 반응형 테스트 보고서 (48개 기기/페이지 조합)
8. **32-PERFORMANCE-OPTIMIZATION-PLAN.md** - 성능 최적화 계획 및 전략
9. **33-PERFORMANCE-OPTIMIZATION-REPORT.md** - 성능 최적화 완료 보고서

### 📊 분석 데이터 (6개 JSON)
1. **site-structure.json** - 전체 사이트 구조
2. **rooms-data.json** - 22개 객실 상세 정보
3. **facilities-data.json** - 6개 부대시설 정보
4. **extracted-styles.json** (109KB) - 전체 CSS 데이터
5. **styles-summary.json** - CSS 요약
6. **responsive-test-report.json** - 반응형 테스트 상세 데이터 (48개 테스트)

### 🎨 CSS 파일 (5개, 102KB)
1. **css-1-reset.css** (5.1KB)
2. **css-2-style.css** (65KB) - 메인 스타일시트
3. **css-3-swiper-bundle.css** (16.5KB)
4. **css-4-board_black.css** (13.9KB)
5. **css-5-popup_black.css** (2.3KB)

### 🔧 스크립트 (3개)
1. **extract-css.js** - CSS 추출 스크립트
2. **extract-individual-css.js** - 개별 파일 추출
3. **summarize-styles.js** - 스타일 요약 생성

### 📸 스크린샷 (1개)
- **humantown-screenshot.png** (5.2MB) - 전체 페이지

### 💻 UI 컴포넌트 스니펫 (19개)
**레이아웃** (6 files):
1. **Header.html** - 헤더 구조
2. **Header.css** - 헤더 스타일
3. **Header.js** - 헤더 인터랙션
4. **Footer.html** - 푸터 구조
5. **Footer.css** - 푸터 스타일
6. **Footer.js** - 푸터 인터랙션

**컴포넌트** (13 files):
1. **Button.html** - 3가지 버튼 변형
2. **Button.css** - 버튼 스타일
3. **RoomCard.html** - 객실 카드 (일반 + 컴팩트)
4. **RoomCard.css** - 객실 카드 스타일
5. **FacilityCard.html** - 부대시설 카드
6. **FacilityCard.css** - 부대시설 카드 스타일
7. **HeroSlider.html** - 메인 비주얼 슬라이더
8. **HeroSlider.css** - 슬라이더 스타일
9. **ImageGallery.html** - 이미지 갤러리 + 라이트박스
10. **ImageGallery.css** - 갤러리 스타일
11. **ImageGallery.js** - 갤러리 인터랙션

---

## 🎨 디자인 시스템 핵심

### 색상
- **Primary**: #DEC48E (라이트 골드), #B2946B (메인), #A08560 (다크)
- **Neutral**: #333 (텍스트), #F5F5F5 (배경), #1F1D1C (다크)

### 타이포그래피
- **로고**: Cinzel (세리프)
- **헤딩**: Lora (세리프)
- **본문**: Noto Sans KR (산세리프)
- **크기**: 11px ~ 83px (12단계)

### 레이아웃
- **Container**: max-width 1400px
- **Breakpoints**: 10개 (1650px ~ 479px)
- **Spacing**: 8px 기반 시스템
- **Border**: 0px (각진 디자인)

---

## 📈 주요 발견사항

### 콘텐츠
- **객실**: 22개 (20평~64평, 2~8인)
- **가격대**: 130,000원 ~ 500,000원
- **부대시설**: 수영장, BBQ, 운동장, 카페, 산책로, 놀이터

### 기술 스택
- **Frontend**: 바닐라 JavaScript
- **CSS**: 커스텀 CSS (102KB)
- **라이브러리**: Swiper 8.x (슬라이더만)
- **외부 연동**: Happytalk, Daum Map, Naver Maps, Yanolja

### 디자인 특징
- 고급스러운 펜션 브랜드 (골드/브라운)
- 세리프 폰트로 클래식한 느낌
- 각진 디자인 (미니멀)
- 다크 테마 섹션 (푸터 등)

---

## ⏭️ 다음 단계

### Phase 6.5: 최적화 & 배포 준비 (진행 중 90%)
- [x] 이미지 최적화 (Next.js Image 최적화)
- [x] SEO 메타데이터 (모든 페이지)
- [ ] 성능 최적화 (Lighthouse 점수 개선) - 다음 우선순위
- [ ] 반응형 테스트 (모바일/태블릿/데스크톱) - 다음 우선순위
- [x] 접근성 개선 (ARIA 라벨, 키보드 내비게이션) - ✅ **완료**
- [x] 빌드 테스트 & 에러 수정

### Phase 7: 배포 & 모니터링 ⭐ **현재 작업**
- [ ] Vercel 배포 (GitHub 연동)
- [ ] 프로덕션 환경 테스트
- [ ] 성능 모니터링 (Analytics)
- [ ] 에러 모니터링 (Sentry 또는 LogRocket)

### Phase 6.5 추가 작업 (남은 3개 항목) ⭐ **다음 우선순위**
- [ ] 성능 최적화 (Lighthouse 점수 개선)
  - [ ] Lighthouse 리포트 생성 및 분석
  - [ ] 이미지 최적화 심화 (불필요한 이미지 제거)
  - [ ] CSS 미사용 코드 제거
  - [ ] JavaScript 번들 최적화
  - [ ] 캐싱 전략 개선
- [ ] 반응형 테스트 (모바일/태블릿/데스크톱 검증)
  - [ ] 모바일 (iPhone 12, iPhone SE, Samsung Galaxy S21)
  - [ ] 태블릿 (iPad, iPad Air)
  - [ ] 데스크톱 (1920px, 1366px, 1024px)
  - [ ] 터치 인터랙션 테스트
  - [ ] 네트워크 느린 환경 테스트
- [x] 접근성 개선 (ARIA, 키보드 네비게이션) - ✅ **완료**
  - [x] 모든 이미지에 alt 텍스트 추가
  - [x] ARIA 라벨 추가 (form, buttons, nav)
  - [x] 색상 대비 개선 (WCAG AA 표준)
  - [x] 키보드 네비게이션 테스트 (Tab, Enter, Esc)
  - [x] 포커스 인디케이터 개선
  - [x] 스크린리더 호환성 테스트

### Phase 8: Supabase 기반 예약 시스템 구현 (추후 작업)
#### 8.0: Supabase 설정 (추정 1일)
- [ ] Supabase 프로젝트 생성
- [ ] PostgreSQL 테이블 스키마 설계
  - [ ] `reservations` (id, room_id, check_in, check_out, guests, total_price, status, guest_info)
  - [ ] `room_availability` (id, room_id, date, available)
- [ ] RLS 정책 설정

#### 8.1: 클라이언트 라이브러리 (추정 1일)
- [ ] `npm install @supabase/supabase-js`
- [ ] 환경 변수 설정
- [ ] `src/lib/supabase.ts` 초기화
- [ ] TypeScript 타입 정의

#### 8.2: 예약 폼 UI (추정 2일)
- [ ] ReservationForm (객실, DatePicker, 인원수, 가격 계산)
- [ ] React Hook Form + Zod 검증

#### 8.3: 게스트 정보 폼 (추정 1일)
- [ ] GuestInfoForm (이름, 이메일, 전화, 특별 요청)

#### 8.4: API Routes (추정 2일)
- [ ] POST `/api/reservations/create`
- [ ] GET `/api/rooms/[id]/availability`
- [ ] GET `/api/reservations/[id]`
- [ ] POST `/api/reservations/[id]/cancel`

#### 8.5: 예약 확인 페이지 (추정 1.5일)
- [ ] 예약 완료 페이지
- [ ] 예약 조회 페이지

#### 8.6: 고급 기능 (선택사항)
- [ ] 가용성 캘린더
- [ ] 메일/SMS 알림

### Phase 9: 추가 기능 (선택사항)
- [ ] 실시간 채팅 통합 (Happytalk SDK)
- [ ] 결제 시스템 (Stripe)
- [ ] CMS 연동 (Contentful)
- [ ] 다국어 지원 (i18n)

---

## 📚 관련 문서

| 문서 | 설명 | 링크 |
|------|------|------|
| **프로젝트 계획** | 전체 Phase별 상세 계획 | [`01-PLAN.md`](./01-PLAN.md) |
| **디자인 시스템** | 색상, 타이포그래피, 컴포넌트 스타일 | [`10-REF-DESIGN-SYSTEM.md`](./10-REF-DESIGN-SYSTEM.md) |
| **라이브러리 버전** | 최신 버전 확인 결과 | [`11-REF-LIBRARY-VERSIONS.md`](./11-REF-LIBRARY-VERSIONS.md) |
| **CSS 추출 보고서** | CSS 분석 상세 내용 | [`20-REPORT-CSS-EXTRACTION.md`](./20-REPORT-CSS-EXTRACTION.md) |
| **컴포넌트 추출 보고서** | UI 컴포넌트 분해 결과 | [`30-REPORT-COMPONENT-EXTRACTION.md`](./30-REPORT-COMPONENT-EXTRACTION.md) |

---

## 📂 폴더 구조

```
oso_v03/
├── 📄 00-README.md                        ← 프로젝트 진입점
├── 📄 01-PLAN.md                          ← 전체 계획
├── 📄 02-STATUS.md                        ← 이 문서 (진행 상황)
├── 📄 10-REF-DESIGN-SYSTEM.md            ← 디자인 시스템 참조
├── 📄 11-REF-LIBRARY-VERSIONS.md         ← 라이브러리 버전
├── 📄 20-REPORT-CSS-EXTRACTION.md        ← CSS 추출 보고서
├── 📄 30-REPORT-COMPONENT-EXTRACTION.md  ← ✅ 컴포넌트 추출 보고서
│
├── 📁 analysis/      (5 files)
├── 📁 css/           (5 files, 102KB)
├── 📁 scripts/       (3 files)
├── 📁 screenshots/   (1 file, 5.2MB)
│
└── 📁 snippets/      ← ✅ 컴포넌트 스니펫 (19 files)
    ├── layouts/      (Header, Footer - 6 files)
    ├── components/   (Button, Cards, Slider, Gallery - 13 files)
    ├── styles/       (작업 예정)
    └── interactions/ (작업 예정)
```

---

**현재 상태**: Phase 7 완료 - 브랜딩 일관성 개선 및 배포 완료
**다음 작업**: Phase 8 - 예약 시스템 구현 또는 성능 최적화
**예상 소요**: 협의 필요
**우선순위**: MEDIUM
**최종 업데이트**: 2025-10-24 15:00

**개발 서버**: http://localhost:3003 (준비 완료)
**프로덕션 빌드**: ✅ 성공 (16개 페이지 생성)
**GitHub 저장소**: https://github.com/Dami-Shin-01/oso_v03
**배포 플랫폼**: Vercel (https://oso-v03.vercel.app)
**최신 커밋**: 90afdf4 - 브랜딩 일관성 및 시설명 수정

**페이지**: 홈 + 8개 상세 + 6개 시설 = 총 15개 라우트
**애니메이션 컴포넌트**: 4개 (PageTransition, RevealOnScroll, FadeIn, ScaleOnHover)
**메타데이터**: 7개 라우트별 layout.tsx (SEO 최적화)
