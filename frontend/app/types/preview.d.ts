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
  enableDnd?: boolean;
};

type WithAddFiles = BasePreviewAreaProps & {
  canAddMoreFiles: true;
  onAddFiles: (files: File[]) => void; // required
};

type WithoutAddFiles = BasePreviewAreaProps & {
  canAddMoreFiles?: false; // default false or undefined
  onAddFiles?: never; // explicitly disallowed
};

type WithSplit = BasePreviewAreaProps & {
  enableSplit: true;
  onSplitChange: (splits: Set<number>) => void; // required
};

type WithoutSplit = BasePreviewAreaProps & {
  enableSplit?: false; // default false or undefined
  onSplitChange?: never; // explicitly disallowed
};

export type PreviewAreaProps = (WithAddFiles | WithoutAddFiles) &
  (WithSplit | WithoutSplit);

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
