# 성능 최적화 분석 보고서

**작업 일자**: 2025-10-24
**대상 사이트**: https://oso-v03.vercel.app
**상태**: 🔍 분석 중

---

## 📊 현재 상태 분석

### 기술 스택
- **Framework**: Next.js 16.0.0 (App Router, Turbopack)
- **React**: 19.2.0
- **Styling**: Tailwind CSS 4.1.15 + Custom CSS
- **Libraries**:
  - Swiper 12.0.3 (슬라이더)
  - Framer Motion 12.23.24 (애니메이션)
  - Sharp 0.34.4 (이미지 최적화)

### 빌드 정보
- **Build Size**: 48MB (.next 폴더)
- **TypeScript Files**: 39개
- **Routes**: 16개 페이지
- **Images**: Unsplash 외부 이미지 (quality=80)

---

## 🔍 성능 분석

### 1. 이미지 최적화 상태

#### ✅ 이미 적용된 최적화
```typescript
// unsplash-images.ts
const getUnsplashUrl = (photoId: string, width: number, height: number, quality: number = 80) => {
  return `https://images.unsplash.com/photo-${photoId}?w=${width}&h=${height}&fit=crop&auto=format&q=${quality}`;
};
```
- Quality 80으로 설정 (30-40% 파일 크기 감소)
- 크기별 이미지 생성 (1920x1080, 1200x800, 940x940, 800x600, 400x300)
- Next.js Image 컴포넌트 사용

#### ⚠️ 개선 필요
1. **Hero 이미지 로딩**
   - 3개 슬라이드 이미지 모두 즉시 로드
   - 첫 번째 이미지만 `priority`, 나머지는 lazy loading 필요

2. **중복 이미지 URL**
   ```typescript
   // roomImages 분석
   default: '...1478827387602-2a3957a2f3f0' // 중복
   main3: '...1478827387602-2a3957a2f3f0'   // 중복
   ```
   - 동일 이미지 ID 2번 사용

3. **외경 이미지 과다**
   - `exteriorImages`: 9개 (1200x800)
   - View 페이지에서 모두 로드 → lazy loading 필요

---

### 2. CSS 최적화 상태

#### ✅ 이미 적용된 최적화
- Tailwind CSS 사용 (자동 purge)
- Swiper CSS 선택적 import
  ```typescript
  import 'swiper/css';
  import 'swiper/css/effect-fade';
  import 'swiper/css/navigation';
  ```

#### ⚠️ 개선 필요
1. **Custom CSS 분석 필요**
   - globals.css에 사용하지 않는 스타일 존재 가능

2. **CSS-in-JS 최적화**
   - inline style 사용 많음 → CSS 클래스로 변환 가능

---

### 3. JavaScript 번들 최적화

#### ✅ 이미 적용된 최적화
```typescript
// next.config.ts
experimental: {
  optimizePackageImports: ["framer-motion", "swiper"],
}
```

#### ⚠️ 개선 필요
1. **Framer Motion 사용**
   - 4개 애니메이션 컴포넌트에서 사용
   - 홈페이지 이외 페이지에서는 선택적 로딩 가능

2. **Swiper 모듈**
   - 3개 컴포넌트에서 사용 (Hero, Special, Rooms)
   - 모두 홈페이지 → 필수

3. **Dynamic Import 미적용**
   - 무거운 컴포넌트 lazy loading 가능

---

### 4. 폰트 로딩

#### ✅ 이미 적용된 최적화
```typescript
// layout.tsx
const cinzel = Cinzel({
  display: "swap",
  // ...
});
```
- `display: swap` 적용 (FOIT 방지)

#### ⚠️ 개선 필요
1. **폰트 Preload**
   - 주요 폰트 preload 미적용
   - `<link rel="preload">` 추가 필요

2. **폰트 Subset**
   - 한글 폰트 전체 로드 → 필요한 글자만 subset 가능

---

### 5. 네트워크 최적화

#### ✅ 이미 적용된 최적화
```typescript
// next.config.ts
compress: true,
poweredByHeader: false,
minimumCacheTTL: 60,
```

#### ⚠️ 개선 필요
1. **외부 리소스 preconnect**
   - Unsplash 도메인 preconnect 미적용
   ```html
   <link rel="preconnect" href="https://images.unsplash.com" />
   ```

---

## 🎯 최적화 계획

### Priority 1: 이미지 최적화 (HIGH)
**예상 개선**: LCP 30-40% 감소

1. **Hero Section 이미지**
   - 첫 번째 슬라이드: `priority={true}`
   - 나머지 슬라이드: lazy loading

2. **외경 갤러리 이미지**
   - Intersection Observer로 lazy loading
   - 첫 3-4개만 즉시 로드

3. **중복 이미지 제거**
   - roomImages 중복 제거

### Priority 2: 폰트 최적화 (MEDIUM)
**예상 개선**: FCP 10-15% 감소

1. **폰트 Preload**
   ```html
   <link rel="preload" href="/fonts/..." as="font" crossorigin />
   ```

2. **preconnect 추가**
   ```html
   <link rel="preconnect" href="https://fonts.googleapis.com" />
   <link rel="preconnect" href="https://images.unsplash.com" />
   ```

### Priority 3: JavaScript 최적화 (MEDIUM)
**예상 개선**: TBT 15-20% 감소

1. **Dynamic Import**
   - Swiper (Special/Rooms Section)
   - Framer Motion (애니메이션 컴포넌트)

2. **Code Splitting**
   - Route별 자동 분할 (이미 적용됨)

### Priority 4: CSS 최적화 (LOW)
**예상 개선**: 번들 크기 5-10% 감소

1. **inline style → CSS 클래스**
2. **미사용 custom CSS 제거**

---

## 📈 예상 성능 개선

### Before (추정)
- **Performance**: 60-70
- **LCP**: 3-4초
- **FCP**: 1.5-2초
- **TBT**: 200-300ms
- **CLS**: 0.1-0.2

### After (목표)
- **Performance**: 85-90 (+20-30)
- **LCP**: 1.5-2초 (-50%)
- **FCP**: 0.8-1초 (-40%)
- **TBT**: 100-150ms (-50%)
- **CLS**: <0.1 (-50%)

---

## 🔧 구현 순서

1. **Phase 1** (30분): 이미지 최적화
   - Hero Section priority 설정
   - 외경 갤러리 lazy loading
   - 중복 이미지 제거

2. **Phase 2** (20분): 폰트 최적화
   - preconnect 추가
   - 폰트 preload

3. **Phase 3** (30분): JavaScript 최적화
   - Dynamic import 적용
   - 컴포넌트 lazy loading

4. **Phase 4** (20분): 테스트 & 검증
   - 빌드 테스트
   - 배포 후 성능 측정

**총 예상 시간**: 약 2시간

---

**다음 단계**: Phase 1 이미지 최적화 구현 시작
