import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, Clock } from "lucide-react";
import { guides } from "@/data/guides";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

export const metadata: Metadata = {
  title: "Guides & Blog — Expert Buying Advice",
  description: "Expert guides on induction vs LPG, solar vs inverter, smokeless stoves, and more. Make smarter buying decisions with Solstric.",
};

export default function GuidesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6">
      <div className="py-4">
        <Breadcrumbs items={[{ label: "Guides & Blog" }]} />
      </div>

      <section className="py-8 max-w-3xl">
        <h1 className="text-4xl font-bold text-gray-900">Guides & Blog</h1>
        <p className="text-lg text-gray-500 mt-3">
          Expert comparisons, buying guides, and practical advice to help you make the right choice for your kitchen and power backup needs.
        </p>
      </section>

      {/* Featured Guide */}
      {guides.length > 0 && (
        <Link
          href={`/guides/${guides[0].slug}`}
          className="block bg-gradient-to-r from-green-50 to-white border border-green-100 rounded-2xl p-8 mb-10 group hover:shadow-md transition-all"
        >
          <span className="text-xs font-semibold text-brand-green bg-green-100 px-2.5 py-1 rounded-full">
            Featured Guide
          </span>
          <h2 className="text-2xl font-bold text-gray-900 mt-3 group-hover:text-brand-green transition-colors">
            {guides[0].title}
          </h2>
          <p className="text-gray-500 mt-2 max-w-2xl">{guides[0].excerpt}</p>
          <div className="flex items-center gap-4 mt-4 text-sm text-gray-400">
            <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{guides[0].reading_time} min read</span>
            <span>{guides[0].category}</span>
          </div>
        </Link>
      )}

      {/* All Guides */}
      <section className="pb-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {guides.map((guide) => (
            <Link
              key={guide.slug}
              href={`/guides/${guide.slug}`}
              className="group bg-white border border-gray-100 rounded-xl p-6 hover:shadow-md hover:border-gray-200 transition-all"
            >
              <span className="text-xs font-semibold text-brand-green bg-green-50 px-2.5 py-1 rounded-full">
                {guide.category}
              </span>
              <h3 className="text-lg font-semibold text-gray-900 mt-3 group-hover:text-brand-green transition-colors leading-snug">
                {guide.title}
              </h3>
              <p className="text-sm text-gray-500 mt-2 line-clamp-2">{guide.excerpt}</p>
              <div className="flex items-center justify-between mt-4">
                <span className="text-xs text-gray-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> {guide.reading_time} min read
                </span>
                <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-brand-green transition-colors" />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
