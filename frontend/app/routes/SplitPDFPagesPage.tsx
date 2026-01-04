import React, { useState } from "react";
import FileUploader from "../components/FileUploader";
import { useJobHandler } from "../hooks/useJobHandler";
import { useNavigate } from "react-router";
import { useFileLoader } from "../hooks/useFileLoader";
import PreviewArea from "../components/preview/PreviewArea";
import ActionBar from "../components/ActionBar";

const SplitPDFPagesPage: React.FC = () => {
  const { taskState, handleTask } = useJobHandler();
  const { items, addFiles, setItems } = useFileLoader();
  const [splits, setSplits] = useState<Set<number>>(new Set());

  const navigate = useNavigate();
  const fileTypes = ".pdf";

  const applyChanges = async () => {
    try {
      if (!splits.size) return;

      const obj = await handleTask(items, "split-pdf", {
        splits: Array.from(splits),
      });
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
      alert("Task failed");
      console.log(err);
    }
  };

  return (
    <div className="pt-34 flex flex-col items-center p-8 bg-gray-50">
      <div className="w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">
          Split PDF
        </h1>
        <p className="text-gray-600 mb-8 text-center">
          Split PDF pages into multiple PDF documents seamlessly.
        </p>

        {items.length === 0 ? (
          <FileUploader onFileSelect={addFiles} acceptedTypes={fileTypes} />
        ) : (
          <PreviewArea
            items={items}
            viewType="page"
            acceptedTypes={fileTypes}
            onDeleteFile={(id) =>
              setItems((prev) => prev.filter((f) => f.id !== id))
            }
            enableSplit
            onSplitChange={setSplits}
          />
        )}

        {items.length > 0 && (
          <ActionBar
            btnName="Apply Changes"
            btnDisabled={!!taskState}
            taskState={taskState}
            cb={applyChanges}
          />
        )}
      </div>
      <div className="mt-40 space-y-4">
        <h2 className="text-lg font-semibold text-gray-800">
          How to Split PDF
        </h2>
        <ol className="list-decimal list-inside text-gray-600 space-y-1">
          <li>Upload your PDF file using the uploader above.</li>
          <li>
            Mark cuttings in PDF by clicking{" "}
            <i>
              <b>cut</b>
            </i>{" "}
            icon.
          </li>
          <li>Click "Apply Changes" to start the split process.</li>
          <li>Download your final pdfs instantly.</li>
        </ol>

        <p className="text-gray-500 text-sm">
          Note: All files are processed securely and deleted shortly after
          conversion.
        </p>
      </div>
    </div>
  );
};

export default SplitPDFPagesPage;
