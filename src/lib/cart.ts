"use client";

import type { CartItem } from "@/types";

const CART_KEY = "solstric_cart";

export function getCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(CART_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveCart(items: CartItem[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(CART_KEY, JSON.stringify(items));
}

export function addToCart(productId: string, quantity = 1): CartItem[] {
  const cart = getCart();
  const existing = cart.find((item) => item.product_id === productId);
  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({ product_id: productId, quantity });
  }
  saveCart(cart);
  return cart;
}

export function removeFromCart(productId: string): CartItem[] {
  const cart = getCart().filter((item) => item.product_id !== productId);
  saveCart(cart);
  return cart;
}

export function updateQuantity(productId: string, quantity: number): CartItem[] {
  const cart = getCart();
  const item = cart.find((i) => i.product_id === productId);
  if (item) {
    item.quantity = Math.max(1, quantity);
  }
  saveCart(cart);
  return cart;
}

export function clearCart(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(CART_KEY);
}
