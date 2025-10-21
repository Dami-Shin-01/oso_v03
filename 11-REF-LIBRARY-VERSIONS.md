# 프로젝트 라이브러리 최신 버전

**확인일**: 2025-10-22

## 핵심 프레임워크

| 라이브러리 | 최신 버전 | 용도 |
|-----------|----------|------|
| Next.js | **15.5.6** | React 프레임워크 (App Router) |
| React | **19.2.0** | UI 라이브러리 |
| React DOM | **19.2.0** | React 렌더링 |

## 개발 도구

| 라이브러리 | 최신 버전 | 용도 |
|-----------|----------|------|
| TypeScript | **5.9.3** | 타입 시스템 |
| ESLint | TBD | 코드 린팅 |
| Prettier | TBD | 코드 포매팅 |

## 스타일링

| 라이브러리 | 최신 버전 | 용도 |
|-----------|----------|------|
| Tailwind CSS | **4.1.15** | 유틸리티 CSS 프레임워크 |
| PostCSS | TBD | CSS 프로세서 |
| Autoprefixer | TBD | CSS 벤더 프리픽스 |

## 애니메이션 & 인터랙션

| 라이브러리 | 최신 버전 | 용도 |
|-----------|----------|------|
| Framer Motion | **12.23.24** | 애니메이션 라이브러리 |

## 이미지 최적화

| 라이브러리 | 최신 버전 | 용도 |
|-----------|----------|------|
| Sharp | **0.34.4** | 고성능 이미지 처리 |

## 추가 고려 라이브러리

### 폼 관리
- react-hook-form: 폼 상태 관리
- zod: 스키마 검증

### 날짜 처리
- date-fns 또는 dayjs: 날짜 유틸리티
- react-day-picker: 달력 UI

### 이미지 갤러리
- yet-another-react-lightbox: 라이트박스
- swiper: 이미지 슬라이더

### 아이콘
- lucide-react: 모던 아이콘 세트
- react-icons: 다양한 아이콘 컬렉션

### 채팅
- Happytalk SDK (원본 사이트 사용)
- 또는 Tawk.to, Crisp 등

## 설치 명령어

```bash
# Next.js 프로젝트 생성 (최신 버전)
npx create-next-app@latest humantown-nextjs --typescript --tailwind --app --eslint

# 추가 라이브러리 설치
npm install framer-motion@latest
npm install sharp@latest
npm install lucide-react@latest

# 개발 도구
npm install -D @types/node@latest
npm install -D prettier prettier-plugin-tailwindcss

# 폼 & 검증 (필요시)
npm install react-hook-form@latest zod@latest

# 이미지 갤러리 (필요시)
npm install yet-another-react-lightbox@latest swiper@latest
```

## 버전 호환성 확인사항

- ✅ Next.js 15.5.6은 React 19.2.0과 호환됨
- ✅ Tailwind CSS 4.x는 Next.js 15와 호환됨
- ⚠️ 일부 서드파티 라이브러리는 React 19 완전 지원 확인 필요

## 다음 업데이트

프로젝트 진행 중 추가 필요 라이브러리가 발견되면 이 문서를 업데이트합니다.
