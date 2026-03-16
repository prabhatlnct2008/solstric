"use client";

import { MessageCircle } from "lucide-react";
import { getWhatsAppLink } from "@/data/site-config";

export default function StickyWhatsApp() {
  return (
    <a
      href={getWhatsAppLink("Hi, I'd like to know more about Solstric products.")}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-brand-green text-white p-4 rounded-full shadow-lg hover:bg-brand-green-dark transition-all duration-200 hover:scale-105"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-6 h-6" />
    </a>
  );
}
