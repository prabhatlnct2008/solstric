import type { Metadata } from "next";
import { ChevronRight } from "lucide-react";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import WhatsAppCTA from "@/components/ui/WhatsAppCTA";

export const metadata: Metadata = {
  title: "FAQ — Frequently Asked Questions",
  description: "Answers to common questions about ordering, delivery, WhatsApp ordering, bulk orders, returns, warranty, and more at Solstric.",
};

const faqSections = [
  {
    title: "Ordering",
    faqs: [
      { q: "How do I place an order?", a: "Click the 'Order on WhatsApp' button on any product page. It opens WhatsApp with your product details pre-filled. Our team will confirm availability, price, and delivery — then process your order." },
      { q: "Is there a minimum order value?", a: "No minimum order for retail purchases. For bulk/dealer orders, minimum order quantities start at 10 units depending on the product." },
      { q: "Can I order multiple products together?", a: "Yes! Just tell our WhatsApp team everything you need and we'll bundle it into a single order with combined delivery." },
    ],
  },
  {
    title: "WhatsApp Ordering",
    faqs: [
      { q: "Why WhatsApp ordering?", a: "WhatsApp allows personal, real-time communication. You can ask questions, negotiate for bulk, confirm stock, and get delivery updates — all in one chat. It's faster and more flexible than a traditional checkout." },
      { q: "Is WhatsApp ordering safe?", a: "Yes. You're chatting directly with our verified business number. We confirm every order detail before processing. Payment is handled through standard methods — UPI, bank transfer, or COD where available." },
      { q: "Can I order without WhatsApp?", a: "Yes, you can also call us directly or email us. WhatsApp is our fastest channel, but we accommodate all communication preferences." },
    ],
  },
  {
    title: "Delivery",
    faqs: [
      { q: "Where do you deliver?", a: "Delhi NCR (Delhi, Noida, Gurgaon, Faridabad, Ghaziabad) and major cities in Madhya Pradesh (Bhopal, Rewa, Jabalpur, Satna). For other locations, ask us on WhatsApp." },
      { q: "How long does delivery take?", a: "Delhi NCR: 2-4 business days. MP cities: 4-7 business days. Timeline may vary during peak seasons or for remote areas." },
      { q: "Is delivery free?", a: "Free delivery on orders above ₹2,000 in Delhi NCR. For MP and other locations, delivery charges are calculated based on order size and location." },
    ],
  },
  {
    title: "Bulk Orders & Dealer Program",
    faqs: [
      { q: "How do I become a Solstric dealer?", a: "Visit our Bulk Orders page and reach out on WhatsApp. We offer dealer starter packs starting at 10 units with margins of 15-30%. No registration fee." },
      { q: "What are the dealer margins?", a: "Margins range from 15-30% depending on product category and order volume. Higher volumes get better pricing." },
      { q: "Do you supply to shops outside Delhi and MP?", a: "Currently, we focus on Delhi NCR and MP districts. If you're in another state, contact us — we may be able to arrange supply." },
    ],
  },
  {
    title: "Returns & Warranty",
    faqs: [
      { q: "What is the return policy?", a: "We accept returns within 7 days of delivery for unused, undamaged products in original packaging. Contact us on WhatsApp to initiate a return." },
      { q: "Do products come with warranty?", a: "Yes, all products carry the manufacturer's original warranty. Prestige, Philips, Hawkins, Panasonic, Greenway, Luminous — all backed by brand warranties." },
      { q: "How do I claim warranty?", a: "Contact the brand's service center directly, or reach out to us on WhatsApp — we'll guide you through the process." },
    ],
  },
  {
    title: "Products & Categories",
    faqs: [
      { q: "Are these products genuine?", a: "100%. All products are sourced through authorized distribution channels. We do not sell refurbished, imported clones, or unbranded products." },
      { q: "Do you sell solar installation services?", a: "We sell solar products and can connect you with installation partners in Delhi NCR. For installation support in other cities, ask us on WhatsApp." },
      { q: "Can I get a demo before buying?", a: "For certain products and locations in Delhi, we may be able to arrange a demo or trial. Contact us on WhatsApp to discuss." },
    ],
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqSections.flatMap((section) =>
    section.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    }))
  ),
};

export default function FAQPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="py-4">
          <Breadcrumbs items={[{ label: "FAQ" }]} />
        </div>

        <section className="py-8 max-w-3xl">
          <h1 className="text-4xl font-bold text-gray-900">Frequently Asked Questions</h1>
          <p className="text-lg text-gray-500 mt-3">Everything you need to know about ordering, delivery, returns, and more.</p>
        </section>

        <div className="max-w-3xl pb-16 space-y-10">
          {faqSections.map((section) => (
            <div key={section.title}>
              <h2 className="text-xl font-bold text-gray-900 mb-4">{section.title}</h2>
              <div className="space-y-3">
                {section.faqs.map((faq, i) => (
                  <details key={i} className="group bg-white border border-gray-100 rounded-xl overflow-hidden">
                    <summary className="flex items-center justify-between p-5 cursor-pointer font-medium text-gray-900 hover:text-brand-green transition-colors">
                      {faq.q}
                      <ChevronRight className="w-4 h-4 text-gray-400 group-open:rotate-90 transition-transform shrink-0" />
                    </summary>
                    <div className="px-5 pb-5 text-sm text-gray-600 leading-relaxed">{faq.a}</div>
                  </details>
                ))}
              </div>
            </div>
          ))}

          <div className="text-center py-8 bg-gray-50 rounded-xl">
            <p className="text-gray-600 mb-4">Still have questions? We&apos;re here to help.</p>
            <WhatsAppCTA message="Hi, I have a question that's not covered in the FAQ." label="Ask on WhatsApp" />
          </div>
        </div>
      </div>
    </>
  );
}
