// app/api/checkout/session/route.ts
import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get("session_id");

  if (!sessionId) {
    return NextResponse.json({ error: "Missing session_id" }, { status: 400 });
  }

  try {
    // セッション情報を取得（line_itemsも含める）
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["line_items", "line_items.data.price.product"],
    });

    return NextResponse.json({
      id: session.id,
      amount_total: session.amount_total,
      currency: session.currency,
      customer_email: session.customer_email,
      line_items: session.line_items?.data.map((item) => ({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        name: (item.price?.product as any)?.name, // ← name を返す
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        description: (item.price?.product as any)?.description, // ← description を返す
        quantity: item.quantity,
        amount_total: item.amount_total,
      })),
    });
  } catch (error) {
    console.error("Error retrieving session:", error);
    return NextResponse.json({ error: "Failed to retrieve session" }, { status: 500 });
  }
}