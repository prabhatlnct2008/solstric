import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { randomUUID } from "crypto";
import path from "path";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const productId = formData.get("productId") as string | null;

    console.log("[Upload API] Request received — productId:", productId, "file:", file?.name, "type:", file?.type, "size:", file?.size);

    if (!file) {
      console.warn("[Upload API] No file provided");
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      console.warn("[Upload API] Invalid file type:", file.type);
      return NextResponse.json(
        { error: "Invalid file type. Allowed: JPEG, PNG, WebP, GIF" },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      console.warn("[Upload API] File too large:", file.size);
      return NextResponse.json(
        { error: "File too large. Maximum size is 5MB" },
        { status: 400 }
      );
    }

    // Build path: products/{productId}/{uuid}.ext
    const folder = productId || "general";
    const ext = path.extname(file.name) || `.${file.type.split("/")[1]}`;
    const blobPath = `products/${folder}/${randomUUID()}${ext}`;

    console.log("[Upload API] Uploading to blob:", blobPath);

    // Upload to Vercel Blob
    const blob = await put(blobPath, file, {
      access: "public",
      addRandomSuffix: false,
    });

    console.log("[Upload API] Upload success — blob URL:", blob.url);

    return NextResponse.json({ url: blob.url, filename: blobPath });
  } catch (error) {
    console.error("[Upload API] Upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
