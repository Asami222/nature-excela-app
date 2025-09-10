import { useCart } from '@/store/useCart';
import Image from 'next/image'
import styles from './InBag.module.css'
import type { Product } from '@/store/cart';

type InBagProps = {
  product: Product;
};

export default function InBag ({product}: InBagProps){

    const { addCart, removeCart, deleteCart } = useCart();
    const price = (product.price).toLocaleString();
    const subTotal = (product.price * product.quantity).toLocaleString();

    return (
        <div className={styles.wrapper}>
            <div className={styles.img} style={{ aspectRatio: `${product.image.width} / ${product.image.height}`}}>
                <Image
                    src={product.image.url}
                    alt={product.image.alt}
                    fill
                    style={{ objectFit: "contain" }}
                />
            </div>
            <div className={styles.desc}>
                <h2>{product.name}</h2>
                <p className={styles.price}>{price}円（税込）</p>
            </div>
            <div className={styles.count}>
                <button className={styles.increment} tabIndex={0} onClick={() => addCart(product)}>
                +
                </button>
                <button className={styles.decrement} tabIndex={0} onClick={() => removeCart(product)}>
                 <span>-</span>
                </button>
            </div>
            <p className={styles.price}>個数&emsp;{product.quantity}点</p>
            <p>計&emsp;{subTotal}円</p>
            <button onClick={() => deleteCart(product)} className={styles.delete}>削除</button>
        </div>
    )
}