import type { Metadata } from "next";
import { MessageCircle, Phone, Mail, MapPin, Clock } from "lucide-react";
import { siteConfig, getWhatsAppLink } from "@/data/site-config";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import WhatsAppCTA from "@/components/ui/WhatsAppCTA";

export const metadata: Metadata = {
  title: "Contact Solstric — WhatsApp, Phone & Email",
  description: "Contact Solstric for product enquiries, bulk orders, and support. WhatsApp ordering, phone support, email — we respond within hours.",
};

export default function ContactPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6">
      <div className="py-4">
        <Breadcrumbs items={[{ label: "Contact" }]} />
      </div>

      <section className="py-8 max-w-3xl">
        <h1 className="text-4xl font-bold text-gray-900">Contact Us</h1>
        <p className="text-lg text-gray-500 mt-3">
          Have a question, need help choosing a product, or want to place an order? Reach out — we respond quickly.
        </p>
      </section>

      <div className="grid md:grid-cols-2 gap-8 pb-16">
        {/* Contact Methods */}
        <div className="space-y-6">
          <div className="bg-brand-green/5 border border-brand-green/10 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <MessageCircle className="w-6 h-6 text-brand-green" />
              <h2 className="text-lg font-semibold text-gray-900">WhatsApp (Fastest)</h2>
            </div>
            <p className="text-gray-600 text-sm mb-4">Our preferred and fastest communication channel. Get product info, place orders, and track delivery.</p>
            <WhatsAppCTA message="Hi, I'd like to get in touch with Solstric." label="Open WhatsApp Chat" fullWidth />
          </div>

          <div className="bg-white border border-gray-100 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <Phone className="w-6 h-6 text-blue-500" />
              <h2 className="text-lg font-semibold text-gray-900">Phone</h2>
            </div>
            <p className="text-gray-600 text-sm mb-2">Call us for urgent queries or order follow-ups.</p>
            <a href={`tel:${siteConfig.phone_number}`} className="text-blue-600 font-semibold text-lg hover:underline">
              {siteConfig.phone_number}
            </a>
          </div>

          <div className="bg-white border border-gray-100 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <Mail className="w-6 h-6 text-purple-500" />
              <h2 className="text-lg font-semibold text-gray-900">Email</h2>
            </div>
            <p className="text-gray-600 text-sm mb-2">For detailed enquiries, dealer applications, and documentation.</p>
            <a href={`mailto:${siteConfig.email}`} className="text-purple-600 font-semibold hover:underline">
              {siteConfig.email}
            </a>
          </div>

          <div className="bg-white border border-gray-100 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <Clock className="w-6 h-6 text-orange-500" />
              <h2 className="text-lg font-semibold text-gray-900">Business Hours</h2>
            </div>
            <p className="text-gray-600 text-sm">Monday – Saturday: 9:00 AM – 7:00 PM</p>
            <p className="text-gray-600 text-sm">Sunday: 10:00 AM – 4:00 PM (WhatsApp only)</p>
          </div>
        </div>

        {/* Contact Blocks */}
        <div className="space-y-6">
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Enquiry Types</h3>
            <div className="space-y-4">
              {[
                { title: "Product Enquiry", desc: "Help choosing the right product for your need", whatsapp: "Hi, I need help choosing a product." },
                { title: "Bulk / Dealer Order", desc: "MOQ, pricing, and dealer pack details", whatsapp: "Hi, I'm interested in bulk/dealer ordering." },
                { title: "After-Sales Support", desc: "Delivery status, warranty, returns", whatsapp: "Hi, I need after-sales support for my order." },
                { title: "Partnership / Business", desc: "Distribution, collaboration, and business opportunities", whatsapp: "Hi, I'd like to discuss a business partnership." },
              ].map((item, i) => (
                <div key={i} className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-medium text-gray-900">{item.title}</p>
                    <p className="text-sm text-gray-500">{item.desc}</p>
                  </div>
                  <WhatsAppCTA message={item.whatsapp} label="Chat" variant="minimal" size="sm" />
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <MapPin className="w-5 h-5 text-brand-green" />
              <h3 className="text-lg font-semibold text-gray-900">Service Areas</h3>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              We deliver across Delhi NCR (Delhi, Noida, Gurgaon, Faridabad, Ghaziabad) and key cities in Madhya Pradesh (Bhopal, Rewa, Jabalpur, Satna, Sagar). For other locations, contact us on WhatsApp for delivery feasibility.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
