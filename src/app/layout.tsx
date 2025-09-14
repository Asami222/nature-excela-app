import '../styles/variables.css';
import '../styles/globals.css';
import Providers from "./providers";
import { createMetadata } from "@/lib/metadata";
import { Noto_Serif_JP } from "next/font/google";
import { getInitialCart } from '@/lib/cart';

const notoSerifJP = Noto_Serif_JP({
  subsets: ["latin"], // 日本語も含まれる 
  variable: "--font-noto-serif-jp", // Tailwindで使うためのCSS変数
  display: "swap",
});

export const metadata = createMetadata(); // サイト全体のデフォルト

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
        <link rel="icon" href="/icon.ico" />
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