import React, { useRef, useState } from "react";
import { UploadIcon, PlusIcon } from "lucide-react";

interface FileUploaderProps {
  onFileSelect: (files: File[]) => void;
  acceptedTypes?: string;
  multiple?: boolean;
  variant?: "full" | "compact";
}

const FileUploader: React.FC<FileUploaderProps> = ({
  onFileSelect,
  acceptedTypes = ".pdf,.jpg,.png",
  multiple = false,
  variant = "full",
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFiles = (newFiles: File[]) => {
    const validFiles = newFiles.filter((file) =>
      acceptedTypes
        .split(",")
        .some((t) => file.name.toLowerCase().endsWith(t.trim()))
    );

    if (validFiles.length === 0) {
      setError("Invalid file type");
      return;
    }

    setError(null);
    onFileSelect(validFiles);

    if (!multiple && inputRef.current) inputRef.current.value = "";
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    handleFiles(Array.from(e.target.files));
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    handleFiles(Array.from(e.dataTransfer.files));
  };

  const triggerBrowse = () => {
    inputRef.current?.click();
  };

  return (
    <div
      className={`cursor-pointer ${
        variant === "full"
          ? "border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500"
          : "border border-gray-300 text-blue-600 text-sm px-6 py-2 rounded-lg bg-transparent hover:bg-blue-50 hover:border-blue-400"
      }`}
      onClick={triggerBrowse}
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      <input
        type="file"
        ref={inputRef}
        multiple={multiple}
        accept={acceptedTypes}
        onChange={handleFileChange}
        className="hidden"
      />

      {variant === "full" ? (
        <>
          <UploadIcon className="mx-auto mb-5 w-15 h-15 text-blue-500" />
          <p className="text-gray-500">
            Drag and drop files here, or{" "}
            <span className="text-blue-600">browse</span>
          </p>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </>
      ) : (
        <span>
          <PlusIcon className="mr-2 text-blue-500 inline" size={15} />
          <span>Add More Files</span>
        </span>
      )}
    </div>
  );
};

export default FileUploader;
