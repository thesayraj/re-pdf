import { InputFile } from "./file";

export interface PageData {
  id: string;
  fileId: string;
  pageNumber: number;
}

export interface PreviewAreaProps {
  items: InputFile[];
  viewType: "file" | "page";
  acceptedTypes: string;
  onDeleteFile?: (id: string) => void;
  onAddFiles?: (files: File[]) => void;
}

export interface PreviewCardWrapperProps {
  file: InputFile;
  page: PageData;
  onDelete: (id: string) => void;
}

export interface PreviewCardProps {
  page: PageData;
  onDelete: (id: string) => void;
  onZoom: () => void;
  children: React.ReactNode;
}

export type ZoomContent =
  | { type: "image"; url: string; name: string }
  | { type: "pdf"; buffer: ArrayBuffer; pageNumber?: number; name: string };

export interface ZoomContextValue {
  openZoom: (content: ZoomContent) => void;
  closeZoom: () => void;
}
