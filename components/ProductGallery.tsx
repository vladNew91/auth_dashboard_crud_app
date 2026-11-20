"use client";

import { cn } from "@/utils/utils";
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
  // or return placeholder .png
  const allImages = Array.from(
    new Set([
      ...(typeof thumbnail === "string" && thumbnail ? [thumbnail] : []),
      ...(images || []),
    ]),
  ) || ["/file.svg"];

  const [selectedImage, setSelectedImage] = useState<string>(
    // select second image with better quality or first
    allImages[1 || 0],
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
          loading="eager"
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
              className={cn(
                "relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg",
                `bg-muted/80 border-2 transition ${
                  selectedImage === img ? "bg-muted/100" : "border-black"
                }`,
              )}
            >
              <Image
                src={img}
                alt={`${title} view ${idx + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain p-1"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
