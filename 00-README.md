# 휴먼타운 펜션 벤치마킹 프로젝트

**프로젝트 목표**: https://humantown.co.kr 사이트를 분석하여 Next.js 15 기반의 모던한 웹사이트 재구축

**시작일**: 2025-10-22
**현재 진행률**: 35% (Phase 3/8 완료)

---

## 🚀 빠른 시작

### 문서 둘러보기

1. **프로젝트 전체 계획 보기** → [`01-PLAN.md`](./01-PLAN.md)
2. **현재 진행 상황 확인** → [`02-STATUS.md`](./02-STATUS.md)
3. **디자인 시스템 참조** → [`10-REF-DESIGN-SYSTEM.md`](./10-REF-DESIGN-SYSTEM.md)

### 빠른 접근

| 하고 싶은 작업 | 문서 |
|--------------|------|
| 전체 프로젝트 로드맵 확인 | [`01-PLAN.md`](./01-PLAN.md) |
| 진행 상황 한눈에 보기 | [`02-STATUS.md`](./02-STATUS.md) |
| 색상/폰트/레이아웃 확인 | [`10-REF-DESIGN-SYSTEM.md`](./10-REF-DESIGN-SYSTEM.md) |
| 사용할 라이브러리 버전 확인 | [`11-REF-LIBRARY-VERSIONS.md`](./11-REF-LIBRARY-VERSIONS.md) |
| CSS 추출 과정 보기 | [`20-REPORT-CSS-EXTRACTION.md`](./20-REPORT-CSS-EXTRACTION.md) |

---

## 📊 프로젝트 현황

### ✅ 완료 (35%)
- **Phase 1**: 계획 문서화 및 환경 설정
- **Phase 2**: 사이트 크롤링 및 분석 (40+ 페이지)
- **Phase 3**: 디자인 시스템 추출 (CSS 5개 파일, 102KB)

### ⏳ 진행 예정
- **Phase 4**: UI 컴포넌트 분해
- **Phase 5**: Next.js 프로젝트 초기화
- **Phase 6**: 단계별 구현

### 주요 성과
- 22개 객실 데이터 수집 완료
- 6개 부대시설 정보 수집 완료
- 완전한 디자인 시스템 분석 (색상, 타이포그래피, 레이아웃)
- Tailwind CSS Config 작성 완료

---

## 📁 프로젝트 구조

```
251022_new-oso/
│
├── 📄 문서 (Documents)
│   ├── 00-README.md                      ← 이 문서 (진입점)
│   ├── 01-PLAN.md                        ← 전체 프로젝트 계획 (583줄)
│   ├── 02-STATUS.md                      ← 진행 상황 요약
│   ├── 10-REF-DESIGN-SYSTEM.md          ← 디자인 시스템 참조
│   ├── 11-REF-LIBRARY-VERSIONS.md       ← 라이브러리 버전 정보
│   ├── 20-REPORT-CSS-EXTRACTION.md      ← CSS 추출 보고서
│   └── 99-NAMING-CONVENTION.md          ← 문서 명명 규칙
│
├── 📁 analysis/                          ← 분석 데이터 (5 JSON)
│   ├── site-structure.json               # 사이트 전체 구조
│   ├── rooms-data.json                   # 22개 객실 정보
│   ├── facilities-data.json              # 6개 부대시설 정보
│   ├── extracted-styles.json (109KB)     # 전체 CSS 데이터
│   └── styles-summary.json               # CSS 요약
│
├── 📁 css/                               ← 추출한 CSS (5 files, 102KB)
│   ├── css-1-reset.css
│   ├── css-2-style.css (메인)
│   ├── css-3-swiper-bundle.css
│   ├── css-4-board_black.css
│   └── css-5-popup_black.css
│
├── 📁 scripts/                           ← 추출 스크립트 (3 files)
│   ├── extract-css.js
│   ├── extract-individual-css.js
│   └── summarize-styles.js
│
├── 📁 screenshots/                       ← 스크린샷 (1 file, 5.2MB)
│   └── humantown-screenshot.png
│
├── 📁 snippets/                          ← 코드 스니펫 (작업 예정)
│   ├── components/
│   ├── layouts/
│   ├── styles/
│   └── interactions/
│
└── 📁 humantown-nextjs/                  ← Next.js 프로젝트 (생성 예정)
```

