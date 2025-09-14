"use server";

import { cookies } from "next/headers";

export async function clearCartServer() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const cookieStore = await cookies() as any; // 型エラー回避
  cookieStore.set("cart", "", { maxAge: 0, path: "/" });
}