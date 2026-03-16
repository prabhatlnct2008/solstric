-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "product_id" TEXT NOT NULL,
    "sku" TEXT NOT NULL,
    "product_name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "category_slug" TEXT NOT NULL,
    "subcategory" TEXT NOT NULL,
    "product_type" TEXT NOT NULL DEFAULT 'single',
    "short_title" TEXT NOT NULL,
    "short_description" TEXT NOT NULL,
    "long_description" TEXT NOT NULL,
    "best_for" TEXT NOT NULL,
    "use_cases" TEXT NOT NULL,
    "suitable_for_locations" TEXT NOT NULL,
    "tags" TEXT NOT NULL,
    "price_mode" TEXT NOT NULL DEFAULT 'fixed',
    "price_display" TEXT NOT NULL,
    "mrp" REAL,
    "sale_price" REAL,
    "bulk_price_note" TEXT,
    "moq" INTEGER,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "is_featured" BOOLEAN NOT NULL DEFAULT false,
    "show_on_homepage" BOOLEAN NOT NULL DEFAULT false,
    "show_on_category_page" BOOLEAN NOT NULL DEFAULT true,
    "show_on_bulk_page" BOOLEAN NOT NULL DEFAULT false,
    "show_in_trending" BOOLEAN NOT NULL DEFAULT false,
    "show_in_city_pages" BOOLEAN NOT NULL DEFAULT false,
    "priority_rank" INTEGER NOT NULL DEFAULT 10,
    "hero_image_url" TEXT NOT NULL,
    "packaging_image_url" TEXT,
    "lifestyle_image_url" TEXT,
    "spec_sheet_image_url" TEXT,
    "whatsapp_message_template" TEXT NOT NULL,
    "enquiry_mode" TEXT NOT NULL DEFAULT 'order',
    "supports_bulk_order" BOOLEAN NOT NULL DEFAULT false,
    "supports_retail_order" BOOLEAN NOT NULL DEFAULT true,
    "requires_callback" BOOLEAN NOT NULL DEFAULT false,
    "seo_title" TEXT NOT NULL,
    "seo_meta_description" TEXT NOT NULL,
    "canonical_url" TEXT,
    "key_features" TEXT NOT NULL,
    "specifications" TEXT NOT NULL,
    "whats_in_box" TEXT,
    "faqs" TEXT NOT NULL,
    "related_product_ids" TEXT NOT NULL,
    "badges" TEXT NOT NULL,
    "not_ideal_for" TEXT,
    "rating" REAL,
    "review_count" INTEGER,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "ProductImage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "product_id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "alt_text" TEXT,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ProductImage_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Product_product_id_key" ON "Product"("product_id");

-- CreateIndex
CREATE UNIQUE INDEX "Product_sku_key" ON "Product"("sku");

-- CreateIndex
CREATE UNIQUE INDEX "Product_slug_key" ON "Product"("slug");

-- CreateIndex
CREATE INDEX "ProductImage_product_id_idx" ON "ProductImage"("product_id");
