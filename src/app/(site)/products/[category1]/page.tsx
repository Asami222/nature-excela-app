import { productCategories, CategoryItem, ProductCategories } from '@/constants/productCategories';
import ProductMain from '@/components/ProductMain/ProductMain';
import ProductHero from '@/components/ProductHero/ProductHero';
import { createMetadata } from "@/lib/metadata";

type CategoryKey = keyof ProductCategories; 
// "skincare" | "face" | "eye" | "rip" | "brush"

export const BigNameDict: Record<string, string> = {
  "skincare": "基礎化粧品",
  "face": "ベースメイク",
  "eye": "アイメイク",
  "rip": "口紅類",
  "brush": "メイクブラシ"
}

export async function generateMetadata({params}: {params: Promise<{ category1: string }>}) {
  const { category1 } = await params;

  return createMetadata({
    title: BigNameDict[category1],
    description: `${BigNameDict[category1]}のカテゴリー一覧ページです`,
    path: `/products/${category1}`,
  });
}

export default async function ProductPage({params}: {params: Promise<{ category1: CategoryKey}>}) {
  const { category1 } =  await params;

  const products: CategoryItem[] = productCategories[category1];
  const data = products.filter(product =>  product.type !== "category")
  const upperText = category1.toUpperCase();
  const isWhite = category1 === 'brush'

  return (
    <>
      <ProductHero background={`/hero/${category1}.webp`} title={upperText} subtitle={BigNameDict[category1]} white={isWhite}/>
      <ProductMain items={data}/> 
    </>
  )
 
}