import React from "react";
import ToolCard from "../ToolCard";
import {
  FaCompress,
  FaRegPenToSquare,
  FaRegTrashCan,
  FaImages,
  FaFilePdf,
  FaFileWord,
  FaSignature,
  FaLock,
  FaUnlock,
  FaCodeMerge,
  FaScissors,
} from "react-icons/fa6";

const ToolList: React.FC = () => {
  const tools = [
    {
      icon: FaRegPenToSquare,
      title: "PDF Editor",
      description: `Edit PDF files for free. Fill & sign PDF.\nAdd text, links, images and shapes.\n Edit existing PDF text. Annotate PDF`,
    },
    {
      icon: FaImages,
      title: "PDF to JPG",
      description: "Convert PDF pages to JPG files",
    },
    {
      icon: FaCompress,
      title: "Compress",
      description: "Reduce the size of your PDF",
    },
    {
      icon: FaFileWord,
      title: "PDF to WORD",
      description: "Convert PDF document to WORD",
    },
    {
      icon: FaImages,
      title: "PDF to PNG",
      description: "Convert PDF pages to PNG files",
    },
    {
      icon: FaRegTrashCan,
      title: "Delete Pages",
      description: "Remove pages from a PDF document",
    },
    {
      icon: FaFilePdf,
      title: "WORD to PDF",
      description: "Convert WORD file to PDF with ease",
    },
    {
      icon: FaFilePdf,
      title: "JPG to PDF",
      description: "Convert one or more JPG files to PDF",
    },
    {
      icon: FaScissors,
      title: "Split PDF",
      description: "Extract PDF pages or split into several single pages",
    },
    {
      icon: FaCodeMerge,
      title: "Merge PDF",
      description: "Combine multiple PDF documents with just one hit",
    },
    {
      icon: FaFilePdf,
      title: "PNG to PDF",
      description: "Convert one or more PNG files to PDF",
    },
    {
      icon: FaLock,
      title: "Protect PDF",
      description: "Encrypt your PDF with a password",
    },
    {
      icon: FaSignature,
      title: "Fill & Sign",
      description: "Add signature to PDF. Fill out PDF forms",
    },
    {
      icon: FaUnlock,
      title: "Unlock PDF",
      description: "Remove restrictions and passowrd \n from a PDF document",
    },
  ];

  const iconColors = [
    {
      iconBgClass: "bg-blue-100",
      iconColorClass: "text-blue-600",
    },
    {
      iconBgClass: "bg-green-100",
      iconColorClass: "text-green-600",
    },
    {
      iconBgClass: "bg-red-100",
      iconColorClass: "text-red-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 justify-items-center gap-4 p-6 xl:pl-38 xl:pr-38">
      {tools.map((tool, index) => (
        <ToolCard
          key={index}
          {...tool}
          {...iconColors[index % iconColors.length]}
        />
      ))}
    </div>
  );
};

export default ToolList;
