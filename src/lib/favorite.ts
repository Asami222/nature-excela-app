import { getServerSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

/**
 * 特定の商品がお気に入りかどうか
 */
export async function isUserFavorite(productId: string) {
  const session = await getServerSession();
  if (!session?.user?.id) return false;

  const favorite = await prisma.favorite.findUnique({
    where: {
      userId_productId: {
        userId: session.user.id,
        productId,
      },
    },
  });

  return !!favorite;
}

/**
 * お気に入り一覧を取得
 */
export async function getUserFavorites() {
  const session = await getServerSession();
  if (!session?.user?.id) {
    console.warn("⚠️ session.user.id が未定義です", session)
    return []
  }

  const favorites = await prisma.favorite.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      product: true, // 👈 Product 情報も一緒に取得できる
    },
  });

  return favorites.map((f) => {
    const p = f.product
    return {
      ...p,
      color: p.color ?? "",
      bigCategory: p.bigCategoryId ?? "",
      smallCategory: p.smallCategoryId ?? "",
      image: {
        url: p.imageUrl ?? "",
        width: p.imageWidth ?? 1300,
        height: p.imageHeight ?? 920,
        alt: p.name ?? "",
      },
    }
  });
}