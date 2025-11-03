import React from "react";
import { ActionBarProps } from "../types/common";

const ActionBar: React.FC<ActionBarProps> = ({
  btnName,
  taskState,
  btnDisabled,
  cb,
  children,
}) => {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-white border-t-2 border-blue-300 shadow-md py-4 flex flex-col items-center space-y-3">
      {children}
      <button
        onClick={cb}
        disabled={btnDisabled}
        className={`px-6 py-2 rounded-lg font-medium text-white
                ${btnDisabled ? "bg-gray-400 cursor-not-allowed" : "cursor-pointer bg-blue-600 hover:bg-blue-700"}`}
      >
        {taskState || btnName}
      </button>
    </div>
  );
};

export default ActionBar;
