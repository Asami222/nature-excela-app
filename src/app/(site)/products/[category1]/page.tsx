import { productCategories, CategoryItem, ProductCategories } from '@/constants/productCategories';
import ProductMain from '@/components/ProductMain/ProductMain';
import ProductHero from '@/components/ProductHero/ProductHero';

type CategoryKey = keyof ProductCategories; 
// "skincare" | "face" | "eye" | "rip" | "brush"

type Props = {
  params: {
    category1: CategoryKey;
  };
};

export const NameDict: Record<string, string> = {
  "skincare": "基礎化粧品",
  "face": "ベースメイク",
  "eye": "アイメイク",
  "rip": "口紅類",
  "brush": "メイクブラシ"
}

export default async function ProductPage({ params }: Props) {
  const { category1 } =  await params;

  const products: CategoryItem[] = productCategories[category1];
  const data = products.filter(product =>  product.type !== "category")
  const upperText = category1.toUpperCase();
  const isWhite = category1 === 'brush'

  return (
    <>
      <ProductHero background={`/hero/${category1}.webp`} title={upperText} subtitle={NameDict[category1]} white={isWhite}/>
      <ProductMain items={data}/> 
    </>
  )
 
}