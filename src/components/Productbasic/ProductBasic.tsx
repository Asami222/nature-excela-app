//import Meta from "/components/meta";
import ProductText from "../ProductText/ProductText";
import EachItem from "../EachItem/EachItem";
import Container from "../Container/Container";
import styles from './ProductBasic.module.css';
import { MicroCMSImage } from "microcms-js-sdk";
import { getUserFavorites } from "@/lib/favorite";

type Images = {
    id: string;
    image: MicroCMSImage & {alt: string};
    name: string;
    price: number;
    color?: string;
    category?: string;
    quantity: number;
}

type Props = {
    smallCategoryId: string;
    title: string;
    text: string;
    images: Images[];
    isCol?: boolean;
    isRow?: boolean;
    hasColor?:boolean
}

export default async function Product({smallCategoryId,title,text,images,isCol = false, isRow = false, hasColor=false}: Props) {

    const favorites = await getUserFavorites(); 
    const favoriteIds = new Set(favorites.map((f) => f.id)); // Product ID の集合にする


    return (
        <>
        <main className={styles.container}>
        <Container large>
        <ProductText title={title} text={text}/>
        <div className={styles.grid}>
        {images.map((img,i) => (
            <EachItem key={i} product={img} isCol={isCol} isRow={isRow} hasColor={hasColor} smallCategoryId={smallCategoryId} initialFavorite={favoriteIds.has(img.id)}/>
        ))}
        </div>
        </Container>
        </main>
        </>
    )
}