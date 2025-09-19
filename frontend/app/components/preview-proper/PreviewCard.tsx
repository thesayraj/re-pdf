import React from "react";
import { Page } from "../../utils/pdfComponents";
import { PDFDocumentProxy } from "pdfjs-dist";
import { ZoomInIcon, Trash2Icon as TrashIcon } from "lucide-react";

interface PreviewCardProps {
  pdf?: PDFDocumentProxy;
  pageNumber?: number;
  imageFile?: File;
  onDelete: () => void;
}

const PreviewCard: React.FC<PreviewCardProps> = ({
  pdf,
  pageNumber,
  imageFile,
  onDelete,
}) => {
  return (
    <div
      className="relative h-55 w-40 rounded-lg overflow-hidden shadow-lg bg-white border border-gray-200
        hover:shadow-xl transition-shadow duration-200 group flex items-center justify-center"
    >
      {pdf && pageNumber ? (
        <Page
          className="margin-auto"
          pdf={pdf}
          pageNumber={pageNumber}
          width={150}
          height={300}
          renderAnnotationLayer={false}
          renderTextLayer={false}
        />
      ) : imageFile ? (
        <img
          src={URL.createObjectURL(imageFile)}
          alt={imageFile.name}
          className="object-contain w-full h-full"
        />
      ) : null}

      <div className="absolute top-1 right-1 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <button
          onClick={() => {
            console.log("TODO: handleZoom");
          }}
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
