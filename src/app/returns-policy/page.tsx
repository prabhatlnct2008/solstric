import type { Metadata } from "next";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

export const metadata: Metadata = {
  title: "Returns & Refund Policy",
  description: "Solstric returns and refund policy. Easy returns within 7 days. Manufacturer warranty on all products.",
};

export default function ReturnsPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      <Breadcrumbs items={[{ label: "Returns & Refund Policy" }]} />
      <h1 className="text-3xl font-bold text-gray-900 mt-6 mb-6">Returns & Refund Policy</h1>
      <div className="prose prose-gray max-w-none space-y-6 text-gray-600">
        <p><strong>Last updated:</strong> January 2026</p>

        <h2 className="text-xl font-bold text-gray-900">Return Window</h2>
        <p>We accept returns within <strong>7 days</strong> of delivery for most products. The product must be unused, undamaged, and in its original packaging with all accessories included.</p>

        <h2 className="text-xl font-bold text-gray-900">How to Initiate a Return</h2>
        <ol className="list-decimal pl-5 space-y-1">
          <li>Contact us on WhatsApp within 7 days of receiving your order</li>
          <li>Share your order details and reason for return</li>
          <li>Our team will confirm return eligibility and share pickup/drop-off instructions</li>
          <li>Once we receive and inspect the product, refund is processed within 5-7 business days</li>
        </ol>

        <h2 className="text-xl font-bold text-gray-900">Refund Method</h2>
        <p>Refunds are processed to the original payment method (bank transfer, UPI) or as store credit, depending on your preference.</p>

        <h2 className="text-xl font-bold text-gray-900">Non-Returnable Items</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>Products that have been used or show signs of use</li>
          <li>Products with damaged or missing packaging</li>
          <li>Customized bundles and kits (negotiable on case basis)</li>
          <li>Solar panels and rooftop systems (after installation)</li>
        </ul>

        <h2 className="text-xl font-bold text-gray-900">Warranty</h2>
        <p>All products carry the manufacturer&apos;s original warranty. For warranty claims, contact the brand&apos;s service center directly, or reach out to us on WhatsApp for guidance.</p>

        <h2 className="text-xl font-bold text-gray-900">Damaged or Defective Products</h2>
        <p>If you receive a damaged or defective product, contact us immediately on WhatsApp with photos. We will arrange a replacement or full refund at no additional cost.</p>
      </div>
    </div>
  );
}
