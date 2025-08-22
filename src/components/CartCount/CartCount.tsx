"use client";

import { useAtomValue } from "jotai";
import { totalCountAtom } from "@/store/cart";
import styles from './CartCount.module.css'

export default function CartCount() {

  const cart = useAtomValue(totalCountAtom);

  return (
    <>
    {cart >= 1 && <div className={styles.count}>{cart}</div>}
    </>
  )
}