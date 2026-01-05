import React, { useContext } from "react";
import { Trash2 as TrashIcon, ZoomInIcon } from "lucide-react";
import { PreviewCardProps } from "../../types/preview";
import { DeletePageContext } from "./PreviewArea";

const PreviewCard: React.FC<PreviewCardProps> = ({
  page,
  onZoom,
  children,
}) => {
  const ctx = useContext(DeletePageContext);

  return (
    <div className="flex flex-col items-center">
      <div
        className="relative rounded-lg overflow-hidden shadow-lg h-55 w-40
          bg-white border border-gray-200 hover:shadow-xl transition-shadow duration-200 group"
      >
        {children}

        <div className="absolute top-1 right-1 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={(e) => {
              e.currentTarget.blur(); // avoid double click (like extra click from space bar)
              onZoom();
            }}
            className="text-green-500 rounded hover:text-green-600"
          >
            <ZoomInIcon />
          </button>
          {ctx?.enabled && (
            <button
              onClick={() => ctx.onDelete?.(page.id)}
              className="text-red-500 rounded hover:text-red-600"
            >
              <TrashIcon />
            </button>
          )}
        </div>
      </div>

      <div className="mt-2 text-black text-sm font-medium">
        Page {page.pageNumber}
      </div>
    </div>
  );
};

export default PreviewCard;
