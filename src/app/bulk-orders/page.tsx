import type { Metadata } from "next";
import Link from "next/link";
import { Package, CheckCircle, MapPin, ArrowRight, ChevronRight, Users, TrendingUp, Truck } from "lucide-react";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import WhatsAppCTA from "@/components/ui/WhatsAppCTA";
import { getDbBulkProducts } from "@/lib/products-db";
import ProductCard from "@/components/product/ProductCard";

export const metadata: Metadata = {
  title: "Bulk Orders & Dealer Program — Become a Solstric Partner",
  description: "Become a Solstric dealer. Bulk kitchen appliances, smokeless stoves & solar products. Starter packs from 10 units. 15-30% margins. WhatsApp to order.",
};

export const dynamic = "force-dynamic";

export default async function BulkOrdersPage() {
  const bulkProducts = await getDbBulkProducts();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6">
      <div className="py-4">
        <Breadcrumbs items={[{ label: "Bulk Orders & Dealer Program" }]} />
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 sm:p-12 mb-12">
        <div className="max-w-2xl">
          <span className="text-brand-orange text-sm font-semibold">For Retailers, Dealers & Resellers</span>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mt-3">
            Start Selling Energy Resilience Products in Your Area
          </h1>
          <p className="text-gray-400 mt-4 text-lg leading-relaxed">
            Get dealer pricing with 15-30% margins, curated starter packs, and WhatsApp-based ordering. Start with as few as 10 units.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            <WhatsAppCTA
              message="Hi, I'm a retailer interested in Solstric's dealer program. Please share details about starter packs and pricing."
              label="Contact Sales on WhatsApp"
              size="lg"
            />
          </div>
        </div>
      </section>

      {/* Why Partner */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Why Partner with Solstric?</h2>
        <div className="grid md:grid-cols-4 gap-6">
          {[
            { icon: <TrendingUp className="w-6 h-6 text-brand-green" />, title: "15-30% Margins", desc: "Competitive dealer pricing with healthy margins on every product" },
            { icon: <Package className="w-6 h-6 text-brand-green" />, title: "Low MOQ", desc: "Start with 10-15 mixed units — no need for large capital commitment" },
            { icon: <Truck className="w-6 h-6 text-brand-green" />, title: "Delivery Support", desc: "We handle logistics to Delhi NCR and major MP districts" },
            { icon: <Users className="w-6 h-6 text-brand-green" />, title: "Sales Support", desc: "Product knowledge, marketing material, and WhatsApp guidance" },
          ].map((item, i) => (
            <div key={i} className="bg-white border border-gray-100 rounded-xl p-5">
              <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center mb-4">{item.icon}</div>
              <h3 className="font-semibold text-gray-900">{item.title}</h3>
              <p className="text-sm text-gray-500 mt-1.5">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Bulk Products */}
      {bulkProducts.length > 0 && (
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Products Available for Bulk</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {bulkProducts.map((p) => (
              <ProductCard key={p.product_id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* MOQ & Pricing */}
      <section className="bg-gray-50 rounded-xl p-8 mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Pricing Model</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { tier: "Starter", moq: "10-25 units", margin: "15-20%", desc: "Perfect for market testing and new retailers" },
            { tier: "Growth", moq: "25-100 units", margin: "20-25%", desc: "Established retailers scaling up" },
            { tier: "Distribution", moq: "100+ units", margin: "25-30%", desc: "District-level dealers and distributors" },
          ].map((tier, i) => (
            <div key={i} className="bg-white rounded-xl p-6 border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900">{tier.tier}</h3>
              <p className="text-brand-green font-bold text-2xl mt-2">{tier.margin}</p>
              <p className="text-sm text-gray-500 mt-1">Margin</p>
              <p className="text-sm text-gray-600 mt-3">MOQ: {tier.moq}</p>
              <p className="text-sm text-gray-400 mt-2">{tier.desc}</p>
            </div>
          ))}
        </div>
        <p className="text-sm text-gray-500 mt-6">
          * Exact pricing depends on product mix and order volume. Contact our sales team for a custom quote.
        </p>
      </section>

      {/* Who Can Be a Dealer */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Who Can Become a Dealer?</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            "Appliance shops and electronics retailers",
            "General stores in semi-urban and rural areas",
            "Kitchen and cookware shops",
            "Solar and electrical product dealers",
            "Village-level entrepreneurs and self-help groups",
            "Online sellers and social commerce operators",
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-brand-green shrink-0 mt-0.5" />
              <p className="text-gray-700">{item}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Coverage Areas */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Current Coverage Areas</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {["Delhi NCR", "Bhopal", "Rewa", "Jabalpur", "Satna", "Sagar", "Indore (coming soon)", "Lucknow (coming soon)"].map((city) => (
            <div key={city} className="bg-white border border-gray-100 rounded-xl p-4 text-center">
              <MapPin className="w-4 h-4 text-brand-green mx-auto mb-1.5" />
              <p className="text-sm font-medium text-gray-900">{city}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-brand-green rounded-xl p-8 mb-16 text-white">
        <h2 className="text-2xl font-bold mb-8 text-center">How to Start</h2>
        <div className="grid md:grid-cols-4 gap-6">
          {[
            { step: "1", title: "Contact Us", desc: "Reach out on WhatsApp with your location and shop details" },
            { step: "2", title: "Choose a Pack", desc: "Select a starter pack or customize your product mix" },
            { step: "3", title: "Get Pricing", desc: "We share dealer pricing based on your order volume" },
            { step: "4", title: "Start Selling", desc: "Receive products and start selling with our support" },
          ].map((item) => (
            <div key={item.step} className="text-center">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 font-bold text-lg">
                {item.step}
              </div>
              <h3 className="font-semibold">{item.title}</h3>
              <p className="text-sm text-green-100 mt-1.5">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900">Ready to Start?</h2>
        <p className="text-gray-500 mt-2 mb-6">Talk to our sales team on WhatsApp. We&apos;ll help you pick the right pack for your market.</p>
        <WhatsAppCTA
          message="Hi, I'm interested in becoming a Solstric dealer. My location is [your city]. Please share dealer program details."
          label="Contact Sales Team"
          size="lg"
        />
      </section>
    </div>
  );
}
