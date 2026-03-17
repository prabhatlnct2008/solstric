"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Save, X, Plus, Trash2, Image as ImageIcon, ArrowLeft, Upload, Link as LinkIcon, Loader2 } from "lucide-react";
import Link from "next/link";
import ImageUploader from "@/components/ImageUploader";

interface ProductImage {
  id: string;
  url: string;
  alt_text: string | null;
  sort_order: number;
}

interface FormProduct {
  id?: string;
  product_id: string;
  sku: string;
  product_name: string;
  slug: string;
  category: string;
  category_slug: string;
  subcategory: string;
  product_type: string;
  short_title: string;
  short_description: string;
  long_description: string;
  best_for: string;
  use_cases: string;
  suitable_for_locations: string;
  tags: string;
  price_mode: string;
  price_display: string;
  mrp: number | null;
  sale_price: number | null;
  bulk_price_note: string | null;
  moq: number | null;
  is_active: boolean;
  is_featured: boolean;
  show_on_homepage: boolean;
  show_on_category_page: boolean;
  show_on_bulk_page: boolean;
  show_in_trending: boolean;
  show_in_city_pages: boolean;
  priority_rank: number;
  hero_image_url: string;
  packaging_image_url: string | null;
  lifestyle_image_url: string | null;
  spec_sheet_image_url: string | null;
  whatsapp_message_template: string;
  enquiry_mode: string;
  supports_bulk_order: boolean;
  supports_retail_order: boolean;
  requires_callback: boolean;
  seo_title: string;
  seo_meta_description: string;
  canonical_url: string | null;
  key_features: string;
  specifications: string;
  whats_in_box: string | null;
  faqs: string;
  related_product_ids: string;
  badges: string;
  not_ideal_for: string | null;
  rating: number | null;
  review_count: number | null;
  images?: ProductImage[];
}

const CATEGORIES = [
  { name: "Alternative Cooking", slug: "alternative-cooking" },
  { name: "Village / Hybrid Kitchen", slug: "village-hybrid-kitchen" },
  { name: "Solar & Power Backup", slug: "solar-power-backup" },
  { name: "Commercial / Stall Solutions", slug: "commercial-stall-solutions" },
  { name: "Retailer / Bulk Orders", slug: "retailer-bulk-orders" },
];

interface Props {
  product?: FormProduct;
  onSave: (data: Record<string, unknown>) => Promise<void>;
  onAddImage?: (url: string, altText: string) => Promise<void>;
  onDeleteImage?: (imageId: string) => Promise<void>;
  onUpdateHeroImage?: (url: string) => Promise<void>;
  isNew?: boolean;
}

