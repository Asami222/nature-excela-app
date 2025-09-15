
import { getServerSession } from "@/lib/auth";
import { createMetadata } from "@/lib/metadata";
import { redirect } from "next/navigation"
import Pagination from "@/components/Pagination/Pagination";
import { getUserFavorites } from "@/lib/favorite";
import Container from "@/components/Container/Container";
import ProductText from "@/components/ProductText/ProductText";
import EachItem from "@/components/EachItem/EachItem";
//import { ProfilePanel } from "@/components/ProfilePanel/ProfilePanel";
import styles from "./page.module.css"

export const metadata = createMetadata({
  title: "マイページ",
  description: "メンバーページです",
  path: "/member",
});

export default async function Page() {

  const session = await getServerSession();
  if (!session || !session.user) {
    redirect("/login");
  }

  //const page = typeof searchParams.page === 'string' ? searchParams.page : '1';
/*
  const profile = await prisma.profile.upsert({
    where: { userId: session.user.id },
    update: {},
    create: { userId: session.user.id },
  });
 */ 
  const favorites = await getUserFavorites();
  const favoriteIds = new Set(favorites.map((f) => f.id));
  const imgData = favorites.map((p) => (
    {
      id: p.id,
      smallCategoryId: p.smallCategory,
      image: {
         url: p.image?.url ?? "/items/noImg.jpg", // fallback
         alt: p.image?.alt ?? "no image",
         width: p.image?.width ?? 100,
         height: p.image?.height ?? 100,
       },
      name: p.name,
      price: p.price,
      color: p.color,
      category: p.bigCategory,
      quantity: 1
  }))

  return (
    <>
    <div className={styles.container}>
      <Container large>
        <ProductText title="favorite products" user={session?.user} profile/>
        { favorites.length === 0 ? (
          <p className={styles.empty}>お気に入り商品は登録されていません</p>
        ) : (
          <div className={styles.grid}>
            {imgData.map((product,id) => (
              <EachItem 
                key={id} 
                product={product}
                isCol={["skincare"].includes(product.category ?? "")}
                isRow={!!product.color || ["new"].includes(product.category ?? "")}
                isNew={["new"].includes(product.category ?? "")}
                hasColor={!!product.color} 
                initialFavorite={favoriteIds.has(product.id)} 
                smallCategoryId={product.smallCategoryId}
                isMember
              />
            ))}
        </div>  
        )}
      </Container>
    </div>
    <Pagination totalCount={favorites.length} createHref={(p) => `/profile/p/${p}`}/>
    </>
  );
}