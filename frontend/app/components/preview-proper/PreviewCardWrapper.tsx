import React, { useEffect, useRef, useState } from "react";
import { PDFDocumentProxy, RenderTask } from "pdfjs-dist";
import PreviewCard, { PageData } from "./PreviewCard";

interface PreviewCardWrapperProps {
  pdf?: PDFDocumentProxy;
  imageFile?: File;
  page: PageData;
  onDelete: (id: string) => void;
}

const PreviewCardWrapper: React.FC<PreviewCardWrapperProps> = ({
  pdf,
  imageFile,
  page,
  onDelete,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const renderTaskRef = useRef<RenderTask | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const renderPdfPage = async () => {
      if (!pdf || !canvasRef.current) return;
      setLoading(true);

      try {
        const pdfPage = await pdf.getPage(page.pageNumber);
        const viewport = pdfPage.getViewport({ scale: 0.5 });
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");

        if (!context) return;

        // cancel any previous render task
        if (renderTaskRef.current) {
          console.log("renderTaskRef.current ..");
          renderTaskRef.current.cancel();
        }

        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const task = pdfPage.render({ canvasContext: context, viewport });
        renderTaskRef.current = task;

        await task.promise;

        if (isMounted) {
          setError(null);
        }
      } catch (err: any) {
        if (err?.name === "RenderingCancelledException") {
          // safe to ignore
          console.debug("Render cancelled for page", page.pageNumber);
        } else {
          console.error("Error rendering PDF page", err);
          if (isMounted) setError("Failed to render page");
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    if (pdf) {
      renderPdfPage();
    }

    return () => {
      isMounted = false;
      if (renderTaskRef.current) {
        renderTaskRef.current.cancel();
        renderTaskRef.current = null;
      }
    };
  }, [pdf, page.pageNumber]);

  return (
    <PreviewCard page={page} onDelete={onDelete}>
      {pdf && <canvas ref={canvasRef} className="w-full h-full object-contain bg-gray-100" />}
      {imageFile && (
        <img
          src={URL.createObjectURL(imageFile)}
          alt={imageFile.name}
          className="w-full h-full object-contain bg-gray-100"
          onError={() => setError("Failed to load image")}
        />
      )}
      {loading && (
        <p className="absolute inset-0 flex items-center justify-center text-gray-500 text-sm">
          Loading...
        </p>
      )}
      {error && (
        <p className="absolute inset-0 flex items-center justify-center text-red-500 text-sm">
          {error}
        </p>
      )}
    </PreviewCard>
  );
};

export default PreviewCardWrapper;
