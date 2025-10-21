# 휴먼타운 펜션 디자인 시스템

**기반 사이트**: https://humantown.co.kr
**분석일**: 2025-10-22
**상태**: CSS 추출 완료 - 실제 값 기반

---

## 📐 레이아웃 시스템

### Container & Wrapper

```css
/* 메인 래퍼 */
#wrap {
  min-width: 280px;
  max-width: 1920px;
  margin: 0 auto;
  overflow: hidden;
}

/* 내부 컨테이너 */
.inner {
  width: 1400px;
  margin: 0 auto;
  box-sizing: border-box;
  position: relative;
}

/* Tailwind 설정 */
.container {
  max-width: 1400px;
  mx-auto;
  px-4 md:px-8 lg:px-12;
}
```

---

## 🎨 색상 시스템

### 브랜드 컬러

```css
/* Primary - 골드/브라운 계열 */
--color-primary-light: #DEC48E;   /* 라이트 골드 */
--color-primary: #B2946B;          /* 미드 골드 */
--color-primary-dark: #A08560;     /* 다크 브라운 */

/* Tailwind 팔레트 */
primary: {
  50: '#faf6f0',
  100: '#f5ebe0',
  200: '#ead7c1',
  300: '#dec48e',  /* 브랜드 라이트 골드 */
  400: '#c4a878',
  500: '#b2946b',  /* 브랜드 메인 */
  600: '#a08560',  /* 브랜드 다크 */
  700: '#8a7050',
  800: '#6f5940',
  900: '#544330',
}
```

### 중립 색상 (Neutral)

```css
/* 텍스트 */
--color-text-primary: #333333;     /* rgb(51, 51, 51) */
--color-text-secondary: #444444;   /* rgb(68, 68, 68) - 헤딩 */
--color-text-tertiary: #666666;    /* rgb(102, 102, 102) */
--color-text-muted: #999999;

/* 배경 */
--color-bg-primary: #FFFFFF;
--color-bg-secondary: #F5F5F5;
--color-bg-dark: #1F1D1C;          /* 푸터 */
--color-bg-dark-alt: #262423;      /* 섹션 배경 */
--color-bg-dark-overlay: #303030;  /* 사이드바 */

/* 보더 */
--color-border: #E5E5E5;
--color-border-dark: #444444;

/* Tailwind neutral 팔레트 */
neutral: {
  50: '#fafafa',
  100: '#f5f5f5',
  200: '#e5e5e5',
  300: '#d4d4d4',
  400: '#a3a3a3',
  500: '#737373',
  600: '#666666',
  700: '#444444',
  800: '#333333',
  900: '#1f1d1c',
}
```

### 투명도 색상

```css
/* 헤더 배경 */
--header-bg: rgba(36, 38, 35, 0.9);

/* 흰색 투명도 */
--white-50: rgba(255, 255, 255, 0.5);
--white-70: rgba(255, 255, 255, 0.7);
--white-80: rgba(255, 255, 255, 0.8);
--white-90: rgba(255, 255, 255, 0.9);

/* 검정 투명도 */
--black-10: rgba(0, 0, 0, 0.1);
--black-70: rgba(0, 0, 0, 0.7);
```

---

## 🔤 타이포그래피

### 폰트 패밀리

```css
/* 세리프 폰트 - 헤딩 및 로고용 */
--font-serif-logo: 'Cinzel', serif;
--font-serif-heading: 'Lora', serif;
--font-serif-kr: 'Noto Serif KR', serif;

/* 산세리프 폰트 - 본문용 */
--font-sans: 'Noto Sans KR', arial, helvetica, 'Malgun Gothic', '맑은 고딕', dotum, sans-serif;

/* Tailwind 설정 */
fontFamily: {
  sans: ['"Noto Sans KR"', 'arial', 'helvetica', 'sans-serif'],
  serif: ['"Lora"', 'serif'],
  'serif-kr': ['"Noto Serif KR"', 'serif'],
  logo: ['"Cinzel"', 'serif'],
}
```

### 폰트 크기

