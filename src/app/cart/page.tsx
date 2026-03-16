"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Trash2, Plus, Minus, ShoppingCart, ArrowRight, MessageCircle } from "lucide-react";
import { getCart, removeFromCart, updateQuantity, clearCart } from "@/lib/cart";
import { getProductById } from "@/data/products";
import { getWhatsAppLink } from "@/data/site-config";
import type { CartItem, Product } from "@/types";

interface CartItemWithProduct extends CartItem {
  product: Product;
}

export default function CartPage() {
  const [items, setItems] = useState<CartItemWithProduct[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    loadCart();
  }, []);

  function loadCart() {
    const cartItems = getCart();
    const withProducts = cartItems
      .map((item) => {
        const product = getProductById(item.product_id);
        return product ? { ...item, product } : null;
      })
      .filter(Boolean) as CartItemWithProduct[];
    setItems(withProducts);
  }

  function handleRemove(productId: string) {
    removeFromCart(productId);
    loadCart();
  }

  function handleQuantityChange(productId: string, qty: number) {
    updateQuantity(productId, qty);
    loadCart();
  }

  const subtotal = items.reduce((sum, item) => {
    const price = item.product.sale_price || 0;
    return sum + price * item.quantity;
  }, 0);

  const whatsappMessage = items.length > 0
    ? `Hi, I'd like to order the following from Solstric:\n\n${items.map((item) => `• ${item.product.product_name} x${item.quantity} — ${item.product.price_display}`).join("\n")}\n\nTotal: ₹${subtotal.toLocaleString("en-IN")}\n\nPlease confirm availability and delivery.`
    : "";

  if (!mounted) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Cart</h1>

      {items.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-xl">
          <ShoppingCart className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 mb-6">Your cart is empty</p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-brand-green text-white font-semibold px-6 py-3 rounded-lg hover:bg-brand-green-dark transition-colors"
          >
            Browse Products <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <>
          <div className="space-y-4 mb-8">
            {items.map((item) => (
              <div key={item.product_id} className="flex items-center gap-4 bg-white border border-gray-100 rounded-xl p-4">
                <div className="relative w-20 h-20 bg-gray-50 rounded-lg overflow-hidden shrink-0">
                  <Image
                    src={item.product.hero_image_url}
                    alt={item.product.product_name}
                    fill
                    className="object-contain p-2"
                    sizes="80px"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <Link href={`/category/${item.product.category_slug}/${item.product.slug}`} className="font-semibold text-gray-900 text-sm hover:text-brand-green transition-colors line-clamp-1">
                    {item.product.product_name}
                  </Link>
                  <p className="text-lg font-bold text-gray-900 mt-1">{item.product.price_display}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => handleQuantityChange(item.product_id, item.quantity - 1)} className="p-1.5 rounded-lg border border-gray-200 hover:bg-gray-50">
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-8 text-center font-medium">{item.quantity}</span>
                  <button onClick={() => handleQuantityChange(item.product_id, item.quantity + 1)} className="p-1.5 rounded-lg border border-gray-200 hover:bg-gray-50">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <button onClick={() => handleRemove(item.product_id)} className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="bg-gray-50 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-600">Subtotal ({items.length} items)</span>
              <span className="text-2xl font-bold text-gray-900">₹{subtotal.toLocaleString("en-IN")}</span>
            </div>
            <p className="text-sm text-gray-500 mb-6">Delivery charges calculated after order confirmation</p>

            <div className="space-y-3">
              <a
                href={getWhatsAppLink(whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-brand-green text-white font-semibold px-6 py-3.5 rounded-lg hover:bg-brand-green-dark transition-colors w-full text-base"
              >
                <MessageCircle className="w-5 h-5" />
                Place Order on WhatsApp
              </a>
              <Link
                href="/checkout"
                className="flex items-center justify-center gap-2 border-2 border-gray-200 text-gray-700 font-semibold px-6 py-3.5 rounded-lg hover:bg-gray-50 transition-colors w-full"
              >
                Proceed to Checkout Form
              </Link>
              <Link
                href="/"
                className="flex items-center justify-center text-sm text-brand-green font-medium hover:underline"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
