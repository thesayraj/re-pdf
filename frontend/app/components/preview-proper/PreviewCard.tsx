import React from "react";
import { Page } from "../../utils/pdfComponents";
import { PDFDocumentProxy } from "pdfjs-dist";
import { ZoomInIcon, Trash2Icon as TrashIcon } from "lucide-react";

export interface PageData {
  id: string;
  fileName: string;
  pageNumber: number;
}

interface PreviewCardProps {
  pdf?: PDFDocumentProxy;
  page: number;
  onDelete: () => void;
}

const PreviewCard: React.FC<PreviewCardProps> = ({ pdf, page, onDelete }) => {
  const handleZoom = () => {
    console.log("TODO: handleZoom");
  };

  return (
    <div
      className="relative h-55 w-40 rounded-lg overflow-hidden shadow-lg bg-white border border-gray-200
        hover:shadow-xl transition-shadow duration-200 group flex items-center justify-center"
    >
      <Page
        className={"margin-auto"}
        pdf={pdf}
        pageNumber={page}
        width={150}
        height={300}
        renderAnnotationLayer={false}
        renderTextLayer={false}
      />

      <div className="absolute top-1 right-1 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <button
          onClick={handleZoom}
          className="flex items-center justify-center text-xs font-bold"
        >
          <ZoomInIcon className="w-6 h-6 text-green-500 hover:text-green-600" />
        </button>
        <button
          onClick={onDelete}
          className="flex items-center justify-center text-xs font-bold"
        >
          <TrashIcon className="w-6 h-6 text-red-500 hover:text-red-600" />
        </button>
      </div>
    </div>
  );
};

export default PreviewCard;
