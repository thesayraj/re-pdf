import React, { useState } from "react";
import FileUploader from "../components/FileUploader";
import { useJobHandler } from "../hooks/useJobHandler";
import { useNavigate } from "react-router";
import PreviewArea from "../components/preview/PreviewArea";
import { useFileLoader } from "../hooks/useFileLoader";
import { PageData } from "../types/preview";
import ActionBar from "../components/ActionBar";

const ImageToPDFPage: React.FC = () => {
  const { taskState, handleTask } = useJobHandler();
  const { items, addFiles, setItems } = useFileLoader();
  const [pages, setPages] = useState<PageData[]>([]);

  const navigate = useNavigate();
  const fileTypes = ".jpg,.jpeg,.png";

  const startConversion = async () => {
    try {
      if (!pages.length) return;

      const obj = await handleTask(items, "img-to-pdf", { pages: pages });
      if (obj && obj.downloadUrl) {
        navigate(`/download/${obj.jobId}`, {
          state: {
            downloadUrl: obj.downloadUrl,
            fileName: obj.fileName,
            expiresIn: obj.expiresIn,
          },
        });
      }
    } catch (err) {
      alert("Conversion failed");
      console.log(err);
    }
  };

  return (
    <div className="pt-34 flex flex-col items-center justify-start p-8 bg-gray-50">
      <div className="w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">
          Image to PDF
        </h1>
        <p className="text-gray-600 mb-8 text-center">
          Convert your JPG and PNG images into PDF document instantly.
        </p>

        {items.length === 0 ? (
          <FileUploader
            onFileSelect={addFiles}
            acceptedTypes={fileTypes}
            multiple
          />
        ) : (
          <PreviewArea
            items={items}
            defaultViewType="file"
            acceptedTypes={fileTypes}
            onDeleteFile={(id) =>
              setItems((prev) => prev.filter((f) => f.id !== id))
            }
            canAddMoreFiles
            onAddFiles={addFiles}
            enableDnd
            onPagesChange={setPages}
          />
        )}

        {items.length > 0 && (
          <ActionBar
            btnName="Convert"
            btnDisabled={!!taskState}
            taskState={taskState}
            cb={startConversion}
          />
        )}
      </div>
      <div className="mt-40 space-y-4">
        <h2 className="text-lg font-semibold text-gray-800">
          How to Convert Images to PDF
        </h2>
        <ol className="list-decimal list-inside text-gray-600 space-y-1">
          <li>Upload your Image files using the uploader above.</li>
          <li>
            Drag and drop pages in the preview area to change their order.
          </li>
          <li>Click "Convert" to start the conversion process.</li>
          <li>Download your final PDF document instantly.</li>
        </ol>

        <p className="text-gray-500 text-sm">
          Note: All files are processed securely and deleted shortly after
          conversion.
        </p>
      </div>
    </div>
  );
};

export default ImageToPDFPage;
