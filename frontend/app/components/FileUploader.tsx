import React, { useRef, useState } from "react";

interface FileUploaderProps {
  onFileSelect: (files: File[]) => void;
  acceptedTypes?: string;
  multiple?: boolean;
}

const FileUploader: React.FC<FileUploaderProps> = ({
  onFileSelect,
  acceptedTypes = ".pdf,.jpg,.png",
  multiple = false,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFiles = (newFiles: File[]) => {
    const validFiles = newFiles.filter((file) =>
      acceptedTypes.split(",").some((t) => file.name.toLowerCase().endsWith(t.trim()))
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

  return (
    <div
      className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-500"
      onClick={() => inputRef.current?.click()}
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
      <p className="text-gray-500">
        Drag and drop files here, or <span className="text-blue-600">browse</span>
      </p>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default FileUploader;
