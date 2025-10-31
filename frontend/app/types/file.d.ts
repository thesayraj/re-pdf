import { PDFDocumentProxy } from "pdfjs-dist";

export type InputFile =
  | {
      id: string;
      type: "pdf";
      file: File;
      pdf: PDFDocumentProxy;
      numPages: number;
      psw: string;
    }
  | {
      id: string;
      type: "image";
      file: File;
    };

export interface FileUploaderProps {
  onFileSelect: (files: File[]) => void;
  acceptedTypes: string;
  multiple?: boolean;
  variant?: "full" | "compact";
  maxFileSizeMB?: number;
}
