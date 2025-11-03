export interface ActionBarProps {
  btnName: string;
  taskState: string;
  btnDisabled: boolean;
  cb: () => void;
  children?: React.ReactNode;
}
