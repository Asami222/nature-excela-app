import { productCategories, CategoryItem, ProductCategories } from '@/constants/productCategories';
import ProductMain from '@/components/ProductMain/ProductMain';
import ProductHero from '@/components/ProductHero/ProductHero';
import { createMetadata } from "@/lib/metadata";
import brushImage from '../../../../../public/hero/brush.webp';
import eyeImage from '../../../../../public/hero/eye.webp';
import ripImage from '../../../../../public/hero/rip.webp';
import skincareImage from '../../../../../public/hero/skincare.webp';
import faceImage from '../../../../../public/hero/face.webp';
import { StaticImageData } from 'next/image';

type CategoryKey = keyof ProductCategories; 
// "skincare" | "face" | "eye" | "rip" | "brush"

export const ImageNameDict: Record<string, StaticImageData> = {
  "skincare": skincareImage,
  "face": faceImage,
  "eye": eyeImage,
  "rip": ripImage,
  "brush": brushImage
}

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

export async function generateStaticParams() {
  return Object.keys(productCategories).map((category1) => ({ category1 }));
}

export default async function ProductPage({params}: {params: Promise<{ category1: CategoryKey}>}) {
  const { category1 } =  await params;

  const products: CategoryItem[] = productCategories[category1];
  const data = products.filter(product =>  product.type !== "category")
  const upperText = category1.toUpperCase();
  const isWhite = category1 === 'brush'

  return (
    <>
      <ProductHero background={ImageNameDict[category1]} title={upperText} subtitle={BigNameDict[category1]} white={isWhite}/>
      <ProductMain items={data}/> 
    </>
  )
 
}