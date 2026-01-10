import { InputFile } from "./file";

export interface PageData {
  id: string;
  fileId: string;
  pageNumber: number;
}

export type ViewType = "file" | "page"

type BasePreviewAreaProps = {
  items: InputFile[];
  defaultViewType: ViewType;
  acceptedTypes: string;
  onDeleteFile?: (id: string) => void;
  onPagesChange?: (pages: PageData[]) => void;
  enableDnd?: boolean;
  disableDeleteBtn?: boolean;
  allowViewToggle?: boolean;
  onViewChange?: (view: ViewType) => void;
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
  displayName: string
}

export interface PreviewCardProps {
  page: PageData;
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

export type DeleteContextValue = {
  enabled: boolean;
  onDelete?: (id: string) => void;
};

export type ViewToggleProps = {
  view: ViewType;
  onChange: (view: ViewType) => void;
}
