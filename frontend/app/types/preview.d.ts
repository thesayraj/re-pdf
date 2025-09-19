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
  fileName: string;
  pageNumber: number;
}

export interface PreviewAreaProps {
  items: InputFile[];
  viewType: "file" | "page";
  onDeleteFile?: (id: string) => void;
  onAddFiles?: (files: File[]) => void;
}

export interface PreviewCardWrapperProps {
  pdf?: PDFDocumentProxy;
  imageFile?: File;
  page: PageData;
  onDelete: (id: string) => void;
}
