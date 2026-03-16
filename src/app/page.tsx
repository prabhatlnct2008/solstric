import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Flame,
  Sun,
  TreePine,
  Store,
  Package,
  Shield,
  Truck,
  MessageCircle,
  Phone,
  Star,
  CheckCircle,
  Zap,
  Home,
  Users,
  MapPin,
  ChevronRight,
} from "lucide-react";
import { categories } from "@/data/categories";
import { getDbHomepageProducts, getDbFeaturedProducts } from "@/lib/products-db";
import ProductCard from "@/components/product/ProductCard";
import WhatsAppCTA from "@/components/ui/WhatsAppCTA";

const iconMap: Record<string, React.ReactNode> = {
  Flame: <Flame className="w-6 h-6" />,
  Sun: <Sun className="w-6 h-6" />,
  TreePine: <TreePine className="w-6 h-6" />,
  Store: <Store className="w-6 h-6" />,
  Package: <Package className="w-6 h-6" />,
};

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const homepageProducts = await getDbHomepageProducts();
  const featuredProducts = await getDbFeaturedProducts();

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-brand-charcoal overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/hero-kitchen.jpg')] bg-cover bg-center opacity-20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24 lg:py-32">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-brand-green/10 border border-brand-green/20 text-brand-green text-sm font-medium px-4 py-1.5 rounded-full mb-6">
              <Zap className="w-4 h-4" />
              Alternative Kitchens & Energy Resilience
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Cook Smarter.{" "}
              <span className="text-brand-orange">Power Up.</span>
            </h1>
            <p className="text-lg text-gray-300 mt-6 leading-relaxed max-w-xl">
              Induction cooktops, smokeless stoves, solar systems & portable power stations — curated for Delhi, NCR, and Madhya Pradesh. Order directly on WhatsApp.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <Link
                href="#products"
                className="inline-flex items-center justify-center gap-2 bg-brand-green text-white font-semibold px-6 py-3.5 rounded-lg hover:bg-brand-green-dark transition-colors text-base"
              >
                Explore Products <ChevronRight className="w-4 h-4" />
              </Link>
              <Link
                href="/bulk-orders"
                className="inline-flex items-center justify-center gap-2 border-2 border-white/20 text-white font-semibold px-6 py-3.5 rounded-lg hover:bg-white/10 transition-colors text-base"
              >
                Bulk & Dealer Orders
              </Link>
              <WhatsAppCTA
                message="Hi, I'd like to explore Solstric products."
                label="Chat with Us"
                variant="outline"
                size="lg"
                className="border-brand-green/40 text-brand-green hover:bg-brand-green hover:text-white"
              />
            </div>

            {/* Quick Category Chips */}
            <div className="flex flex-wrap gap-2 mt-8">
              {categories.slice(0, 4).map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/category/${cat.slug}`}
                  className="text-xs text-gray-400 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full hover:bg-white/10 hover:text-white transition-colors"
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Problem-Solution Strip */}
      <section className="bg-brand-warm border-y border-amber-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: <Flame className="w-5 h-5 text-orange-500" />, problem: "LPG uncertainty?", solution: "Switch to electric cooking" },
              { icon: <Zap className="w-5 h-5 text-blue-500" />, problem: "Power cuts?", solution: "Solar & portable backup" },
              { icon: <TreePine className="w-5 h-5 text-green-600" />, problem: "Smoky chulha?", solution: "Smokeless stove tech" },
              { icon: <Store className="w-5 h-5 text-purple-500" />, problem: "Stall fuel costs?", solution: "Induction kits for vendors" },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="p-2 bg-white rounded-lg shadow-sm shrink-0">{item.icon}</div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{item.problem}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{item.solution}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900">Shop by Category</h2>
          <p className="text-gray-500 mt-2">Products curated for real Indian cooking and power needs</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className="group relative bg-white rounded-xl border border-gray-100 hover:border-gray-200 p-6 text-center hover:shadow-lg transition-all duration-300"
            >
              <div
                className="w-14 h-14 mx-auto rounded-xl flex items-center justify-center mb-4 transition-colors duration-300"
                style={{ backgroundColor: `${cat.color}15`, color: cat.color }}
              >
                {iconMap[cat.icon]}
              </div>
              <h3 className="text-sm font-semibold text-gray-900 group-hover:text-brand-green transition-colors">
                {cat.name}
              </h3>
              <p className="text-xs text-gray-400 mt-1 line-clamp-2">{cat.subcategories.length} types</p>
              <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-brand-green mx-auto mt-3 transition-colors" />
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section id="products" className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Featured Products</h2>
              <p className="text-gray-500 mt-2">Handpicked for quality, value, and reliability</p>
            </div>
            <Link href="/category/alternative-cooking" className="hidden sm:flex items-center gap-1 text-brand-green font-medium text-sm hover:underline">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {homepageProducts.slice(0, 8).map((product) => (
              <ProductCard key={product.product_id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Shop by Use Case */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900">Shop by Use Case</h2>
          <p className="text-gray-500 mt-2">Find the right solution for your specific need</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { icon: <Home className="w-6 h-6" />, title: "Home Backup Kitchen", desc: "Electric cooking when LPG runs out", href: "/category/alternative-cooking", color: "#F59E0B" },
            { icon: <Store className="w-6 h-6" />, title: "Food Stall Setup", desc: "Induction kits for vendors", href: "/category/commercial-stall-solutions", color: "#8B5CF6" },
            { icon: <Users className="w-6 h-6" />, title: "PG / Hostel Kitchen", desc: "Bulk cooking made electric", href: "/category/commercial-stall-solutions", color: "#3B82F6" },
            { icon: <TreePine className="w-6 h-6" />, title: "Village Home", desc: "Smokeless stoves & hybrid kits", href: "/category/village-hybrid-kitchen", color: "#10B981" },
            { icon: <Package className="w-6 h-6" />, title: "Retailer / Dealer", desc: "Bulk packs with dealer margins", href: "/bulk-orders", color: "#EF4444" },
            { icon: <Sun className="w-6 h-6" />, title: "Solar & Power Backup", desc: "Keep your home & shop running", href: "/category/solar-power-backup", color: "#0EA5E9" },
          ].map((item, i) => (
            <Link
              key={i}
              href={item.href}
              className="group flex items-start gap-4 bg-white rounded-xl border border-gray-100 hover:border-gray-200 p-5 hover:shadow-md transition-all"
            >
              <div className="p-3 rounded-xl shrink-0" style={{ backgroundColor: `${item.color}10`, color: item.color }}>
                {item.icon}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 group-hover:text-brand-green transition-colors">{item.title}</h3>
                <p className="text-sm text-gray-500 mt-0.5">{item.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* City / Location Blocks */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900">We Deliver Across</h2>
            <p className="text-gray-500 mt-2">Local delivery, expert guidance, and WhatsApp support in your city</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { city: "Delhi", slug: "delhi", products: "All categories" },
              { city: "NCR", slug: "delhi", products: "All categories" },
              { city: "Bhopal", slug: "bhopal", products: "Cooking & Solar" },
              { city: "Rewa", slug: "rewa", products: "Village & Dealer" },
              { city: "Jabalpur", slug: "jabalpur", products: "Solar & Cooking" },
              { city: "Satna", slug: "satna", products: "Village & Dealer" },
            ].map((city) => (
              <Link
                key={city.city}
                href={`/${city.slug}/backup-kitchen-products`}
                className="group bg-white rounded-xl border border-gray-100 p-4 text-center hover:shadow-md hover:border-gray-200 transition-all"
              >
                <MapPin className="w-5 h-5 text-brand-green mx-auto mb-2" />
                <p className="font-semibold text-gray-900 group-hover:text-brand-green transition-colors">{city.city}</p>
                <p className="text-xs text-gray-400 mt-1">{city.products}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900">Why Choose Solstric?</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: <CheckCircle className="w-6 h-6 text-brand-green" />, title: "Curated Products", desc: "Every product is tested and selected for real Indian needs" },
            { icon: <MessageCircle className="w-6 h-6 text-brand-green" />, title: "WhatsApp Support", desc: "Order, ask questions, and get expert advice — all on WhatsApp" },
            { icon: <Truck className="w-6 h-6 text-brand-green" />, title: "Delhi & MP Delivery", desc: "Fast delivery across Delhi NCR and Madhya Pradesh districts" },
            { icon: <Shield className="w-6 h-6 text-brand-green" />, title: "Trusted Brands", desc: "Prestige, Philips, Hawkins, Greenway, Luminous, Loom Solar" },
          ].map((item, i) => (
            <div key={i} className="text-center">
              <div className="w-14 h-14 bg-green-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                {item.icon}
              </div>
              <h3 className="font-semibold text-gray-900">{item.title}</h3>
              <p className="text-sm text-gray-500 mt-1.5 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How Ordering Works */}
      <section className="bg-brand-green text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold">How Ordering Works</h2>
            <p className="text-green-100 mt-2">Simple, transparent, and human</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { step: "1", title: "Browse Products", desc: "Explore categories and find what fits your need" },
              { step: "2", title: "Chat on WhatsApp", desc: "Tap the order button — it opens WhatsApp with your product details pre-filled" },
              { step: "3", title: "Confirm Order", desc: "Our team confirms price, stock, and delivery timeline" },
              { step: "4", title: "Get Delivered", desc: "Products delivered to your door in Delhi NCR and MP" },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 font-bold text-lg">
                  {item.step}
                </div>
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-sm text-green-100 mt-1.5 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Retailer Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-brand-orange text-sm font-semibold">For Retailers & Dealers</span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white mt-2">Start Selling Energy Resilience Products</h3>
            <p className="text-gray-400 mt-2 max-w-lg">
              Get dealer pricing, starter packs, and sales support. Start with as few as 10 units. We serve Delhi NCR, Bhopal, Rewa, Jabalpur and more.
            </p>
          </div>
          <div className="flex flex-col gap-3 shrink-0">
            <Link
              href="/bulk-orders"
              className="inline-flex items-center justify-center gap-2 bg-brand-orange text-white font-semibold px-6 py-3 rounded-lg hover:bg-brand-orange-dark transition-colors"
            >
              Explore Dealer Packs <ArrowRight className="w-4 h-4" />
            </Link>
            <WhatsAppCTA
              message="Hi, I'm a retailer and interested in dealer packs and bulk pricing."
              label="WhatsApp Sales Team"
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10"
            />
          </div>
        </div>
      </section>

      {/* Expert Content / Guides */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Expert Guides</h2>
              <p className="text-gray-500 mt-2">Make smarter buying decisions with our detailed guides</p>
            </div>
            <Link href="/guides" className="hidden sm:flex items-center gap-1 text-brand-green font-medium text-sm hover:underline">
              All Guides <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Induction vs LPG for Delhi Homes", slug: "induction-vs-lpg-for-delhi-homes", category: "Comparison", reading: "8 min" },
              { title: "Solar vs Inverter for Small Shops", slug: "solar-vs-inverter-for-small-shops", category: "Comparison", reading: "10 min" },
              { title: "Smokeless Stove vs Traditional Chulha", slug: "smokeless-stove-vs-traditional-chulha", category: "Guide", reading: "7 min" },
            ].map((guide) => (
              <Link
                key={guide.slug}
                href={`/guides/${guide.slug}`}
                className="group bg-white rounded-xl border border-gray-100 hover:border-gray-200 p-6 hover:shadow-md transition-all"
              >
                <span className="text-xs font-semibold text-brand-green bg-green-50 px-2.5 py-1 rounded-full">
                  {guide.category}
                </span>
                <h3 className="text-lg font-semibold text-gray-900 mt-3 group-hover:text-brand-green transition-colors">
                  {guide.title}
                </h3>
                <p className="text-sm text-gray-400 mt-2">{guide.reading} read</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Summary */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900">Frequently Asked Questions</h2>
        </div>
        <div className="max-w-3xl mx-auto space-y-4">
          {[
            { q: "How does ordering on WhatsApp work?", a: "Simply click the 'Order on WhatsApp' button on any product. It opens a WhatsApp chat with your product details pre-filled. Our team confirms availability, price, and delivery — then processes your order." },
            { q: "Do you deliver outside Delhi?", a: "Yes! We deliver across Delhi NCR and major cities in Madhya Pradesh including Bhopal, Rewa, Jabalpur, and Satna. For other locations, reach out on WhatsApp and we'll work out delivery." },
            { q: "Can I buy in bulk for my shop or dealership?", a: "Absolutely. We offer dealer pricing with 15-30% margins, starter packs from 10 units, and district distribution packs. Visit our Bulk Orders page or message us on WhatsApp." },
            { q: "Are these products genuine and with warranty?", a: "Yes. All products are sourced from authorized channels. Prestige, Philips, Hawkins, Panasonic, Greenway, Luminous, and Loom Solar — all come with manufacturer warranty." },
          ].map((faq, i) => (
            <details
              key={i}
              className="group bg-white border border-gray-100 rounded-xl overflow-hidden"
            >
              <summary className="flex items-center justify-between p-5 cursor-pointer font-semibold text-gray-900 hover:text-brand-green transition-colors">
                {faq.q}
                <ChevronRight className="w-4 h-4 text-gray-400 group-open:rotate-90 transition-transform shrink-0" />
              </summary>
              <div className="px-5 pb-5 text-sm text-gray-600 leading-relaxed">
                {faq.a}
              </div>
            </details>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link href="/faq" className="text-brand-green font-medium text-sm hover:underline">
            View all FAQs →
          </Link>
        </div>
      </section>
    </>
  );
}
