"use client";

import { useState, useRef, useCallback } from "react";
import { Upload, Link as LinkIcon, X, Loader2 } from "lucide-react";

interface ImageUploaderProps {
  onImageReady: (url: string) => void;
  productId?: string;
  currentImage?: string | null;
  label?: string;
  compact?: boolean;
}

export default function ImageUploader({
  onImageReady,
  productId,
  currentImage,
  label,
  compact = false,
}: ImageUploaderProps) {
  const [mode, setMode] = useState<"upload" | "url">("upload");
  const [urlInput, setUrlInput] = useState("");
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(
    async (file: File) => {
      setError(null);

      if (!["image/jpeg", "image/png", "image/webp", "image/gif"].includes(file.type)) {
        setError("Invalid file type. Use JPEG, PNG, WebP, or GIF.");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        setError("File too large. Maximum 5MB.");
        return;
      }

      // Show local preview immediately
      const localPreview = URL.createObjectURL(file);
      setPreview(localPreview);
      setUploading(true);

      try {
        const formData = new FormData();
        formData.append("file", file);
        if (productId) formData.append("productId", productId);

        const res = await fetch("/api/upload", { method: "POST", body: formData });
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Upload failed");
        }

        setPreview(data.url);
        onImageReady(data.url);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Upload failed");
        setPreview(null);
      } finally {
        setUploading(false);
        URL.revokeObjectURL(localPreview);
      }
    },
    [productId, onImageReady]
  );

  function handleUrlSubmit() {
    setError(null);
    const trimmed = urlInput.trim();
    if (!trimmed) return;

    if (!trimmed.startsWith("http://") && !trimmed.startsWith("https://")) {
      setError("URL must start with http:// or https://");
      return;
    }

    setPreview(trimmed);
    onImageReady(trimmed);
    setUrlInput("");
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(true);
  }

  function handleDragLeave(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
  }

  const displayImage = preview || currentImage;

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-300">{label}</label>
      )}

      {/* Mode toggle */}
      <div className="flex gap-1 bg-gray-800 rounded-lg p-0.5 w-fit">
        <button
          type="button"
          onClick={() => setMode("upload")}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition ${
            mode === "upload"
              ? "bg-gray-600 text-white"
              : "text-gray-400 hover:text-gray-200"
          }`}
        >
          <Upload size={13} /> Upload
        </button>
        <button
          type="button"
          onClick={() => setMode("url")}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition ${
            mode === "url"
              ? "bg-gray-600 text-white"
              : "text-gray-400 hover:text-gray-200"
          }`}
        >
          <LinkIcon size={13} /> URL
        </button>
      </div>

      <div className="flex gap-3 items-start">
        {/* Preview */}
        {displayImage && (
          <div className="relative flex-shrink-0">
            <img
              src={displayImage}
              alt="Preview"
              className={`rounded-lg object-cover bg-gray-800 border border-gray-700 ${
                compact ? "w-20 h-20" : "w-28 h-28"
              }`}
            />
            {uploading && (
              <div className="absolute inset-0 bg-black/60 rounded-lg flex items-center justify-center">
                <Loader2 size={20} className="animate-spin text-white" />
              </div>
            )}
          </div>
        )}

        {/* Upload or URL input */}
        <div className="flex-1">
          {mode === "upload" ? (
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition ${
                dragOver
                  ? "border-blue-500 bg-blue-500/10"
                  : "border-gray-700 hover:border-gray-500 bg-gray-800/50"
              } ${compact ? "py-3" : "py-5"}`}
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
              <Upload size={compact ? 18 : 24} className="mx-auto text-gray-400 mb-1" />
              <p className="text-sm text-gray-400">
                {dragOver ? "Drop image here" : "Click or drag image here"}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                JPEG, PNG, WebP, GIF - Max 5MB
              </p>
            </div>
          ) : (
            <div className="flex gap-2">
              <input
                type="text"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleUrlSubmit()}
                placeholder="https://example.com/image.jpg"
                className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-blue-500"
              />
              <button
                type="button"
                onClick={handleUrlSubmit}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm whitespace-nowrap"
              >
                Set URL
              </button>
            </div>
          )}
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 text-red-400 text-sm">
          <X size={14} />
          {error}
        </div>
      )}
    </div>
  );
}
