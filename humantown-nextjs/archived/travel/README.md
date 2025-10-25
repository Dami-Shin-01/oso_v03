# TRAVEL 페이지 아카이브

**아카이브 일자**: 2025-10-25
**사유**: OSO Camping BBQ 사이트에서 주변 여행지 메뉴 제거

## 아카이브된 파일

### 페이지 파일
- `app/travel/page.tsx` - 주변 여행지 페이지 (6개 관광지 소개)
- `app/travel/layout.tsx` - 메타데이터 및 레이아웃

## 제거된 참조

### Header 네비게이션
- TRAVEL 메뉴 항목 제거
- "주변여행지" 링크 제거

### 관련 데이터
- `src/lib/unsplash-images.ts`의 `travelImages` 주석 처리
- `src/lib/data/site-structure.json`에서 travel 참조 제거

## 복원 방법

필요 시 아카이브 파일을 다시 `src/app/travel/`로 복사하고:
1. Header.tsx의 navigation 배열에 travel 항목 추가
2. unsplash-images.ts의 travelImages 주석 해제
3. site-structure.json 업데이트

---

**원본 위치**: `src/app/travel/`
**현재 위치**: `archived/travel/app/travel/`
