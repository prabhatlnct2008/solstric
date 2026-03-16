import type { CityPage } from "@/types";

export const cityPages: CityPage[] = [
  {
    city: "Delhi",
    city_slug: "delhi",
    topic: "Backup Kitchen Products",
    topic_slug: "backup-kitchen-products",
    headline: "Backup Kitchen Products for Delhi Homes",
    description: "Electric cooking appliances for Delhi households — induction cooktops, rice cookers & more. When LPG runs out, cook with electricity.",
    content: "Delhi households face growing LPG uncertainty — delayed cylinder deliveries, rising prices, and safety concerns in apartments and PGs. Solstric brings you curated electric cooking solutions that work as a reliable backup or even a primary cooking method. From budget induction cooktops at ₹1,499 to premium Philips models, we have options for every Delhi kitchen. All products come with manufacturer warranty and can be ordered directly on WhatsApp with delivery across Delhi NCR in 2-4 days.",
    featured_product_ids: ["ALT-IND-001", "ALT-IND-002", "ALT-RC-001", "ALT-IND-004"],
    related_category_slugs: ["alternative-cooking", "solar-power-backup"],
    faqs: [
      { question: "Do you deliver across all of Delhi NCR?", answer: "Yes, we deliver to Delhi, Noida, Gurgaon, Faridabad, Ghaziabad, and nearby areas. Delivery takes 2-4 business days." },
      { question: "Can I see a demo before buying?", answer: "For certain products and locations in Delhi, we may be able to arrange a demo. Contact us on WhatsApp to discuss." },
    ],
    seo_title: "Backup Kitchen Products for Delhi — Induction & Electric Cooking | Solstric",
    seo_meta_description: "Buy backup kitchen products in Delhi. Induction cooktops from ₹1,499, rice cookers, electric pressure cookers. Free delivery in Delhi NCR. Order on WhatsApp.",
    nearby_cities: ["NCR", "Noida", "Gurgaon"],
  },
  {
    city: "Rewa",
    city_slug: "rewa",
    topic: "Village Hybrid Kitchen",
    topic_slug: "village-hybrid-kitchen",
    headline: "Village Hybrid Kitchen Products for Rewa & MP",
    description: "Smokeless stoves, biomass cookers & hybrid kitchen kits for Rewa district villages. Less smoke, less fuel, healthier cooking.",
    content: "Rewa and surrounding villages in Madhya Pradesh still rely heavily on traditional chulhas. The health costs are enormous — respiratory problems, eye issues, and hours spent collecting fuel. Solstric brings smokeless stoves and hybrid kitchen kits to Rewa that burn the same fuels (wood, crop waste, dung) with 70% less smoke and 60% less fuel consumption. Our Village Hybrid Kitchen Kit combines a smokeless stove with an electric rice cooker for complete cooking resilience. Dealer support available for Rewa district retailers.",
    featured_product_ids: ["VIL-SS-001", "VIL-SS-002", "VIL-HK-001"],
    related_category_slugs: ["village-hybrid-kitchen", "retailer-bulk-orders"],
    faqs: [
      { question: "Do you deliver to villages near Rewa?", answer: "Yes, we deliver to Rewa city and surrounding areas. For remote villages, we coordinate through local dealers. Contact us on WhatsApp for your specific location." },
      { question: "Can I become a dealer in Rewa?", answer: "Absolutely! We're looking for dealers in Rewa district. Start with our Retailer Starter Pack of 10-15 units. Contact our sales team on WhatsApp." },
    ],
    seo_title: "Village Kitchen Products for Rewa MP — Smokeless Stoves & Hybrid Kits | Solstric",
    seo_meta_description: "Buy smokeless stoves and hybrid kitchen kits in Rewa, MP. Greenway stoves from ₹2,999. 70% less smoke. Dealer packs available. Order on WhatsApp.",
    nearby_cities: ["Satna", "Sidhi", "Shahdol"],
  },
  {
    city: "Bhopal",
    city_slug: "bhopal",
    topic: "Retailer Bulk Kitchen Products",
    topic_slug: "retailer-bulk-kitchen-products",
    headline: "Bulk Kitchen & Solar Products for Bhopal Retailers",
    description: "Dealer packs and bulk orders for Bhopal retailers — induction cooktops, rice cookers, smokeless stoves & solar products.",
    content: "Bhopal is a key distribution hub for central India. Solstric offers curated dealer packs for Bhopal retailers covering alternative cooking appliances, smokeless stoves, and solar backup products. Our starter packs begin at 10-15 mixed units with dealer margins of 15-30%. Whether you run an appliance shop in New Market, a general store in rural Bhopal district, or an electronics shop — we have products that your customers need. Fast delivery, WhatsApp ordering, and dedicated sales support.",
    featured_product_ids: ["ALT-IND-001", "ALT-IND-003", "VIL-SS-001", "RET-MIX-001"],
    related_category_slugs: ["retailer-bulk-orders", "alternative-cooking"],
    faqs: [
      { question: "What delivery time for bulk orders to Bhopal?", answer: "Bulk orders to Bhopal typically take 5-7 business days. For urgent orders, contact us on WhatsApp for express options." },
      { question: "Do you offer credit terms for Bhopal dealers?", answer: "Initial orders are prepaid. After 3 successful orders, we discuss credit terms for established dealers." },
    ],
    seo_title: "Bulk Kitchen Products for Bhopal Retailers — Dealer Packs | Solstric",
    seo_meta_description: "Bulk kitchen appliances and solar products for Bhopal retailers. Dealer packs from 10 units, 15-30% margins. Order on WhatsApp from Solstric.",
    nearby_cities: ["Indore", "Rewa", "Jabalpur"],
  },
];

export function getCityPage(citySlug: string, topicSlug: string): CityPage | undefined {
  return cityPages.find((cp) => cp.city_slug === citySlug && cp.topic_slug === topicSlug);
}

export function getCityPagesByCity(citySlug: string): CityPage[] {
  return cityPages.filter((cp) => cp.city_slug === citySlug);
}
