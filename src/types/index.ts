export interface Product {
  product_id: string;
  sku: string;
  product_name: string;
  slug: string;
  category: string;
  category_slug: string;
  subcategory: string;
  product_type: "single" | "bundle" | "family" | "category-support";
  short_title: string;
  short_description: string;
  long_description: string;
  best_for: string;
  use_cases: string[];
  suitable_for_locations: string[];
  tags: string[];
  price_mode: "fixed" | "variable" | "quote-based";
  price_display: string;
  mrp?: number;
  sale_price?: number;
  bulk_price_note?: string;
  moq?: number;
  is_active: boolean;
  is_featured: boolean;
  show_on_homepage: boolean;
  show_on_category_page: boolean;
  show_on_bulk_page: boolean;
  show_in_trending: boolean;
  show_in_city_pages: boolean;
  priority_rank: number;
  hero_image_url: string;
  gallery_images: string[];
  packaging_image_url?: string;
  lifestyle_image_url?: string;
  spec_sheet_image_url?: string;
  whatsapp_message_template: string;
  enquiry_mode: "order" | "quote" | "callback";
  supports_bulk_order: boolean;
  supports_retail_order: boolean;
  requires_callback: boolean;
  seo_title: string;
  seo_meta_description: string;
  canonical_url?: string;
  key_features: string[];
  specifications: Record<string, string>;
  whats_in_box?: string[];
  faqs: FAQ[];
  related_product_ids: string[];
  badges: string[];
  not_ideal_for?: string[];
  rating?: number;
  review_count?: number;
}

export interface Category {
  name: string;
  slug: string;
  description: string;
  long_description: string;
  image_url: string;
  icon: string;
  subcategories: Subcategory[];
  seo_title: string;
  seo_meta_description: string;
  faqs: FAQ[];
  buying_guide: string;
  color: string;
}

export interface Subcategory {
  name: string;
  slug: string;
  description: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  published_date: string;
  updated_date?: string;
  category: string;
  tags: string[];
  hero_image_url: string;
  seo_title: string;
  seo_meta_description: string;
  related_product_ids: string[];
  related_guide_slugs: string[];
  reading_time: number;
  type: "guide" | "comparison" | "how-to" | "local" | "explainer";
}

export interface CityPage {
  city: string;
  city_slug: string;
  topic: string;
  topic_slug: string;
  headline: string;
  description: string;
  content: string;
  featured_product_ids: string[];
  related_category_slugs: string[];
  faqs: FAQ[];
  seo_title: string;
  seo_meta_description: string;
  nearby_cities: string[];
}

export interface CartItem {
  product_id: string;
  quantity: number;
}

export interface SiteConfig {
  site_name: string;
  tagline: string;
  whatsapp_number: string;
  phone_number: string;
  email: string;
  address: string;
  social: {
    instagram?: string;
    facebook?: string;
    youtube?: string;
  };
}
