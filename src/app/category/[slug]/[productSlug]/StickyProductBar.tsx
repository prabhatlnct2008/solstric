"use client";

import { MessageCircle } from "lucide-react";
import { getWhatsAppLink } from "@/data/site-config";
import type { Product } from "@/types";

interface StickyProductBarProps {
  product: Product;
}

export default function StickyProductBar({ product }: StickyProductBarProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 lg:hidden z-40">
      <div className="flex items-center justify-between gap-3 max-w-7xl mx-auto">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-gray-900 truncate">{product.short_title}</p>
          <p className="text-lg font-bold text-gray-900">{product.price_display}</p>
        </div>
        <a
          href={getWhatsAppLink(product.whatsapp_message_template)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-brand-green text-white font-semibold px-5 py-3 rounded-lg hover:bg-brand-green-dark transition-colors shrink-0"
        >
          <MessageCircle className="w-4 h-4" />
          {product.price_mode === "quote-based" ? "Get Price" : "Order"}
        </a>
      </div>
    </div>
  );
}
