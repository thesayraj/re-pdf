import React from "react";
import { PdfZoom, ZoomedPdfPage } from "./CustomPdfPage";
import { ImageZoom, ZoomedImage } from "./CustomImage";

export interface PageData {
  id: string;
  file: File;
  type: "pdf" | "image";
  name: string;
  pageNumber?: number; // only for PDFs
  thumbnail: string;
}

interface PreviewCardProps {
  page: PageData;
  onDelete: () => void;
}

const PreviewCard: React.FC<PreviewCardProps> = ({ page, onDelete }) => {
  const handleZoom = () => {
    if (page.type === "pdf" && page.pageNumber) {
      const reader = new FileReader();
      reader.onload = () => {
        const buffer = reader.result as ArrayBuffer;
        PdfZoom.openZoom({
          buffer,
          pageNumber: page.pageNumber,
          name: page.name,
        });
      };
      reader.readAsArrayBuffer(page.file);
    } else if (page.type === "image") {
      const reader = new FileReader();
      reader.onload = () => {
        const urlStr = reader.result as string; // base64 data URL string
        ImageZoom.openZoom({
          url: urlStr,
          name: page.name,
        });
      };
      reader.readAsDataURL(page.file);
    }
  };

  return (
    <div
      className="relative w-35 h-55 rounded-lg overflow-hidden shadow-lg bg-white border border-gray-200
      hover:shadow-xl transition-shadow duration-200 group"
    >
      <img
        src={page.thumbnail}
        alt={page.name}
        className="w-full h-full object-contain"
      />
      <div className="absolute top-1 right-1 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <button
          onClick={handleZoom}
          className="bg-green-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold hover:bg-green-600"
        >
          Z
        </button>
        <button
          onClick={onDelete}
          className="bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold hover:bg-red-600"
        >
          X
        </button>
      </div>
      <ZoomedPdfPage />
      <ZoomedImage />
    </div>
  );
};

export default PreviewCard;
