import HomeSection from '@/components/HomeSection/HomeSection'
import { productCategories } from '@/constants/productCategories'
/** img */
import skincareImg from 'public/home/skincareImg.webp'
import skincareImgM from 'public/home/skincareImgMobile.webp'
import faceImg from 'public/home/faceImg.webp'
import faceImgM from 'public/home/faceImgMobile.webp'
import eyeImg from 'public/home/eyeImg.webp'
import ripImg from 'public/home/ripImg.webp'
import ripImgM from 'public/home/ripImgMobile.webp'
import brushImg from 'public/home/brushImg.webp'


export default function Home() {

  return  (
      <>
        <HomeSection data={productCategories.skincare} img={skincareImg} imgM={skincareImgM} name="skincare" color="var(--skincare)" size='(min-width: 1440px) 570px, 39.6vw'/>
        <HomeSection data={productCategories.face} img={faceImg} imgM={faceImgM} name="face" color="var(--face)" size='(min-width: 1440px) 1140px, 79vw'/>
        <HomeSection data={productCategories.eye} img={eyeImg} name="eye" titleDesc="eye" color="var(--eye)" size='(min-width: 1440px) 674px, 46.8vw'/>
        <HomeSection data={productCategories.rip} img={ripImg} imgM={ripImgM} name="rip" titleDesc="rip" color="var(--rip)" size='(min-width: 1440px) 500px, 34.7vw'/>
        <HomeSection data={productCategories.brush} img={brushImg} name="brush" titleDesc="brush" color="var(--brush)" size='(min-width: 1440px) 500px, 34.7vw'/>
      </>
  )
}