import React from "react";
import { Page } from "../../utils/pdfComponents";
import { PDFDocumentProxy } from "pdfjs-dist";

export interface PageData {
  id: string;
  file_name: string;
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
    </div>
  );
};

export default PreviewCard;
