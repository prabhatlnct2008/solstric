import type { Metadata } from "next";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Solstric privacy policy. How we collect, use, and protect your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      <Breadcrumbs items={[{ label: "Privacy Policy" }]} />
      <h1 className="text-3xl font-bold text-gray-900 mt-6 mb-6">Privacy Policy</h1>
      <div className="prose prose-gray max-w-none space-y-6 text-gray-600">
        <p><strong>Last updated:</strong> January 2026</p>

        <h2 className="text-xl font-bold text-gray-900">Information We Collect</h2>
        <p>When you interact with Solstric — whether browsing our website, placing an order via WhatsApp, or submitting an enquiry form — we may collect the following information:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Name and contact details (phone number, email)</li>
          <li>Delivery address and city</li>
          <li>Order preferences and product interests</li>
          <li>Business details (for dealer/bulk orders)</li>
          <li>Device and browsing information (via cookies and analytics)</li>
        </ul>

        <h2 className="text-xl font-bold text-gray-900">How We Use Your Information</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>To process and deliver your orders</li>
          <li>To communicate order status via WhatsApp or phone</li>
          <li>To provide product recommendations and support</li>
          <li>To improve our website and product catalog</li>
          <li>To send relevant updates (with your consent)</li>
        </ul>

        <h2 className="text-xl font-bold text-gray-900">Data Sharing</h2>
        <p>We do not sell your personal information. We may share data with delivery partners and payment processors as needed to fulfill your orders.</p>

        <h2 className="text-xl font-bold text-gray-900">WhatsApp Communication</h2>
        <p>When you contact us via WhatsApp, your messages are processed through WhatsApp&apos;s platform. We use this data solely for order processing and customer support.</p>

        <h2 className="text-xl font-bold text-gray-900">Cookies</h2>
        <p>We use essential cookies for site functionality and analytics cookies to understand how visitors use our website. You can disable cookies in your browser settings.</p>

        <h2 className="text-xl font-bold text-gray-900">Your Rights</h2>
        <p>You can request access to, correction of, or deletion of your personal data by contacting us at hello@solstric.in or on WhatsApp.</p>

        <h2 className="text-xl font-bold text-gray-900">Contact</h2>
        <p>For privacy-related questions, email us at hello@solstric.in.</p>
      </div>
    </div>
  );
}
