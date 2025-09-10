// lib/cart.ts
import { cookies } from "next/headers";
import type { Cart } from "@/store/cart"; 

export async function getInitialCart(): Promise<Cart> {
  //cookieはawait必要
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
  return initialCart;
}