# HumanTown CSS 추출 보고서

## 요약
Playwright를 사용하여 https://humantown.co.kr/index.html 사이트의 CSS 정보를 성공적으로 추출했습니다.

## 추출된 파일들

### 1. 스크린샷
- **파일명**: `humantown-screenshot.png` (5.2MB)
- **설명**: 전체 페이지 스크린샷 (Full page)

### 2. CSS 데이터
- **파일명**: `extracted-styles.json` (107KB)
- **설명**: 모든 CSS 정보 (파일 URL, 인라인 스타일, computed styles, CSS 파일 내용)

### 3. 요약 데이터
- **파일명**: `styles-summary.json` (3.3KB)
- **설명**: 추출된 CSS 정보의 요약

### 4. 개별 CSS 파일들
모든 CSS 파일을 개별적으로 다운로드하여 저장:
1. `css-1-reset.css` (5,101 bytes)
2. `css-2-style.css` (65,088 bytes) - 메인 스타일시트
3. `css-3-swiper-bundle.css` (16,493 bytes)
4. `css-4-board_black.css` (13,896 bytes)
5. `css-5-popup_black.css` (2,270 bytes)

---

## CSS 파일 분석

### CSS 파일 URL 목록
```
1. https://humantown.co.kr/css/reset.css
2. https://humantown.co.kr/css/style.css (메인)
3. https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.css
4. https://humantown.co.kr/css/board_black.css
5. https://humantown.co.kr/css/popup_black.css
```

### 인라인 스타일
- **개수**: 0개
- **참고**: 모든 스타일이 외부 CSS 파일로 분리되어 있음

---

## 디자인 시스템 분석

### 색상 팔레트
추출된 주요 색상 (6개):

```css
/* 텍스트 색상 */
rgb(51, 51, 51)           /* #333333 - 기본 텍스트 */
rgb(68, 68, 68)           /* #444444 - 헤딩 텍스트 */
rgb(102, 102, 102)        /* #666666 - 보조 텍스트 */

/* 배경 및 강조 색상 */
rgba(36, 38, 35, 0.9)     /* 헤더 배경 (반투명 다크) */
rgb(160, 133, 96)         /* #A08560 - 브랜드 컬러 (골드/브라운) */
rgb(222, 196, 142)        /* #DEC48E - 브랜드 컬러 (라이트 골드) */

/* 흰색 변형 */
rgb(255, 255, 255)        /* #FFFFFF - 순수 화이트 */
rgba(255, 255, 255, 0.5)  /* 반투명 흰색 50% */
rgba(255, 255, 255, 0.8)  /* 반투명 흰색 80% */
```

### 타이포그래피

#### 폰트 패밀리
```css
/* 메인 폰트 */
"Noto Sans KR", arial, helvetica, "Malgun Gothic", "맑은 고딕", dotum, sans-serif

/* 세리프 폰트 (헤딩용) */
Cinzel, serif
Lora, serif

/* 간소화 버전 */
"Noto Sans KR", sans-serif
```

#### 폰트 크기
```css
12px  /* 작은 텍스트 */
14px  /* 보조 텍스트 */
15px  /* 일반 텍스트 */
16px  /* 기본 텍스트 */
21px  /* 중간 헤딩 */
25px  /* 큰 헤딩 */
41px  /* H3 헤딩 */
```

---

## Computed Styles (실제 렌더링된 스타일)

### Header (헤더)
```css
header {
  backgroundColor: rgba(0, 0, 0, 0);  /* 투명 */
  color: rgb(51, 51, 51);             /* #333 */
  height: 116.5px;
  padding: 0px;
  display: block;
  position: fixed;                    /* 고정 헤더 */
}
```

### H3 (헤딩)
```css
h3 {
  fontSize: 41px;
  fontWeight: 400;
  color: rgb(68, 68, 68);            /* #444 */
  lineHeight: 51.66px;
  fontFamily: Lora, serif;           /* 세리프 폰트 사용 */
}
```

---

## 버튼 스타일 분석

### 버튼 1: RESERVE (헤더 예약 버튼)
```css
{
  text: "RESERVE",
  backgroundColor: rgba(0, 0, 0, 0),      /* 투명 */
  color: rgba(255, 255, 255, 0.8),        /* 흰색 80% */
  padding: 0px 18.75px,
  borderRadius: 0px,                      /* 각진 모서리 */
  fontSize: 15px,
  fontWeight: 400,
  border: 0px
}
```