```css
/* 실제 사용된 크기 */
--text-xs: 11px;      /* Footer copy */
--text-sm: 12px;      /* Logo subtitle, buttons */
--text-base-sm: 13px; /* Small body text */
--text-base-md: 14px; /* Body text, links */
--text-base: 15px;    /* Standard body */
--text-lg: 16px;      /* Nav links */
--text-xl: 21px;      /* Logo (mobile) */
--text-2xl: 22px;     /* Tel */
--text-3xl: 25px;     /* Logo variants */
--text-4xl: 26px;     /* Special card title */
--text-5xl: 30px;     /* Room name, logo */
--text-6xl: 41px;     /* Main heading (H3) */
--text-7xl: 60px;     /* Visual text */
--text-8xl: 83px;     /* Visual text emphasis */

/* Tailwind rem 기반 (1rem = 16px) */
fontSize: {
  'xs': '0.6875rem',   /* 11px */
  'sm': '0.75rem',     /* 12px */
  'base-sm': '0.8125rem', /* 13px */
  'base-md': '0.875rem',  /* 14px */
  'base': '0.9375rem',    /* 15px */
  'lg': '1rem',           /* 16px */
  'xl': '1.3125rem',      /* 21px */
  '2xl': '1.375rem',      /* 22px */
  '3xl': '1.5625rem',     /* 25px */
  '4xl': '1.625rem',      /* 26px */
  '5xl': '1.875rem',      /* 30px */
  '6xl': '2.5625rem',     /* 41px */
  '7xl': '3.75rem',       /* 60px */
  '8xl': '5.1875rem',     /* 83px */
}
```

### 폰트 웨이트

```css
--font-light: 300;
--font-normal: 400;     /* 기본값 */
--font-medium: 500;
--font-bold: 700;

/* Tailwind */
fontWeight: {
  light: '300',
  normal: '400',
  medium: '500',
  bold: '700',
}
```

### 행간 (Line Height)

```css
/* 실제 사용 값 */
--leading-none: 1;
--leading-tight: 1.15;   /* Special title */
--leading-snug: 1.26;    /* H3 */
--leading-normal: 1.4;   /* Body text */
--leading-relaxed: 1.42; /* Title description */
--leading-loose: 1.5;    /* Paragraph */
--leading-nav: 3.2 ~ 5.7; /* Navigation */

/* Tailwind */
lineHeight: {
  none: '1',
  tight: '1.15',
  snug: '1.26',
  normal: '1.4',
  relaxed: '1.42',
  loose: '1.5',
}
```

### Letter Spacing

```css
--tracking-tighter: -0.05em;
--tracking-tight: -0.02em;
--tracking-normal: 0;
--tracking-wide: 0.05px;
--tracking-wider: 0.1px;
--tracking-widest: 0.2px;
```

---

## 📏 스페이싱 시스템

### Spacing Scale

```css
/* 실제 사용된 값들 */
--space-0: 0px;
--space-1: 4px;
--space-2: 7px;
--space-3: 10px;
--space-4: 12px;
--space-5: 15px;
--space-6: 16px;
--space-7: 19px;
--space-8: 20px;
--space-10: 30px;
--space-12: 40px;
--space-15: 70px;
--space-20: 130px;
--space-24: 180px;

/* Tailwind rem 기반 */
spacing: {
  '0': '0',
  '1': '0.25rem',    /* 4px */
  '1.5': '0.4375rem', /* 7px */
  '2.5': '0.625rem',  /* 10px */
  '3': '0.75rem',     /* 12px */
  '3.75': '0.9375rem', /* 15px */
  '4': '1rem',        /* 16px */
  '4.75': '1.1875rem', /* 19px */
  '5': '1.25rem',     /* 20px */
  '7.5': '1.875rem',  /* 30px */
  '10': '2.5rem',     /* 40px */
  '17.5': '4.375rem', /* 70px */
  '32.5': '8.125rem', /* 130px */
  '45': '11.25rem',   /* 180px */
}
```

### 컴포넌트별 Padding

```css
/* Header */
.header .hd_inner { padding: 30px 0 0; }
.header.on .hd_inner { padding: 0; }
.header .hd_lnb ul .depth1 .depth1_a { padding: 0 1.25em; }

/* Button */
.btn_hd_res a { padding: 0 1.86em; }  /* 0 30px */
.aside .btn_aside_res a { padding: 12px; }

/* Section */
.title_box { padding-top: 130px; padding-bottom: 15px; }
.main_special { padding: 70px 0 0; }
.footer_wrap { padding: 30px 0; }

/* Card */
.main_special .swiper-slide .txt_box { padding: 15px 0; }
.landscape_box .txt_box { padding: 40px 40px 25px; }
```

---

## 📱 브레이크포인트

### 반응형 브레이크포인트

```css
/* 실제 사용된 브레이크포인트 */
@media (max-width: 1650px) { }
@media (max-width: 1450px) { }
@media (max-width: 1280px) { }
@media (max-width: 1200px) { }
@media (max-width: 1023px) { }
@media (max-width: 980px) { }
@media (max-width: 960px) { }
@media (max-width: 860px) { }  /* Mobile menu trigger */
@media (max-width: 767px) { }
@media (max-width: 640px) { }
@media (max-width: 479px) { }
@media (max-width: 350px) { }

/* Tailwind 설정 */
screens: {
  'xs': '480px',
  'sm': '640px',
  'md': '768px',
  'lg': '1024px',
  'xl': '1280px',
  '2xl': '1450px',
}
```

