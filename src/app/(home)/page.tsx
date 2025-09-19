import { productCategories } from '@/constants/productCategories'
import HomeClient from './HomeClient'
/** img */
import skincareImg from 'public/home/skincareImg.webp'
import skincareImgM from 'public/home/skincareImgMobile.webp'
import faceImg from 'public/home/faceImg.webp'
import faceImgM from 'public/home/faceImgMobile.webp'
import eyeImg from 'public/home/eyeImg.webp'
import ripImg from 'public/home/ripImg.webp'
import ripImgM from 'public/home/ripImgMobile.webp'
import brushImg from 'public/home/brushImg.webp'

const images = [skincareImg, skincareImgM,faceImg,faceImgM,eyeImg,ripImg,ripImgM,brushImg]

export default function Home() {

  return  (
      <HomeClient productCategories={productCategories} image={images}/>
  )
}