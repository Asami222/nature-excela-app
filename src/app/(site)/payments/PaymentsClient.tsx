// app/payments/PaymentsClient.tsx  ← クライアントコンポーネント
"use client";

import Container from "@/components/Container/Container";
import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { useAtomValue } from "jotai";
import { cartAtom, totalPriceAtom, totalCountAtom } from "@/store/cart";
import InBag from "@/components/InBag/InBag";
import cx from "classnames";
import styles from "./page.module.css";

export default function PaymentsClient() {
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const cart = useAtomValue(cartAtom);
  const totalCount = useAtomValue(totalCountAtom);
  const totalPrice = useAtomValue(totalPriceAtom);

  const handleCheckout = async () => {
    if (!session) {
      router.push(`/login?callbackUrl=${encodeURIComponent(pathname)}`);
      return;
    }

    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: session.user.id,
        cart: cart.products,
        totalPrice,
        totalCount,
      }),
    });

    const data = await res.json();
    if (data.url) {
      window.location.href = data.url;
    } else {
      alert("Checkout session 作成に失敗しました");
    }
  };

  return (
    <div className={styles.wrapper}>
      <Container>
        <div className={cx("sideBySideCenter", styles.titleWrap)}>
          <h1>カート</h1>
          <div className={styles.priceContainer}>
            <p className={styles.count}>個数&emsp;{totalCount}点</p>
            <p className={styles.price}>
              合計&emsp;{totalPrice.toLocaleString()}円(税込)
            </p>
            <div className={styles.button}>
              <button type="submit" onClick={handleCheckout}>
                購入手続きへ
              </button>
            </div>
          </div>
        </div>
        <div>
          <div className={styles.productContainer}>
            {cart.products.length === 0 && (
              <p>カートにアイテムが入っていません</p>
            )}
            {cart.products.map((product) => (
              <InBag product={product} key={product.id} />
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}