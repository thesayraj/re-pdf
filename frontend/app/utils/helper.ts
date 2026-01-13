import { v4 as uuidv4 } from "uuid";

export function getUniqueFileName(file: File) {
  const safeName = file.name.replace(/\s+/g, "_"); // replace spaces
  const extIndex = safeName.lastIndexOf(".");
  const base = extIndex !== -1 ? safeName.slice(0, extIndex) : safeName;
  const ext = extIndex !== -1 ? safeName.slice(extIndex) : "";

  return `${base}_${uuidv4()}${ext}`;
}

/**
 * Truncates a file name while preserving its extension.
 *
 * Example:
 * formatFileName("very_long_filename.pdf", 10)
 * → "very_long_...pdf"
 */
export function formatFileName(fileName: string, maxLen = 15) {
  const lastDot = fileName.lastIndexOf(".");
  const name = lastDot !== -1 ? fileName.slice(0, lastDot) : fileName;
  const ext = lastDot !== -1 ? fileName.slice(lastDot) : "";

  return name.length > maxLen
    ? `${name.slice(0, maxLen)}..${ext}`
    : `${name}${ext}`;
}
