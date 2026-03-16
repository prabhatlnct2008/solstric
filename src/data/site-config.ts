import type { SiteConfig } from "@/types";

export const siteConfig: SiteConfig = {
  site_name: "Solstric",
  tagline: "Alternative Kitchens & Energy Resilience",
  whatsapp_number: "918882567801",
  phone_number: "+91 88825 67801",
  email: "hello@solstric.in",
  address: "New Delhi, India",
  social: {
    instagram: "https://instagram.com/solstric",
    facebook: "https://facebook.com/solstric",
  },
};

export const WHATSAPP_BASE_URL = `https://wa.me/${siteConfig.whatsapp_number}`;

export function getWhatsAppLink(message: string): string {
  return `${WHATSAPP_BASE_URL}?text=${encodeURIComponent(message)}`;
}
