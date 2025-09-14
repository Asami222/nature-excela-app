"use client";

import Image from 'next/image'
import { useSession } from "next-auth/react";
import { useState, useTransition, useEffect, useMemo } from "react";
import { useRouter, usePathname } from "next/navigation"
import styles from './EachItem.module.css'
import cx from "classnames"
import { useCart } from '@/store/useCart';
import { MicroCMSImage } from "microcms-js-sdk";
import HeartIcon from '../HeartIcon/HeartIcon';

//type ExtendedMicroCMSImage = MicroCMSImage & { alt: string }
type PureImg = {
    id: string;
    image: {
        url: string;
        alt: string;
        width?: number;
        height?: number;
    };
    name: string;
    price: number;
    color?: string;
    date?: string
    category?: string;
    quantity: number;
}

type Images = {
    id: string;
    image: (MicroCMSImage & { alt: string }) 
    name: string;
    price: number;
    color?: string;
    date?: string;
    category?: string
    quantity: number;
}

type Props = {
    product: Images | PureImg;
    smallCategoryId: string;
    isRow?: boolean;
    isCol?: boolean;
    isNew?: boolean;
    isMember?: boolean
    hasColor?: boolean;
    initialFavorite: boolean;
}

export default function EachItem({isMember = false, isRow = false, isNew = false, hasColor = false, isCol =false, product, smallCategoryId, initialFavorite}: Props) {

    const { addCart } = useCart();
    const { data: session } = useSession();
    const router = useRouter()
    const pathname = usePathname()
    const [isFavorite, setIsFavorite] = useState(false);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [isPending, startTransition] = useTransition();

        // 価格をクライアントでロケール依存で表示
    const price = useMemo(() => {
        return (product.price).toLocaleString();
    }, [product.price]);

    // クライアントマウント後に初期値をセット
    useEffect(() => {
        setIsFavorite(initialFavorite);
    }, [initialFavorite]);

    const handleClick = () => {
        if (!session) {
            // 未ログイン時は現在のページを callbackUrl に渡す
            router.push(`/login?callbackUrl=${encodeURIComponent(pathname)}`)
            return
        }
        addCart(product)
    }

    const toggleFavorite = async () => {
        if (!session) {
          // 未ログイン時は現在のページを callbackUrl に渡す
          router.push(`/login?callbackUrl=${encodeURIComponent(pathname)}`)
          return
        }

        const previous = isFavorite;
        setIsFavorite(!isFavorite);
    
        startTransition(async () => {
          const res = await fetch("/api/favorite", {
            method: "POST",
            body: JSON.stringify({ 
                productId: product.id, 
                add: !previous, 
                name: product.name, 
                price: product.price,
                imageUrl: product.image.url, 
                imageWidth: product.image.width,
                imageHeight: product.image.height,
                bigCategoryId: product.category,
                smallCategoryId, 
                color: product.color,
          }),
        });
        console.log(res)
          if (!res.ok) setIsFavorite(previous);
        });
      };

    return (
        <>
        <div className={styles.container}>
                <div className={cx(
                        styles.img,
                        isCol && styles.colImg, 
                        hasColor && styles.colorImg, 
                        isMember && isNew && styles.memberNewImg,
                        smallCategoryId === "cream" && styles.cream, 
                        smallCategoryId === "serum" && styles.serum
                    )} 
                    style={ product.color ? { '--color-box': product.color } as React.CSSProperties : undefined }
                >
                    <Image
                        src={product.image.url}
                        alt={product.image.alt}
                        width={product.image.width}
                        height={product.image.height}
                        sizes='(min-width: 1320px) 1320px, 100vw'
                        style={{
                            width: '100%',
                            height: 'auto',
                        }}
                        priority={smallCategoryId === "new"}
                    />
                </div>
            <div className={cx(styles.text, isCol && styles.colText, hasColor && styles.colorText)}>
                { isNew && !isMember &&
                    <p className={styles.date}>{product.date}発売開始</p>
                }
                <h2>{product.name}</h2>
                
                <div className={cx(isRow ? styles.row : styles.col)}>
                    <p className={styles.price}>{price}円（税込）</p>
                    <button className={styles.btn} onClick={handleClick}>バッグに入れる</button>
                </div>
            </div>
            <HeartIcon isFavorite={isFavorite} onToggle={toggleFavorite} />
        </div>
        </>
    )
}


