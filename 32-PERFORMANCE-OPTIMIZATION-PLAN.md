# 성능 최적화 계획 및 실행 전략

**목표**: Lighthouse Performance Score 60 → 85+ 개선

**기준**: 2025-10-24

---

## 📊 현재 상태 분석

### 주요 메트릭 (이전 측정)
- **Performance Score**: 60/100
- **LCP (Largest Contentful Paint)**: 9.7s → 목표: <2.5s
- **미사용 CSS**: 22KB (100%)
- **미사용 JS**: 26KB (40% 미사용)
- **이미지 최적화 기회**: 320KB 절약 가능

---

## 🔧 적용된 최적화 (완료)

### 1. Next.js 설정 최적화 ✅
**파일**: `next.config.ts`

```typescript
// 추가된 최적화
- compress: true (Gzip 압축)
- poweredByHeader: false (X-Powered-By 헤더 제거)
- images.minimumCacheTTL: 60 (이미지 캐싱)
- optimizePackageImports: ["framer-motion", "swiper"]
- async headers() 함수로 정적 자산 캐싱 정책 설정
  - /images/*: max-age=31536000 (1년)
  - /_next/static/*: max-age=31536000 (1년)
```

**효과**:
- 정적 자산 캐싱 1년으로 연장
- 번들 압축률 향상
- 보안 헤더 개선

---

## 🎯 추가 최적화 전략

### 2. CSS 최적화 전략
**상태**: 진행 중

#### 2.1 미사용 CSS 분석
- `globals.css` 크기: ~27KB
- Tailwind CSS에서 사용하지 않는 유틸리티 클래스 제거
- 미사용 커스텀 CSS 규칙 제거

**실행**:
```bash
# Tailwind CSS 스캔 범위 확인 및 최적화
# 현재: src/**/*.{js,ts,jsx,tsx}
# 최적화: 정확한 경로만 스캔
```

#### 2.2 CSS 최적화 기법
- [ ] Critical CSS 추출 (LCP 요소)
- [ ] 위-아래 분할 로딩
- [ ] 미디어 쿼리 최적화

---

### 3. JavaScript 번들 최적화
**상태**: 진행 중

#### 3.1 Code Splitting
```typescript
// 동적 import 예시
const HeroSection = dynamic(() => import('@/components/sections/HeroSection'), {
  loading: () => <div>Loading...</div>,
  ssr: true, // 초기 로드 시에는 서버에서 렌더링
})
```

#### 3.2 번들 분석
- Framer Motion: ~50KB → 동적 로드 후 ~40KB 절약
- Swiper: ~80KB → 최적화 후 ~60KB 절약
- 예상 절약: 40KB

#### 3.3 제거 대상 라이브러리
- [ ] 사용하지 않는 애니메이션 라이브러리
- [ ] 미사용 유틸리티 함수

---

### 4. 이미지 최적화 ✅
**상태**: 이미 적용됨

#### 현재 설정
```typescript
images: {
  formats: ['image/avif', 'image/webp'],
  deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
}
```

#### 추가 최적화
- [ ] Unsplash 이미지 리사이징 (fit=crop&auto=format)
- [ ] 이미지 로딩 상태 추가 (placeholder blur)
- [ ] 필요하지 않은 고해상도 이미지 제거

---

### 5. 렌더링 최적화
**상태**: 진행 중

#### 5.1 컴포넌트 최적화
- [ ] React.memo 적용 (자주 리렌더링되는 컴포넌트)
- [ ] useMemo / useCallback 적용
- [ ] 컴포넌트 분할 및 지연 로딩

#### 5.2 Framer Motion 최적화
- [ ] GPU 가속화 활성화
- [ ] 애니메이션 duration 조정
- [ ] will-change CSS 속성 검토

---

### 6. 서버/캐싱 최적화 ✅
**상태**: 이미 적용됨

#### 캐싱 전략
```
정적 페이지: 3600초 (1시간)
정적 자산: 31536000초 (1년)
API 응답: 60초
```

#### 추천 추가 설정
- [ ] Vercel Edge Caching
- [ ] ISR (Incremental Static Regeneration)
- [ ] GZIP/Brotli 압축 확인

---

## 📈 예상 성능 개선

| 최적화 항목 | 현재 | 목표 | 개선율 |
|-----------|------|------|--------|
| Performance Score | 60 | 85+ | +25 |
| LCP | 9.7s | <2.5s | -75% |
| CSS 크기 | 22KB | 15KB | -32% |
| JS 번들 | 26KB 낭비 | 0KB | 100% |
| 이미지 크기 | 100% | 70% | -30% |

**예상 총 개선**: 25-35점 향상

---

## ✅ 체크리스트

### Phase 1: 설정 최적화 (완료)
- [x] next.config.ts 최적화
- [x] 이미지 포맷 설정 (AVIF/WebP)
- [x] 캐싱 헤더 설정
- [x] 압축 설정

### Phase 2: 코드 최적화 (진행 중)
- [ ] 동적 import 추가
- [ ] 미사용 CSS 제거
- [ ] JS 번들 분석
- [ ] React 컴포넌트 최적화

### Phase 3: 콘텐츠 최적화
- [ ] 이미지 URL 최적화 (쿼리 스트링)
- [ ] 폰트 최적화 (subset, preload)
- [ ] 비디오 최적화 (lazy loading)

### Phase 4: 검증 및 모니터링
- [ ] Lighthouse 재측정
- [ ] Web Vitals 확인
- [ ] 성능 모니터링 설정

---

## 🚀 다음 단계

1. **글로벌 CSS 분석** (30분)
   - 미사용 규칙 식별
   - 중복 선택자 제거

2. **동적 import 구현** (1시간)
   - 페이지 수준에서 적용
   - 번들 크기 측정

3. **이미지 URL 최적화** (30분)
   - Unsplash 쿼리 스트링 추가
   - 크기별 최적화

4. **Lighthouse 최종 측정** (15분)
   - 성능 점수 확인
   - 개선율 검증

---

**예상 소요 시간**: 2-3시간

**성공 기준**: Performance Score 80+ 달성
