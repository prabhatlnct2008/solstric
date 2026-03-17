import Link from "next/link";
import Image from "next/image";
import { Star, MessageCircle } from "lucide-react";
import type { Product } from "@/types";
import { calculateDiscount } from "@/lib/utils";
import { getWhatsAppLink } from "@/data/site-config";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const discount = product.mrp && product.sale_price ? calculateDiscount(product.mrp, product.sale_price) : null;

  return (
    <div className="group bg-white rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col">
      {/* Image */}
      <Link href={`/category/${product.category_slug}/${product.slug}`} className="relative aspect-square bg-gray-50 overflow-hidden">
        <Image
          src={product.gallery_images?.[0] || product.hero_image_url}
          alt={product.product_name}
          fill
          className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.badges.map((badge) => (
            <span
              key={badge}
              className="text-xs font-semibold px-2.5 py-1 rounded-full bg-brand-green text-white shadow-sm"
            >
              {badge}
            </span>
          ))}
        </div>
        {discount && (
          <span className="absolute top-3 right-3 text-xs font-bold px-2 py-1 rounded-full bg-red-500 text-white">
            -{discount}%
          </span>
        )}
      </Link>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        {/* Rating */}
        {product.rating && (
          <div className="flex items-center gap-1.5 mb-2">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span className="text-sm font-medium text-gray-700">{product.rating}</span>
            {product.review_count && (
              <span className="text-xs text-gray-400">({product.review_count.toLocaleString("en-IN")})</span>
            )}
          </div>
        )}

        {/* Title */}
        <Link href={`/category/${product.category_slug}/${product.slug}`}>
          <h3 className="text-sm font-semibold text-gray-900 leading-snug line-clamp-2 group-hover:text-brand-green transition-colors">
            {product.product_name}
          </h3>
        </Link>

        {/* Price */}
        <div className="mt-auto pt-3">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-gray-900">{product.price_display}</span>
            {product.mrp && product.sale_price && product.mrp > product.sale_price && (
              <span className="text-sm text-gray-400 line-through">
                ₹{product.mrp.toLocaleString("en-IN")}
              </span>
            )}
          </div>
        </div>

        {/* CTA */}
        <a
          href={getWhatsAppLink(product.whatsapp_message_template)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 flex items-center justify-center gap-2 bg-brand-green text-white text-sm font-semibold px-4 py-2.5 rounded-lg hover:bg-brand-green-dark transition-colors w-full"
        >
          <MessageCircle className="w-4 h-4" />
          {product.price_mode === "quote-based" ? "Get Best Price" : "Order on WhatsApp"}
        </a>
      </div>
    </div>
  );
}
