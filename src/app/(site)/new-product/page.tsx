import { getList } from "@/lib/microcmsApi";
import ProductText from "@/components/ProductText/ProductText";
import EachItem from "@/components/EachItem/EachItem";
import Container from "@/components/Container/Container";
import Pagination from "@/components/Pagination/Pagination";
import styles from './page.module.css'
//import { INITIAL_PER_PAGE } from "@/constants";
import { getUserFavorites } from "@/lib/favorite";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "新商品",
  description: "新商品紹介ページです。季節限定の商品などのラインナップです。",
  path: "/new-product",
});

export default async function NewProduct() {

  const favorites = await getUserFavorites(); 
  const favoriteIds = new Set(favorites.map((f) => f.id)); // Product ID の集合にする


  const products = await getList("new-products",{
    orders: "createdAt",
  });

  const items = products.contents.filter(product => product.promotionalText === undefined);
  const promotional = products.contents.filter(product => product.promotionalText !== undefined);
  const text = promotional[0].promotionalText

  const imgData = items.map((p) => (
    {
      id: p.id,
      image: {
         url: p.thumbnail.url,
         alt: p.name,
         width: p.thumbnail.width,
         height: p.thumbnail.height,
       },
      date: p.release,
      name: p.name,
      price: p.price,
      color: p.color,
      category: "new",
      quantity: 1
  }))

  return (
    <>
    <div className={styles.container}>
      <Container large>
        <ProductText title="NEW PRODUCT" text={text? text : ''}/>
          <div className={styles.grid}>
            {imgData.map((color,id) => (
              <EachItem key={id} product={color} smallCategoryId="" isNew isRow initialFavorite={favoriteIds.has(color.id)}/>
            ))}
          </div>
      </Container>
    </div>
    <Pagination totalCount={items.length} createHref={(p) => `/new-product/p/${p}`}/>
    </>
  )
}