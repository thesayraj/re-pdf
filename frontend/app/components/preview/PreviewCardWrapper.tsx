import React, { useEffect, useRef, useState } from "react";
import { RenderTask } from "pdfjs-dist";
import PreviewCard from "./PreviewCard";
import { PreviewCardWrapperProps } from "../../types/preview";
import { useZoom } from "../../hooks/useZoom";

const PreviewCardWrapper: React.FC<PreviewCardWrapperProps> = ({
  file,
  page,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const renderTaskRef = useRef<RenderTask | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { openZoom } = useZoom();

  useEffect(() => {
    if (file.type !== "pdf" || !canvasRef.current) return;
    let isMounted = true;

    const renderPdfPage = async () => {
      setLoading(true);
      try {
        const pdfPage = await file.pdf.getPage(page.pageNumber);
        const viewport = pdfPage.getViewport({ scale: 0.5 });
        const canvas = canvasRef.current!;
        const context = canvas.getContext("2d");

        if (!context) return;

        if (renderTaskRef.current) renderTaskRef.current.cancel();

        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const task = pdfPage.render({ canvasContext: context, viewport });
        renderTaskRef.current = task;
        await task.promise;

        if (isMounted) setError(null);
      } catch (err: any) {
        if (err?.name !== "RenderingCancelledException") {
          console.error("Error rendering PDF page", err);
          if (isMounted) setError("Failed to render page");
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    renderPdfPage();

    return () => {
      isMounted = false;
      if (renderTaskRef.current) {
        renderTaskRef.current.cancel();
        renderTaskRef.current = null;
      }
    };
  }, [file, page.pageNumber]);

  const handleZoom = async () => {
    if (file.type === "pdf") {
      const buffer = await file.file.arrayBuffer();
      openZoom({
        type: "pdf",
        buffer,
        pageNumber: page.pageNumber,
        name: file.file.name,
      });
    } else if (file.type === "image") {
      openZoom({
        type: "image",
        url: URL.createObjectURL(file.file),
        name: file.file.name,
      });
    }
  };

  return (
    <PreviewCard page={page} onZoom={handleZoom}>
      {file.type === "pdf" && (
        <canvas ref={canvasRef} className="w-full h-full" />
      )}
      {file.type === "image" && (
        <img
          src={URL.createObjectURL(file.file)}
          alt={file.file.name}
          className="w-full h-full bg-gray-100"
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
