import React, { useMemo, useState } from "react";
import { Document, Page } from "../../utils/pdfComponents";

interface ZoomProps {
  buffer: ArrayBuffer;
  pageNumber?: number;
  name: string;
}

let openModalCallback: ((props: ZoomProps) => void) | null = null;

const PdfZoom = {
  openZoom: (props: ZoomProps) => {
    if (openModalCallback) openModalCallback(props);
  },
  registerZoomCallback: (cb: typeof openModalCallback) => {
    openModalCallback = cb;
  },
};

const ZoomedPdfPage: React.FC = () => {
  const [zoomProps, setZoomProps] = useState<ZoomProps | null>(null);

  // Register callback once
  PdfZoom.registerZoomCallback(setZoomProps);

  const fileSlice = useMemo(() => {
    if (zoomProps) return { data: zoomProps.buffer };
    return null;
  }, [zoomProps]);

  if (!zoomProps) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white p-4 rounded-lg max-w-3xl max-h-[90vh] overflow-auto">
        <h2 className="mb-2 font-bold">{zoomProps.name}</h2>
        {fileSlice && (
          <Document file={fileSlice}>
            <Page
              pageNumber={zoomProps.pageNumber}
              width={400}
              height={800}
              renderTextLayer={false}
              renderAnnotationLayer={false}
            />
          </Document>
        )}
        <button
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
          onClick={() => setZoomProps(null)}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export { PdfZoom, ZoomedPdfPage };
