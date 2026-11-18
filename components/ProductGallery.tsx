"use client";

import Image from "next/image";
import { useState } from "react";

interface ProductGalleryProps {
  images: string[];
  thumbnail: unknown;
  title: string;
}

export default function ProductGallery({
  images,
  thumbnail,
  title,
}: ProductGalleryProps) {
  // Safely combine thumbnail (if string) and images array without duplicates
  const allImages = Array.from(
    new Set([
      ...(typeof thumbnail === "string" && thumbnail ? [thumbnail] : []),
      ...(images || []),
    ]),
  );

  const [selectedImage, setSelectedImage] = useState<string>(
    allImages[0] || "/placeholder.png",
  );

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image */}
      <div className="relative aspect-square w-full overflow-hidden rounded-2xl">
        <Image
          src={selectedImage}
          alt={title}
          sizes="h-full w-full"
          fill
          className="bg-muted/50 object-contain p-6 transition-transform duration-300 hover:scale-110"
        />
      </div>

      {/* Thumbnail Strip */}
      {allImages.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {allImages.map((img, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setSelectedImage(img)}
              className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border-2 bg-gray-50 transition ${
                selectedImage === img
                  ? "border-transparent opacity-70 hover:opacity-100"
                  : "border-black ring-2 ring-black/10"
              }`}
            >
              <Image
                src={img}
                alt={`${title} view ${idx + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="bg-muted/50 object-contain p-1"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
