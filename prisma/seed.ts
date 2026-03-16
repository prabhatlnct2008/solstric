import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const { products } = await import("../src/data/products.js");

  console.log("Seeding database...");

  for (const p of products) {
    const productData = {
      product_id: p.product_id,
      sku: p.sku,
      product_name: p.product_name,
      slug: p.slug,
      category: p.category,
      category_slug: p.category_slug,
      subcategory: p.subcategory,
      product_type: p.product_type,
      short_title: p.short_title,
      short_description: p.short_description,
      long_description: p.long_description,
      best_for: p.best_for,
      use_cases: JSON.stringify(p.use_cases),
      suitable_for_locations: JSON.stringify(p.suitable_for_locations),
      tags: JSON.stringify(p.tags),
      price_mode: p.price_mode,
      price_display: p.price_display,
      mrp: p.mrp ?? null,
      sale_price: p.sale_price ?? null,
      bulk_price_note: p.bulk_price_note ?? null,
      moq: p.moq ?? null,
      is_active: p.is_active,
      is_featured: p.is_featured,
      show_on_homepage: p.show_on_homepage,
      show_on_category_page: p.show_on_category_page,
      show_on_bulk_page: p.show_on_bulk_page,
      show_in_trending: p.show_in_trending,
      show_in_city_pages: p.show_in_city_pages,
      priority_rank: p.priority_rank,
      hero_image_url: p.hero_image_url,
      packaging_image_url: p.packaging_image_url ?? null,
      lifestyle_image_url: p.lifestyle_image_url ?? null,
      spec_sheet_image_url: p.spec_sheet_image_url ?? null,
      whatsapp_message_template: p.whatsapp_message_template,
      enquiry_mode: p.enquiry_mode,
      supports_bulk_order: p.supports_bulk_order,
      supports_retail_order: p.supports_retail_order,
      requires_callback: p.requires_callback,
      seo_title: p.seo_title,
      seo_meta_description: p.seo_meta_description,
      canonical_url: p.canonical_url ?? null,
      key_features: JSON.stringify(p.key_features),
      specifications: JSON.stringify(p.specifications),
      whats_in_box: p.whats_in_box ? JSON.stringify(p.whats_in_box) : null,
      faqs: JSON.stringify(p.faqs),
      related_product_ids: JSON.stringify(p.related_product_ids),
      badges: JSON.stringify(p.badges),
      not_ideal_for: p.not_ideal_for ? JSON.stringify(p.not_ideal_for) : null,
      rating: p.rating ?? null,
      review_count: p.review_count ?? null,
    };

    const created = await prisma.product.upsert({
      where: { product_id: p.product_id },
      update: productData,
      create: productData,
    });

    // Seed gallery images
    if (p.gallery_images && p.gallery_images.length > 0) {
      await prisma.productImage.deleteMany({
        where: { product_id: created.id },
      });

      for (let i = 0; i < p.gallery_images.length; i++) {
        await prisma.productImage.create({
          data: {
            product_id: created.id,
            url: p.gallery_images[i],
            alt_text: `${p.product_name} - Image ${i + 1}`,
            sort_order: i,
          },
        });
      }
    }

    console.log(`  Seeded: ${p.product_name}`);
  }

  console.log(`\nDone! Seeded ${products.length} products.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
