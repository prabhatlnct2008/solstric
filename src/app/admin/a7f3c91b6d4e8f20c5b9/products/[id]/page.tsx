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
    const data = await getProductById(id);
    if (!data) {
      router.push("/admin/a7f3c91b6d4e8f20c5b9/products");
      return;
    }
    setProduct(data as unknown as Record<string, unknown>);
    setLoading(false);
  }

  async function handleSave(data: Record<string, unknown>) {
    await updateProduct(id, data);
  }

  async function handleAddImage(url: string, altText: string) {
    await addProductImage(id, url, altText);
    await loadProduct();
  }

  async function handleDeleteImage(imageId: string) {
    await deleteProductImage(imageId);
    await loadProduct();
  }

  async function handleUpdateHero(url: string) {
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
