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

function renderInline(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/`(.+?)`/g, '<code class="bg-gray-100 text-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">$1</code>')
    .replace(/(https?:\/\/[^\s<]+)/g, '<a href="$1" target="_blank" rel="noopener noreferrer" class="text-brand-green underline hover:text-green-700">$1</a>');
}

function renderMarkdownContent(content: string) {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;
  let key = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Blank line — skip (spacing handled by element margins)
    if (line.trim() === "") { i++; continue; }

    // Horizontal rule
    if (line.trim() === "---") {
      elements.push(<hr key={key++} className="my-10 border-gray-200" />);
      i++; continue;
    }

    // H2
    if (line.startsWith("## ")) {
      elements.push(<h2 key={key++} className="text-2xl font-bold text-gray-900 mt-10 mb-4">{line.slice(3)}</h2>);
      i++; continue;
    }

    // H3
    if (line.startsWith("### ")) {
      elements.push(<h3 key={key++} className="text-xl font-semibold text-gray-900 mt-8 mb-3">{line.slice(4)}</h3>);
      i++; continue;
    }

    // Unordered list — group consecutive "- " lines
    if (line.startsWith("- ")) {
      const items: string[] = [];
      while (i < lines.length && lines[i].startsWith("- ")) {
        items.push(lines[i].slice(2));
        i++;
      }
      elements.push(
        <ul key={key++} className="list-disc pl-6 my-4 space-y-2">
          {items.map((item, j) => (
            <li key={j} className="text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: renderInline(item) }} />
          ))}
        </ul>
      );
      continue;
    }

    // Ordered list — group consecutive numbered lines
    if (/^\d+\.\s/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i])) {
        items.push(lines[i].replace(/^\d+\.\s/, ""));
        i++;
      }
      elements.push(
        <ol key={key++} className="list-decimal pl-6 my-4 space-y-2">
          {items.map((item, j) => (
            <li key={j} className="text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: renderInline(item) }} />
          ))}
        </ol>
      );
      continue;
    }

    // Table rows — skip header separator, group into table
    if (line.startsWith("|")) {
      const rows: string[] = [];
      while (i < lines.length && lines[i].startsWith("|")) {
        if (!lines[i].match(/^\|[-\s|]+\|$/)) rows.push(lines[i]);
        i++;
      }
      if (rows.length > 0) {
        const headerCells = rows[0].split("|").filter(c => c.trim()).map(c => c.trim());
        const bodyRows = rows.slice(1);
        elements.push(
          <div key={key++} className="overflow-x-auto my-6">
            <table className="w-full text-sm border border-gray-200 rounded-lg">
              <thead className="bg-gray-50">
                <tr>{headerCells.map((c, j) => <th key={j} className="px-4 py-3 text-left font-semibold text-gray-900 border-b border-gray-200">{c}</th>)}</tr>
              </thead>
              <tbody>
                {bodyRows.map((row, ri) => {
                  const cells = row.split("|").filter(c => c.trim()).map(c => c.trim());
                  return <tr key={ri} className="border-b border-gray-100"><td className="px-4 py-2.5 text-gray-600">{cells[0]}</td>{cells.slice(1).map((c, ci) => <td key={ci} className="px-4 py-2.5 text-gray-600">{c}</td>)}</tr>;
                })}
              </tbody>
            </table>
          </div>
        );
      }
      continue;
    }

    // Paragraph
    elements.push(
      <p key={key++} className="text-gray-600 leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: renderInline(line) }} />
    );
    i++;
  }

  return elements;
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
          <div className="max-w-none">
            {renderMarkdownContent(guide.content)}
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
