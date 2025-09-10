//import { notFound } from "next/navigation";
import { SITE_NAME } from "@/constants";
import { getServerSession } from "@/lib/auth";
//import { prisma } from "@/lib/prisma";
import type { Metadata } from "next";
import { redirect } from "next/navigation"
import Pagination from "@/components/Pagination/Pagination";
import { getUserFavorites } from "@/lib/favorite";
import Container from "@/components/Container/Container";
import ProductText from "@/components/ProductText/ProductText";
import EachItem from "@/components/EachItem/EachItem";
//import { ProfilePanel } from "@/components/ProfilePanel/ProfilePanel";
import styles from "./page.module.css"

export async function generateMetadata(): Promise<Metadata> {
  const session = await getServerSession();
  if (!session) {
    redirect("/login");
  }
  return { title: `${session?.user.name} | ${SITE_NAME}` };
}

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
         url: p.image.url,
         alt: p.image.alt,
         width: p.image.width,
         height: p.image.height,
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
        <ProductText title="favorite products" user={session.user} profile/>
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
      </Container>
    </div>
    <Pagination totalCount={favorites.length} createHref={(p) => `/profile/p/${p}`}/>
    </>
  );

}