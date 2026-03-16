import type { Category } from "@/types";

export const categories: Category[] = [
  {
    name: "Alternative Cooking",
    slug: "alternative-cooking",
    description:
      "Electric cooking solutions for homes, PGs, hostels — your reliable backup when LPG runs out.",
    long_description:
      "India's dependence on LPG cylinders means uncertainty — delayed deliveries, rising prices, and safety concerns. Alternative cooking products like induction cooktops, electric rice cookers, and pressure cookers let you cook full meals without gas. Whether you're in a Delhi apartment, a PG in Noida, or a hostel in Bhopal, these products give you the freedom to cook on your own terms. Solstric curates the most practical, affordable, and trusted electric cooking appliances so you can switch confidently.",
    image_url: "/images/categories/alternative-cooking.jpg",
    icon: "Flame",
    subcategories: [
      { name: "Induction Cooktops", slug: "induction-cooktops", description: "Cook without gas using magnetic induction technology" },
      { name: "Electric Rice Cookers", slug: "electric-rice-cookers", description: "One-touch rice and meal preparation" },
      { name: "Electric Pressure Cookers", slug: "electric-pressure-cookers", description: "Fast pressure cooking without a stove" },
      { name: "Multicook Kettles", slug: "multicook-kettles", description: "Boil, cook, and reheat in one appliance" },
      { name: "Insulated Casseroles", slug: "insulated-casseroles", description: "Keep food hot for hours without reheating" },
      { name: "Induction-Compatible Cookware", slug: "induction-compatible-cookware", description: "Pots and pans built for induction cooking" },
    ],
    seo_title: "Alternative Cooking Products — Induction, Rice Cookers & More | Solstric",
    seo_meta_description:
      "Shop electric cooking appliances for Delhi, NCR & MP. Induction cooktops, rice cookers, pressure cookers — cook without LPG. Order on WhatsApp.",
    faqs: [
      { question: "Can induction cooktops replace LPG completely?", answer: "For most daily cooking needs — yes. Induction cooktops handle boiling, frying, simmering, and pressure cooking. They're especially practical for backup cooking when cylinders are delayed." },
      { question: "Do I need special utensils for induction?", answer: "Yes, you need flat-bottomed stainless steel or induction-compatible cookware. Aluminium and copper vessels won't work on induction." },
      { question: "What's the electricity cost of induction cooking?", answer: "On average, induction cooking costs ₹2-4 per meal, which is comparable to or less than LPG costs, especially at current cylinder prices." },
    ],
    buying_guide:
      "Start with a single induction cooktop if you want a backup cooking option. Add a rice cooker if your household eats rice regularly. For PGs and hostels, consider bundled kits that include both induction and a cooker for complete electric meal prep.",
    color: "#F59E0B",
  },
  {
    name: "Solar & Power Backup",
    slug: "solar-power-backup",
    description:
      "Solar systems, inverters, batteries & portable power stations for homes, shops, and villages.",
    long_description:
      "Power cuts cost money, comfort, and productivity. Whether it's a home in Delhi NCR, a small shop in Rewa, or a village in Madhya Pradesh — reliable power backup is not optional anymore. Solstric brings you curated solar panels, rooftop systems, inverters, batteries, and portable power stations from trusted brands. We help you pick the right system for your space, budget, and usage pattern — and you can order directly on WhatsApp with expert guidance.",
    image_url: "/images/categories/solar-power-backup.jpg",
    icon: "Sun",
    subcategories: [
      { name: "Rooftop Solar Systems", slug: "rooftop-solar-systems", description: "Complete solar solutions for your roof" },
      { name: "Solar Panels", slug: "solar-panels", description: "Individual panels for custom installations" },
      { name: "Portable Power Stations", slug: "portable-power-stations", description: "Portable battery backup you can carry anywhere" },
      { name: "Solar Inverters", slug: "solar-inverters", description: "Convert solar energy for home use" },
      { name: "Home Inverters", slug: "home-inverters", description: "Standard inverters for power backup" },
      { name: "Batteries", slug: "batteries", description: "Storage batteries for inverter and solar systems" },
      { name: "Shop Backup Systems", slug: "shop-backup-systems", description: "Power continuity solutions for small businesses" },
    ],
    seo_title: "Solar & Power Backup — Rooftop Solar, Inverters, Batteries | Solstric",
    seo_meta_description:
      "Buy solar systems, inverters, portable power stations and batteries for homes & shops in Delhi, NCR & MP. Expert guidance on WhatsApp.",
    faqs: [
      { question: "How much does a rooftop solar system cost?", answer: "A 1kW grid-connected rooftop solar system starts around ₹60,000. Costs vary based on capacity, brand, and installation complexity. Government subsidies may reduce your effective cost." },
      { question: "Can I use a portable power station for my shop?", answer: "Yes, portable power stations like the Luminous Edge GO series can keep small electronics, lights, and charging stations running during power cuts." },
      { question: "Which is better — solar or inverter?", answer: "Solar reduces your long-term electricity bill and provides daytime power. Inverters with batteries give you backup during outages. Many homes benefit from both working together." },
    ],
    buying_guide:
      "For home backup, start with an inverter + battery combo. If you want long-term savings, explore rooftop solar. For shops, portable power stations offer plug-and-play backup. Talk to our team on WhatsApp to get a personalized recommendation.",
    color: "#3B82F6",
  },
  {
    name: "Village / Hybrid Kitchen",
    slug: "village-hybrid-kitchen",
    description:
      "Smokeless stoves, biomass cookers & hybrid kitchen kits for rural and peri-urban homes.",
    long_description:
      "Millions of Indian homes still cook with wood, crop waste, and dung cakes. Traditional chulhas produce harmful smoke, waste fuel, and make cooking a daily struggle. Smokeless stoves and hybrid kitchen kits change that — they burn the same fuels but with dramatically less smoke, less fuel consumption, and faster cooking. Solstric brings the best-tested biomass stoves and hybrid kitchen solutions to villages in MP, UP, and beyond. Our kits combine a smokeless stove with basic electric appliances for a truly resilient kitchen.",
    image_url: "/images/categories/village-hybrid-kitchen.jpg",
    icon: "TreePine",
    subcategories: [
      { name: "Smokeless Stoves", slug: "smokeless-stoves", description: "Clean-burning biomass stoves for daily cooking" },
      { name: "Biomass Stoves", slug: "biomass-stoves", description: "Efficient stoves that use wood and crop waste" },
      { name: "Charcoal Stoves", slug: "charcoal-stoves", description: "High-efficiency charcoal cooking solutions" },
      { name: "Hybrid Village Kitchen Kits", slug: "hybrid-village-kitchen-kits", description: "Complete kits combining smokeless stove + electric" },
      { name: "Rural Cookware Bundles", slug: "rural-cookware-bundles", description: "Durable cookware designed for rural cooking" },
    ],
    seo_title: "Village Kitchen Products — Smokeless Stoves & Hybrid Kits | Solstric",
    seo_meta_description:
      "Buy smokeless stoves, biomass cookers & hybrid kitchen kits for villages in MP & India. Less smoke, less fuel, healthier cooking. Order on WhatsApp.",
    faqs: [
      { question: "How much fuel does a smokeless stove save?", answer: "Quality smokeless stoves like the Greenway range can reduce fuel consumption by 60-70% compared to traditional chulhas, while producing 70% less smoke." },
      { question: "Can I use wood and dung in these stoves?", answer: "Yes, smokeless stoves are designed to work with wood, crop residue, dry dung cakes, and pellets — the same fuels you already use." },
      { question: "What is a hybrid kitchen kit?", answer: "A hybrid kitchen kit combines a smokeless stove with an electric appliance (like a rice cooker) so you can cook using both biomass and electricity, depending on what's available." },
    ],
    buying_guide:
      "If your household primarily cooks with wood or biomass, start with a Greenway Smart Stove. For families that also have some electricity access, the hybrid kitchen kit gives you the best of both worlds. Bulk options are available for village-level dealers.",
    color: "#10B981",
  },
  {
    name: "Commercial / Stall Solutions",
    slug: "commercial-stall-solutions",
    description:
      "Electric kits for tea stalls, eateries, PG kitchens & food vendors — reduce LPG dependency.",
    long_description:
      "Running a food stall, PG kitchen, or small eatery means constant pressure on fuel costs and supply. Electric cooking kits offer a practical alternative — induction cooktops for stalls, bulk rice cookers for mess kitchens, insulated containers for hot holding, and portable backup power for uninterrupted service. Solstric bundles the right equipment for your setup size and cooking style, so you can reduce costs and keep serving even when LPG runs out.",
    image_url: "/images/categories/commercial-stall-solutions.jpg",
    icon: "Store",
    subcategories: [
      { name: "Food Stall Kits", slug: "food-stall-kits", description: "Complete electric cooking kits for street vendors" },
      { name: "Small Restaurant Backup Kits", slug: "small-restaurant-backup-kits", description: "Backup cooking solutions for small restaurants" },
      { name: "PG / Hostel Kitchen Kits", slug: "pg-hostel-kitchen-kits", description: "Electric kitchen setups for PGs and hostels" },
      { name: "Bulk Cooking Appliances", slug: "bulk-cooking-appliances", description: "High-capacity appliances for commercial use" },
      { name: "Hot Holding Solutions", slug: "hot-holding-solutions", description: "Insulated containers and warmers" },
    ],
    seo_title: "Commercial Kitchen & Food Stall Electric Kits | Solstric",
    seo_meta_description:
      "Electric cooking kits for food stalls, PG kitchens & small restaurants. Reduce LPG costs, cook with induction. Order on WhatsApp.",
    faqs: [
      { question: "Can a food stall run on induction?", answer: "Yes, many tea stalls and snack vendors in Delhi already use induction cooktops. A single 1600-2000W induction unit can handle tea, Maggi, boiling, and basic frying." },
      { question: "What's included in the food stall starter kit?", answer: "Our starter kit includes one induction cooktop, a large stainless steel vessel, an insulated serving container, and an optional extension board. We customize based on your stall size." },
      { question: "Is induction cooking cheaper than LPG for stalls?", answer: "For most small stalls, yes. A commercial LPG cylinder costs ₹1,800+, while equivalent electric cooking can cost ₹800-1,200/month depending on usage." },
    ],
    buying_guide:
      "For tea and snack stalls, start with the Food Stall Electric Starter Kit. For PG kitchens serving 20-50 people, consider the PG/Hostel Kitchen Kit. Restaurants should look at the Small Restaurant Backup Kit for partial LPG replacement.",
    color: "#8B5CF6",
  },
  {
    name: "Retailer / Bulk Orders",
    slug: "retailer-bulk-orders",
    description:
      "Dealer packs, mixed cartons & district distribution packs for retailers and resellers.",
    long_description:
      "If you're an appliance retailer, general store owner, or district-level dealer, Solstric offers curated bulk packs designed for resale. Our starter packs include fast-moving products with tested demand — induction cooktops, rice cookers, smokeless stoves, and more. Whether you're in Delhi, Bhopal, Rewa, or Jabalpur, we support you with competitive pricing, WhatsApp-based ordering, and logistics coordination. Start small with a trial pack or go big with district distribution bundles.",
    image_url: "/images/categories/retailer-bulk-orders.jpg",
    icon: "Package",
    subcategories: [
      { name: "Fast-Moving Retailer SKUs", slug: "fast-moving-retailer-skus", description: "High-demand products for quick turnover" },
      { name: "Rural Dealer Products", slug: "rural-dealer-products", description: "Products suited for rural and semi-urban markets" },
      { name: "Mixed Starter Packs", slug: "mixed-starter-packs", description: "Assorted product bundles for new dealers" },
      { name: "Premium Dealer Products", slug: "premium-dealer-products", description: "Higher-value products for urban dealers" },
      { name: "Category-Based Dealer Packs", slug: "category-based-dealer-packs", description: "Focused packs by product category" },
    ],
    seo_title: "Bulk Orders & Dealer Packs — Retailer Distribution | Solstric",
    seo_meta_description:
      "Become a Solstric dealer. Buy bulk kitchen appliances, smokeless stoves & solar products for resale. Starter packs from ₹25,000. WhatsApp to order.",
    faqs: [
      { question: "What is the minimum order quantity?", answer: "Our starter packs begin at 10-15 units (mixed products). For category-specific packs, MOQ varies by product. Contact us on WhatsApp for current availability." },
      { question: "Do you offer dealer pricing?", answer: "Yes, all bulk orders receive dealer pricing with margins of 15-30% depending on product and volume. Larger orders get better pricing." },
      { question: "Which cities do you deliver bulk orders to?", answer: "We currently serve Delhi NCR, Bhopal, Rewa, Jabalpur, Satna, and other MP districts. We're expanding to more cities — ask us on WhatsApp." },
    ],
    buying_guide:
      "New retailers should start with the Fast-Moving Retailer Starter Pack — it includes proven bestsellers. Rural dealers should explore the Rural Dealer Product Pack designed for village and small-town demand. Talk to our sales team on WhatsApp for customized packs.",
    color: "#EF4444",
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
