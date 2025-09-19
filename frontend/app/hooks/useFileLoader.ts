import { useState } from "react";
import { loadPdfJs, getPdfJs } from "../utils/pdfService";
import { InputFile } from "../types/preview";
import { getUniqueFileName } from "../utils/helper";

export function useFileLoader() {
  const [items, setItems] = useState<InputFile[]>([]);

  const addFiles = async (files: File[]) => {
    loadPdfJs().then(async () => {
      const pdfjs = getPdfJs();
      const newItems: InputFile[] = [];
  
      for (const file of files) {
        if (file.type === "application/pdf") {
          const arrayBuffer = await file.arrayBuffer();
          const pdf = await pdfjs.getDocument(arrayBuffer).promise;
          newItems.push({
            id: getUniqueFileName(file),
            type: "pdf",
            file,
            pdf,
            numPages: pdf.numPages,
          });
        } else if (file.type.startsWith("image/")) {
          newItems.push({
            id: getUniqueFileName(file),
            type: "image",
            file,
          });
        }
      }
  
      setItems((prev) => [...prev, ...newItems]);
    })
  };

  return { items, setItems, addFiles };
}
