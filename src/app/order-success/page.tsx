import Link from "next/link";
import { CheckCircle, ArrowRight, MessageCircle } from "lucide-react";
import WhatsAppCTA from "@/components/ui/WhatsAppCTA";

export default function OrderSuccessPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16 text-center">
      <CheckCircle className="w-16 h-16 text-brand-green mx-auto mb-6" />
      <h1 className="text-3xl font-bold text-gray-900">Order Submitted!</h1>
      <p className="text-gray-500 mt-3 text-lg leading-relaxed">
        Thank you for your enquiry. Our team will reach out on WhatsApp within 30 minutes during business hours to confirm your order details.
      </p>

      <div className="mt-8 space-y-4">
        <WhatsAppCTA
          message="Hi, I just submitted an order on the Solstric website. Please confirm."
          label="Follow Up on WhatsApp"
          size="lg"
        />
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-brand-green font-medium hover:underline"
        >
          Continue Browsing <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="mt-12 bg-gray-50 rounded-xl p-6 text-left">
        <h2 className="font-semibold text-gray-900 mb-3">What happens next?</h2>
        <ol className="space-y-2 text-sm text-gray-600">
          <li>1. Our team reviews your order details</li>
          <li>2. We confirm product availability and price on WhatsApp</li>
          <li>3. You confirm payment method and delivery address</li>
          <li>4. Product is dispatched and tracking is shared</li>
        </ol>
      </div>
    </div>
  );
}
