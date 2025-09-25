import { InputFile } from "./file";

export interface PageData {
  id: string;
  fileId: string;
  pageNumber: number;
}

type BasePreviewAreaProps = {
  items: InputFile[];
  viewType: "file" | "page";
  acceptedTypes: string;
  onDeleteFile?: (id: string) => void;
  onPagesChange?: (pages: PageData[]) => void;
};

type WithAddFiles = BasePreviewAreaProps & {
  canAddMoreFiles: true;
  onAddFiles: (files: File[]) => void; // required
};

type WithoutAddFiles = BasePreviewAreaProps & {
  canAddMoreFiles?: false; // default false or undefined
  onAddFiles?: never; // explicitly disallowed
};

export type PreviewAreaProps = WithAddFiles | WithoutAddFiles;

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
