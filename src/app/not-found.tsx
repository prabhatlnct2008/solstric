import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";
import WhatsAppCTA from "@/components/ui/WhatsAppCTA";

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-20 text-center">
      <div className="text-6xl font-bold text-gray-200 mb-4">404</div>
      <h1 className="text-2xl font-bold text-gray-900">Page Not Found</h1>
      <p className="text-gray-500 mt-3 mb-8">
        The page you&apos;re looking for doesn&apos;t exist or has been moved. Let us help you find what you need.
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-brand-green text-white font-semibold px-6 py-3 rounded-lg hover:bg-brand-green-dark transition-colors"
        >
          Go to Homepage <ArrowRight className="w-4 h-4" />
        </Link>
        <WhatsAppCTA
          message="Hi, I couldn't find the page I was looking for on Solstric. Can you help?"
          label="Ask on WhatsApp"
          variant="outline"
        />
      </div>
    </div>
  );
}
