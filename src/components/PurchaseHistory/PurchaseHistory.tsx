"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import styles from "./page.module.css";

type OrderItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
};

type Order = {
  id: string;
  totalPrice: number;
  totalCount: number;
  stripeId?: string;
  createdAt: string;
  items: OrderItem[];
};

export default function PurchaseHistoryPage() {
  const { data: session } = useSession();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session) return;

    const fetchOrders = async () => {
      try {
        const res = await fetch(`/api/orders?userId=${session.user.id}`);
        const data: Order[] = await res.json();
        setOrders(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [session]);

  if (!session) return <p>ログインしてください</p>;
  if (loading) return <p>読み込み中...</p>;
  if (orders.length === 0) return <p>購入履歴がありません</p>;

  return (
    <div className={styles.wrapper}>
      <h1>購入履歴</h1>
      {orders.map((order) => (
        <div key={order.id} className={styles.order}>
          <h2>注文日時: {new Date(order.createdAt).toLocaleString()}</h2>
          <p>合計: {order.totalPrice.toLocaleString()} 円 ({order.totalCount} 点)</p>
          <p>Stripe ID: {order.stripeId}</p>
          <ul className={styles.items}>
            {order.items.map((item) => (
              <li key={item.id} className={styles.item}>
                <Image src={item.imageUrl} alt={item.name} width={80} height={80}/>
                <div>
                  <p>{item.name}</p>
                  <p>{item.quantity} × {item.price.toLocaleString()} 円</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}