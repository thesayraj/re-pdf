import React, { useRef, useState, useCallback } from "react";
import { Upload, File as FileIcon, X } from "lucide-react";

interface FileUploaderProps {
  onFileSelect: (files: File[]) => void;
  acceptedTypes?: string; // e.g. ".pdf,.jpg"
  multiple?: boolean;
  maxFileSizeMB?: number;
}

const FileUploader: React.FC<FileUploaderProps> = ({
  onFileSelect,
  acceptedTypes = ".pdf",
  multiple = false,
  maxFileSizeMB = 60,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateFiles = useCallback(
    (selectedFiles: File[]) => {
      const valid: File[] = [];
      for (const file of selectedFiles) {
        if (file.size > maxFileSizeMB * 1024 * 1024) {
          setError(`${file.name} exceeds ${maxFileSizeMB}MB`);
          continue;
        }
        if (
          acceptedTypes &&
          !acceptedTypes
            .split(",")
            .some((ext) => file.name.toLowerCase().endsWith(ext.trim()))
        ) {
          setError(`${file.name} has invalid file type`);
          continue;
        }
        valid.push(file);
      }
      return valid;
    },
    [maxFileSizeMB, acceptedTypes]
  );

  const addFiles = (newFiles: File[]) => {
    setFiles((prev) => {
      const updated = multiple ? [...prev, ...newFiles] : [newFiles[0]];
      setError(null);

      console.log("will call onFileSelect");
      onFileSelect(newFiles);
      return updated;
    });

    // Reset input for single-file mode
    if (!multiple && inputRef.current) inputRef.current.value = "";
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files ? Array.from(e.target.files) : [];
    const validFiles = validateFiles(selectedFiles);
    if (validFiles.length > 0) {
      onFileSelect(validFiles);
      // addFiles(validFiles);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = e.dataTransfer.files
      ? Array.from(e.dataTransfer.files)
      : [];
    const validFiles = validateFiles(droppedFiles);
    if (validFiles.length > 0) {
      // addFiles(validFiles);
      onFileSelect(validFiles);
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="w-full p-10 flex justify-center">
      <div
        ref={containerRef}
        className={`w-4xl p-10 border-2 border-dashed rounded-xl bg-white shadow-md transition
        ${isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
      >
        {files.length === 0 ? (
          <div className="cursor-pointer flex flex-col items-center space-y-3">
            <Upload className="w-12 h-12 text-blue-500" />
            <p className="text-gray-700 font-medium">
              Click or drag {multiple ? "files" : "a file"} anywhere to upload
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {files.map((file, index) => (
              <div
                key={`${file.name}-${file.size}-${index}`}
                className="flex items-center justify-between p-3 border rounded-lg bg-gray-50"
              >
                <div className="flex items-center space-x-2">
                  <FileIcon className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-800">{file.name}</span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(index);
                  }}
                  className="text-red-500 hover:text-red-700"
                >
                  <X className="w-5 h-5 cursor-pointer" />
                </button>
              </div>
            ))}
            {multiple && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  inputRef.current?.click();
                }}
                className="mt-2 text-blue-600 hover:underline"
              >
                + Add more files
              </button>
            )}
          </div>
        )}

        {error && <p className="text-red-500 mt-2">{error}</p>}

        {/* Hidden input */}
        <input
          ref={inputRef}
          type="file"
          accept={acceptedTypes}
          className="hidden"
          multiple={multiple}
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
};

export default FileUploader;
