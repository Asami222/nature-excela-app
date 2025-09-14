// api/webhook-stripe/route.ts
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";

export async function POST(req: Request) {
  const sig = req.headers.get("stripe-signature")!;
  const body = await req.text();

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error("Webhook signature verification failed.", err.message);
    return NextResponse.json({ error: "Webhook error" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    const userId = session.metadata?.userId;
    const totalPrice = parseInt(session.metadata?.totalPrice || "0");
    const totalCount = parseInt(session.metadata?.totalCount || "0");
    const cartProducts = session.metadata?.cart
      ? JSON.parse(session.metadata.cart)
      : [];

    if (userId) {
      try {
        await prisma.order.create({
          data: {
            userId,
            totalPrice,
            totalCount,
            stripeId: session.id,
            items: {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              create: cartProducts.map((p: any) => ({
                name: p.name,
                price: p.price,
                quantity: p.quantity,
                imageUrl: p.imageUrl,
              })),
            },
          },
        });

        console.log(
          "Order saved with items:",
          userId,
          totalPrice,
          cartProducts.length
        );
      } catch (err) {
        console.error("Failed to save order with items:", err);
      }
    }
  }

  return NextResponse.json({ received: true });
}