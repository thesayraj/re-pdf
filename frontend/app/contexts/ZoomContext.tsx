import React, { createContext, useState, useEffect, ReactNode } from "react";
import { Document, Page } from "../utils/pdfComponents";
import { ZoomContent, ZoomContextValue } from "../types/preview";

const ZoomContext = createContext<ZoomContextValue | undefined>(undefined);

const ZoomProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<ZoomContent | null>(null);

  const openZoom = (c: ZoomContent) => setContent(c);
  const closeZoom = () => setContent(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeZoom();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <ZoomContext.Provider value={{ openZoom, closeZoom }}>
      {children}

      {content && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          {/* Modal box */}
          <div className="bg-white rounded-lg shadow-xl w-2xl h-full flex flex-col">
            {/* Top bar */}
            <div className="flex justify-between items-center bg-gray-200 text-black px-4 py-2 rounded-t-lg">
              <h2 className="font-semibold text-sm truncate">{content.name}</h2>
              <button
                onClick={closeZoom}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-3xl"
              >
                X
              </button>
            </div>

            <div className="flex-1 overflow-auto p-4 flex items-center justify-center mt-5">
              {content.type === "image" && (
                <img
                  src={content.url}
                  alt={content.name}
                  className="max-h-[80vh] max-w-full object-contain"
                />
              )}
              {content.type === "pdf" && (
                <Document file={{ data: content.buffer }}>
                  <Page
                    pageNumber={content.pageNumber}
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                  />
                </Document>
              )}
            </div>
          </div>
        </div>
      )}
    </ZoomContext.Provider>
  );
};

export { ZoomProvider, ZoomContext };
