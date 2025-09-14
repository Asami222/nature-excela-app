// app/api/orders/route.ts 購入履歴取得
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
/*
type OrderItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
};

type Items = {
  items: OrderItem[];
};
*/
export async function GET(req: Request) {
  const url = new URL(req.url);
  const userId = url.searchParams.get("userId");
  if (!userId) return NextResponse.json({ error: "userId required" }, { status: 400 });

  try {
    const orders = await prisma.order.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      include: { items: true },
    });

    return NextResponse.json(orders);
  } catch (err) {
    console.error("Failed to fetch orders:", err);
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}