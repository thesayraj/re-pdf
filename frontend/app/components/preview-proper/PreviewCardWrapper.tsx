import { PDFDocumentProxy } from "pdfjs-dist";
import PreviewCard, { PageData } from "./PreviewCard";
import { useInView } from "../../hooks/useInView";
import useDebounce from "../../hooks/useDebounce";
import { useEffect, useState } from "react";

interface PreviewCardWrapperProps {
  pdf?: PDFDocumentProxy;
  page: PageData;
  onDelete: (id: string) => void;
}

const PreviewCardWrapper: React.FC<PreviewCardWrapperProps> = ({
  pdf,
  page,
  onDelete,
}) => {
  const { containerRef, isVisible } = useInView({
    root: null,
    rootMargin: "0px",
    threshold: 0.6,
  });

  // Local state to track visibility with debounce
  const [visible, setVisible] = useState(isVisible);

  // Update visibility but debounce rapid changes
  const debouncedSetVisible = useDebounce((val: boolean) => {
    setVisible(val);
  }, 200);

  useEffect(() => {
    debouncedSetVisible(isVisible);
  }, [isVisible]);

  const debouncedDelete = useDebounce(() => onDelete(page.id), 300); // 300 ms delay

  return (
    <div ref={containerRef} className="w-full h-full">
      {visible ? (
        <PreviewCard
          pdf={pdf}
          page={page.pageNumber}
          onDelete={debouncedDelete}
        />
      ) : (
        <div className="relative h-55 w-40 rounded-lg overflow-hidden shadow-sm bg-white border border-gray-200"></div>
      )}
    </div>
  );
};

export default PreviewCardWrapper;
