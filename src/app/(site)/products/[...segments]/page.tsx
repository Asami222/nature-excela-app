// app/(site)/products/[...segments]/page.tsx
import { getList } from "@/lib/microcmsApi";
import { notFound } from "next/navigation";
import Product from "@/components/Productbasic/ProductBasic";
import { INITIAL_PER_PAGE } from "@/constants";
import { createMetadata } from "@/lib/metadata";
import { BigNameDict } from "../[category1]/page";
import Pagination from "@/components/Pagination/Pagination";
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
// app/(site)/products/[...segments]/page.tsx と同じ構造に揃える
export async function generateMetadata({ params }: { params: Promise<{ segments: string[] }> }) {
  const {segments} = await params;
  const [ category1, category2] = segments

  return createMetadata({
    title: `${BigNameDict[category1]}(${TitleDict[category2]})`,
    description: `${NameDict[category2]}の商品一覧ページです`,
    path: `/products/${category1}/${category2}`,
  });
}

// ビルド時に生成するページを決める
type Params = { segments: string[] };

export async function generateStaticParams(): Promise<Params[]> {
  const allProducts = await getList("products", { limit: 100 });

  // bigCategory.id + smallCategory.id のペアをユニーク化
  const groupedPairs = Array.from(
    new Map(
      allProducts.contents.map((p) => [
        `${p.bigCategory.id}-${p.smallCategory.id}`,
        p,
      ])
    ).values()
  );

  const params: Params[] = [];

  groupedPairs.forEach((p) => {
    const category1 = p.bigCategory.id;
    const category2 = p.smallCategory.id;

    // 該当カテゴリの総商品数
    const totalCount = allProducts.contents.filter(
      (item) =>
        item.bigCategory.id === category1 &&
        item.smallCategory.id === category2
    ).length;

    const totalPages = Math.ceil(totalCount / INITIAL_PER_PAGE);

    // SSGで生成するのは最大5ページまで、それ以降は ISR
    const staticPages = totalPages > 5 ? 5 : totalPages;

    // ページごとの params を生成
    for (let i = 1; i <= staticPages; i++) {
      params.push({ segments: [category1, category2, String(i)] });
    }

    // 番号なしトップページも生成
    params.push({ segments: [category1, category2] });
  });

  return params;
}

// ISRでキャッシュ更新（1時間ごと）
export const revalidate = 3600;

type Props = { params: Promise<{ segments: string[] }> };

export default async function ProductListPage({ params }: Props) {
  const { segments } = await params;
  const [category1, category2, pageStr] = segments;

  const page = Number(pageStr ?? "1");

  const products = await getList("products",{
    limit: INITIAL_PER_PAGE,
    offset: (page - 1) * INITIAL_PER_PAGE,
    orders: "createdAt",
    filters: `bigCategory[equals]${category1}[and]smallCategory[equals]${category2}`,
  });

  if (!products.contents.length) notFound();

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
      <Pagination
        totalCount={products.totalCount}
        current={page}
        createHref={(p) => `/products/${category1}/${category2}/${p}`}
      />
    </>
  );
}