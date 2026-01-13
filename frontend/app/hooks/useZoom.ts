import { useContext } from "react";
import { ZoomContext } from "../contexts/ZoomContext";

export const useZoom = () => {
  const ctx = useContext(ZoomContext);
  if (!ctx) throw new Error("useZoom must be used within ZoomProvider");
  return ctx;
};
