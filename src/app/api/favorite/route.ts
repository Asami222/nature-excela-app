// favorite/route.ts
import { getServerSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await getServerSession();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { productId, add, name, price, imageUrl, imageWidth, imageHeight, bigCategoryId, smallCategoryId, color } = await req.json();

  try {
    // Product を upsert
    if (name && price != null && imageUrl && bigCategoryId) {
      await prisma.product.upsert({
        where: { id: productId },
        update: {
          name,
          price,
          imageUrl,
          imageWidth,
          imageHeight,
          bigCategoryId,
          smallCategoryId,
          color
        },
        create: {
          id: productId,
          name,
          price,
          imageUrl,
          imageWidth,
          imageHeight,
          bigCategoryId,
          smallCategoryId,
          color
        },
      });
    }

    // favorite の追加・削除
    if (add) {
      await prisma.favorite.upsert({
        where: {
          userId_productId: { userId: session.user.id, productId },
        },
        update: {},
        create: {
          userId: session.user.id,
          productId,
        },
      });
    } else {
      await prisma.favorite.deleteMany({
        where: {
          userId: session.user.id,
          productId,
        },
      });
    }

    return NextResponse.json({ ok: true });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}