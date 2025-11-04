import React from "react";
import FileUploader from "../components/FileUploader";
import { useJobHandler } from "../hooks/useJobHandler";
import { useNavigate } from "react-router";
import PreviewArea from "../components/preview/PreviewArea";
import { useFileLoader } from "../hooks/useFileLoader";

const UnlockPDFPage: React.FC = () => {
  const { taskState, handleTask } = useJobHandler();
  const { items, addFiles, setItems } = useFileLoader(true);

  const navigate = useNavigate();
  const fileTypes = ".pdf";

  const unlock = async () => {
    try {
      const obj = await handleTask(items, "unlock-pdf");
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
      alert(err);
      console.error(err);
    }
  };

  return (
    <div className="pt-34 flex flex-col items-center justify-start p-8 bg-gray-50">
      <div className="w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">
          Unlock PDF
        </h1>
        <p className="text-gray-600 mb-8 text-center">
          Remove password from your PDF documents.
        </p>

        {items.length === 0 ? (
          <FileUploader onFileSelect={addFiles} acceptedTypes={fileTypes} />
        ) : (
          <PreviewArea
            items={items}
            viewType="file"
            acceptedTypes={fileTypes}
            onDeleteFile={(id) =>
              setItems((prev) => prev.filter((f) => f.id !== id))
            }
          />
        )}

        {items.length > 0 && (
          <div className="mt-6 flex justify-center">
            <button
              onClick={unlock}
              disabled={!!taskState}
              className={`px-6 py-2 rounded-lg font-medium text-white cursor-pointer
                ${taskState ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"}`}
            >
              {taskState ? taskState : "Unlock"}
            </button>
          </div>
        )}
      </div>
      <div className="mt-40 space-y-4">
        <h2 className="text-lg font-semibold text-gray-800">
          How to Unlock PDF
        </h2>
        <ol className="list-decimal list-inside text-gray-600 space-y-1">
          <li>Upload your PDF file using the uploader above.</li>
          <li>Enter your PDF's password in password box.</li>
          <li>Click "Unlock" to start the unlock process.</li>
          <li>Download your unlocked PDF instantly.</li>
        </ol>

        <p className="text-gray-500 text-sm">
          Note: All files are processed securely and deleted shortly after
          conversion.
        </p>
      </div>
    </div>
  );
};

export default UnlockPDFPage;
