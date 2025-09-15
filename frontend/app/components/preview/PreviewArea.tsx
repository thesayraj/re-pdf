import React, { useCallback, useEffect, useState } from "react";
import PreviewCard, { PageData } from "./PreviewCard";
import { loadPdfJs, getPdfJs } from "../../utils/pdfService";


interface PreviewAreaProps {
  files?: File[];
}

const PreviewArea: React.FC<PreviewAreaProps> = ({ files }) => {
  const [pages, setPages] = useState<PageData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pdfJsLoaded, setPdfJsLoaded] = useState(false);
  const [processedFiles, setProcessedFiles] = useState<Set<string>>(new Set());

  useEffect(() => {
    loadPdfJs().then(() => {
      setPdfJsLoaded(true);
    });
  }, []);

  useEffect(() => {
    if (files && files.length > 0 && pdfJsLoaded) {
      processFiles(files);
    }
  }, [files, pdfJsLoaded]);

  const processFiles = useCallback(
    async (files: File[]) => {
      console.log("processFiles");
      setLoading(true);
      setError(null);

      try {
        const newPages: PageData[] = [];
        const newProcessedFiles = new Set(processedFiles);

        for (const file of files) {
          const fileKey = `${file.name}-${file.lastModified}`;

          if (processedFiles.has(fileKey)) {
            console.log(`Skipping already processed file: ${file.name}`);
            continue;
          }

          if (file.type === "application/pdf") {
            const arrayBuffer = await file.arrayBuffer();
            const pdfjs = getPdfJs();
            const pdf = await pdfjs.getDocument(arrayBuffer).promise;

            const renderPage = async (page: any, scale = 0.4) => {
              const viewport = page.getViewport({ scale });

              const canvas = new OffscreenCanvas(
                viewport.width,
                viewport.height
              );
              const ctx = canvas.getContext("2d")!;
              await page.render({ canvasContext: ctx, viewport }).promise;

              const blob = await canvas.convertToBlob({ type: "image/png" });
              return blob;
            };

            const scale = pdf.numPages > 50 ? 0.2 : 0.4;
            const CONCURRENCY_LIMIT = 4;
            const queue = Array.from({ length: pdf.numPages }, (_, i) => i + 1);

            const processNext = async () => {
              if (queue.length === 0) return;
              const pageNum = queue.shift();
              const page = await pdf.getPage(pageNum);
              const blob = await renderPage(page, scale);
              const thumbnailURL = URL.createObjectURL(blob);

              newPages.push({
                id: `${file.name}-page-${pageNum}`,
                file,
                type: "pdf",
                name: `${file.name} - Page ${pageNum}`,
                pageNumber: pageNum,
                thumbnail: thumbnailURL,
              });

              await processNext();
            };

            await Promise.all(
              Array(CONCURRENCY_LIMIT)
                .fill(null)
                .map(() => processNext())
            );
          } else if (file.type.startsWith("image/")) {
            const imgURL = URL.createObjectURL(file);
            newPages.push({
              id: file.name,
              file,
              type: "image",
              name: file.name,
              thumbnail: imgURL,
            });
          } else {
            console.warn(`Unsupported file type: ${file.type}`);
          }

          newProcessedFiles.add(fileKey);
        }

        setPages((prev) => [...prev, ...newPages]);
        setProcessedFiles(newProcessedFiles);
        console.log("processFiles Done");
      } catch (err) {
        console.error(err);
        setError("Failed to extract pages.");
      } finally {
        setLoading(false);
      }
    },
    [processedFiles]
  );

  const handleDeletePage = (id: string) => {
    setPages((prev) => prev.filter((page) => page.id !== id));
  };

  if (!pdfJsLoaded) return <p>Loading PDF renderer...</p>;

  return (
    <div
      className="bg-blue-50 rounded-2xl w-full
        grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4
        justify-items-center p-5"
    >
      {loading && (
        <p className="text-center text-blue-500 col-span-full">
          Loading pages...
        </p>
      )}
      {error && (
        <p className="text-center text-red-500 col-span-full">{error}</p>
      )}

      {pages.map((page) => (
        <PreviewCard
          key={page.id}
          page={page}
          onDelete={() => handleDeletePage(page.id)}
        />
      ))}
    </div>
  );
};

export default PreviewArea;
