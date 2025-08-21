"use client";

import { SessionProvider } from "next-auth/react"
import { Provider as JotaiProvider, useAtomValue } from "jotai";
import { useEffect } from "react";
import { setCookie } from "nookies";
import { cartAtom, type Cart } from "@/store/cart";
import { useSetAtom } from "jotai";

function WatchCart() {
  const cart = useAtomValue(cartAtom);

  useEffect(() => {
    setCookie(null, "cart", JSON.stringify(cart));
  }, [cart]);

  return null;
}

interface ProvidersProps {
  children: React.ReactNode;
  initialCart: Cart;
}

function InitCart({ initialCart }: { initialCart: Cart }) {
  const setCart = useSetAtom(cartAtom);

  useEffect(() => {
    setCart(initialCart);
  }, [initialCart, setCart]);

  return null;
}

export default function Providers({ children, initialCart }: ProvidersProps) {
  return (
    <SessionProvider>
      <JotaiProvider>
        {children}
        <InitCart initialCart={initialCart} />
        <WatchCart />
      </JotaiProvider>
    </SessionProvider>
  );
}