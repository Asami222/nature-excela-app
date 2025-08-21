"use client";

import { useAtom } from "jotai";
import { cartAtom, Product } from "./cart";

export const useCart = () => {
  const [cart, setCart] = useAtom(cartAtom);

  /** カートに追加 */
  const addCart = (product: Product) => {
    const selectItem = cart.products.find((_product) => _product.id === product.id);

    if (!selectItem) {
      // 新規追加
      const products = [...cart.products];
      products.push({
        ...product,
        quantity: 1,
      });
      setCart({ products });
    } else {
      // 数量を増やす
      setCart((prevCart) => ({
        products: prevCart.products.map((_product) =>
          _product.id === selectItem.id
            ? { ..._product, quantity: _product.quantity + 1 }
            : _product
        ),
      }));
    }
  };

  /** 数量を減らす（0なら削除） */
  const removeCart = (product: Product) => {
    const selectItem = cart.products.find((_product) => _product.id === product.id);
    if (!selectItem) {
      console.warn("selectItemがundefinedのはずがない, バグの可能性あり");
      return;
    }

    if (selectItem.quantity > 1) {
      setCart((prevCart) => ({
        products: prevCart.products.map((_product) =>
          _product.id === selectItem.id
            ? { ..._product, quantity: _product.quantity - 1 }
            : _product
        ),
      }));
    } else {
      // 数量1 → 削除
      setCart({
        products: cart.products.filter((_product) => _product.id !== product.id),
      });
    }
  };

  /** 完全に削除 */
  const deleteCart = (product: Product) => {
    const selectItem = cart.products.find((_product) => _product.id === product.id);
    if (!selectItem) {
      console.warn("selectItemがundefinedのはずがない, バグの可能性あり");
      return;
    }
    setCart({
      products: cart.products.filter((_product) => _product.id !== product.id),
    });
  };

  return { cart, addCart, removeCart, deleteCart };
};