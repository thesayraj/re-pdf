import { useState } from "react";
import { loadPdfJs, getPdfJs } from "../utils/pdfService";
import { getUniqueFileName } from "../utils/helper";
import { InputFile } from "../types/file";
import type { PDFDocumentProxy } from "pdfjs-dist/types/src/display/api";

export function useFileLoader(allowProtected = false) {
  const [items, setItems] = useState<InputFile[]>([]);

  const addFiles = async (files: File[]) => {
    loadPdfJs().then(async () => {
      const newItems: InputFile[] = [];

      for (const file of files) {
        if (file.type === "application/pdf") {
          const [pdf, psw] = await loadPDF(file, allowProtected);
          if (!pdf) return;

          newItems.push({
            id: getUniqueFileName(file),
            type: "pdf",
            file,
            pdf,
            numPages: pdf.numPages,
            psw: psw || "",
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
    });
  };

  return { items, setItems, addFiles };
}

const loadPDF = async (
  file: File,
  allowProtected: boolean,
  pass?: string
): Promise<[PDFDocumentProxy | undefined, string | undefined]> => {
  const pdfjs = getPdfJs();

  while (true) {
    const objectURL = URL.createObjectURL(file);

    try {
      const pdf = await pdfjs.getDocument({ url: objectURL, password: pass })
        .promise;
      URL.revokeObjectURL(objectURL);
      return [pdf, pass];
    } catch (error: any) {
      if (error.name !== "PasswordException" || !allowProtected) {
        alert(`Unable to open '${file.name}'.`);
        return [undefined, undefined];
      }

      const passInput = prompt(`Enter password for:\n${file.name}`) || "";

      // user cancelled or entered empty password
      if (!passInput.trim()) return [undefined, undefined];

      pass = passInput;
    }
  }
};
