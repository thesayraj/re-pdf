import { PDFDocumentProxy } from "pdfjs-dist";
import PreviewCard from "./PreviewCard";
import { useInView } from "../../hooks/useInView";
import useDebounce from "../../hooks/useDebounce";
import { useEffect, useState } from "react";

interface PreviewCardWrapperProps {
  pdf?: PDFDocumentProxy;
  pageNumber?: number;
  imageFile?: File;
  onDelete: () => void;
}

const PreviewCardWrapper: React.FC<PreviewCardWrapperProps> = ({
  pdf,
  pageNumber,
  imageFile,
  onDelete,
}) => {
  const { containerRef, isVisible } = useInView({
    root: null,
    rootMargin: "0px",
    threshold: 0.6,
  });

  const [visible, setVisible] = useState(isVisible);
  const debouncedSetVisible = useDebounce((val: boolean) => setVisible(val), 400);

  useEffect(() => {
    debouncedSetVisible(isVisible);
  }, [isVisible]);

  return (
    <div ref={containerRef} className="w-full h-full">
      {visible ? (
        <PreviewCard
          pdf={pdf}
          pageNumber={pageNumber}
          imageFile={imageFile}
          onDelete={onDelete}
        />
      ) : (
        <div className="relative h-55 w-40 rounded-lg overflow-hidden shadow-sm bg-white border border-gray-200"></div>
      )}
    </div>
  );
};

export default PreviewCardWrapper;
