import { getList } from "@/lib/microcmsApi";
import Pagination from "@/components/Pagination/Pagination";
import Product from "@/components/Productbasic/ProductBasic";
import { INITIAL_PER_PAGE } from "@/constants";
import { createMetadata } from "@/lib/metadata";
import { BigNameDict } from "../page";
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

const TitleDict: Record<string, string> = {
  "cream": "クリーム",
  "cleansing": "クレンジング",
  "serum": "美容液",
  "shadow": "アイシャドウ",
  "mascara": "マスカラ",
  "palette": "アイパレット",
  "stick": "リップスティック",
} 

export async function generateMetadata({params}: {params: Promise<{ category1: string, category2: string }>}) {
  const { category1, category2 } = await params;

  return createMetadata({
    title: `${BigNameDict[category1]}(${TitleDict[category2]})`,
    description: `${NameDict[category2]}の商品一覧ページです`,
    path: `/products/${category1}/${category2}`,
  });
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
          <Product 
            smallCategoryId={products.contents[0].smallCategory? products.contents[0].smallCategory?.id : ""}
            title={products.contents[0].smallCategory? products.contents[0].smallCategory?.name : ""}
            text={products.contents[0].smallCategory? NameDict[products.contents[0].smallCategory.id] : ""}
            images={imgData}
            hasColor={!!products.contents[0].color}
            isRow={!!products.contents[0].color}
            isCol={products.contents[0].bigCategory.name === "SKINCARE"}
          />
        )}
    <Pagination totalCount={products.totalCount} createHref={(p) => `/products/${category1}/${category2}/p/${p}`} />
    </>
  );
}