import React, { useEffect, useState } from "react";
import { PageData } from "./PreviewCard";
import { loadPdfJs, getPdfJs } from "../../utils/pdfService";
import { PDFDocumentProxy } from "pdfjs-dist";
import PreviewCardWrapper from "./PreviewCardWrapper";

interface PreviewAreaProps {
  files: File[];
}

const PreviewArea: React.FC<PreviewAreaProps> = ({ files }) => {
  console.log("preview-proper PreviewArea ", files);
  const [pages, setPages] = useState<PageData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pdfJsLoaded, setPdfJsLoaded] = useState(false);
  const [pdf, setPdf] = useState<PDFDocumentProxy>();

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

  const processFiles = async function (files: File[]) {
    setLoading(true);
    const newPages: PageData[] = [];

    for (const file of files) {
      if (file.type === "application/pdf") {
        const pdfjs = getPdfJs();
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjs.getDocument(arrayBuffer).promise;
        const numPages = pdf.numPages;
        setPdf(pdf);

        for (let i = 0; i < numPages; i++) {
          const pageNum = i + 1;
          newPages.push({
            id: `${file.name}-page-${pageNum}`,
            file_name: `${file.name} - Page ${pageNum}`,
            pageNumber: pageNum,
          });
        }
      }
      console.log("newPages: ", newPages);

      setPages(newPages);
      setLoading(false);
    }
  };

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

      {pdf &&
        pages.map((page) => (
          <PreviewCardWrapper
            key={page.id}
            pdf={pdf}
            page={page}
            onDelete={handleDeletePage}
          />
        ))}
    </div>
  );
};

export default PreviewArea;
