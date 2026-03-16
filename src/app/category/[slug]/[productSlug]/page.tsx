import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Star,
  CheckCircle,
  Truck,
  Shield,
  RotateCcw,
  ChevronRight,
  Share2,
  XCircle,
  MessageCircle,
  Phone,
} from "lucide-react";
import { getDbProductBySlug, getDbProductById } from "@/lib/products-db";

export const dynamic = "force-dynamic";
import { getCategoryBySlug } from "@/data/categories";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import WhatsAppCTA from "@/components/ui/WhatsAppCTA";
import ProductCard from "@/components/product/ProductCard";
import ProductGallery from "./ProductGallery";
import StickyProductBar from "./StickyProductBar";

interface Props {
  params: Promise<{ slug: string; productSlug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { productSlug } = await params;
  const product = await getDbProductBySlug(productSlug);
  if (!product) return {};
  return {
    title: product.seo_title,
    description: product.seo_meta_description,
    openGraph: {
      title: product.seo_title,
      description: product.seo_meta_description,
      images: [{ url: product.hero_image_url }],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug, productSlug } = await params;
  const product = await getDbProductBySlug(productSlug);
  if (!product || product.category_slug !== slug) notFound();

  const category = getCategoryBySlug(slug);
  const relatedResults = await Promise.all(
    product.related_product_ids.map((id) => getDbProductById(id))
  );
  const relatedProducts = relatedResults.filter(Boolean).slice(0, 4);

  const discount =
    product.mrp && product.sale_price
      ? Math.round(((product.mrp - product.sale_price) / product.mrp) * 100)
      : null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.product_name,
    description: product.short_description,
    image: product.gallery_images,
    brand: { "@type": "Brand", name: product.product_name.split(" ")[0] },
    ...(product.sale_price
      ? {
          offers: {
            "@type": "Offer",
            price: product.sale_price,
            priceCurrency: "INR",
            availability: "https://schema.org/InStock",
            seller: { "@type": "Organization", name: "Solstric" },
          },
        }
      : {}),
    ...(product.rating
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: product.rating,
            reviewCount: product.review_count,
          },
        }
      : {}),
  };

  const faqJsonLd =
    product.faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: product.faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: { "@type": "Answer", text: faq.answer },
          })),
        }
      : null;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {faqJsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />}

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Breadcrumbs */}
        <div className="py-4">
          <Breadcrumbs
            items={[
              { label: category?.name || product.category, href: `/category/${slug}` },
              { label: product.short_title },
            ]}
          />
        </div>

        {/* Product Hero — Above the Fold */}
        <section className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
          {/* Gallery */}
          <ProductGallery images={product.gallery_images} productName={product.product_name} />

          {/* Product Info */}
          <div>
            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-3">
              {product.badges.map((badge) => (
                <span key={badge} className="text-xs font-semibold px-2.5 py-1 rounded-full bg-brand-green/10 text-brand-green">
                  {badge}
                </span>
              ))}
              {product.product_type === "bundle" && (
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-purple-50 text-purple-600">
                  Bundle
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">
              {product.product_name}
            </h1>

            {/* Rating */}
            {product.rating && (
              <div className="flex items-center gap-2 mt-3">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  <span className="font-semibold text-gray-900">{product.rating}</span>
                </div>
                <span className="text-sm text-gray-400">
                  {product.review_count?.toLocaleString("en-IN")} reviews
                </span>
              </div>
            )}

            {/* Price */}
            <div className="mt-4 flex items-baseline gap-3">
              <span className="text-3xl font-bold text-gray-900">{product.price_display}</span>
              {product.mrp && product.sale_price && product.mrp > product.sale_price && (
                <>
                  <span className="text-lg text-gray-400 line-through">
                    ₹{product.mrp.toLocaleString("en-IN")}
                  </span>
                  <span className="text-sm font-semibold text-brand-green">{discount}% off</span>
                </>
              )}
            </div>

            {/* Short Description */}
            <p className="text-gray-600 mt-4 leading-relaxed">{product.short_description}</p>

            {/* Key Features Quick */}
            <div className="mt-6 grid grid-cols-2 gap-2">
              {product.key_features.slice(0, 6).map((feature, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-brand-green shrink-0" />
                  {feature}
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="mt-8 space-y-3">
              <WhatsAppCTA
                message={product.whatsapp_message_template}
                label={product.price_mode === "quote-based" ? "Get Best Price on WhatsApp" : "Order on WhatsApp"}
                size="lg"
                fullWidth
              />
              {product.supports_bulk_order && (
                <WhatsAppCTA
                  message={`Hi, I need bulk pricing for ${product.product_name}. Please share MOQ and dealer rates.`}
                  label="Bulk / Dealer Enquiry"
                  variant="outline"
                  size="lg"
                  fullWidth
                />
              )}
            </div>

            {/* Trust Badges */}
            <div className="flex items-center gap-6 mt-6 text-xs text-gray-500">
              <div className="flex items-center gap-1.5">
                <Truck className="w-4 h-4" /> Free Delivery*
              </div>
              <div className="flex items-center gap-1.5">
                <Shield className="w-4 h-4" /> Warranty
              </div>
              <div className="flex items-center gap-1.5">
                <RotateCcw className="w-4 h-4" /> Easy Returns
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Product Content */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          <div className="lg:col-span-2 space-y-12">
            {/* Full Description */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Product Description</h2>
              <p className="text-gray-600 leading-relaxed">{product.long_description}</p>
            </section>

            {/* Best For / Not Ideal */}
            <section className="grid sm:grid-cols-2 gap-6">
              <div className="bg-green-50 rounded-xl p-5">
                <h3 className="font-semibold text-gray-900 mb-3">Best For</h3>
                <p className="text-sm text-gray-600">{product.best_for}</p>
                <ul className="mt-2 space-y-1.5">
                  {product.use_cases.map((uc, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" /> {uc}
                    </li>
                  ))}
                </ul>
              </div>
              {product.not_ideal_for && product.not_ideal_for.length > 0 && (
                <div className="bg-red-50 rounded-xl p-5">
                  <h3 className="font-semibold text-gray-900 mb-3">Not Ideal For</h3>
                  <ul className="space-y-1.5">
                    {product.not_ideal_for.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                        <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </section>

            {/* Specifications */}
            {Object.keys(product.specifications).length > 0 && (
              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Specifications</h2>
                <div className="border border-gray-100 rounded-xl overflow-hidden">
                  {Object.entries(product.specifications).map(([key, value], i) => (
                    <div
                      key={key}
                      className={`flex items-center justify-between px-5 py-3 text-sm ${i % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
                    >
                      <span className="font-medium text-gray-600">{key}</span>
                      <span className="text-gray-900">{value}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* What's in the Box */}
            {product.whats_in_box && product.whats_in_box.length > 0 && (
              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-4">What&apos;s in the Box</h2>
                <div className="grid grid-cols-2 gap-2">
                  {product.whats_in_box.map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-brand-green shrink-0" /> {item}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* FAQs */}
            {product.faqs.length > 0 && (
              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
                <div className="space-y-3">
                  {product.faqs.map((faq, i) => (
                    <details key={i} className="group border border-gray-100 rounded-xl overflow-hidden">
                      <summary className="flex items-center justify-between p-4 cursor-pointer font-medium text-gray-900 text-sm hover:text-brand-green transition-colors">
                        {faq.question}
                        <ChevronRight className="w-4 h-4 text-gray-400 group-open:rotate-90 transition-transform shrink-0" />
                      </summary>
                      <div className="px-4 pb-4 text-sm text-gray-600 leading-relaxed">
                        {faq.answer}
                      </div>
                    </details>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Delivery Info Card */}
            <div className="bg-gray-50 rounded-xl p-5 sticky top-24">
              <h3 className="font-semibold text-gray-900 mb-4">Delivery & Support</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <Truck className="w-5 h-5 text-brand-green shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Delivery</p>
                    <p className="text-gray-500">Delhi NCR: 2-4 days | MP cities: 4-7 days</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-brand-green shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Warranty</p>
                    <p className="text-gray-500">Manufacturer warranty included</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <RotateCcw className="w-5 h-5 text-brand-green shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Returns</p>
                    <p className="text-gray-500">Easy return within 7 days of delivery</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MessageCircle className="w-5 h-5 text-brand-green shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Support</p>
                    <p className="text-gray-500">WhatsApp expert help available</p>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-gray-200">
                <WhatsAppCTA
                  message={product.whatsapp_message_template}
                  label={product.price_mode === "quote-based" ? "Get Price" : "Order Now"}
                  fullWidth
                />
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Products</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map(
                (p) => p && <ProductCard key={p.product_id} product={p} />
              )}
            </div>
          </section>
        )}
      </div>

      {/* Sticky Mobile CTA */}
      <StickyProductBar product={product} />
    </>
  );
}
