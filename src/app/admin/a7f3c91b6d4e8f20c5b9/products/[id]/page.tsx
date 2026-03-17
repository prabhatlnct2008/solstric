"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import ProductForm from "../ProductForm";
import {
  getProductById,
  updateProduct,
  addProductImage,
  deleteProductImage,
  updateHeroImage,
} from "../actions";

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [product, setProduct] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProduct();
  }, [id]);

  async function loadProduct() {
    console.log("[EditPage] Loading product:", id);
    const data = await getProductById(id);
    if (!data) {
      console.warn("[EditPage] Product not found, redirecting");
      router.push("/admin/a7f3c91b6d4e8f20c5b9/products");
      return;
    }
    console.log("[EditPage] Loaded product:", data.product_name, "— images:", (data as Record<string, unknown> & { images?: unknown[] }).images?.length ?? 0);
    setProduct(data as unknown as Record<string, unknown>);
    setLoading(false);
  }

  async function handleSave(data: Record<string, unknown>) {
    await updateProduct(id, data);
  }

  async function handleAddImage(url: string, altText: string) {
    console.log("[EditPage] handleAddImage — url:", url, "altText:", altText, "productId (cuid):", id);
    try {
      await addProductImage(id, url, altText);
      console.log("[EditPage] addProductImage succeeded, reloading...");
      await loadProduct();
    } catch (error) {
      console.error("[EditPage] handleAddImage error:", error);
      throw error;
    }
  }

  async function handleDeleteImage(imageId: string) {
    console.log("[EditPage] handleDeleteImage — imageId:", imageId);
    try {
      await deleteProductImage(imageId);
      console.log("[EditPage] deleteProductImage succeeded, reloading...");
      await loadProduct();
    } catch (error) {
      console.error("[EditPage] handleDeleteImage error:", error);
      throw error;
    }
  }

  async function handleUpdateHero(url: string) {
    console.log("[EditPage] handleUpdateHero — url:", url);
    await updateHeroImage(id, url);
    await loadProduct();
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
        <p className="text-gray-400">Loading product...</p>
      </div>
    );
  }

  return (
    <ProductForm
      product={product as never}
      onSave={handleSave}
      onAddImage={handleAddImage}
      onDeleteImage={handleDeleteImage}
      onUpdateHeroImage={handleUpdateHero}
    />
  );
}
