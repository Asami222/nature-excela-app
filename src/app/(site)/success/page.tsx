// app/success/page.tsx (Server Component)
import { createMetadata } from "@/lib/metadata";
import SuccessClient from "./success-client";
import styles from "./page.module.css";

export const metadata = createMetadata({
  title: "購入完了",
  description: "商品のご購入が無事成功しました。",
  path: "/success",
});

export default async function SuccessPage() {
  return (
    <div className={styles.container}>
      <SuccessClient />
    </div>
  );
}