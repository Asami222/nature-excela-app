"use client";

import { atom } from "jotai";

export interface Product {
  id: string;
  image: {
    url: string;
    alt: string;
    width?: number;
    height?: number;
  };
  date?: string;
  name: string;
  price: number;
  quantity: number;
}

export interface Cart {
  products: Product[];
}

const initialState: Cart = {
  products: [],
};

export const cartAtom = atom<Cart>(initialState);

export const totalPriceAtom = atom((get) => {
  const cart = get(cartAtom);
  return cart.products.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0
  );
});

export const totalCountAtom = atom((get) => {
  const cart = get(cartAtom);
  return cart.products.reduce((sum, product) => sum + product.quantity, 0);
});