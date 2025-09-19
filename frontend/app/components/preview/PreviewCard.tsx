import React from "react";
import { Trash2 as TrashIcon, ZoomInIcon } from "lucide-react";
import { PageData } from "../../types/preview";

interface PreviewCardProps {
  page: PageData;
  onDelete: (id: string) => void;
  children: React.ReactNode;
}

const PreviewCard: React.FC<PreviewCardProps> = ({
  page,
  onDelete,
  children,
}) => {
  return (
    <div className="flex flex-col items-center w-40">
      <div
        className="relative h-55 w-40 rounded-lg overflow-hidden shadow-lg 
          bg-white border border-gray-200 hover:shadow-xl transition-shadow duration-200 group"
      >
        {children}

        <div className="absolute top-1 right-1 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={() => console.log("TODO: handleZoom")}
            className="text-green-500 rounded opacity-0 hover:text-green-600
            group-hover:opacity-100 transition-opacity"
          >
            <ZoomInIcon />
          </button>
          <button
            onClick={() => onDelete(page.id)}
            className="text-red-500 rounded opacity-0 hover:text-red-600
            group-hover:opacity-100 transition-opacity"
          >
            <TrashIcon />
          </button>
        </div>
      </div>

      <div className="mt-2 text-black text-sm font-medium">
        Page {page.pageNumber}
      </div>
    </div>
  );
};

export default PreviewCard;
