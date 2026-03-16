import Link from "next/link";
import { Package, Upload, LayoutDashboard } from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <LayoutDashboard size={32} /> Solstric Admin
          </h1>
          <p className="text-gray-400 mt-1">Manage products, images, and catalog</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            href="/admin/a7f3c91b6d4e8f20c5b9/products"
            className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-blue-500/50 transition group"
          >
            <div className="flex items-center gap-4 mb-3">
              <div className="p-3 bg-blue-600/20 rounded-lg text-blue-400 group-hover:bg-blue-600/30">
                <Package size={24} />
              </div>
              <div>
                <h2 className="text-xl font-semibold">Product Management</h2>
                <p className="text-gray-400 text-sm">CRUD operations for all products</p>
              </div>
            </div>
            <ul className="text-sm text-gray-400 space-y-1 ml-16">
              <li>View, create, edit, delete products</li>
              <li>Manage hero & carousel images</li>
              <li>Update pricing, SEO, display flags</li>
            </ul>
          </Link>

          <Link
            href="/admin/a7f3c91b6d4e8f20c5b9/product-csv-upload"
            className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-green-500/50 transition group"
          >
            <div className="flex items-center gap-4 mb-3">
              <div className="p-3 bg-green-600/20 rounded-lg text-green-400 group-hover:bg-green-600/30">
                <Upload size={24} />
              </div>
              <div>
                <h2 className="text-xl font-semibold">CSV Upload</h2>
                <p className="text-gray-400 text-sm">Bulk import products via CSV</p>
              </div>
            </div>
            <ul className="text-sm text-gray-400 space-y-1 ml-16">
              <li>Upload product data via CSV</li>
              <li>Validate before importing</li>
              <li>Dry run mode available</li>
            </ul>
          </Link>
        </div>
      </div>
    </div>
  );
}
