import React, { useState } from "react";
import FileUploader from "../components/FileUploader";
import { useJobHandler } from "../hooks/useJobHandler";
import { useNavigate } from "react-router";
import PreviewArea from "../components/preview/PreviewArea";
import { useFileLoader } from "../hooks/useFileLoader";
import ActionBar from "../components/ActionBar";
import { EyeIcon, EyeOffIcon } from "lucide-react";

const ProtectPDFPage: React.FC = () => {
  const { taskState, handleTask } = useJobHandler();
  const { items, addFiles, setItems } = useFileLoader(true);
  const [pass, setPass] = useState("");
  const [show, setShow] = useState(false);

  const navigate = useNavigate();
  const fileTypes = ".pdf";

  const applyChanges = async () => {
    try {
      const obj = await handleTask(items, "protect-pdf", { psw: pass });
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
      alert("Failed");
      console.log(err);
    }
  };

  return (
    <div className="pt-34 flex flex-col items-center justify-start p-8 bg-gray-50">
      <div className="w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">
          Protect PDF
        </h1>
        <p className="text-gray-600 mb-8 text-center">
          Add password to your PDF documents.
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
          <ActionBar
            btnName="Apply"
            btnDisabled={!!taskState || !pass}
            taskState={taskState}
            cb={applyChanges}
          >
            <div className="relative w-64">
              <input
                type={show ? "text" : "password"}
                placeholder="Enter password"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                className="px-4 py-2 border rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {/* Toggle button (eye icon) */}
              <button
                type="button"
                onClick={() => setShow(!show)}
                className="absolute inset-y-0 right-2 flex items-center text-gray-500 hover:text-gray-700"
              >
                {show ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>
          </ActionBar>
        )}
      </div>
      <div className="mt-40 space-y-4">
        <h2 className="text-lg font-semibold text-gray-800">
          How to Password Protect PDF
        </h2>
        <ol className="list-decimal list-inside text-gray-600 space-y-1">
          <li>Upload your PDF file using the uploader above.</li>
          <li>Enter password to lock your PDF in password box.</li>
          <li>Click "Apply" to start the process.</li>
          <li>Download your password protected PDF instantly.</li>
        </ol>

        <p className="text-gray-500 text-sm">
          Note: All files are processed securely and deleted shortly after
          conversion.
        </p>
      </div>
    </div>
  );
};

export default ProtectPDFPage;
