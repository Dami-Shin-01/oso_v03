import type { Metadata } from "next";
import { Cinzel, Lora, Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

// Humantown Pension Design System Fonts
const cinzel = Cinzel({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const lora = Lora({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const notoSansKR = Noto_Sans_KR({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "가평 휴먼타운 펜션 (Gapyeong Humantown Pension)",
  description: "경기 가평군 가평읍 북한강변로 882 위치한 고급스러운 펜션입니다. 22개 객실과 수영장, BBQ 등 다양한 부대시설을 갖추고 있습니다.",
  keywords: ["가평펜션", "휴먼타운", "펜션", "가평", "북한강", "수영장", "BBQ"],
  openGraph: {
    title: "가평 휴먼타운 펜션",
    description: "고급스러운 펜션에서 특별한 휴식을 경험하세요",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${cinzel.variable} ${lora.variable} ${notoSansKR.variable} antialiased`}
      >
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
