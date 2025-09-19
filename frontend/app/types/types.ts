import { PDFDocumentProxy } from "pdfjs-dist";

export type InputFile =
  | {
      id: string;
      type: "pdf";
      file: File;
      pdf: PDFDocumentProxy;
      numPages: number;
    }
  | {
      id: string;
      type: "image";
      file: File;
    };

export interface PageData {
  id: string;
  fileId: string;
  pageNumber: number;
}
