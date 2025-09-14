// app/payments/page.tsx  ← サーバーコンポーネントに変更
import { createMetadata } from "@/lib/metadata";
import PaymentsClient from "./PaymentsClient"; // 👈 クライアント分離

export const metadata = createMetadata({
  title: "カート",
  description: "カートに入れた商品一覧ページです。",
  path: "/payments",
});

export default function PaymentsPage() {
  return <PaymentsClient />;
}