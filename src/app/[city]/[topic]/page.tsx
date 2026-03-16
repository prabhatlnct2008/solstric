import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, ChevronRight } from "lucide-react";
import { cityPages, getCityPage } from "@/data/city-pages";
import { getProductById } from "@/data/products";
import { getCategoryBySlug } from "@/data/categories";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import WhatsAppCTA from "@/components/ui/WhatsAppCTA";
import ProductCard from "@/components/product/ProductCard";

interface Props {
  params: Promise<{ city: string; topic: string }>;
}

export async function generateStaticParams() {
  return cityPages.map((cp) => ({ city: cp.city_slug, topic: cp.topic_slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city, topic } = await params;
  const page = getCityPage(city, topic);
  if (!page) return {};
  return { title: page.seo_title, description: page.seo_meta_description };
}

export default async function CityTopicPage({ params }: Props) {
  const { city, topic } = await params;
  const page = getCityPage(city, topic);
  if (!page) notFound();

  const featuredProducts = page.featured_product_ids.map((id) => getProductById(id)).filter(Boolean);
  const relatedCategories = page.related_category_slugs.map((s) => getCategoryBySlug(s)).filter(Boolean);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6">
      <div className="py-4">
        <Breadcrumbs items={[{ label: page.city }, { label: page.topic }]} />
      </div>

      {/* Hero */}
      <section className="py-8">
        <div className="flex items-center gap-2 text-brand-green mb-3">
          <MapPin className="w-5 h-5" />
          <span className="font-semibold">{page.city}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">{page.headline}</h1>
        <p className="text-lg text-gray-500 mt-3 max-w-2xl">{page.description}</p>
        <div className="mt-6">
          <WhatsAppCTA
            message={`Hi, I'm from ${page.city} and interested in ${page.topic.replace(/-/g, " ")}. Please help me.`}
            label={`Chat with ${page.city} Team`}
          />
        </div>
      </section>

      {/* Content */}
      <section className="max-w-3xl mb-12">
        <p className="text-gray-600 leading-relaxed">{page.content}</p>
      </section>

      {/* Products */}
      {featuredProducts.length > 0 && (
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Popular Products in {page.city}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {featuredProducts.map((p) => p && <ProductCard key={p.product_id} product={p} />)}
          </div>
        </section>
      )}

      {/* Categories */}
      {relatedCategories.length > 0 && (
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Explore Categories</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {relatedCategories.map((cat) => cat && (
              <Link key={cat.slug} href={`/category/${cat.slug}`} className="group bg-white border border-gray-100 rounded-xl p-6 hover:shadow-md transition-all">
                <h3 className="font-semibold text-gray-900 group-hover:text-brand-green transition-colors">{cat.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{cat.description}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* FAQs */}
      {page.faqs.length > 0 && (
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">FAQs for {page.city}</h2>
          <div className="space-y-3 max-w-3xl">
            {page.faqs.map((faq, i) => (
              <details key={i} className="group border border-gray-100 rounded-xl overflow-hidden">
                <summary className="flex items-center justify-between p-5 cursor-pointer font-medium text-gray-900 hover:text-brand-green transition-colors">
                  {faq.question}
                  <ChevronRight className="w-4 h-4 text-gray-400 group-open:rotate-90 transition-transform shrink-0" />
                </summary>
                <div className="px-5 pb-5 text-sm text-gray-600 leading-relaxed">{faq.answer}</div>
              </details>
            ))}
          </div>
        </section>
      )}

      {/* Nearby Cities */}
      {page.nearby_cities.length > 0 && (
        <section className="mb-16">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Nearby Areas We Serve</h2>
          <div className="flex flex-wrap gap-3">
            {page.nearby_cities.map((city) => (
              <span key={city} className="text-sm bg-gray-50 border border-gray-100 px-4 py-2 rounded-full text-gray-600">
                {city}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
