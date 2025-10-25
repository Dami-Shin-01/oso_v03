import type { Metadata } from "next";
import { Cinzel, Lora, Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

// OSO Camping BBQ Design System Fonts
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
  title: "오소 캠핑바베큐 (Oso Camping BBQ)",
  description: "경기 평택시 지산로 282-31에 위치한 편안한 캠핑 감성 셀프 바베큐장입니다. 6개의 프리미엄 공간과 야외 테이블, 9개의 텐트동, 물놀이장, 잔디광장 등 다양한 부대시설을 갖추고 있습니다.",
  keywords: ["오소 캠핑바베큐", "평택 바베큐", "셀프바베큐장", "송탄", "감성바베큐",  "BBQ"],
  openGraph: {
    title: "오소 캠핑바베큐 (Oso Camping BBQ)",
    description: "편안한 캠핑 감성 셀프 바베큐장 - 6개의 프리미엄 공간과 9개의 텐트동, 야외테이블과 다양한 부대시설",
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
      <head>
        {/* Preconnect to external domains for faster resource loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://images.unsplash.com" />

        {/* Preload critical hero image */}
        <link
          rel="preload"
          as="image"
          href="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1920&h=1080&fit=crop&auto=format&q=80"
          fetchPriority="high"
        />
      </head>
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
