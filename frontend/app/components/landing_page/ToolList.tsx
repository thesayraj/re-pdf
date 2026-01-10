import React from "react";
import ToolCard from "../ToolCard";
import {
  FaCompress,
  FaRegTrashCan,
  FaImages,
  FaFilePdf,
  FaSort,
  FaLock,
  FaUnlock,
  FaCodeMerge,
  FaScissors,
} from "react-icons/fa6";

const ToolList: React.FC = () => {
  const tools = [
    {
      icon: FaSort,
      title: "Rearrange PDF Pages",
      description: "Easily drag and drop pages to reorder your PDF.",
      route: "/rearrange-pdf-pages",
    },
    {
      icon: FaFilePdf,
      title: "Image to PDF",
      description: "Convert one or more JPG files to PDF",
      route: "/img-to-pdf",
    },
    {
      icon: FaRegTrashCan,
      title: "Delete Pages",
      description: "Remove pages from a PDF document",
      route: "/delete-pdf-pages",
    },
    {
      icon: FaScissors,
      title: "Split PDF",
      description: "Extract PDF pages or split into several single pages",
      route: "/split-pdf",
    },
    {
      icon: FaImages,
      title: "PDF to Image",
      description: "Convert PDF pages to images",
      route: "/pdf-to-image",
    },
    {
      icon: FaCompress,
      title: "Compress",
      description: "Reduce the size of your PDF",
      route: "/compress-pdf",
    },
    {
      icon: FaCodeMerge,
      title: "Merge PDF",
      description: "Combine multiple PDF documents with just one hit",
      route: "/merge-pdf",
    },
    {
      icon: FaUnlock,
      title: "Unlock PDF",
      description: "Remove restrictions and passowrd \n from a PDF document",
      route: "/unlock-pdf",
    },
    {
      icon: FaLock,
      title: "Protect PDF",
      description: "Encrypt your PDF with a password",
      route: "/protect-pdf",
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
