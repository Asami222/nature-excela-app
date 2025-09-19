"use client";
import dynamic from "next/dynamic";
import HomeSectionSkeleton from "@/components/HomeSectionSkeleton/HomeSectionSkeleton";
import type { ProductCategories } from "@/constants/productCategories";
import { StaticImageData } from "next/image";

type HomeClientProps = {
  productCategories: ProductCategories;
  image: StaticImageData[]
}


const HomeSection = dynamic(() => import("@/components/HomeSection/HomeSection"), {
  ssr: false,
  loading: () => <HomeSectionSkeleton />, // ← Skeleton で仮表示
});

export default function HomeClient({ productCategories, image}: HomeClientProps) {
  return (
    <>
        <HomeSection data={productCategories.skincare} img={image[0]} imgM={image[1]} name="skincare" color="var(--skincare)" size='(min-width: 1440px) 570px, 39.6vw'/>
        <HomeSection data={productCategories.face} img={image[2]} imgM={image[3]} name="face" color="var(--face)" size='(min-width: 1440px) 1140px, 79vw'/>
        <HomeSection data={productCategories.eye} img={image[4]} name="eye" titleDesc="eye" color="var(--eye)" size='(min-width: 1440px) 674px, 46.8vw'/>
        <HomeSection data={productCategories.rip} img={image[5]} imgM={image[6]} name="rip" titleDesc="rip" color="var(--rip)" size='(min-width: 1440px) 500px, 34.7vw'/>
        <HomeSection data={productCategories.brush} img={image[7]} name="brush" titleDesc="brush" color="var(--brush)" size='(min-width: 1440px) 500px, 34.7vw'/>
      </>
  );
}