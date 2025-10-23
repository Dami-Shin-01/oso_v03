/**
 * Unsplash 이미지 URL 매핑
 * 실제 프로덕션에서는 실제 펜션 이미지로 교체해야 합니다.
 */

// Unsplash 이미지 URL 생성 헬퍼
// quality=80으로 파일 크기 30-40% 감소, 시각적 품질 유지
const getUnsplashUrl = (photoId: string, width: number = 1920, height: number = 1080, quality: number = 80) => {
  return `https://images.unsplash.com/photo-${photoId}?w=${width}&h=${height}&fit=crop&auto=format&q=${quality}`;
};

// Hero Section 슬라이더 이미지 (펜션/자연 풍경)
export const heroImages = {
  slide1: getUnsplashUrl('1602002162244-1b6d63e9a4e3', 1920, 1080), // 산 속 리조트
  slide2: getUnsplashUrl('1566073771239-c0ebddbb6cd0', 1920, 1080), // 평화로운 자연
  slide3: getUnsplashUrl('1542314831-068cd1dbfeeb', 1920, 1080), // 호수와 산
};

// 부대시설 이미지
export const facilityImages: Record<string, string> = {
  'swimming-pool': getUnsplashUrl('1576013551627-94db3fec9c86', 940, 940), // 수영장
  'barbecue': getUnsplashUrl('1555939594-58d7cb561ad1', 940, 940), // 바베큐
  'foot-volleyball-court-/-basketball-court': getUnsplashUrl('1594991596095-c583f5e339f9', 940, 940), // 농구장
  'cafe': getUnsplashUrl('1554118811-1e0d58224f24', 940, 940), // 카페
  'walking-trail': getUnsplashUrl('1441974231531-c6227db76b6e', 940, 940), // 산책로
  "children's-playground": getUnsplashUrl('1576239990010-e8dbc8253e15', 940, 940), // 놀이터
};

// 객실 이미지 (샘플)
export const roomImages = {
  default: getUnsplashUrl('1631049307264-da0ec9d70304', 1000, 1000), // 기본 객실
  main1: getUnsplashUrl('1618221195710-dd6b41faaea6', 1000, 1000), // 객실 메인
  main2: getUnsplashUrl('1631049035182-249067d7618e', 1000, 1000), // 객실 메인 2
  main3: getUnsplashUrl('1522771739844-6a9f6d5f14af', 1000, 1000), // 객실 메인 3
  thumb1: getUnsplashUrl('1566665797739-16fb0a69e851', 400, 300), // 썸네일 1
  thumb2: getUnsplashUrl('1582719508461-905c673771fd', 400, 300), // 썸네일 2
  thumb3: getUnsplashUrl('1595526114035-0d45ed16cfbf', 400, 300), // 썸네일 3
};

// 공통 아이콘/이미지
export const commonImages = {
  // SVG로 대체 가능한 간단한 아이콘들
  leftArrow: '/icons/arrow-left.svg',
  rightArrow: '/icons/arrow-right.svg',
  scrollDown: '/icons/scroll-down.svg',
  menuIcon: '/icons/menu.svg',
  reserveButton: '/icons/reserve-floating.svg',
};

// 외경 사진 (View 페이지)
export const exteriorImages = [
  getUnsplashUrl('1602002162244-1b6d63e9a4e3', 1200, 800), // 산 속 리조트 전경
  getUnsplashUrl('1542314831-068cd1dbfeeb', 1200, 800), // 호수와 산 풍경
  getUnsplashUrl('1566073771239-c0ebddbb6cd0', 1200, 800), // 자연 경관
  getUnsplashUrl('1464822759023-fed622ff2c3b', 1200, 800), // 산 풍경
  getUnsplashUrl('1506905925346-21bda4d32df4', 1200, 800), // 산과 호수
  getUnsplashUrl('1472214103451-9374bd1c798e', 1200, 800), // 자연 속 건물
  getUnsplashUrl('1506905925346-21bda4d32df4', 1200, 800), // 평화로운 풍경
  getUnsplashUrl('1441974231531-c6227db76b6e', 1200, 800), // 산책로
  getUnsplashUrl('1476514525504-03c3c41f41fc', 1200, 800), // 북한강변 이미지
];

// 주변 여행지 이미지 (Travel 페이지)
export const travelImages = {
  'nami-island': getUnsplashUrl('1506905925346-21bda4d32df4', 800, 600), // 남이섬
  'petite-france': getUnsplashUrl('1502602898657-3e91760cbb34', 800, 600), // 쁘띠프랑스
  'morning-calm': getUnsplashUrl('1470058869958-2a77ade41c02', 800, 600), // 아침고요수목원
  'jarasum': getUnsplashUrl('1542314831-068cd1dbfeeb', 800, 600), // 자라섬
  'rail-bike': getUnsplashUrl('1464822759023-fed622ff2c3b', 800, 600), // 레일바이크
  'zip-line': getUnsplashUrl('1506905925346-21bda4d32df4', 800, 600), // 짚와이어
};

// 객실별 이미지 매핑 (22개 객실)
export const roomImagesByType: Record<string, { main: string; thumbnails: string[] }> = {
  default: {
    main: roomImages.main1,
    thumbnails: [roomImages.thumb1, roomImages.thumb2, roomImages.thumb3],
  },
  premium: {
    main: roomImages.main2,
    thumbnails: [roomImages.thumb1, roomImages.thumb2, roomImages.thumb3],
  },
  deluxe: {
    main: roomImages.main3,
    thumbnails: [roomImages.thumb1, roomImages.thumb2, roomImages.thumb3],
  },
};
