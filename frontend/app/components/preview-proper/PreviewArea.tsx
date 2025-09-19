import React, { useMemo } from "react";
import { InputFile, PageData } from "../../types/types";
import PreviewCardWrapper from "./PreviewCardWrapper";

interface PreviewAreaProps {
  items: InputFile[];
  viewType: "file" | "page";
  onDeleteFile: (id: string) => void;
  onDeletePage?: (fileId: string, pageId: string) => void;
}

const PreviewArea: React.FC<PreviewAreaProps> = ({
  items,
  viewType,
  onDeleteFile,
  onDeletePage,
}) => {
  const pages: PageData[] = useMemo(() => {
    const all: PageData[] = [];
    for (const item of items) {
      if (item.type === "pdf") {
        const count = viewType === "file" ? 1 : item.numPages;
        for (let i = 0; i < count; i++) {
          all.push({
            id: `${item.id}-page-${i + 1}`,
            fileId: item.id,
            pageNumber: i + 1,
          });
        }
      } else if (item.type === "image") {
        all.push({
          id: `${item.id}-image`,
          fileId: item.id,
          pageNumber: 1,
        });
      }
    }
    return all;
  }, [items, viewType]);

  return (
    <div
      className="bg-blue-50 rounded-2xl w-full
        grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4
        justify-items-center p-5"
    >
      {pages.map((p) => {
        const file = items.find((f) => f.id === p.fileId);
        if (!file) return null;

        return (
          <PreviewCardWrapper
            key={p.id}
            pdf={file.type === "pdf" ? file.pdf : undefined}
            pageNumber={file.type === "pdf" ? p.pageNumber : undefined}
            imageFile={file.type === "image" ? file.file : undefined}
            onDelete={() =>
              viewType === "file"
                ? onDeleteFile(file.id)
                : onDeletePage?.(file.id, p.id)
            }
          />
        );
      })}
    </div>
  );
};

export default PreviewArea;
