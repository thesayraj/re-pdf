import React, { useState } from "react";
import FileUploader from "../components/FileUploader";
import { useJobHandler } from "../hooks/useJobHandler";
import { useNavigate } from "react-router";
import { useFileLoader } from "../hooks/useFileLoader";
import PreviewArea from "../components/preview/PreviewArea";
import ActionBar from "../components/ActionBar";
import { PageData, ViewType } from "../types/preview";
import { InputFile } from "../types/file";
import { MergePage } from "../types/api";

const MergePDFPage: React.FC = () => {
  const { taskState, handleTask } = useJobHandler();
  const { items, addFiles, setItems } = useFileLoader();
  const [pages, setPages] = useState<PageData[]>([]);
  const [currView, setCurrView] = useState<ViewType>();

  const navigate = useNavigate();
  const fileTypes = ".pdf";

  const applyChanges = async () => {
    try {
      if (!pages) return;
      const finalPages: MergePage[] = buildFinalPages(pages, items, currView);

      const obj = await handleTask(items, "merge-pdf", {
        pages: finalPages,
      });
      if (obj && obj?.downloadUrl) {
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
          Merge PDF
        </h1>
        <p className="text-gray-600 mb-8 text-center">
          Merge multiple PDF documents into single PDF seamlessly.
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
            allowViewToggle
            acceptedTypes={fileTypes}
            canAddMoreFiles
            onAddFiles={addFiles}
            onDeleteFile={(id) =>
              setItems((prev) => prev.filter((f) => f.id !== id))
            }
            enableDnd
            onPagesChange={setPages}
            onViewChange={setCurrView}
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
          How to Merge PDFs
        </h2>
        <ol className="list-decimal list-inside text-gray-600 space-y-1">
          <li>Upload your PDF files using the uploader above.</li>
          <li>Drag and drop pdfs in the preview area to change their order.</li>
          <li>Click "Apply Changes" to start the merge process.</li>
          <li>Download your final pdf instantly.</li>
        </ol>

        <p className="text-gray-500 text-sm">
          Note: All files are processed securely and deleted shortly after
          conversion.
        </p>
      </div>
    </div>
  );
};

const buildFinalPages = (
  uiPages: PageData[],
  items: InputFile[],
  view?: ViewType
): MergePage[] => {
  if (view === "page") {
    return uiPages.map((p) => ({
      fileId: p.fileId,
      pageNumber: p.pageNumber,
    }));
  }

  // view === "file"
  const result: MergePage[] = [];

  for (const p of uiPages) {
    const file = items.find((f) => f.id === p.fileId);
    if (!file || file.type !== "pdf") continue;

    const totalPages = file.numPages;
    for (let i = 1; i <= totalPages; i++) {
      result.push({
        fileId: p.fileId,
        pageNumber: i,
      });
    }
  }

  return result;
};

export default MergePDFPage;
