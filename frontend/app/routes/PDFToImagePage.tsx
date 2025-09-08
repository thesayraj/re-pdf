import React, { useState } from "react";
import FileUploader from "../components/FileUploader";
import { useJobHandler } from "../hooks/useJobHandler";

const PDFToImagePage: React.FC = () => {
  const { isProcessing, handleConvert } = useJobHandler();
  const [files, setFiles] = useState<File[]>([]);

  const handleFileUpload = (uploadedFiles: File[] | File) => {
    const arr = Array.isArray(uploadedFiles) ? uploadedFiles : [uploadedFiles];
    setFiles(arr);
  };

  const startConversion = async () => {
    try {
      const downloadUrl = await handleConvert(files, "pdf-to-image");
      if (downloadUrl) {
        const link = document.createElement("a");
        link.href = downloadUrl;
        link.download = "output.zip";
        document.body.appendChild(link);
        link.click();
        link.remove();
      }
    } catch (err) {
      alert("Conversion failed");
      console.log(err);
    }
  };

  return (
    <div className="pt-34 min-w-screen min-h-screen flex flex-col items-center justify-start p-8 bg-gray-50">
      <div className="w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">
          PDF to Image
        </h1>
        <p className="text-gray-600 mb-8 text-center">
          Convert your PDF documents into high-quality images instantly.
        </p>

        <FileUploader
          onFileSelect={handleFileUpload}
          acceptedTypes=".pdf"
        />

        {files.length > 0 && (
          <div className="mt-6 flex justify-center">
            <button
              onClick={startConversion}
              disabled={isProcessing}
              className={`px-6 py-2 rounded-lg font-medium text-white cursor-pointer
                ${isProcessing ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"}`}
            >
              {isProcessing ? "Processing..." : "Convert"}
            </button>
          </div>
        )}
      </div>
      <div className="mt-40 space-y-4">
        <h2 className="text-lg font-semibold text-gray-800">
          How to Convert PDF to Images
        </h2>
        <ol className="list-decimal list-inside text-gray-600 space-y-1">
          <li>Upload your PDF file using the uploader above.</li>
          <li>Click "Convert" to start the conversion process.</li>
          <li>Download your images instantly.</li>
        </ol>

        <p className="text-gray-500 text-sm">
          Note: All files are processed securely and deleted shortly after
          conversion.
        </p>
      </div>
    </div>
  );
};

export default PDFToImagePage;
