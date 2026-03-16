import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { MessageCircle, Filter, ArrowRight, ChevronRight } from "lucide-react";
import { categories, getCategoryBySlug } from "@/data/categories";
import { getProductsByCategory } from "@/data/products";
import ProductCard from "@/components/product/ProductCard";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import WhatsAppCTA from "@/components/ui/WhatsAppCTA";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return categories.map((cat) => ({ slug: cat.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return {};
  return {
    title: category.seo_title,
    description: category.seo_meta_description,
    openGraph: {
      title: category.seo_title,
      description: category.seo_meta_description,
    },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const products = getProductsByCategory(slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: category.name,
    description: category.description,
    numberOfItems: products.length,
    itemListElement: products.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: p.product_name,
      url: `https://solstric.in/category/${slug}/${p.slug}`,
    })),
  };

  const faqJsonLd = category.faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: category.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  } : null;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {faqJsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />}

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Breadcrumbs */}
        <div className="py-4">
          <Breadcrumbs items={[{ label: category.name }]} />
        </div>

        {/* Category Hero */}
        <section className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 sm:p-12 mb-10" style={{ background: `linear-gradient(135deg, ${category.color}15, ${category.color}05)` }}>
          <div className="max-w-2xl">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">{category.name}</h1>
            <p className="text-gray-600 mt-3 text-lg leading-relaxed">{category.description}</p>
            <div className="flex flex-wrap gap-2 mt-4">
              {category.subcategories.map((sub) => (
                <span key={sub.slug} className="text-xs bg-white border border-gray-200 px-3 py-1.5 rounded-full text-gray-600">
                  {sub.name}
                </span>
              ))}
            </div>
            <div className="mt-6">
              <WhatsAppCTA
                message={`Hi, I'm looking for products in the ${category.name} category. Please help me choose.`}
                label="Ask Expert on WhatsApp"
              />
            </div>
          </div>
        </section>

        {/* Product Count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-gray-500">
            <span className="font-semibold text-gray-900">{products.length}</span> products
          </p>
        </div>

        {/* Product Grid */}
        <section className="mb-16">
          {products.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {products.map((product) => (
                <ProductCard key={product.product_id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-gray-50 rounded-xl">
              <p className="text-gray-500 mb-4">Products coming soon in this category.</p>
              <WhatsAppCTA
                message={`Hi, I'm looking for ${category.name} products. Please let me know what's available.`}
                label="Ask on WhatsApp"
              />
            </div>
          )}
        </section>

        {/* Category Content */}
        <section className="max-w-3xl mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">About {category.name}</h2>
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-600 leading-relaxed">{category.long_description}</p>
          </div>
        </section>

        {/* Buying Guide */}
        {category.buying_guide && (
          <section className="bg-green-50 rounded-xl p-6 sm:p-8 mb-16">
            <h2 className="text-xl font-bold text-gray-900 mb-3">Buying Guide</h2>
            <p className="text-gray-600 leading-relaxed">{category.buying_guide}</p>
            <div className="mt-4">
              <WhatsAppCTA
                message={`Hi, I need help choosing the right ${category.name} product. Can you guide me?`}
                label="Get Personalized Advice"
                variant="primary"
                size="sm"
              />
            </div>
          </section>
        )}

        {/* FAQs */}
        {category.faqs.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-3">
              {category.faqs.map((faq, i) => (
                <details key={i} className="group bg-white border border-gray-100 rounded-xl overflow-hidden">
                  <summary className="flex items-center justify-between p-5 cursor-pointer font-semibold text-gray-900 hover:text-brand-green transition-colors">
                    {faq.question}
                    <ChevronRight className="w-4 h-4 text-gray-400 group-open:rotate-90 transition-transform shrink-0" />
                  </summary>
                  <div className="px-5 pb-5 text-sm text-gray-600 leading-relaxed">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </section>
        )}

        {/* Related Categories */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Explore Other Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories
              .filter((c) => c.slug !== slug)
              .map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/category/${cat.slug}`}
                  className="group bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md hover:border-gray-200 transition-all"
                >
                  <h3 className="font-semibold text-gray-900 group-hover:text-brand-green transition-colors">{cat.name}</h3>
                  <p className="text-xs text-gray-400 mt-1">{cat.subcategories.length} subcategories</p>
                </Link>
              ))}
          </div>
        </section>
      </div>
    </>
  );
}
