import type { Metadata } from "next";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

export const metadata: Metadata = {
  title: "Shipping Policy",
  description: "Solstric shipping policy. Free delivery in Delhi NCR on orders above ₹2,000. 2-7 day delivery across Delhi and MP.",
};

export default function ShippingPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      <Breadcrumbs items={[{ label: "Shipping Policy" }]} />
      <h1 className="text-3xl font-bold text-gray-900 mt-6 mb-6">Shipping Policy</h1>
      <div className="prose prose-gray max-w-none space-y-6 text-gray-600">
        <p><strong>Last updated:</strong> January 2026</p>

        <h2 className="text-xl font-bold text-gray-900">Delivery Areas</h2>
        <p>We currently deliver to:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Delhi NCR:</strong> Delhi, Noida, Gurgaon, Faridabad, Ghaziabad, Greater Noida</li>
          <li><strong>Madhya Pradesh:</strong> Bhopal, Rewa, Jabalpur, Satna, Sagar, and surrounding districts</li>
        </ul>
        <p>For other locations, contact us on WhatsApp — we may be able to arrange delivery.</p>

        <h2 className="text-xl font-bold text-gray-900">Delivery Timeline</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>Delhi NCR: 2-4 business days</li>
          <li>MP major cities: 4-7 business days</li>
          <li>MP rural/remote areas: 7-10 business days</li>
        </ul>
        <p>Timelines may vary during peak seasons, festivals, or extreme weather.</p>

        <h2 className="text-xl font-bold text-gray-900">Shipping Charges</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Free delivery</strong> in Delhi NCR on orders above ₹2,000</li>
          <li>Orders below ₹2,000: ₹100-150 delivery charge</li>
          <li>MP cities: Delivery charges calculated based on order size and distance</li>
          <li>Bulk orders: Delivery charges included in dealer pricing</li>
        </ul>

        <h2 className="text-xl font-bold text-gray-900">Order Tracking</h2>
        <p>After dispatch, we share tracking details on WhatsApp. You can check delivery status anytime by messaging us.</p>

        <h2 className="text-xl font-bold text-gray-900">Bulk Order Delivery</h2>
        <p>Bulk orders (10+ units) may require additional coordination. Our logistics team will share a delivery plan and timeline on WhatsApp after order confirmation.</p>
      </div>
    </div>
  );
}