---

## 📚 문서 계층 구조

프로젝트 문서는 **번호 prefix**로 위계가 구분됩니다:

### 00-09: 메인 문서 (MAIN)
프로젝트의 핵심 문서들
- **00-README.md** - 프로젝트 진입점 (이 문서)
- **01-PLAN.md** - 전체 프로젝트 계획 및 로드맵
- **02-STATUS.md** - 진행 상황 요약

### 10-19: 참조 문서 (REFERENCE)
기술 스펙 및 가이드 문서들
- **10-REF-DESIGN-SYSTEM.md** - 디자인 시스템 (색상, 타이포그래피, 레이아웃)
- **11-REF-LIBRARY-VERSIONS.md** - 사용 라이브러리 최신 버전 목록

### 20-29: 분석 리포트 (REPORT)
분석 과정 및 결과 문서들
- **20-REPORT-CSS-EXTRACTION.md** - CSS 추출 과정 및 결과

### 90-99: 메타 문서 (META)
프로젝트 관리 문서들
- **99-NAMING-CONVENTION.md** - 문서 명명 규칙

> 💡 **Tip**: 번호 순서대로 읽으면 프로젝트를 체계적으로 이해할 수 있습니다.

---

## 🎯 주요 발견 사항

### 사이트 정보
- **URL**: https://humantown.co.kr
- **유형**: 펜션 예약 사이트
- **규모**: 40+ 페이지
- **객실**: 22개 (20평~64평)
- **가격대**: 130,000원 ~ 500,000원
- **부대시설**: 수영장, BBQ, 운동장, 카페, 산책로, 놀이터

### 기술 스택
- **Frontend**: 바닐라 JavaScript
- **CSS**: 커스텀 CSS (102KB, 5개 파일)
- **라이브러리**: Swiper 8.x (슬라이더)
- **외부 연동**: Happytalk (채팅), Daum Map, Naver Maps, Yanolja

### 디자인 특징
- **컬러**: 골드/브라운 계열 (#DEC48E, #B2946B, #A08560)
- **폰트**: Cinzel (로고), Lora (헤딩), Noto Sans KR (본문)
- **스타일**: 클래식하고 고급스러운 펜션 브랜드
- **레이아웃**: 각진 디자인 (border-radius: 0), 다크 테마 섹션

---

## 🛠️ 다음 작업

### Phase 4: UI 컴포넌트 분해 (다음 단계)
- Header, Footer, Navigation 추출
- Button 3개 변형
- Card (Room, Facility)
- Hero Slider, Image Gallery

**예상 소요**: 2-3시간

### Phase 5: Next.js 프로젝트 초기화
- create-next-app 실행
- TypeScript + Tailwind CSS 설정
- 폴더 구조 생성

**예상 소요**: 1시간

---

## 💻 기술 스택 (마이그레이션 목표)

### 현재 사이트
- 바닐라 JavaScript
- 커스텀 CSS
- Swiper 8.x

### Next.js 프로젝트
- **Framework**: Next.js 15.5.6 (App Router)
- **언어**: TypeScript 5.9.3
- **스타일**: Tailwind CSS 4.1.15
- **UI**: React 19.2.0
- **애니메이션**: Framer Motion 12.23.24
- **이미지**: Sharp 0.34.4 (최적화)

---

## 📖 추가 정보

### 관련 링크
- **원본 사이트**: https://humantown.co.kr
- **Next.js 공식 문서**: https://nextjs.org/docs
- **Tailwind CSS 문서**: https://tailwindcss.com/docs

### 문의 및 문제
- 문서 관련 문의: [`01-PLAN.md`](./01-PLAN.md) 참조
- 기술 스택 질문: [`11-REF-LIBRARY-VERSIONS.md`](./11-REF-LIBRARY-VERSIONS.md) 참조

---

**최종 업데이트**: 2025-10-22 06:10
**다음 마일스톤**: Phase 4 - UI 컴포넌트 분해
