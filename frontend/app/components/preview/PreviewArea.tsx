import React, { useEffect, useMemo, useState, createContext } from "react";
import PreviewCardWrapper from "./PreviewCardWrapper";
import FileUploader from "../FileUploader";
import {
  PageData,
  PreviewAreaProps,
  DeleteContextValue,
  ViewType,
  ViewToggleProps,
} from "../../types/preview";
import { DndGridWrapper } from "./dnd/DndGridWrapper";
import { FaScissors as ScissorsIcon } from "react-icons/fa6";

export const DeletePageContext = createContext<DeleteContextValue | null>(null);

const PreviewArea: React.FC<PreviewAreaProps> = ({
  items,
  defaultViewType,
  acceptedTypes,
  canAddMoreFiles,
  onDeleteFile,
  onAddFiles,
  onPagesChange,
  enableDnd = false,
  enableSplit,
  onSplitChange,
  disableDeleteBtn = false,
  allowViewToggle = false,
}) => {
  const [pages, setPages] = useState<PageData[]>([]);
  const [splits, setSplits] = useState<Set<number>>(new Set());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [viewType, setViewType] = useState<ViewType>(defaultViewType);

  const fileMap = useMemo(() => new Map(items.map((f) => [f.id, f])), [items]);

  useEffect(() => {
    onPagesChange?.(pages); // notify parent on every change
  }, [pages, onPagesChange]);

  useEffect(() => {
    onSplitChange?.(splits);
  }, [splits, onSplitChange]);

  useEffect(() => {
    const processItems = async () => {
      setLoading(true);
      const newPages: PageData[] = [];

      try {
        for (const item of items) {
          if (item.type === "pdf") {
            const pagesToShow = viewType === "file" ? 1 : item.numPages;
            for (let i = 0; i < pagesToShow; i++) {
              newPages.push({
                id: `${item.id}-page-${i + 1}`,
                fileId: item.id,
                pageNumber: i + 1,
              });
            }
          } else if (item.type === "image") {
            newPages.push({
              id: `${item.id}-page-1`,
              fileId: item.id,
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

  const handleReorder = (newOrder: PageData[]) => {
    setPages(newOrder);
    onPagesChange?.(newOrder);
  };

  const toggleCut = (pageNumber: number) => {
    setSplits((prev) => {
      const updated = new Set(prev);
      if (!updated.delete(pageNumber)) {
        updated.add(pageNumber);
      }
      return updated;
    });
  };

  const renderCard = (page: PageData) => {
    const file = fileMap.get(page.fileId);
    if (!file) return null;

    const hasSplit = splits.has(page.pageNumber);

    return (
      <div key={page.id} className="flex items-center">
        <PreviewCardWrapper file={file} page={page} />

        {enableSplit && (
          <div
            className={`
            flex flex-col items-center ml-7 cursor-pointer
            transition-opacity
            ${hasSplit ? "opacity-100" : "opacity-30 hover:opacity-100"}
          `}
            onClick={() => toggleCut(page.pageNumber)}
          >
            <DottedLine dotted={!hasSplit} />
            <ScissorsIcon className="rotate-270 text-blue-500" />
            <DottedLine dotted={!hasSplit} />
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-full">
      {/* Add More Files button */}
      <div className="flex justify-center mb-4">
        {canAddMoreFiles && onAddFiles && (
          <FileUploader
            onFileSelect={onAddFiles}
            acceptedTypes={acceptedTypes}
            multiple
            variant="compact"
          />
        )}
      </div>

      {allowViewToggle && <ViewToggle view={viewType} onChange={setViewType} />}

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

        <DeletePageContext.Provider
          value={{ enabled: !disableDeleteBtn, onDelete: handleDeletePage }}
        >
          {enableDnd ? (
            <DndGridWrapper
              items={pages}
              onReorder={handleReorder}
              renderItem={renderCard}
            />
          ) : (
            pages.map(renderCard)
          )}
        </DeletePageContext.Provider>
      </div>
    </div>
  );
};

const DottedLine: React.FC<{ dotted: boolean }> = ({ dotted }) => (
  <div
    className={`h-22 w-0.5 border-l-2 border-blue-400 ${
      dotted ? "border-dotted" : ""
    }`}
  />
);

const btnBase = "px-6 py-2 text-sm font-medium transition";
const active = "bg-green-100 text-green-700";
const inactive = "text-green-600 hover:bg-green-50";

export const ViewToggle: React.FC<ViewToggleProps> = ({ view, onChange }) => {
  return (
    <div className="flex justify-center mb-4 mt-14">
      <div className="inline-flex border border-gray-300 rounded-lg overflow-hidden">
        <button
          type="button"
          onClick={() => onChange("file")}
          className={`${btnBase} ${view === "file" ? active : inactive}`}
        >
          Files
        </button>

        <div className="w-px bg-gray-300" />

        <button
          type="button"
          onClick={() => onChange("page")}
          className={`${btnBase} ${view === "page" ? active : inactive}`}
        >
          Pages
        </button>
      </div>
    </div>
  );
};

export default PreviewArea;
