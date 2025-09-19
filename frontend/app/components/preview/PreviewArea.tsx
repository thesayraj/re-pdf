import React, { useEffect, useState } from "react";
import PreviewCardWrapper from "./PreviewCardWrapper";
import FileUploader from "../FileUploader";
import { PageData, PreviewAreaProps } from "../../types/preview";

const PreviewArea: React.FC<PreviewAreaProps> = ({
  items,
  viewType,
  onDeleteFile,
  onAddFiles,
}) => {
  const [pages, setPages] = useState<PageData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const processItems = async () => {
      setLoading(true);
      const newPages: PageData[] = [];

      try {
        for (const item of items) {
          if (item.type === "pdf" && item.pdf) {
            const numPages = item.pdf.numPages;
            const pagesToShow = viewType === "file" ? 1 : numPages;
            for (let i = 0; i < pagesToShow; i++) {
              newPages.push({
                id: `${item.id}-page-${i + 1}`,
                fileName: item.id,
                pageNumber: i + 1,
              });
            }
          } else if (item.type === "image") {
            newPages.push({
              id: `${item.id}-page-1`,
              fileName: item.id,
              pageNumber: 1,
            });
          }
        }
        setPages(newPages);
        setError(null);
      } catch (err) {
        console.error("Error processing items", err);
        setError("Failed to process files");
      } finally {
        setLoading(false);
      }
    };

    if (items.length > 0) {
      processItems();
    } else {
      setPages([]);
    }
  }, [items, viewType]);

  const handleDeletePage = (id: string) => {
    setPages((prev) => prev.filter((p) => p.id !== id));
    if (viewType === "file") {
      const deleted = items.find((it) => id.startsWith(it.id));
      if (deleted && onDeleteFile) onDeleteFile(deleted.id);
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-center mb-4">
        {onAddFiles && (
          <FileUploader
            onFileSelect={onAddFiles}
            acceptedTypes=".pdf,.jpg,.png"
            multiple
            variant="compact"
          />
        )}
      </div>

      {/* Grid */}
      <div
        className="bg-blue-50 rounded-2xl w-full
          grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4
          justify-center justify-items-center p-5"
      >
        {loading && (
          <p className="text-center text-blue-500 col-span-full">
            Loading pages...
          </p>
        )}
        {error && (
          <p className="text-center text-red-500 col-span-full">{error}</p>
        )}
        {pages.map((page) => {
          const file = items.find((f) => f.id === page.fileName);
          return (
            <PreviewCardWrapper
              key={page.id}
              pdf={file?.pdf}
              imageFile={file?.type === "image" ? file.file : undefined}
              page={page}
              onDelete={handleDeletePage}
            />
          );
        })}
      </div>
    </div>
  );
};

export default PreviewArea;