### 반응형 패턴

```css
/* Desktop First Approach */
.for_pc { display: inline-block; }
.for_m { display: none; }

@media (max-width: 640px) {
  .for_pc { display: none; }
  .for_m { display: block; }
}

/* Container Responsive */
.inner {
  width: 1400px;  /* Desktop */
}

@media (max-width: 1450px) {
  .inner {
    width: 100%;
    padding-left: 30px;
    padding-right: 30px;
  }
}

@media (max-width: 860px) {
  .inner {
    padding-left: 20px;
    padding-right: 20px;
  }
}

@media (max-width: 640px) {
  .inner {
    width: calc(100% - 30px);
  }
}
```

---

## 🎭 Effects & Animations

### Border Radius

```css
/* 대부분 각진 디자인 (border-radius: 0) 사용 */
--radius-none: 0px;      /* 버튼, 카드 기본값 */
--radius-sm: 2px;
--radius-default: 4px;
--radius-md: 6px;
--radius-lg: 8px;

/* Tailwind */
borderRadius: {
  'none': '0',
  'sm': '0.125rem',
  DEFAULT: '0.25rem',
  'md': '0.375rem',
  'lg': '0.5rem',
}
```

### Box Shadow

```css
/* 실제 사용 값 없음 - 필요시 추가 */
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);

/* Tailwind */
boxShadow: {
  'sm': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1)',
  'md': '0 4px 6px -1px rgb(0 0 0 / 0.1)',
  'lg': '0 10px 15px -3px rgb(0 0 0 / 0.1)',
}
```

### Transitions

```css
/* Header & Navigation */
.header,
.header * {
  transition: all 0.3s;
}

/* Sidebar */
.aside .aisde_inner,
.aside_bg {
  transition: all 0.5s;
  transition-timing-function: ease-in-out;
}

/* Dropdown */
.header .hd_lnb ul .depth1 .depth_box,
.header .hd_lnb_bg {
  transition: all 0.5s;
}

/* General */
.btn_more {
  transition: all 0.3s;
}

/* Tailwind */
transitionDuration: {
  '300': '300ms',
  '500': '500ms',
}

transitionTimingFunction: {
  'in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
}
```

### Hover Effects

```css
/* Link Underline */
.header .hd_lnb ul .depth1 .depth_box li a:hover {
  text-decoration: underline;
}

/* Button Color Change */
.main_special .swiper-slide:hover .txt_box .btn_more {
  color: #b2946b;
}

.room_list .swiper-slide:hover .room_inner_wrap .room_inner_box .btn_more {
  color: #b2946b;
}
```

---

## 🧩 컴포넌트 스타일

### Header

```css
.header {
  z-index: 90;
  position: fixed;
  width: 100%;
}

.header .hd_cont {
  background: rgba(36, 38, 35, 0.9);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.header .logo a {
  color: #dec48e;
  font-family: 'Cinzel', serif;
  font-size: 30px;
  font-weight: 400;
  letter-spacing: 0.2px;
}

.header .logo span {
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
  margin-top: 7px;
}

/* Navigation Links */
.header .hd_lnb ul .depth1 .depth1_a {
  line-height: 5.7;
  padding: 0 1.25em;
  font-size: 16px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.8);
}
```

### Buttons

```css
/* Primary Button - 실시간예약 */
.btn_hd_res a {
  font-size: 14px;
  line-height: 2.57;
  padding: 0 1.86em;
  color: #fff;
  background: #a08560;
  border-radius: 0;  /* 각진 모서리 */
}

/* Secondary Button - 예약안내 */
.aside .btn_aside_res a {
  padding: 12px;
  font-size: 15px;
  color: #fff;
  background: #a08560;
  text-align: center;
  border-radius: 0;
}

/* More Button */
.btn_more {
  padding: 1.25em 4.83em 1.25em 0;
  font-size: 13px;
  letter-spacing: 0.1px;
  transition: all 0.3s;
}

/* Room Card Button */
.room_list .swiper-slide .room_inner_wrap .room_inner_box .btn_more {
  line-height: 3.5;
  width: 13em;
  color: rgba(255, 255, 255, 0.8);
  background: #393b39;
  font-size: 12px;
}
```

### Cards

```css
/* Special Facility Card */
.main_special .swiper-slide .img {
  height: 470px;
}

.main_special .swiper-slide .txt_box {
  background: #fff;
  padding: 15px 0;
  text-align: left;
}

.main_special .swiper-slide .txt_box strong {
  font-size: 26px;
  line-height: 1.15;
  font-weight: 400;
  color: #444;
  font-family: 'Lora', serif;
}

.main_special .swiper-slide .txt_box p {
  font-size: 15px;
  line-height: 1.4;
  color: #666;
}

/* Room Card */
.room_list .swiper-slide .img {
  height: 500px;
}

.room_list .swiper-slide .room_inner_wrap .room_inner_box strong {
  font-size: 30px;
  line-height: 1.47;
  color: #444;
  font-family: 'Noto Serif KR', serif;
}

.room_list .swiper-slide .room_inner_wrap .room_inner_box p {
  font-size: 15px;
  line-height: 1.4;
  color: #666;
}
```

