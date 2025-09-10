import '../styles/variables.css';
import '../styles/globals.css';
import Providers from "./providers";
import type { Metadata } from "next";
import { Noto_Serif_JP } from "next/font/google";
import { getInitialCart } from '@/lib/cart';

const notoSerifJP = Noto_Serif_JP({
  subsets: ["latin"], // 日本語も含まれる 
  variable: "--font-noto-serif-jp", // Tailwindで使うためのCSS変数
  display: "swap",
});

export const metadata: Metadata = {
  title: "My App",
  description: "Next.js App with Tailwind and Noto Serif JP",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const initialCart = await getInitialCart();
  //現在のURLパスを取得（サーバーコンポーネントの書き方）
  //const pathname = (await import("next/navigation")).usePathname?.() ?? "/";
  //const isHome = pathname === "/";

  return (
    <html lang="ja" className={`${notoSerifJP.className}`}>
      <head>
        {/* リセットCSS */}
        <link rel="stylesheet" href="https://unpkg.com/ress/dist/ress.min.css" />
      </head>
      <body>
        <Providers initialCart={initialCart}>
          {children}
        </Providers>
      </body>
    </html>
  );
}