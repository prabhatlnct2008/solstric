"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getProducts() {
  return prisma.product.findMany({
    include: { images: { orderBy: { sort_order: "asc" } } },
    orderBy: { updated_at: "desc" },
  });
}

export async function getProductById(id: string) {
  return prisma.product.findUnique({
    where: { id },
    include: { images: { orderBy: { sort_order: "asc" } } },
  });
}

export async function updateProduct(id: string, data: Record<string, unknown>) {
  const product = await prisma.product.update({
    where: { id },
    data: {
      product_id: data.product_id as string,
      sku: data.sku as string,
      product_name: data.product_name as string,
      slug: data.slug as string,
      category: data.category as string,
      category_slug: data.category_slug as string,
      subcategory: data.subcategory as string,
      product_type: data.product_type as string,
      short_title: data.short_title as string,
      short_description: data.short_description as string,
      long_description: data.long_description as string,
      best_for: data.best_for as string,
      use_cases: data.use_cases as string,
      suitable_for_locations: data.suitable_for_locations as string,
      tags: data.tags as string,
      price_mode: data.price_mode as string,
      price_display: data.price_display as string,
      mrp: data.mrp ? Number(data.mrp) : null,
      sale_price: data.sale_price ? Number(data.sale_price) : null,
      bulk_price_note: (data.bulk_price_note as string) || null,
      moq: data.moq ? Number(data.moq) : null,
      is_active: Boolean(data.is_active),
      is_featured: Boolean(data.is_featured),
      show_on_homepage: Boolean(data.show_on_homepage),
      show_on_category_page: Boolean(data.show_on_category_page),
      show_on_bulk_page: Boolean(data.show_on_bulk_page),
      show_in_trending: Boolean(data.show_in_trending),
      show_in_city_pages: Boolean(data.show_in_city_pages),
      priority_rank: Number(data.priority_rank) || 10,
      hero_image_url: data.hero_image_url as string,
      packaging_image_url: (data.packaging_image_url as string) || null,
      lifestyle_image_url: (data.lifestyle_image_url as string) || null,
      spec_sheet_image_url: (data.spec_sheet_image_url as string) || null,
      whatsapp_message_template: data.whatsapp_message_template as string,
      enquiry_mode: data.enquiry_mode as string,
      supports_bulk_order: Boolean(data.supports_bulk_order),
      supports_retail_order: Boolean(data.supports_retail_order),
      requires_callback: Boolean(data.requires_callback),
      seo_title: data.seo_title as string,
      seo_meta_description: data.seo_meta_description as string,
      canonical_url: (data.canonical_url as string) || null,
      key_features: data.key_features as string,
      specifications: data.specifications as string,
      whats_in_box: (data.whats_in_box as string) || null,
      faqs: data.faqs as string,
      related_product_ids: data.related_product_ids as string,
      badges: data.badges as string,
      not_ideal_for: (data.not_ideal_for as string) || null,
      rating: data.rating ? Number(data.rating) : null,
      review_count: data.review_count ? Number(data.review_count) : null,
    },
  });
  revalidatePath("/admin/a7f3c91b6d4e8f20c5b9/products");
  revalidatePath(`/category/${product.category_slug}`);
  revalidatePath(`/category/${product.category_slug}/${product.slug}`);
  return product;
}

