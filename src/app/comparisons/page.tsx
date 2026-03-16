import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { guides } from "@/data/guides";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

export const metadata: Metadata = {
  title: "Product Comparisons — Make Smarter Choices",
  description: "Compare induction vs LPG, solar vs inverter, smokeless stove vs chulha, and more. Expert comparisons from Solstric.",
};

export default function ComparisonsPage() {
  const comparisonGuides = guides.filter((g) => g.type === "comparison");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6">
      <div className="py-4">
        <Breadcrumbs items={[{ label: "Comparisons" }]} />
      </div>

      <section className="py-8 max-w-3xl">
        <h1 className="text-4xl font-bold text-gray-900">Product Comparisons</h1>
        <p className="text-lg text-gray-500 mt-3">
          Can&apos;t decide between two options? Our expert comparisons break down cost, convenience, safety, and practicality so you can choose with confidence.
        </p>
      </section>

      <section className="pb-16">
        <div className="grid md:grid-cols-2 gap-6">
          {comparisonGuides.map((guide) => (
            <Link
              key={guide.slug}
              href={`/guides/${guide.slug}`}
              className="group bg-white border border-gray-100 rounded-xl p-6 hover:shadow-md hover:border-gray-200 transition-all"
            >
              <span className="text-xs font-semibold text-brand-orange bg-orange-50 px-2.5 py-1 rounded-full">
                Comparison
              </span>
              <h2 className="text-xl font-bold text-gray-900 mt-3 group-hover:text-brand-green transition-colors">
                {guide.title}
              </h2>
              <p className="text-gray-500 mt-2">{guide.excerpt}</p>
              <div className="flex items-center justify-between mt-4">
                <span className="text-xs text-gray-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> {guide.reading_time} min read
                </span>
                <span className="flex items-center gap-1 text-brand-green text-sm font-medium group-hover:underline">
                  Read More <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
