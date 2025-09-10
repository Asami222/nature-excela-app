// app/api/checkout/route.ts
import { stripe } from "@/lib/stripe";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { totalPrice, totalCount, userId } = body;

  // 環境変数から取得（本番ではVercelに設定してある値）
  const origin =
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "jpy",
            product_data: {
              name: `合計 ${totalCount} 点の商品`,
            },
            unit_amount: totalPrice,
          },
          quantity: 1,
        },
      ],
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/payments?canceled=true`,
      metadata: {
        userId,
        totalPrice: totalPrice.toString(),
        totalCount: totalCount.toString(),
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Checkout session error:", error);
    return NextResponse.json({ error: "Checkout session failed" }, { status: 500 });
  }
}