export async function createProduct(data: Record<string, unknown>) {
  const product = await prisma.product.create({
    data: {
      product_id: data.product_id as string,
      sku: data.sku as string,
      product_name: data.product_name as string,
      slug: data.slug as string,
      category: data.category as string,
      category_slug: data.category_slug as string,
      subcategory: data.subcategory as string,
      product_type: (data.product_type as string) || "single",
      short_title: data.short_title as string,
      short_description: data.short_description as string,
      long_description: data.long_description as string,
      best_for: (data.best_for as string) || "",
      use_cases: (data.use_cases as string) || "[]",
      suitable_for_locations: (data.suitable_for_locations as string) || "[]",
      tags: (data.tags as string) || "[]",
      price_mode: (data.price_mode as string) || "fixed",
      price_display: data.price_display as string,
      mrp: data.mrp ? Number(data.mrp) : null,
      sale_price: data.sale_price ? Number(data.sale_price) : null,
      bulk_price_note: (data.bulk_price_note as string) || null,
      moq: data.moq ? Number(data.moq) : null,
      is_active: data.is_active !== false,
      is_featured: Boolean(data.is_featured),
      show_on_homepage: Boolean(data.show_on_homepage),
      show_on_category_page: data.show_on_category_page !== false,
      show_on_bulk_page: Boolean(data.show_on_bulk_page),
      show_in_trending: Boolean(data.show_in_trending),
      show_in_city_pages: Boolean(data.show_in_city_pages),
      priority_rank: Number(data.priority_rank) || 10,
      hero_image_url: data.hero_image_url as string,
      whatsapp_message_template: (data.whatsapp_message_template as string) || "",
      enquiry_mode: (data.enquiry_mode as string) || "order",
      supports_bulk_order: Boolean(data.supports_bulk_order),
      supports_retail_order: data.supports_retail_order !== false,
      requires_callback: Boolean(data.requires_callback),
      seo_title: (data.seo_title as string) || "",
      seo_meta_description: (data.seo_meta_description as string) || "",
      key_features: (data.key_features as string) || "[]",
      specifications: (data.specifications as string) || "{}",
      faqs: (data.faqs as string) || "[]",
      related_product_ids: (data.related_product_ids as string) || "[]",
      badges: (data.badges as string) || "[]",
      rating: data.rating ? Number(data.rating) : null,
      review_count: data.review_count ? Number(data.review_count) : null,
    },
  });
  revalidatePath("/admin/a7f3c91b6d4e8f20c5b9/products");
  return product;
}

export async function deleteProduct(id: string) {
  const product = await prisma.product.delete({ where: { id } });
  revalidatePath("/admin/a7f3c91b6d4e8f20c5b9/products");
  revalidatePath(`/category/${product.category_slug}`);
  return { success: true };
}

export async function addProductImage(productId: string, url: string, altText?: string) {
  const maxOrder = await prisma.productImage.findFirst({
    where: { product_id: productId },
    orderBy: { sort_order: "desc" },
  });
  const image = await prisma.productImage.create({
    data: {
      product_id: productId,
      url,
      alt_text: altText || null,
      sort_order: (maxOrder?.sort_order ?? -1) + 1,
    },
  });
  const product = await prisma.product.findUnique({ where: { id: productId } });
  revalidatePath("/admin/a7f3c91b6d4e8f20c5b9/products");
  if (product) {
    revalidatePath(`/category/${product.category_slug}`);
    revalidatePath(`/category/${product.category_slug}/${product.slug}`);
    revalidatePath("/");
  }
  return image;
}

export async function deleteProductImage(imageId: string) {
  const image = await prisma.productImage.findUnique({ where: { id: imageId }, include: { product: true } });
  await prisma.productImage.delete({ where: { id: imageId } });
  revalidatePath("/admin/a7f3c91b6d4e8f20c5b9/products");
  if (image?.product) {
    revalidatePath(`/category/${image.product.category_slug}`);
    revalidatePath(`/category/${image.product.category_slug}/${image.product.slug}`);
    revalidatePath("/");
  }
  return { success: true };
}

export async function updateHeroImage(productId: string, url: string) {
  const product = await prisma.product.update({
    where: { id: productId },
    data: { hero_image_url: url },
  });
  revalidatePath("/admin/a7f3c91b6d4e8f20c5b9/products");
  revalidatePath(`/category/${product.category_slug}`);
  revalidatePath(`/category/${product.category_slug}/${product.slug}`);
  revalidatePath("/");
  return { success: true };
}

export async function reorderImages(imageIds: string[]) {
  for (let i = 0; i < imageIds.length; i++) {
    await prisma.productImage.update({
      where: { id: imageIds[i] },
      data: { sort_order: i },
    });
  }
  revalidatePath("/admin/a7f3c91b6d4e8f20c5b9/products");
  return { success: true };
}
