import { NavigationItem, SiteInfo } from "@/types";

export const siteInfo: SiteInfo = {
  site_name: "오소캠핑바베큐 (Oso Camping BBQ)",
  base_url: "https://osocampingbbq.com",
  contact: "T. 0507-1380-0203",
  address: {
    road: "경기 평택시 지산로 282-31",
    parcel: "경기 평택시 지산로 282-31",
  },
  business_info: {
    registration: "330-81-03775",
    representative: "Design On a Dot",
  },
  description: "평택 지산로에 위치한 캠핑 감성 셀프 바베큐장 오소캠핑바베큐입니다.",
};

export const navigationItems: NavigationItem[] = [
  {
    id: "about",
    label: "ABOUT",
    submenu: [
      { label: "시설소개", url: "/about" },
      { label: "전경보기", url: "/view" },
    ],
  },
  {
    id: "rooms",
    label: "ROOMS",
    submenu: [{ label: "공간목록", url: "/rooms" }],
  },
  {
    id: "special",
    label: "SPECIAL",
    submenu: [
      { label: "물놀이장", url: "/special/swimming-pool" },
      { label: "바베큐", url: "/special/barbecue" },
      { label: "잔디광장", url: "/special/sports" },
      { label: "카페", url: "/special/cafe" },
      { label: "식당", url: "/special/restaurant" },
      { label: "키즈존", url: "/special/playground" },
    ],
  },
  {
    id: "reserve",
    label: "RESERVE",
    submenu: [{ label: "예약안내", url: "/reservation" }],
  },
];

export const defaultKeywords = [
  "오소캠핑바베큐",
  "평택바베큐",
  "셀프바베큐장",
  "OSO Camping BBQ",
];
