"use client";

import { useRouter } from "next/navigation";
import ProductForm from "../ProductForm";
import { createProduct } from "../actions";

export default function NewProductPage() {
  const router = useRouter();

  async function handleSave(data: Record<string, unknown>) {
    const product = await createProduct(data);
    if (product) {
      router.push(`/admin/a7f3c91b6d4e8f20c5b9/products/${product.id}`);
    }
  }

  return <ProductForm onSave={handleSave} isNew />;
}
