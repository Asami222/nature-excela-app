// app/success/success-client.tsx
"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useCart } from "@/store/useCart";
import { clearCartServer } from "./action";

type CheckoutSession = {
  id: string;
  amount_total: number;
  currency: string;
  customer_email: string | null;
  line_items?: {
    name: string;
    quantity: number;
    amount_total: number;
  }[];
};
type LineItem = NonNullable<CheckoutSession["line_items"]>[number];

export default function SuccessClient() {
  const { clearCart } = useCart();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Stripe セッションを取得
  useEffect(() => {
    if (!sessionId) {
      setLoading(false);
      return;
    }
    const fetchSession = async () => {
      try {
        const res = await fetch(`/api/checkout/session?session_id=${sessionId}`);
        const data = await res.json();
        setSession(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchSession();
  }, [sessionId]);

  // クライアント側 Zustand と sessionStorage をクリア
  useEffect(() => {
    clearCart();
    sessionStorage.removeItem("cart-storage");
    clearCartServer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // ← cart 依存を入れない

  if (loading) return <p>読み込み中...</p>;
  if (!session) return <p>セッション情報が見つかりません。</p>;

  return (
    <div>
      <h1>購入が完了しました</h1>
      <p>ご請求金額（消費税込）: {session.amount_total.toLocaleString()} 円</p>
      <h2>購入内容</h2>
      <ul>
        {session.line_items?.map((item: LineItem, idx: number) => (
          <li key={idx}>
            {item.name} × {item.quantity} → {item.amount_total.toLocaleString()} 円
          </li>
        ))}
      </ul>
    </div>
  );
}