"use client";

import { useState } from "react";
import { MessageCircle, Phone, ArrowRight } from "lucide-react";
import { getWhatsAppLink, siteConfig } from "@/data/site-config";

export default function CheckoutPage() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address1: "",
    address2: "",
    city: "",
    district: "",
    state: "",
    pincode: "",
    orderType: "home",
    shopName: "",
    gstin: "",
    paymentPreference: "whatsapp",
    notes: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const whatsappMessage = `Hi, I'd like to place an order from Solstric.\n\nName: ${form.name}\nPhone: ${form.phone}\nCity: ${form.city}, ${form.state}\nAddress: ${form.address1}${form.address2 ? ", " + form.address2 : ""}\nPincode: ${form.pincode}\nOrder Type: ${form.orderType}\n${form.shopName ? "Business: " + form.shopName + "\n" : ""}${form.notes ? "Notes: " + form.notes + "\n" : ""}\nPayment: ${form.paymentPreference}\n\nPlease confirm my order.`;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Checkout</h1>
      <p className="text-gray-500 mb-8">Fill in your details below. Your order will be confirmed via WhatsApp or callback.</p>

      <div className="space-y-8">
        {/* Contact Details */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Contact Details</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
              <input type="text" name="name" value={form.name} onChange={handleChange} className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
              <input type="tel" name="phone" value={form.phone} onChange={handleChange} className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green" required />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Email (optional)</label>
              <input type="email" name="email" value={form.email} onChange={handleChange} className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green" />
            </div>
          </div>
        </div>

        {/* Address */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Delivery Address</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Address Line 1 *</label>
              <input type="text" name="address1" value={form.address1} onChange={handleChange} className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green" required />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Address Line 2</label>
              <input type="text" name="address2" value={form.address2} onChange={handleChange} className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
              <input type="text" name="city" value={form.city} onChange={handleChange} className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">District</label>
              <input type="text" name="district" value={form.district} onChange={handleChange} className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">State *</label>
              <input type="text" name="state" value={form.state} onChange={handleChange} className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Pincode *</label>
              <input type="text" name="pincode" value={form.pincode} onChange={handleChange} className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green" required />
            </div>
          </div>
        </div>

        {/* Order Type */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Type</h2>
          <div className="flex flex-wrap gap-3">
            {[
              { value: "home", label: "Home Use" },
              { value: "business", label: "Business Use" },
              { value: "bulk", label: "Retailer / Bulk Order" },
            ].map((opt) => (
              <label key={opt.value} className={`flex items-center gap-2 px-4 py-2.5 border rounded-lg cursor-pointer text-sm transition-colors ${form.orderType === opt.value ? "border-brand-green bg-green-50 text-brand-green font-medium" : "border-gray-200 text-gray-600 hover:border-gray-300"}`}>
                <input type="radio" name="orderType" value={opt.value} checked={form.orderType === opt.value} onChange={handleChange} className="sr-only" />
                {opt.label}
              </label>
            ))}
          </div>

          {(form.orderType === "business" || form.orderType === "bulk") && (
            <div className="grid sm:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Shop / Company Name</label>
                <input type="text" name="shopName" value={form.shopName} onChange={handleChange} className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">GSTIN (optional)</label>
                <input type="text" name="gstin" value={form.gstin} onChange={handleChange} className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green" />
              </div>
            </div>
          )}
        </div>

        {/* Payment Preference */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Payment Preference</h2>
          <div className="flex flex-wrap gap-3">
            {[
              { value: "whatsapp", label: "Discuss on WhatsApp" },
              { value: "cod", label: "Cash on Delivery" },
              { value: "bank", label: "Bank Transfer" },
            ].map((opt) => (
              <label key={opt.value} className={`flex items-center gap-2 px-4 py-2.5 border rounded-lg cursor-pointer text-sm transition-colors ${form.paymentPreference === opt.value ? "border-brand-green bg-green-50 text-brand-green font-medium" : "border-gray-200 text-gray-600 hover:border-gray-300"}`}>
                <input type="radio" name="paymentPreference" value={opt.value} checked={form.paymentPreference === opt.value} onChange={handleChange} className="sr-only" />
                {opt.label}
              </label>
            ))}
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Order Notes (optional)</label>
          <textarea name="notes" value={form.notes} onChange={handleChange} rows={3} className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green" placeholder="Any special instructions..." />
        </div>

        {/* Submit CTAs */}
        <div className="space-y-3 pt-4">
          <a
            href={getWhatsAppLink(whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-brand-green text-white font-semibold px-6 py-3.5 rounded-lg hover:bg-brand-green-dark transition-colors w-full text-base"
          >
            <MessageCircle className="w-5 h-5" />
            Place Order on WhatsApp
          </a>
          <a
            href={`tel:${siteConfig.phone_number}`}
            className="flex items-center justify-center gap-2 border-2 border-gray-200 text-gray-700 font-semibold px-6 py-3.5 rounded-lg hover:bg-gray-50 transition-colors w-full"
          >
            <Phone className="w-5 h-5" />
            Request Callback
          </a>
        </div>
      </div>
    </div>
  );
}