export default function ProductForm({
  product,
  onSave,
  onAddImage,
  onDeleteImage,
  onUpdateHeroImage,
  isNew,
}: Props) {
  const [form, setForm] = useState<FormProduct>(
    product || {
      product_id: "",
      sku: "",
      product_name: "",
      slug: "",
      category: "Alternative Cooking",
      category_slug: "alternative-cooking",
      subcategory: "",
      product_type: "single",
      short_title: "",
      short_description: "",
      long_description: "",
      best_for: "",
      use_cases: "[]",
      suitable_for_locations: "[]",
      tags: "[]",
      price_mode: "fixed",
      price_display: "",
      mrp: null,
      sale_price: null,
      bulk_price_note: null,
      moq: null,
      is_active: true,
      is_featured: false,
      show_on_homepage: false,
      show_on_category_page: true,
      show_on_bulk_page: false,
      show_in_trending: false,
      show_in_city_pages: false,
      priority_rank: 10,
      hero_image_url: "",
      packaging_image_url: null,
      lifestyle_image_url: null,
      spec_sheet_image_url: null,
      whatsapp_message_template: "",
      enquiry_mode: "order",
      supports_bulk_order: false,
      supports_retail_order: true,
      requires_callback: false,
      seo_title: "",
      seo_meta_description: "",
      canonical_url: null,
      key_features: "[]",
      specifications: "{}",
      whats_in_box: null,
      faqs: "[]",
      related_product_ids: "[]",
      badges: "[]",
      not_ideal_for: null,
      rating: null,
      review_count: null,
    }
  );
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState<"basic" | "pricing" | "display" | "content" | "seo" | "images">("basic");
  const [newImageUrl, setNewImageUrl] = useState("");
  const [newImageAlt, setNewImageAlt] = useState("");
  const [newHeroUrl, setNewHeroUrl] = useState("");

  // Sync images and hero_image_url from parent when product prop changes (after add/delete)
  useEffect(() => {
    if (product) {
      setForm((prev) => ({
        ...prev,
        images: product.images,
        hero_image_url: product.hero_image_url,
      }));
      console.log("[ProductForm] Synced from props — images:", product.images?.length, "hero:", product.hero_image_url);
    }
  }, [product]);

  function updateField(field: string, value: unknown) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setSaved(false);
  }

  function handleCategoryChange(categoryName: string) {
    const cat = CATEGORIES.find((c) => c.name === categoryName);
    if (cat) {
      updateField("category", cat.name);
      updateField("category_slug", cat.slug);
    }
  }

  async function handleSave() {
    setSaving(true);
    try {
      await onSave(form as unknown as Record<string, unknown>);
      setSaved(true);
    } catch (e) {
      console.error(e);
      alert("Error saving product");
    }
    setSaving(false);
  }

  async function handleAddImage() {
    if (!newImageUrl || !onAddImage) return;
    await onAddImage(newImageUrl, newImageAlt);
    setNewImageUrl("");
    setNewImageAlt("");
  }

  async function handleUpdateHero() {
    if (!newHeroUrl || !onUpdateHeroImage) return;
    await onUpdateHeroImage(newHeroUrl);
    updateField("hero_image_url", newHeroUrl);
    setNewHeroUrl("");
  }

  const tabs = [
    { id: "basic" as const, label: "Basic Info" },
    { id: "pricing" as const, label: "Pricing" },
    { id: "display" as const, label: "Display" },
    { id: "content" as const, label: "Content" },
    { id: "seo" as const, label: "SEO" },
    { id: "images" as const, label: "Images" },
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Link
              href="/admin/a7f3c91b6d4e8f20c5b9/products"
              className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700"
            >
              <ArrowLeft size={20} />
            </Link>
            <div>
              <h1 className="text-2xl font-bold">
                {isNew ? "Add New Product" : `Edit: ${form.product_name}`}
              </h1>
              {!isNew && (
                <p className="text-gray-400 text-sm">ID: {form.product_id}</p>
              )}
            </div>
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-medium ${
              saved
                ? "bg-green-600 text-white"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            } disabled:opacity-50`}
          >
            <Save size={18} />
            {saving ? "Saving..." : saved ? "Saved!" : "Save Changes"}
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 bg-gray-900 rounded-xl p-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition ${
                activeTab === tab.id
                  ? "bg-gray-700 text-white"
                  : "text-gray-400 hover:text-gray-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
          {activeTab === "basic" && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Field label="Product ID" value={form.product_id} onChange={(v) => updateField("product_id", v)} placeholder="e.g., ALT-IND-001" />
                <Field label="SKU" value={form.sku} onChange={(v) => updateField("sku", v)} placeholder="e.g., PRS-PIC20" />
              </div>
              <Field label="Product Name" value={form.product_name} onChange={(v) => updateField("product_name", v)} placeholder="Full product name" />
              <Field label="Slug" value={form.slug} onChange={(v) => updateField("slug", v)} placeholder="url-friendly-slug" />
              <Field label="Short Title" value={form.short_title} onChange={(v) => updateField("short_title", v)} />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Category</label>
                  <select
                    value={form.category}
                    onChange={(e) => handleCategoryChange(e.target.value)}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c.slug} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <Field label="Subcategory" value={form.subcategory} onChange={(v) => updateField("subcategory", v)} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Product Type</label>
                  <select
                    value={form.product_type}
                    onChange={(e) => updateField("product_type", e.target.value)}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white"
                  >
                    <option value="single">Single</option>
                    <option value="bundle">Bundle</option>
                    <option value="family">Family</option>
                    <option value="category-support">Category Support</option>
                  </select>
                </div>
                <Field label="Best For" value={form.best_for} onChange={(v) => updateField("best_for", v)} />
              </div>
              <TextArea label="Short Description" value={form.short_description} onChange={(v) => updateField("short_description", v)} rows={2} />
              <TextArea label="Long Description" value={form.long_description} onChange={(v) => updateField("long_description", v)} rows={5} />
            </div>
          )}

          {activeTab === "pricing" && (
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Price Mode</label>
                  <select
                    value={form.price_mode}
                    onChange={(e) => updateField("price_mode", e.target.value)}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white"
                  >
                    <option value="fixed">Fixed</option>
                    <option value="variable">Variable</option>
                    <option value="quote-based">Quote Based</option>
                  </select>
                </div>
                <Field label="Price Display" value={form.price_display} onChange={(v) => updateField("price_display", v)} placeholder="e.g., ₹2,499" />
                <Field label="MRP" value={String(form.mrp || "")} onChange={(v) => updateField("mrp", v ? Number(v) : null)} type="number" />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <Field label="Sale Price" value={String(form.sale_price || "")} onChange={(v) => updateField("sale_price", v ? Number(v) : null)} type="number" />
                <Field label="MOQ" value={String(form.moq || "")} onChange={(v) => updateField("moq", v ? Number(v) : null)} type="number" />
                <Field label="Bulk Price Note" value={form.bulk_price_note || ""} onChange={(v) => updateField("bulk_price_note", v || null)} />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Enquiry Mode</label>
                  <select
                    value={form.enquiry_mode}
                    onChange={(e) => updateField("enquiry_mode", e.target.value)}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white"
                  >
                    <option value="order">Order</option>
                    <option value="quote">Quote</option>
                    <option value="callback">Callback</option>
                  </select>
                </div>
                <div className="flex items-end gap-4">
                  <Checkbox label="Supports Bulk Order" checked={form.supports_bulk_order} onChange={(v) => updateField("supports_bulk_order", v)} />
                  <Checkbox label="Supports Retail Order" checked={form.supports_retail_order} onChange={(v) => updateField("supports_retail_order", v)} />
                </div>
                <div className="flex items-end">
                  <Checkbox label="Requires Callback" checked={form.requires_callback} onChange={(v) => updateField("requires_callback", v)} />
                </div>
              </div>
              <TextArea label="WhatsApp Message Template" value={form.whatsapp_message_template} onChange={(v) => updateField("whatsapp_message_template", v)} rows={2} />
            </div>
          )}

          {activeTab === "display" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-3">Visibility Flags</h3>
                <div className="grid grid-cols-2 gap-3">
                  <Checkbox label="Active" checked={form.is_active} onChange={(v) => updateField("is_active", v)} />
                  <Checkbox label="Featured" checked={form.is_featured} onChange={(v) => updateField("is_featured", v)} />
                  <Checkbox label="Show on Homepage" checked={form.show_on_homepage} onChange={(v) => updateField("show_on_homepage", v)} />
                  <Checkbox label="Show on Category Page" checked={form.show_on_category_page} onChange={(v) => updateField("show_on_category_page", v)} />
                  <Checkbox label="Show on Bulk Page" checked={form.show_on_bulk_page} onChange={(v) => updateField("show_on_bulk_page", v)} />
                  <Checkbox label="Show in Trending" checked={form.show_in_trending} onChange={(v) => updateField("show_in_trending", v)} />
                  <Checkbox label="Show in City Pages" checked={form.show_in_city_pages} onChange={(v) => updateField("show_in_city_pages", v)} />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <Field label="Priority Rank" value={String(form.priority_rank)} onChange={(v) => updateField("priority_rank", Number(v) || 10)} type="number" />
                <Field label="Rating" value={String(form.rating || "")} onChange={(v) => updateField("rating", v ? Number(v) : null)} type="number" />
                <Field label="Review Count" value={String(form.review_count || "")} onChange={(v) => updateField("review_count", v ? Number(v) : null)} type="number" />
              </div>
              <TextArea label="Badges (JSON array)" value={form.badges} onChange={(v) => updateField("badges", v)} rows={2} placeholder='["Bestseller", "Premium"]' />
              <TextArea label="Tags (JSON array)" value={form.tags} onChange={(v) => updateField("tags", v)} rows={2} placeholder='["induction", "budget"]' />
            </div>
          )}

          {activeTab === "content" && (
            <div className="space-y-4">
              <TextArea label="Key Features (JSON array)" value={form.key_features} onChange={(v) => updateField("key_features", v)} rows={4} placeholder='["Feature 1", "Feature 2"]' />
              <TextArea label="Specifications (JSON object)" value={form.specifications} onChange={(v) => updateField("specifications", v)} rows={4} placeholder='{"Power": "1600W", "Weight": "2.1 kg"}' />
              <TextArea label="What's in Box (JSON array)" value={form.whats_in_box || ""} onChange={(v) => updateField("whats_in_box", v || null)} rows={3} placeholder='["Item 1", "Item 2"]' />
              <TextArea label="FAQs (JSON array)" value={form.faqs} onChange={(v) => updateField("faqs", v)} rows={5} placeholder='[{"question": "...", "answer": "..."}]' />
              <TextArea label="Use Cases (JSON array)" value={form.use_cases} onChange={(v) => updateField("use_cases", v)} rows={2} />
              <TextArea label="Suitable For Locations (JSON array)" value={form.suitable_for_locations} onChange={(v) => updateField("suitable_for_locations", v)} rows={2} />
              <TextArea label="Related Product IDs (JSON array)" value={form.related_product_ids} onChange={(v) => updateField("related_product_ids", v)} rows={2} placeholder='["ALT-IND-001", "ALT-RC-001"]' />
              <TextArea label="Not Ideal For (JSON array)" value={form.not_ideal_for || ""} onChange={(v) => updateField("not_ideal_for", v || null)} rows={2} />
            </div>
          )}

          {activeTab === "seo" && (
            <div className="space-y-4">
              <Field label="SEO Title" value={form.seo_title} onChange={(v) => updateField("seo_title", v)} />
              <TextArea label="SEO Meta Description" value={form.seo_meta_description} onChange={(v) => updateField("seo_meta_description", v)} rows={3} />
              <Field label="Canonical URL" value={form.canonical_url || ""} onChange={(v) => updateField("canonical_url", v || null)} />
            </div>
          )}

          {activeTab === "images" && (
            <div className="space-y-6">
              {/* Hero Image */}
              <div>
                <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
                  <ImageIcon size={20} /> Hero Image
                </h3>
                <ImageUploader
                  productId={form.product_id || undefined}
                  currentImage={form.hero_image_url || null}
                  onImageReady={(url) => {
                    updateField("hero_image_url", url);
                    if (!isNew && onUpdateHeroImage) {
                      onUpdateHeroImage(url);
                    }
                  }}
                />
              </div>

              {/* Additional Images */}
              <div className="grid grid-cols-2 gap-6">
                <ImageUploader
                  label="Packaging Image"
                  productId={form.product_id || undefined}
                  currentImage={form.packaging_image_url}
                  onImageReady={(url) => updateField("packaging_image_url", url)}
                  compact
                />
                <ImageUploader
                  label="Lifestyle Image"
                  productId={form.product_id || undefined}
                  currentImage={form.lifestyle_image_url}
                  onImageReady={(url) => updateField("lifestyle_image_url", url)}
                  compact
                />
              </div>

              {/* Gallery / Carousel Images */}
              {!isNew && (
                <div>
                  <h3 className="text-lg font-medium mb-3">
                    Gallery / Carousel Images ({form.images?.length || 0})
                  </h3>
                  <div className="grid grid-cols-4 gap-4 mb-4">
                    {form.images?.map((img) => (
                      <div
                        key={img.id}
                        className="relative group bg-gray-800 rounded-lg overflow-hidden border border-gray-700"
                      >
                        <img
                          src={img.url}
                          alt={img.alt_text || "Gallery image"}
                          className="w-full h-32 object-cover"
                        />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                          <button
                            onClick={() => {
                              console.log("[ProductForm] Deleting gallery image:", img.id, img.url);
                              onDeleteImage?.(img.id);
                            }}
                            className="p-2 bg-red-600 rounded-full text-white hover:bg-red-700"
                            title="Delete image"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                        <p className="text-xs text-gray-400 p-2 truncate">
                          {img.alt_text || img.url.split("/").pop()}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Add gallery image - upload or URL */}
                  {onAddImage && (
                    <div className="space-y-3 bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                      <p className="text-sm font-medium text-gray-300">Add Gallery Image</p>
                      <GalleryImageAdder
                        productId={form.product_id || undefined}
                        onAdd={(url, altText) => onAddImage(url, altText)}
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-gray-300 mb-1">
          {label}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
      />
    </div>
  );
}

function TextArea({
  label,
  value,
  onChange,
  rows = 3,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-1">
        {label}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        placeholder={placeholder}
        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 resize-y"
      />
    </div>
  );
}

function Checkbox({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="w-4 h-4 rounded bg-gray-800 border-gray-600 text-blue-500 focus:ring-blue-500"
      />
      <span className="text-sm text-gray-300">{label}</span>
    </label>
  );
}

function GalleryImageAdder({
  productId,
  onAdd,
}: {
  productId?: string;
  onAdd: (url: string, altText: string) => Promise<void>;
}) {
  const [mode, setMode] = useState<"upload" | "url">("upload");
  const [urlInput, setUrlInput] = useState("");
  const [altText, setAltText] = useState("");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File) {
    setError(null);
    console.log("[GalleryImageAdder] handleFile — name:", file.name, "type:", file.type, "size:", file.size, "productId:", productId);

    if (!["image/jpeg", "image/png", "image/webp", "image/gif"].includes(file.type)) {
      setError("Invalid file type. Use JPEG, PNG, WebP, or GIF.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("File too large. Maximum 5MB.");
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      if (productId) formData.append("productId", productId);

      console.log("[GalleryImageAdder] Uploading to /api/upload...");
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      console.log("[GalleryImageAdder] Upload response:", res.status, data);

      if (!res.ok) throw new Error(data.error || "Upload failed");

      const imageAlt = altText || file.name.replace(/\.[^.]+$/, "");
      console.log("[GalleryImageAdder] Calling onAdd — url:", data.url, "alt:", imageAlt);
      await onAdd(data.url, imageAlt);
      console.log("[GalleryImageAdder] onAdd completed successfully");
      setAltText("");
    } catch (err) {
      console.error("[GalleryImageAdder] Error:", err);
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  async function handleUrlAdd() {
    const trimmed = urlInput.trim();
    if (!trimmed) return;
    setError(null);

    if (!trimmed.startsWith("http://") && !trimmed.startsWith("https://")) {
      setError("URL must start with http:// or https://");
      return;
    }

    console.log("[GalleryImageAdder] handleUrlAdd — url:", trimmed, "alt:", altText);
    try {
      await onAdd(trimmed, altText);
      console.log("[GalleryImageAdder] URL add completed successfully");
      setUrlInput("");
      setAltText("");
    } catch (err) {
      console.error("[GalleryImageAdder] URL add error:", err);
      setError(err instanceof Error ? err.message : "Failed to add image");
    }
  }

  return (
    <div className="space-y-3">
      {/* Mode toggle */}
      <div className="flex gap-1 bg-gray-800 rounded-lg p-0.5 w-fit">
        <button
          type="button"
          onClick={() => setMode("upload")}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition ${
            mode === "upload" ? "bg-gray-600 text-white" : "text-gray-400 hover:text-gray-200"
          }`}
        >
          <Upload size={13} /> Upload File
        </button>
        <button
          type="button"
          onClick={() => setMode("url")}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition ${
            mode === "url" ? "bg-gray-600 text-white" : "text-gray-400 hover:text-gray-200"
          }`}
        >
          <LinkIcon size={13} /> Paste URL
        </button>
      </div>

      <div className="flex gap-2 items-end">
        {mode === "upload" ? (
          <div className="flex-1">
            <div
              onClick={() => fileInputRef.current?.click()}
              onDrop={(e) => {
                e.preventDefault();
                const file = e.dataTransfer.files[0];
                if (file) handleFile(file);
              }}
              onDragOver={(e) => e.preventDefault()}
              className="border-2 border-dashed border-gray-700 hover:border-gray-500 rounded-lg p-3 text-center cursor-pointer bg-gray-800/50 transition"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFile(file);
                  e.target.value = "";
                }}
              />
              {uploading ? (
                <div className="flex items-center justify-center gap-2 text-gray-400">
                  <Loader2 size={16} className="animate-spin" /> Uploading...
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2 text-gray-400 text-sm">
                  <Upload size={16} /> Click or drag to upload (max 5MB)
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex-1">
            <input
              type="text"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleUrlAdd()}
              placeholder="https://example.com/image.jpg"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-blue-500"
            />
          </div>
        )}
        <div className="w-40">
          <input
            type="text"
            value={altText}
            onChange={(e) => setAltText(e.target.value)}
            placeholder="Alt text"
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-blue-500"
          />
        </div>
        {mode === "url" && (
          <button
            type="button"
            onClick={handleUrlAdd}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm"
          >
            <Plus size={16} /> Add
          </button>
        )}
      </div>

      {error && (
        <p className="text-red-400 text-sm flex items-center gap-1">
          <X size={14} /> {error}
        </p>
      )}
    </div>
  );
}
