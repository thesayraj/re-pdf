import type { PDFDocumentProxy } from "pdfjs-dist/types/src/display/api";

export interface PDFJS {
  GlobalWorkerOptions: {
    workerSrc: string;
  };
  getDocument: (src: Uint8Array | ArrayBuffer | string) => {
    promise: Promise<PDFDocumentProxy>;
  };
  version: string;
}

let pdfJsLib: PDFJS | null = null;
let isLoaded = false;
let loadPromise: Promise<void> | null = null;

export const loadPdfJs = (): Promise<void> => {
  if (loadPromise) {
    return loadPromise;
  }

  loadPromise = new Promise<void>((resolve, reject) => {
    if (typeof window === "undefined") {
      // Server-side: resolve immediately
      resolve();
      return;
    }

    import("react-pdf")
      .then((pdfModule) => {
        console.log("pdfService | setting pdfjslib and worker..");
        pdfJsLib = pdfModule.pdfjs as PDFJS;
        pdfJsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfJsLib.version}/build/pdf.worker.min.mjs`;
        isLoaded = true;
        resolve();
      })
      .catch((error) => {
        console.error("Failed to load PDF.js:", error);
        reject(error);
      });
  });

  return loadPromise;
};

export const getPdfJs = (): PDFJS => {
  if (!isLoaded || !pdfJsLib) {
    throw new Error("PDF.js not loaded. Call loadPdfJs first.");
  }
  return pdfJsLib;
};

export const isPdfJsLoaded = (): boolean => isLoaded;
