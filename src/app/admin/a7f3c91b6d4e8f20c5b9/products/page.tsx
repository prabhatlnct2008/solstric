"use client";

import { useState, useEffect } from "react";
import { getProducts, deleteProduct } from "./actions";
import Link from "next/link";
import { Trash2, Edit, Plus, Search, Eye, EyeOff } from "lucide-react";

interface ProductRow {
  id: string;
  product_id: string;
  product_name: string;
  slug: string;
  category: string;
  price_display: string;
  is_active: boolean;
  is_featured: boolean;
  hero_image_url: string;
  priority_rank: number;
  images: { id: string; url: string }[];
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<ProductRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    setLoading(true);
    const data = await getProducts();
    setProducts(data as unknown as ProductRow[]);
    setLoading(false);
  }

  async function handleDelete(id: string) {
    await deleteProduct(id);
    setDeleteConfirm(null);
    loadProducts();
  }

  const filtered = products.filter((p) => {
    const matchesSearch =
      !search ||
      p.product_name.toLowerCase().includes(search.toLowerCase()) ||
      p.product_id.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = !categoryFilter || p.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const categories = [...new Set(products.map((p) => p.category))];

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Product Management</h1>
            <p className="text-gray-400 mt-1">
              {products.length} products total
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/admin/a7f3c91b6d4e8f20c5b9/products/new"
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
            >
              <Plus size={18} /> Add Product
            </Link>
            <Link
              href="/admin/a7f3c91b6d4e8f20c5b9/product-csv-upload"
              className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
            >
              CSV Upload
            </Link>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search by name or ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
            />
          </div>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
          >
            <option value="">All Categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* Product Table */}
        {loading ? (
          <div className="text-center py-20 text-gray-400">
            Loading products...
          </div>
        ) : (
          <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800 text-gray-400 text-sm">
                  <th className="text-left p-4">Product</th>
                  <th className="text-left p-4">Category</th>
                  <th className="text-left p-4">Price</th>
                  <th className="text-center p-4">Status</th>
                  <th className="text-center p-4">Images</th>
                  <th className="text-center p-4">Rank</th>
                  <th className="text-right p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((product) => (
                  <tr
                    key={product.id}
                    className="border-b border-gray-800/50 hover:bg-gray-800/30"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={product.hero_image_url}
                          alt={product.product_name}
                          className="w-12 h-12 rounded-lg object-cover bg-gray-800"
                        />
                        <div>
                          <p className="font-medium text-white text-sm">
                            {product.product_name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {product.product_id}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-sm text-gray-300">
                      {product.category}
                    </td>
                    <td className="p-4 text-sm text-gray-300">
                      {product.price_display}
                    </td>
                    <td className="p-4 text-center">
                      {product.is_active ? (
                        <span className="inline-flex items-center gap-1 text-green-400 text-xs">
                          <Eye size={14} /> Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-red-400 text-xs">
                          <EyeOff size={14} /> Hidden
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-center text-sm text-gray-400">
                      {product.images.length}
                    </td>
                    <td className="p-4 text-center text-sm text-gray-400">
                      {product.priority_rank}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/a7f3c91b6d4e8f20c5b9/products/${product.id}`}
                          className="p-2 bg-blue-600/20 text-blue-400 rounded-lg hover:bg-blue-600/30"
                          title="Edit"
                        >
                          <Edit size={16} />
                        </Link>
                        {deleteConfirm === product.id ? (
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => handleDelete(product.id)}
                              className="px-2 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700"
                            >
                              Confirm
                            </button>
                            <button
                              onClick={() => setDeleteConfirm(null)}
                              className="px-2 py-1 bg-gray-600 text-white text-xs rounded hover:bg-gray-700"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setDeleteConfirm(product.id)}
                            className="p-2 bg-red-600/20 text-red-400 rounded-lg hover:bg-red-600/30"
                            title="Delete"
                          >
                            <Trash2 size={16} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                No products found matching your filters.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
