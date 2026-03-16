import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle, Users, MapPin, Package, Zap, MessageCircle, ArrowRight } from "lucide-react";
import WhatsAppCTA from "@/components/ui/WhatsAppCTA";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

export const metadata: Metadata = {
  title: "About Solstric — Our Mission & Story",
  description: "Solstric brings alternative cooking and energy resilience products to Delhi NCR and Madhya Pradesh. Trusted brands, WhatsApp ordering, local delivery.",
};

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6">
      <div className="py-4">
        <Breadcrumbs items={[{ label: "About Us" }]} />
      </div>

      {/* Hero */}
      <section className="max-w-3xl py-8">
        <h1 className="text-4xl font-bold text-gray-900">About Solstric</h1>
        <p className="text-xl text-gray-500 mt-4 leading-relaxed">
          We&apos;re building India&apos;s most practical marketplace for alternative cooking and energy resilience products.
        </p>
      </section>

      {/* Story */}
      <section className="max-w-3xl pb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Why We Exist</h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            India faces a quiet but growing challenge — LPG uncertainty, rising fuel costs, unreliable power supply in smaller cities, and millions of households still cooking over smoky chulhas. These aren&apos;t abstract problems. They affect daily meals, small businesses, and family health.
          </p>
          <p>
            Solstric was started to address this gap. We curate the most practical, affordable, and trusted products for alternative cooking and energy resilience — induction cooktops, electric rice cookers, smokeless stoves, solar systems, portable power stations, and complete kitchen kits.
          </p>
          <p>
            We serve homes, PGs, hostels, food stalls, villages, and retailers across Delhi NCR and Madhya Pradesh. Our ordering is simple — find your product, talk to us on WhatsApp, and we handle the rest.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="py-12 border-t border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">What We Stand For</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: <CheckCircle className="w-6 h-6 text-brand-green" />, title: "Curated Quality", desc: "Every product is from a trusted brand — Prestige, Philips, Hawkins, Panasonic, Greenway, Luminous, Loom Solar. No random imports, no unknown brands." },
            { icon: <Users className="w-6 h-6 text-brand-green" />, title: "Human Support", desc: "We believe in real conversations. Our team is available on WhatsApp to help you choose the right product, answer questions, and confirm orders." },
            { icon: <MapPin className="w-6 h-6 text-brand-green" />, title: "Local First", desc: "We focus on Delhi NCR and Madhya Pradesh because we understand local needs — from Delhi apartments to Rewa villages. Local delivery, local knowledge." },
          ].map((item, i) => (
            <div key={i}>
              <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center mb-4">
                {item.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
              <p className="text-gray-600 mt-2 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Regions */}
      <section className="py-12 border-t border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Where We Serve</h2>
        <p className="text-gray-600 mb-6">We currently deliver to and support customers in:</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {["Delhi NCR", "Bhopal", "Rewa", "Jabalpur", "Satna", "MP Districts"].map((city) => (
            <div key={city} className="bg-gray-50 rounded-xl p-4 text-center">
              <MapPin className="w-5 h-5 text-brand-green mx-auto mb-2" />
              <p className="font-medium text-gray-900">{city}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Retailer CTA */}
      <section className="py-12 border-t border-gray-100">
        <div className="bg-gray-900 rounded-2xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl font-bold text-white">Become a Solstric Dealer</h2>
            <p className="text-gray-400 mt-2">Start selling energy resilience products in your area. Dealer margins, starter packs, and sales support included.</p>
          </div>
          <Link href="/bulk-orders" className="flex items-center gap-2 bg-brand-orange text-white font-semibold px-6 py-3 rounded-lg hover:bg-brand-orange-dark transition-colors shrink-0">
            Explore Dealer Program <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-12 text-center">
        <h2 className="text-2xl font-bold text-gray-900">Have Questions?</h2>
        <p className="text-gray-500 mt-2 mb-6">Reach out to us anytime on WhatsApp. We&apos;re here to help.</p>
        <WhatsAppCTA message="Hi, I have a question about Solstric." label="Chat with Us" size="lg" />
      </section>
    </div>
  );
}
