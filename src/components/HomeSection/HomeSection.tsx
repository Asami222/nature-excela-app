"use client";

import { useEffect, useState } from "react";
import styles from './HomeSection.module.css'
import Link from "next/link";
import { useMediaQuery } from 'react-responsive'
import cx from "classnames"
import Image, { StaticImageData } from 'next/image'
import { libreCaslonDisplay } from "@/styles/fonts";
import type { CategoryItem } from '@/constants/productCategories';
//import BouncingDecoration from "./BouncingDecoration";


type MenuProps = {
    data: CategoryItem[];
    isMobile?: boolean;
}

const Menu = ({ data, isMobile = false }: MenuProps) => {
    return (
      <div className={styles.menu}>
            {isMobile ?
            (data.map((item,i) => (
                item.type === "link" ? (
                    <p key={i} className={styles.existFlex}>
                        {item.exist && <span className={styles.exist}>exists!</span>}
                        <Link href={item.link}>
                            {item.name}
                        </Link>
                    </p> 
                ):(
                    ''
                )
            )))
            :(data.map((item,i) => (
              item.type === "link" ? (
                    <p key={i}>
                        <Link href={item.link}>
                            {item.name}
                        </Link>
                        {item.exist && <span className={styles.exist}>exists!</span>}
                    </p>
                ):(
                    <h2 key={i}>
                        {item.name}
                    </h2>
                )
            )))
        }
        </div>
    )
  }

type ImgProps = {
    img: StaticImageData;
    imgM?: StaticImageData;
    size?: string
    isMobile?: boolean;
}

const Img = ({img,imgM,size,isMobile=false}: ImgProps) => {

    return (
        <div className={styles.img}>
            {isMobile ?
             ( imgM &&
                <Image
                    src={imgM}
                    alt=''
                    fill
                    placeholder='blur'
                    style={{
                      objectFit: 'cover',
                    }}
                />
            ):(
               <Image
                    src={img}
                    alt=''
                    sizes={size}
                    placeholder='blur'
                    style={{
                      width: '100%',
                      height: 'auto',
                    }}
                />
            )}   
        </div>
    )
}

type Props = {
    data: CategoryItem[];
    img: StaticImageData;
    imgM?: StaticImageData;
    size: string;
    name: string;
    titleDesc?: string;
    color: string;
}

export default function HomeSection({data,img,imgM,size,name,titleDesc,color}: Props) {
    const [isMounted, setIsMounted] = useState(false);
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' })
    const title = name.toUpperCase()

    // マウント完了後に true にする
      useEffect(() => {
        setIsMounted(true);
      }, []);

      // マウント前は何も描画しない
      if (!isMounted) return null;
     
    return (
        <div className={cx(styles.container,styles[name])}>
            {isMobile && <h2 className={`${libreCaslonDisplay.className}`}>{title}</h2>}
            {!isMobile && <Menu data={data}/>}
            {isMobile && 
            <div className={styles.menuContainer}>
                <Menu data={data} isMobile/>
                <div className={styles.colorBox} style={{'--color-box': color} as React.CSSProperties}></div>
            </div>
            }
            {!isMobile && 
                (titleDesc ?
                    <div className={styles.titleFlex}>
                        <h2 className={`${libreCaslonDisplay.className}`}>{titleDesc}</h2>
                        <Img img={img} size={size}/>
                    </div>
                :
                    <Img img={img} size={size}/>
                )   
            }
            {isMobile && <Img imgM={imgM} img={img} isMobile/>}
        </div>
    )
}