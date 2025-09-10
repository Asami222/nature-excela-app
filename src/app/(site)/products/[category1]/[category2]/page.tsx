
import { getList } from "@/lib/microcmsApi";
import Pagination from "@/components/Pagination/Pagination";
import Product from "@/components/Productbasic/ProductBasic";
import { INITIAL_PER_PAGE } from "@/constants";
import styles from './page.module.css';

const NameDict: Record<string, string> = {
  "cream": "ミネラル成分を豊富に含んだ肌に優しく柔らかな使い心地です。",
  "cleansing": "植物の浄化作用で汚れをすっきり落とし、強すぎない成分で肌の自然な油分を守ります。",
  "serum": "自然のパワーをふんだんに取り入れたNATURE EXCELAが自信を持ってお勧めする他社にはない商品です。使う毎により強く生まれ変わる肌を体験してください。",
  "shadow": "美しく輝く大人の知的さを備えた目元を演出します。",
  "mascara": "汗や水で落ちにくく、滑りの良い描き心地と発色性の良さがあります。",
  "palette": "自然の力強い色からインスピレーションを得たバリエーションです。",
  "stick": "汗や水で落ちにくく、滑りの良い描き心地と発色性の良さがあります。",
} 

export default async function ProductListPage({params}: {params: Promise<{ category1: string, category2: string }>}) {
  const { category1, category2 } = await params;

  const products = await getList("products",{
    limit: INITIAL_PER_PAGE,
    orders: "createdAt",
    filters: `bigCategory[equals]${category1}[and]smallCategory[equals]${category2}`,
  });

  const imgData = products.contents.map((p) => (
    {
      id: p.id,
      image: {
         url: p.thumbnail.url,
         alt: p.name,
         width: p.thumbnail.width,
         height: p.thumbnail.height,
       },
      name: p.name,
      price: p.price,
      color: p.color,
      category: p.bigCategory.id,
      quantity: 1
  }))


  return (
    <>
    {  
      products.contents.length === 0 ? (
        <div className={styles.noProduct}><p>商品はありません</p></div>
        ) : (
          products.contents.map((product,i) => 
          <Product 
            key={i} 
            smallCategoryId={product.smallCategory? product.smallCategory?.id : ""}
            title={product.smallCategory? product.smallCategory?.name : ""}
            text={product.smallCategory? NameDict[product.smallCategory.id] : ""}
            images={imgData}
            hasColor={!!product.color}
            isRow={!!product.color}
            isCol={product.bigCategory.name === "SKINCARE"}
          />) 
        )}
    <Pagination totalCount={products.totalCount} createHref={(p) => `/products/${category1}/${category2}/p/${p}`} />
    </>
  );
}