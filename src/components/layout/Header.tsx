"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Search, ShoppingCart, ChevronDown, Phone, MessageCircle } from "lucide-react";
import { categories } from "@/data/categories";
import { siteConfig, getWhatsAppLink } from "@/data/site-config";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-brand-charcoal text-white text-xs sm:text-sm text-center py-2 px-4">
        <span className="hidden sm:inline">Free delivery in Delhi NCR on orders above ₹2,000 | </span>
        <Link href="/bulk-orders" className="text-brand-orange hover:underline font-medium">
          Bulk & Dealer Orders →
        </Link>
      </div>

      <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Main Header Row */}
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <div className="w-9 h-9 bg-brand-green rounded-lg flex items-center justify-center">
                <svg viewBox="0 0 32 32" className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="16" cy="16" r="10" />
                  <path d="M16 6v4M16 22v4M6 16h4M22 16h4M9.5 9.5l2.8 2.8M19.7 19.7l2.8 2.8M9.5 22.5l2.8-2.8M19.7 12.3l2.8-2.8" />
                  <circle cx="16" cy="16" r="3" fill="currentColor" />
                </svg>
              </div>
              <span className="text-xl font-bold text-brand-charcoal tracking-tight">
                Solstric
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              <Link href="/" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-brand-green rounded-md transition-colors">
                Home
              </Link>

              {/* Categories Dropdown */}
              <div className="relative" onMouseEnter={() => setCatOpen(true)} onMouseLeave={() => setCatOpen(false)}>
                <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 hover:text-brand-green rounded-md transition-colors">
                  Categories <ChevronDown className="w-3.5 h-3.5" />
                </button>
                {catOpen && (
                  <div className="absolute top-full left-0 w-72 bg-white rounded-xl shadow-xl border border-gray-100 py-2 mt-0.5">
                    {categories.map((cat) => (
                      <Link
                        key={cat.slug}
                        href={`/category/${cat.slug}`}
                        className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-brand-green transition-colors"
                      >
                        <span className="font-medium">{cat.name}</span>
                        <span className="block text-xs text-gray-400 mt-0.5">{cat.subcategories.length} subcategories</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link href="/bulk-orders" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-brand-green rounded-md transition-colors">
                Bulk Orders
              </Link>
              <Link href="/guides" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-brand-green rounded-md transition-colors">
                Guides
              </Link>
              <Link href="/about" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-brand-green rounded-md transition-colors">
                About
              </Link>
              <Link href="/contact" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-brand-green rounded-md transition-colors">
                Contact
              </Link>
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              <Link href="/cart" className="relative p-2 text-gray-600 hover:text-brand-green transition-colors" aria-label="Cart">
                <ShoppingCart className="w-5 h-5" />
              </Link>

              <a
                href={getWhatsAppLink("Hi, I'd like to know more about Solstric products.")}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex items-center gap-1.5 bg-brand-green text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-brand-green-dark transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </a>

              <button
                className="lg:hidden p-2 text-gray-600"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100">
            <div className="px-4 py-4 space-y-1">
              <Link href="/" className="block px-3 py-2.5 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-50" onClick={() => setMobileOpen(false)}>
                Home
              </Link>
              <div className="px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">Categories</div>
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/category/${cat.slug}`}
                  className="block px-3 py-2.5 text-sm text-gray-700 rounded-md hover:bg-gray-50 pl-6"
                  onClick={() => setMobileOpen(false)}
                >
                  {cat.name}
                </Link>
              ))}
              <Link href="/bulk-orders" className="block px-3 py-2.5 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-50" onClick={() => setMobileOpen(false)}>
                Bulk Orders
              </Link>
              <Link href="/guides" className="block px-3 py-2.5 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-50" onClick={() => setMobileOpen(false)}>
                Guides
              </Link>
              <Link href="/about" className="block px-3 py-2.5 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-50" onClick={() => setMobileOpen(false)}>
                About
              </Link>
              <Link href="/contact" className="block px-3 py-2.5 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-50" onClick={() => setMobileOpen(false)}>
                Contact
              </Link>

              <div className="pt-3 border-t border-gray-100 space-y-2">
                <a
                  href={getWhatsAppLink("Hi, I'd like to know more about Solstric products.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-brand-green text-white text-sm font-medium px-4 py-3 rounded-lg w-full"
                >
                  <MessageCircle className="w-4 h-4" /> Chat on WhatsApp
                </a>
                <a
                  href={`tel:${siteConfig.phone_number}`}
                  className="flex items-center justify-center gap-2 border border-gray-200 text-gray-700 text-sm font-medium px-4 py-3 rounded-lg w-full"
                >
                  <Phone className="w-4 h-4" /> Call Us
                </a>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
