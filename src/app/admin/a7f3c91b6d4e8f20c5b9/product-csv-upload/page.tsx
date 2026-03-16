"use client";

import { useState, useCallback } from "react";
import { Upload, FileSpreadsheet, CheckCircle, AlertCircle, Download, X } from "lucide-react";

interface CSVRow {
  [key: string]: string;
}

interface ValidationResult {
  totalRows: number;
  newProducts: number;
  existingProducts: number;
  missingHeroImage: number;
  invalidCategories: number;
  invalidImageUrls: number;
  duplicateIds: number;
  errors: string[];
  rows: CSVRow[];
}

const VALID_CATEGORIES = [
  "Alternative Cooking",
  "Village / Hybrid Kitchen",
  "Solar & Power Backup",
  "Commercial / Stall Solutions",
  "Retailer / Bulk Orders",
];

const REQUIRED_FIELDS = ["product_id", "product_name", "category", "subcategory", "short_description", "hero_image_url", "slug"];

function parseCSV(text: string): CSVRow[] {
  const lines = text.trim().split("\n");
  if (lines.length < 2) return [];
  const headers = lines[0].split(",").map((h) => h.trim().replace(/"/g, ""));
  return lines.slice(1).map((line) => {
    const values = line.split(",").map((v) => v.trim().replace(/"/g, ""));
    const row: CSVRow = {};
    headers.forEach((header, i) => {
      row[header] = values[i] || "";
    });
    return row;
  });
}

function validateRows(rows: CSVRow[]): ValidationResult {
  const result: ValidationResult = {
    totalRows: rows.length,
    newProducts: 0,
    existingProducts: 0,
    missingHeroImage: 0,
    invalidCategories: 0,
    invalidImageUrls: 0,
    duplicateIds: 0,
    errors: [],
    rows,
  };

  const ids = new Set<string>();
  const urlRegex = /^https?:\/\/.+/;

  rows.forEach((row, i) => {
    const rowNum = i + 2;

    // Check required fields
    REQUIRED_FIELDS.forEach((field) => {
      if (!row[field]) {
        result.errors.push(`Row ${rowNum}: Missing required field "${field}"`);
      }
    });

    // Check category
    if (row.category && !VALID_CATEGORIES.includes(row.category)) {
      result.invalidCategories++;
      result.errors.push(`Row ${rowNum}: Invalid category "${row.category}"`);
    }

    // Check hero image
    if (!row.hero_image_url) {
      result.missingHeroImage++;
    } else if (!urlRegex.test(row.hero_image_url)) {
      result.invalidImageUrls++;
      result.errors.push(`Row ${rowNum}: Invalid hero image URL`);
    }

    // Check duplicate IDs
    if (row.product_id) {
      if (ids.has(row.product_id)) {
        result.duplicateIds++;
        result.errors.push(`Row ${rowNum}: Duplicate product_id "${row.product_id}"`);
      }
      ids.add(row.product_id);
    }

    // Count new vs existing (simplified - in real app would check against DB)
    result.newProducts++;
  });

  return result;
}

function generateSampleCSV(): string {
  const headers = [
    "product_id", "sku", "product_name", "slug", "category", "subcategory", "product_type",
    "short_title", "short_description", "long_description", "best_for", "use_cases", "tags",
    "price_mode", "price_display", "mrp", "sale_price",
    "is_active", "is_featured", "show_on_homepage", "show_on_category_page",
    "hero_image_url", "gallery_image_1_url", "gallery_image_2_url", "gallery_image_3_url",
    "whatsapp_message_template", "seo_title", "seo_meta_description",
  ];

  const sample = [
    "ALT-IND-NEW", "BRAND-MODEL1", "Brand Model 1600W Induction", "brand-model-1600w-induction",
    "Alternative Cooking", "Induction Cooktops", "single",
    "Brand Model — 1600W", "Budget-friendly induction cooktop", "Full product description here", "Delhi homes", "Backup cooking|Daily use", "induction|budget",
    "fixed", "₹2499", "3200", "2499",
    "true", "true", "true", "true",
    "https://example.com/hero.jpg", "https://example.com/gallery1.jpg", "https://example.com/gallery2.jpg", "",
    "Hi I want to enquire about Brand Model", "Brand Model Induction — Buy Online | Solstric", "Buy Brand Model induction at ₹2499",
  ];

  return headers.join(",") + "\n" + sample.join(",");
}

export default function AdminCSVUploadPage() {
  const [mode, setMode] = useState<"add" | "image" | "dry-run">("add");
  const [file, setFile] = useState<File | null>(null);
  const [validation, setValidation] = useState<ValidationResult | null>(null);
  const [applied, setApplied] = useState(false);

  const handleFileDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile?.name.endsWith(".csv")) {
      setFile(droppedFile);
      processFile(droppedFile);
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile?.name.endsWith(".csv")) {
      setFile(selectedFile);
      processFile(selectedFile);
    }
  };

  const processFile = async (f: File) => {
    const text = await f.text();
    const rows = parseCSV(text);
    const result = validateRows(rows);
    setValidation(result);
    setApplied(false);
  };

  const handleDownloadSample = () => {
    const csv = generateSampleCSV();
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "solstric-product-sample.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleApply = () => {
    // In a real implementation, this would save to a database or file system
    // For now, we show a success message
    setApplied(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Product CSV Upload</h1>
        <p className="text-gray-500 mt-2">Add new products and update existing product data and images</p>
      </div>

      {/* Upload Type Selector */}
      <div className="flex gap-3 mb-8">
        {[
          { value: "add" as const, label: "Add / Update Products" },
          { value: "image" as const, label: "Image-Only Update" },
          { value: "dry-run" as const, label: "Dry Run Validation" },
        ].map((opt) => (
          <button
            key={opt.value}
            onClick={() => { setMode(opt.value); setValidation(null); setFile(null); setApplied(false); }}
            className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${mode === opt.value ? "bg-brand-green text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Upload Area */}
      <div
        className="border-2 border-dashed border-gray-200 rounded-xl p-12 text-center hover:border-brand-green/30 transition-colors"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleFileDrop}
      >
        <Upload className="w-10 h-10 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-600 font-medium">Drop your CSV file here</p>
        <p className="text-sm text-gray-400 mt-1">or click to browse</p>
        <input
          type="file"
          accept=".csv"
          onChange={handleFileSelect}
          className="hidden"
          id="csv-upload"
        />
        <label
          htmlFor="csv-upload"
          className="inline-flex items-center gap-2 mt-4 bg-gray-100 text-gray-700 font-medium px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors text-sm"
        >
          <FileSpreadsheet className="w-4 h-4" />
          Choose File
        </label>

        <div className="mt-4">
          <button
            onClick={handleDownloadSample}
            className="text-sm text-brand-green hover:underline font-medium"
          >
            Download Sample CSV Template
          </button>
        </div>
      </div>

      {/* File Info */}
      {file && (
        <div className="mt-4 flex items-center justify-between bg-gray-50 rounded-lg p-3">
          <div className="flex items-center gap-2">
            <FileSpreadsheet className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-700">{file.name}</span>
            <span className="text-xs text-gray-400">({(file.size / 1024).toFixed(1)} KB)</span>
          </div>
          <button onClick={() => { setFile(null); setValidation(null); }} className="text-gray-400 hover:text-gray-600">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Validation Summary */}
      {validation && (
        <div className="mt-8 space-y-6">
          <h2 className="text-xl font-bold text-gray-900">Validation Summary</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white border border-gray-100 rounded-xl p-4">
              <p className="text-2xl font-bold text-gray-900">{validation.totalRows}</p>
              <p className="text-sm text-gray-500">Total Rows</p>
            </div>
            <div className="bg-white border border-gray-100 rounded-xl p-4">
              <p className="text-2xl font-bold text-brand-green">{validation.newProducts}</p>
              <p className="text-sm text-gray-500">New Products</p>
            </div>
            <div className="bg-white border border-gray-100 rounded-xl p-4">
              <p className="text-2xl font-bold text-yellow-500">{validation.missingHeroImage}</p>
              <p className="text-sm text-gray-500">Missing Hero Image</p>
            </div>
            <div className="bg-white border border-gray-100 rounded-xl p-4">
              <p className="text-2xl font-bold text-red-500">{validation.errors.length}</p>
              <p className="text-sm text-gray-500">Issues Found</p>
            </div>
          </div>

          {/* Errors */}
          {validation.errors.length > 0 && (
            <div className="bg-red-50 border border-red-100 rounded-xl p-5">
              <h3 className="font-semibold text-red-800 flex items-center gap-2 mb-3">
                <AlertCircle className="w-5 h-5" /> Issues Found
              </h3>
              <ul className="space-y-1 max-h-60 overflow-y-auto">
                {validation.errors.map((err, i) => (
                  <li key={i} className="text-sm text-red-600">{err}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Success state */}
          {validation.errors.length === 0 && (
            <div className="bg-green-50 border border-green-100 rounded-xl p-5 flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-green-800 font-medium">All rows passed validation</span>
            </div>
          )}

          {/* Apply / Cancel */}
          <div className="flex gap-3">
            {mode !== "dry-run" && !applied && (
              <button
                onClick={handleApply}
                className="bg-brand-green text-white font-semibold px-6 py-3 rounded-lg hover:bg-brand-green-dark transition-colors"
                disabled={validation.errors.length > 0}
              >
                Apply CSV ({validation.totalRows} rows)
              </button>
            )}
            <button
              onClick={() => { setFile(null); setValidation(null); setApplied(false); }}
              className="border border-gray-200 text-gray-600 font-medium px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>

          {applied && (
            <div className="bg-green-50 border border-green-100 rounded-xl p-5 flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-green-800 font-medium">
                CSV applied successfully! {validation.totalRows} products processed.
                (Note: In this UI-only version, products are managed through code files. Connect a backend to enable live CSV updates.)
              </span>
            </div>
          )}
        </div>
      )}

      {/* Instructions */}
      <div className="mt-12 bg-gray-50 rounded-xl p-6">
        <h2 className="font-semibold text-gray-900 mb-4">CSV Upload Instructions</h2>
        <div className="space-y-3 text-sm text-gray-600">
          <p><strong>Mode 1 — Add / Update Products:</strong> Upload a CSV with full product data. New product_ids create new products. Existing product_ids update the matching product.</p>
          <p><strong>Mode 2 — Image-Only Update:</strong> Upload a CSV with just product_id and image URL columns. Only image fields are updated; other data remains unchanged.</p>
          <p><strong>Mode 3 — Dry Run:</strong> Validate your CSV without making any changes. Check for errors before applying.</p>
          <p><strong>Image Rules:</strong> Hero image is required for new products. Gallery images are optional. Blank image fields keep existing images. Use valid HTTPS URLs.</p>
        </div>
      </div>
    </div>
  );
}
