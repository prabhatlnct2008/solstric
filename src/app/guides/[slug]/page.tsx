import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { Clock, ArrowLeft, ChevronRight } from "lucide-react";
import { guides, getGuideBySlug } from "@/data/guides";
import { getDbProductById } from "@/lib/products-db";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

export const dynamic = "force-dynamic";
import WhatsAppCTA from "@/components/ui/WhatsAppCTA";
import ProductCard from "@/components/product/ProductCard";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) return {};
  return {
    title: guide.seo_title,
    description: guide.seo_meta_description,
    openGraph: { title: guide.seo_title, description: guide.seo_meta_description },
  };
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) notFound();

  const relatedResults = await Promise.all(
    guide.related_product_ids.map((id) => getDbProductById(id))
  );
  const relatedProducts = relatedResults.filter(Boolean);

  const relatedGuides = guide.related_guide_slugs
    .map((s) => getGuideBySlug(s))
    .filter(Boolean);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.excerpt,
    author: { "@type": "Person", name: guide.author },
    datePublished: guide.published_date,
    publisher: { "@type": "Organization", name: "Solstric" },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="py-4">
          <Breadcrumbs items={[{ label: "Guides", href: "/guides" }, { label: guide.title }]} />
        </div>

        <article className="max-w-3xl mx-auto pb-16">
          {/* Header */}
          <header className="mb-8">
            <span className="text-xs font-semibold text-brand-green bg-green-50 px-2.5 py-1 rounded-full">
              {guide.category}
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-4 leading-tight">
              {guide.title}
            </h1>
            <p className="text-lg text-gray-500 mt-3">{guide.excerpt}</p>
            <div className="flex items-center gap-4 mt-4 text-sm text-gray-400">
              <span>By {guide.author}</span>
              <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{guide.reading_time} min read</span>
              <span>{new Date(guide.published_date).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}</span>
            </div>
          </header>

          {/* Content */}
          <div className="prose prose-gray prose-headings:text-gray-900 prose-a:text-brand-green max-w-none">
            {guide.content.split("\n").map((line, i) => {
              if (line.startsWith("## ")) return <h2 key={i} className="text-2xl font-bold text-gray-900 mt-8 mb-4">{line.replace("## ", "")}</h2>;
              if (line.startsWith("### ")) return <h3 key={i} className="text-lg font-semibold text-gray-900 mt-6 mb-3">{line.replace("### ", "")}</h3>;
              if (line.startsWith("- ")) return <li key={i} className="text-gray-600 ml-4">{line.replace("- ", "")}</li>;
              if (line.startsWith("**") && line.endsWith("**")) return <p key={i} className="font-semibold text-gray-900 mt-4">{line.replace(/\*\*/g, "")}</p>;
              if (line.startsWith("|")) return null; // Skip table formatting for now
              if (line.trim() === "") return <br key={i} />;
              return <p key={i} className="text-gray-600 leading-relaxed mb-3">{line}</p>;
            })}
          </div>

          {/* Mid-article CTA */}
          <div className="bg-green-50 rounded-xl p-6 my-8">
            <p className="font-semibold text-gray-900 mb-3">Need help choosing the right product?</p>
            <WhatsAppCTA
              message={`Hi, I just read your guide on "${guide.title}" and need help choosing the right product.`}
              label="Talk to an Expert on WhatsApp"
            />
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <section className="mt-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Recommended Products</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {relatedProducts.map((p) => p && <ProductCard key={p.product_id} product={p} />)}
              </div>
            </section>
          )}

          {/* Related Guides */}
          {relatedGuides.length > 0 && (
            <section className="mt-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Guides</h2>
              <div className="space-y-3">
                {relatedGuides.map((g) => g && (
                  <Link
                    key={g.slug}
                    href={`/guides/${g.slug}`}
                    className="block bg-white border border-gray-100 rounded-xl p-4 hover:shadow-md transition-all"
                  >
                    <h3 className="font-semibold text-gray-900 hover:text-brand-green transition-colors">{g.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">{g.reading_time} min read</p>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </article>
      </div>
    </>
  );
}
