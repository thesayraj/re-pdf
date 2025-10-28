import React from "react";
import ToolCard from "../ToolCard";
import {
  FaCompress,
  FaRegPenToSquare,
  FaRegTrashCan,
  FaImages,
  FaFilePdf,
  FaSort,
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
      route: "/edit-pdf",
    },
    {
      icon: FaImages,
      title: "PDF to JPG",
      description: "Convert PDF pages to JPG files",
      route: "/pdf-to-jpg",
    },
    {
      icon: FaCompress,
      title: "Compress",
      description: "Reduce the size of your PDF",
      route: "/compress-pdf",
    },
    {
      icon: FaSort,
      title: "Rearrange PDF Pages",
      description: "Easily drag and drop pages to reorder your PDF.",
      route: "/rearrange-pdf-pages",
    },
    {
      icon: FaImages,
      title: "PDF to PNG",
      description: "Convert PDF pages to PNG files",
      route: "/pdf-to-png",
    },
    {
      icon: FaRegTrashCan,
      title: "Delete Pages",
      description: "Remove pages from a PDF document",
      route: "/delete-pdf-pages",
    },
    {
      icon: FaFilePdf,
      title: "WORD to PDF",
      description: "Convert WORD file to PDF with ease",
      route: "/word-to-pdf",
    },
    {
      icon: FaFilePdf,
      title: "Image to PDF",
      description: "Convert one or more JPG files to PDF",
      route: "/img-to-pdf",
    },
    {
      icon: FaScissors,
      title: "Split PDF",
      description: "Extract PDF pages or split into several single pages",
      route: "/split-pdf",
    },
    {
      icon: FaCodeMerge,
      title: "Merge PDF",
      description: "Combine multiple PDF documents with just one hit",
      route: "/merge-pdf",
    },
    {
      icon: FaFilePdf,
      title: "PNG to PDF",
      description: "Convert one or more PNG files to PDF",
      route: "/png-to-pdf",
    },
    {
      icon: FaLock,
      title: "Protect PDF",
      description: "Encrypt your PDF with a password",
      route: "/protect-pdf",
    },
    {
      icon: FaSignature,
      title: "Fill & Sign",
      description: "Add signature to PDF. Fill out PDF forms",
      route: "/fill-sign-pdf",
    },
    {
      icon: FaUnlock,
      title: "Unlock PDF",
      description: "Remove restrictions and passowrd \n from a PDF document",
      route: "/unlock-pdf",
    },
    {
      icon: FaImages,
      title: "PDF to Image",
      description: "Convert PDF pages to images",
      route: "/pdf-to-image",
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