### Footer

```css
.footer_wrap {
  text-align: center;
  padding: 30px 0;
  background: #1f1d1c;
}

.footer_wrap .footer .tel {
  padding-bottom: 10px;
  font-size: 22px;
  color: #b5b5b5;
}

.footer_wrap .footer .address {
  font-size: 13px;
  line-height: 2;
  color: rgba(255, 255, 255, 0.3);
}

.footer_wrap .copy {
  font-size: 11px;
  line-height: 1.45;
  margin-top: 0.5em;
  color: rgba(255, 255, 255, 0.2);
}
```

### Title Box

```css
.title_box {
  text-align: left;
  padding-top: 130px;
  padding-bottom: 15px;
}

.title_box h3 {
  font-size: 41px;
  line-height: 1.26;
  font-weight: 400;
  font-family: 'Lora', serif;
  color: #444;
}

.title_box p {
  font-size: 14px;
  line-height: 1.42;
  color: #999;
}
```

---

## 🎯 Tailwind Config

완전한 `tailwind.config.ts`:

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#faf6f0',
          100: '#f5ebe0',
          200: '#ead7c1',
          300: '#dec48e',
          400: '#c4a878',
          500: '#b2946b',
          600: '#a08560',
          700: '#8a7050',
          800: '#6f5940',
          900: '#544330',
        },
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#666666',
          700: '#444444',
          800: '#333333',
          900: '#1f1d1c',
        },
      },
      fontFamily: {
        sans: ['"Noto Sans KR"', 'arial', 'helvetica', 'sans-serif'],
        serif: ['"Lora"', 'serif'],
        'serif-kr': ['"Noto Serif KR"', 'serif'],
        logo: ['"Cinzel"', 'serif'],
      },
      fontSize: {
        'xs': '0.6875rem',
        'sm': '0.75rem',
        'base-sm': '0.8125rem',
        'base-md': '0.875rem',
        'base': '0.9375rem',
        'lg': '1rem',
        'xl': '1.3125rem',
        '2xl': '1.375rem',
        '3xl': '1.5625rem',
        '4xl': '1.625rem',
        '5xl': '1.875rem',
        '6xl': '2.5625rem',
        '7xl': '3.75rem',
        '8xl': '5.1875rem',
      },
      lineHeight: {
        'none': '1',
        'tight': '1.15',
        'snug': '1.26',
        'normal': '1.4',
        'relaxed': '1.42',
        'loose': '1.5',
      },
      spacing: {
        '1.5': '0.4375rem',
        '2.5': '0.625rem',
        '3.75': '0.9375rem',
        '4.75': '1.1875rem',
        '7.5': '1.875rem',
        '17.5': '4.375rem',
        '32.5': '8.125rem',
        '45': '11.25rem',
      },
      maxWidth: {
        'container': '1400px',
        'screen-2xl': '1920px',
      },
      screens: {
        'xs': '480px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1450px',
      },
      transitionDuration: {
        '300': '300ms',
        '500': '500ms',
      },
    },
  },
  plugins: [],
}

export default config
```

---

## 📝 디자인 원칙

### 1. 브랜드 아이덴티티
- **컬러**: 골드/브라운 계열로 고급스러운 펜션 이미지
- **타이포그래피**: 세리프 폰트로 클래식하고 우아한 느낌
- **레이아웃**: 넉넉한 여백과 깔끔한 구조

### 2. UI 특징
- **각진 디자인**: border-radius: 0으로 모던하고 절제된 느낌
- **반투명 효과**: 헤더에 rgba 사용으로 세련된 오버레이
- **고정 헤더**: position: fixed로 항상 접근 가능한 네비게이션
- **다크 테마**: 푸터와 일부 섹션에 다크 배경 사용

### 3. 타이포그래피 계층
- **로고/헤딩**: 세리프 폰트 (Cinzel, Lora)
- **본문**: 산세리프 폰트 (Noto Sans KR)
- **강조**: 골드 컬러 (#dec48e, #b2946b)

### 4. 색상 사용
- **주색상**: 매우 절제적 (골드/브라운만 사용)
- **배경**: 대부분 흰색, 일부 #f5f5f5, 다크 섹션
- **텍스트**: 무채색 계열 (#333, #444, #666, #999)

---

**마지막 업데이트**: 2025-10-22
**상태**: 완료 ✅
