"use client";

import { useAtom } from "jotai";
import { cartAtom, Product } from "./cart";

function saveCartToCookie(cart: { products: Product[] }) {
  document.cookie = `cart=${JSON.stringify(cart)}; path=/;`;
}

export const useCart = () => {
  const [cart, setCart] = useAtom(cartAtom);

  /** カートに追加 */
  const addCart = (product: Product) => {
    const selectItem = cart.products.find((_product) => _product.id === product.id);

    let newCart;
    if (!selectItem) {
      // 新規追加
      newCart = { products: [...cart.products, { ...product, quantity: 1 }] };
    } else {
      // 数量を増やす
      newCart = {
        products: cart.products.map((_product) =>
          _product.id === selectItem.id
            ? { ..._product, quantity: _product.quantity + 1 }
            : _product
        ),
      };
    }
    setCart(newCart);
    saveCartToCookie(newCart);
  };

  /** 数量を減らす（0なら削除） */
  const removeCart = (product: Product) => {
    const selectItem = cart.products.find((_product) => _product.id === product.id);
    if (!selectItem) return;

    let newCart;
    if (selectItem.quantity > 1) {
      newCart = {
        products: cart.products.map((_product) =>
          _product.id === selectItem.id
            ? { ..._product, quantity: _product.quantity - 1 }
            : _product
        ),
      };
    } else {
      newCart = {
        products: cart.products.filter((_product) => _product.id !== product.id),
      };
    }
    setCart(newCart);
    saveCartToCookie(newCart);
  };

  /** 完全に削除 */
  const deleteCart = (product: Product) => {
    const newCart = {
      products: cart.products.filter((_product) => _product.id !== product.id),
    };
    setCart(newCart);
    saveCartToCookie(newCart);
  };

  /** カートを完全に空にする */
  const clearCart = () => {
    const newCart = { products: [] };
    setCart(newCart);
    saveCartToCookie(newCart);
  };

  return { cart, addCart, removeCart, deleteCart, clearCart };
};
