// app/api/cart/clear/route.ts
import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({ ok: true });
  // カート cookie を削除
  res.cookies.set("cart", "", { maxAge: 0, path: "/" });
  return res;
}