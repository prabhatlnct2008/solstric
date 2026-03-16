import { prisma } from "@/lib/prisma";
import type { Product } from "@/types";

function parseJson<T>(value: string | null | undefined, fallback: T): T {
  if (!value) return fallback;
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

type DbProduct = Awaited<ReturnType<typeof prisma.product.findFirst>> & {
  images?: { url: string; alt_text: string | null; sort_order: number }[];
};

function toProduct(p: NonNullable<DbProduct>): Product {
  return {
    product_id: p.product_id,
    sku: p.sku,
    product_name: p.product_name,
    slug: p.slug,
    category: p.category,
    category_slug: p.category_slug,
    subcategory: p.subcategory,
    product_type: p.product_type as Product["product_type"],
    short_title: p.short_title,
    short_description: p.short_description,
    long_description: p.long_description,
    best_for: p.best_for,
    use_cases: parseJson<string[]>(p.use_cases, []),
    suitable_for_locations: parseJson<string[]>(p.suitable_for_locations, []),
    tags: parseJson<string[]>(p.tags, []),
    price_mode: p.price_mode as Product["price_mode"],
    price_display: p.price_display,
    mrp: p.mrp ?? undefined,
    sale_price: p.sale_price ?? undefined,
    bulk_price_note: p.bulk_price_note ?? undefined,
    moq: p.moq ?? undefined,
    is_active: p.is_active,
    is_featured: p.is_featured,
    show_on_homepage: p.show_on_homepage,
    show_on_category_page: p.show_on_category_page,
    show_on_bulk_page: p.show_on_bulk_page,
    show_in_trending: p.show_in_trending,
    show_in_city_pages: p.show_in_city_pages,
    priority_rank: p.priority_rank,
    hero_image_url: p.hero_image_url,
    gallery_images: p.images?.length
      ? p.images.map((img) => img.url)
      : [p.hero_image_url],
    packaging_image_url: p.packaging_image_url ?? undefined,
    lifestyle_image_url: p.lifestyle_image_url ?? undefined,
    spec_sheet_image_url: p.spec_sheet_image_url ?? undefined,
    whatsapp_message_template: p.whatsapp_message_template,
    enquiry_mode: p.enquiry_mode as Product["enquiry_mode"],
    supports_bulk_order: p.supports_bulk_order,
    supports_retail_order: p.supports_retail_order,
    requires_callback: p.requires_callback,
    seo_title: p.seo_title,
    seo_meta_description: p.seo_meta_description,
    canonical_url: p.canonical_url ?? undefined,
    key_features: parseJson<string[]>(p.key_features, []),
    specifications: parseJson<Record<string, string>>(p.specifications, {}),
    whats_in_box: parseJson<string[]>(p.whats_in_box, []),
    faqs: parseJson<{ question: string; answer: string }[]>(p.faqs, []),
    related_product_ids: parseJson<string[]>(p.related_product_ids, []),
    badges: parseJson<string[]>(p.badges, []),
    not_ideal_for: parseJson<string[]>(p.not_ideal_for, []),
    rating: p.rating ?? undefined,
    review_count: p.review_count ?? undefined,
  };
}

const includeImages = { images: { orderBy: { sort_order: "asc" as const } } };

export async function getDbProducts(): Promise<Product[]> {
  const rows = await prisma.product.findMany({
    where: { is_active: true },
    include: includeImages,
    orderBy: { priority_rank: "asc" },
  });
  return rows.map(toProduct);
}

export async function getDbProductBySlug(slug: string): Promise<Product | undefined> {
  const p = await prisma.product.findUnique({
    where: { slug },
    include: includeImages,
  });
  return p ? toProduct(p) : undefined;
}

export async function getDbProductById(productId: string): Promise<Product | undefined> {
  const p = await prisma.product.findUnique({
    where: { product_id: productId },
    include: includeImages,
  });
  return p ? toProduct(p) : undefined;
}

export async function getDbProductsByCategory(categorySlug: string): Promise<Product[]> {
  const rows = await prisma.product.findMany({
    where: { category_slug: categorySlug, is_active: true },
    include: includeImages,
    orderBy: { priority_rank: "asc" },
  });
  return rows.map(toProduct);
}

export async function getDbFeaturedProducts(): Promise<Product[]> {
  const rows = await prisma.product.findMany({
    where: { is_featured: true, is_active: true },
    include: includeImages,
    orderBy: { priority_rank: "asc" },
  });
  return rows.map(toProduct);
}

export async function getDbHomepageProducts(): Promise<Product[]> {
  const rows = await prisma.product.findMany({
    where: { show_on_homepage: true, is_active: true },
    include: includeImages,
    orderBy: { priority_rank: "asc" },
  });
  return rows.map(toProduct);
}

export async function getDbTrendingProducts(): Promise<Product[]> {
  const rows = await prisma.product.findMany({
    where: { show_in_trending: true, is_active: true },
    include: includeImages,
    orderBy: { priority_rank: "asc" },
  });
  return rows.map(toProduct);
}

export async function getDbBulkProducts(): Promise<Product[]> {
  const rows = await prisma.product.findMany({
    where: { show_on_bulk_page: true, is_active: true },
    include: includeImages,
    orderBy: { priority_rank: "asc" },
  });
  return rows.map(toProduct);
}
