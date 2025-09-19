import React from "react";

export interface PageData {
  id: string;
  fileName: string;
  pageNumber: number;
}

interface PreviewCardProps {
  page: PageData;
  onDelete: (id: string) => void;
  children: React.ReactNode;
}

const PreviewCard: React.FC<PreviewCardProps> = ({ page, onDelete, children }) => {
  return (
    <div
      className="relative h-55 w-40 rounded-lg overflow-hidden shadow-lg 
        bg-white border border-gray-200 hover:shadow-xl transition-shadow duration-200 group"
    >
      {children}

      <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-white text-xs text-center py-1">
        Page {page.pageNumber}
      </div>

      <button
        onClick={() => onDelete(page.id)}
        className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded opacity-0 
          group-hover:opacity-100 transition-opacity"
      >
        ✕
      </button>
    </div>
  );
};

export default PreviewCard;
