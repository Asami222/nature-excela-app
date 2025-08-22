import '../styles/variables.css';
import '../styles/globals.css';
import Providers from "./providers";
import { cookies } from "next/headers";
import type { Metadata } from "next";
import type { Cart } from "@/store/cart";
import { Noto_Serif_JP } from "next/font/google";
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';

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
  // cookies() を await
  const cookieStore = await cookies();
  const cartCookie = cookieStore.get("cart")?.value || null;

  let initialCart: Cart = { products: [] };
  if (cartCookie) {
    try {
      initialCart = JSON.parse(cartCookie) as Cart;
    } catch (e) {
      console.error("Invalid cart cookie", e);
    }
  }

  return (
    <html lang="ja" className={`${notoSerifJP.className}`}>
      <head>
        {/* リセットCSS */}
        <link rel="stylesheet" href="https://unpkg.com/ress/dist/ress.min.css" />
      </head>
      <body>
        <Providers initialCart={initialCart}>
          <Header isHome/>
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}