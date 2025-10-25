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
  slide1: getUnsplashUrl('1502672260266-1c1ef2d93688', 1920, 1080), // 펜션/리조트
  slide2: getUnsplashUrl('1469022563160-aa4fbe4db888', 1920, 1080), // 아늑한 집 외경
  slide3: getUnsplashUrl('1542314831-068cd1dbfeeb', 1920, 1080), // 호수와 산
};

// 부대시설 이미지 (OSO Camping BBQ)
export const facilityImages: Record<string, string> = {
  'water-play': getUnsplashUrl('1576610572293-c2ca58d7f6c1', 940, 940), // 물놀이장
  'barbecue': getUnsplashUrl('1555939594-58d7cb561ad1', 940, 940), // 바베큐
  'sports': getUnsplashUrl('5SmkFguk5Hw', 940, 940), // 스포츠/잔디광장 - 낮 동안의 푸른 잔디밭
  'cafe': getUnsplashUrl('1554118811-1e0d58224f24', 940, 940), // 카페
  'restaurant': getUnsplashUrl('1567521464027-f127ff144326', 940, 940), // 식당
  "kids-zone": getUnsplashUrl('1517457373614-b7152dbb3e13', 940, 940), // 키즈존
};

// 캠핑 공간 이미지 (OSO Camping BBQ)
export const roomImages = {
  default: getUnsplashUrl('1478827387602-2a3957a2f3f0', 1000, 1000), // 캠핑 기본
  main1: getUnsplashUrl('1504280390367-361c6d9f38f4', 1000, 1000), // 캠핑 메인 1
  main2: getUnsplashUrl('1478131143081-80f7f84ca84d', 1000, 1000), // 캠핑 메인 2
  main3: getUnsplashUrl('1487730116645-74489c95b41b', 1000, 1000), // 캠핑 메인 3 (중복 제거)
  thumb1: getUnsplashUrl('1504280390367-361c6d9f38f4', 400, 300), // 캠핑 썸네일 1
  thumb2: getUnsplashUrl('1478131143081-80f7f84ca84d', 400, 300), // 캠핑 썸네일 2
  thumb3: getUnsplashUrl('1487730116645-74489c95b41b', 400, 300), // 캠핑 썸네일 3
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

// 캠핑장 외경 사진 (View 페이지)
export const exteriorImages = [
  getUnsplashUrl('1478827387602-2a3957a2f3f0', 1200, 800), // 캠핑장 전경
  getUnsplashUrl('1504280390367-361c6d9f38f4', 1200, 800), // 텐트캠핑
  getUnsplashUrl('1478131143081-80f7f84ca84d', 1200, 800), // 캠핑파이어
  getUnsplashUrl('1464822759023-fed622ff2c3b', 1200, 800), // 자연 풍경
  getUnsplashUrl('1487730116645-74489c95b41b', 1200, 800), // 캠핑라이프
  getUnsplashUrl('1472214103451-9374bd1c798e', 1200, 800), // 자연 속 캠핑
  getUnsplashUrl('1520763185298-1b434c919afe', 1200, 800), // 평화로운 자연
  getUnsplashUrl('1441974231531-c6227db76b6e', 1200, 800), // 산책로
  getUnsplashUrl('1486235697920-fa4ea228e75f', 1200, 800), // 자연 환경
];

// 주변 여행지 이미지 (Travel 페이지) - ARCHIVED 2025-10-25
// Travel 페이지가 아카이브되어 더 이상 사용되지 않습니다.
// 복원이 필요한 경우: humantown-nextjs/archived/travel/ 참조
/*
export const travelImages = {
  'nami-island': getUnsplashUrl('1506905925346-21bda4d32df4', 800, 600), // 남이섬
  'petite-france': getUnsplashUrl('1502602898657-3e91760cbb34', 800, 600), // 쁘띠프랑스
  'morning-calm': getUnsplashUrl('1470058869958-2a77ade41c02', 800, 600), // 아침고요수목원
  'jarasum': getUnsplashUrl('1542314831-068cd1dbfeeb', 800, 600), // 자라섬
  'rail-bike': getUnsplashUrl('1464822759023-fed622ff2c3b', 800, 600), // 레일바이크
  'zip-line': getUnsplashUrl('1506905925346-21bda4d32df4', 800, 600), // 짚와이어
};
*/

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
