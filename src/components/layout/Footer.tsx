import Link from "next/link";
import { MessageCircle, Phone, Mail, MapPin } from "lucide-react";
import { siteConfig, getWhatsAppLink } from "@/data/site-config";
import { categories } from "@/data/categories";

export default function Footer() {
  return (
    <footer className="bg-brand-charcoal text-gray-300">
      {/* CTA Banner */}
      <div className="bg-brand-green">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-white text-xl font-bold">Need help choosing the right product?</h3>
            <p className="text-green-100 text-sm mt-1">Our experts are available on WhatsApp to guide you.</p>
          </div>
          <a
            href={getWhatsAppLink("Hi, I need help choosing the right product for my needs.")}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-white text-brand-green font-semibold px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors shrink-0"
          >
            <MessageCircle className="w-5 h-5" />
            Talk to an Expert
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-brand-green rounded-lg flex items-center justify-center">
                <svg viewBox="0 0 32 32" className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="16" cy="16" r="10" />
                  <path d="M16 6v4M16 22v4M6 16h4M22 16h4" />
                  <circle cx="16" cy="16" r="3" fill="currentColor" />
                </svg>
              </div>
              <span className="text-lg font-bold text-white">Solstric</span>
            </Link>
            <p className="text-sm text-gray-400 mt-3 leading-relaxed">
              Alternative kitchens & energy resilience products for homes, stalls, villages, and retailers across Delhi and Madhya Pradesh.
            </p>
            <div className="flex items-center gap-3 mt-4 text-sm">
              <a href={`tel:${siteConfig.phone_number}`} className="flex items-center gap-1.5 text-gray-400 hover:text-white transition-colors">
                <Phone className="w-4 h-4" /> {siteConfig.phone_number}
              </a>
            </div>
            <div className="flex items-center gap-1.5 mt-2 text-sm text-gray-400">
              <Mail className="w-4 h-4" /> {siteConfig.email}
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Categories</h4>
            <ul className="space-y-2.5">
              {categories.map((cat) => (
                <li key={cat.slug}>
                  <Link href={`/category/${cat.slug}`} className="text-sm text-gray-400 hover:text-white transition-colors">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              {[
                { label: "About Us", href: "/about" },
                { label: "Contact", href: "/contact" },
                { label: "Bulk Orders", href: "/bulk-orders" },
                { label: "Guides & Blog", href: "/guides" },
                { label: "FAQ", href: "/faq" },
                { label: "Cart", href: "/cart" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-gray-400 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Policies & Cities */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Policies</h4>
            <ul className="space-y-2.5">
              {[
                { label: "Privacy Policy", href: "/privacy-policy" },
                { label: "Returns Policy", href: "/returns-policy" },
                { label: "Shipping Policy", href: "/shipping-policy" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-gray-400 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <h4 className="text-white font-semibold text-sm mb-3 mt-6">We Serve</h4>
            <p className="text-sm text-gray-400">Delhi NCR, Bhopal, Rewa, Jabalpur, Satna & MP districts</p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} Solstric. All rights reserved.
          </p>
          <p className="text-xs text-gray-500">
            Alternative Kitchens & Energy Resilience — Built for India
          </p>
        </div>
      </div>
    </footer>
  );
}