### 버튼 2-3: 예약안내 링크
```css
{
  text: "예약안내",
  backgroundColor: rgba(0, 0, 0, 0),      /* 투명 */
  color: rgb(51, 51, 51) / rgb(102, 102, 102),
  padding: 0px / 0px 22.05px,
  fontSize: 14px / 15px,
  border: 0px
}
```

### 버튼 4: 실시간예약 (메인 CTA)
```css
{
  text: "실시간예약",
  backgroundColor: rgb(160, 133, 96),     /* 브랜드 골드/브라운 */
  color: rgb(255, 255, 255),              /* 흰색 */
  padding: 12px,
  borderRadius: 0px,                      /* 각진 모서리 */
  fontSize: 15px,
  fontWeight: 400,
  border: 0px
}
```

### 버튼 5: 예약안내 확인
```css
{
  text: "예약안내 확인",
  backgroundColor: rgba(0, 0, 0, 0),      /* 투명 */
  color: rgb(102, 102, 102),              /* 회색 */
  padding: 16.25px 0px,
  fontSize: 13px,
  border: 0px
}
```

---

## 주요 CSS 스타일 패턴

### 1. 레이아웃
```css
#wrap {
  min-width: 280px;
  max-width: 1920px;
  margin: 0 auto;
  overflow: hidden;
}

.inner {
  width: 1400px;
  margin: 0 auto;
  box-sizing: border-box;
  position: relative;
}
```

### 2. 반응형 디자인
- 주요 브레이크포인트: 1450px, 1200px, 1023px, 860px, 767px, 640px, 479px
- 모바일용 클래스: `.for_m`, `.for_pc`

### 3. 헤더 스타일
```css
.header {
  z-index: 90;
  position: fixed;
  width: 100%;
}

.header .hd_cont {
  background: rgba(36, 38, 35, 0.9);     /* 반투명 다크 배경 */
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.header .logo a {
  color: #dec48e;                        /* 골드 컬러 */
  font-family: 'Cinzel', serif;
}
```

### 4. 버튼 공통 패턴
- 대부분 `border-radius: 0px` (각진 모서리)
- 메인 CTA는 브랜드 컬러 배경 (`#A08560`)
- 보조 버튼은 투명 배경
- `font-weight: 400` (일반 굵기)

---

## 디자인 특징 요약

### 브랜드 아이덴티티
- **컬러**: 골드/브라운 계열 (`#A08560`, `#DEC48E`)
- **폰트**: 세리프 폰트 사용으로 고급스러운 느낌
- **스타일**: 미니멀하고 클래식한 디자인

### UI/UX 특징
1. **고정 헤더**: `position: fixed`로 스크롤 시에도 상단 고정
2. **반투명 효과**: 헤더에 `rgba(36, 38, 35, 0.9)` 사용
3. **각진 디자인**: 버튼 등에 `border-radius: 0px` 사용
4. **타이포그래피 중심**: 다양한 세리프 폰트 사용
5. **색상 절제**: 주로 무채색 + 브랜드 골드 컬러만 사용

---

## 기술 스택
- **CSS 리셋**: reset.css 사용
- **슬라이더**: Swiper 8.x
- **레이아웃**: 전통적인 Float 및 Flexbox 혼용
- **반응형**: Media Queries 사용

---

## 파일 위치
- 메인 디렉토리: `C:\Users\user\Documents\251022_new-oso`
- 모든 추출 파일들이 위 디렉토리에 저장되어 있습니다.

---

## 실행 방법
1. **CSS 추출**: `node extract-css.js`
2. **요약 생성**: `node summarize-styles.js`
3. **개별 파일 추출**: `node extract-individual-css.js`

---

## 결론
Playwright를 사용하여 HumanTown 펜션 웹사이트의 모든 CSS 정보를 성공적으로 추출했습니다.
총 5개의 CSS 파일 (102,848 bytes)과 실제 렌더링된 스타일 정보를 확보했습니다.

디자인은 고급스러운 펜션 브랜드 이미지에 맞게 골드/브라운 컬러와 세리프 폰트를 활용한
클래식하고 미니멀한 스타일로 구성되어 있습니다.
