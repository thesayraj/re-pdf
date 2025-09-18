import { v4 as uuidv4 } from "uuid";

export function getUniqueFileName(file: File) {
  const safeName = file.name.replace(/\s+/g, "_"); // replace spaces
  const extIndex = safeName.lastIndexOf(".");
  const base = extIndex !== -1 ? safeName.slice(0, extIndex) : safeName;
  const ext = extIndex !== -1 ? safeName.slice(extIndex) : "";

  return `${base}_${uuidv4()}${ext}`;
}
