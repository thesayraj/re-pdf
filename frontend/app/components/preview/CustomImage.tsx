import React, { useMemo, useState } from "react";

interface ZoomProps {
  url: string;
  name: string;
}

let openModalCallback: ((props: ZoomProps) => void) | null = null;

const ImageZoom = {
  openZoom: (props: ZoomProps) => {
    if (openModalCallback) openModalCallback(props);
  },
  registerZoomCallback: (cb: typeof openModalCallback) => {
    openModalCallback = cb;
  },
};

const ZoomedImage: React.FC = () => {
  const [zoomProps, setZoomProps] = useState<ZoomProps | null>(null);

  // Register callback once
  ImageZoom.registerZoomCallback(setZoomProps);

  const fileSlice = useMemo(() => {
    if (zoomProps) return zoomProps.url;
    return null;
  }, [zoomProps]);

  if (!zoomProps) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white p-4 rounded-lg max-w-3xl max-h-[90vh] overflow-auto">
        <h2 className="mb-2 font-bold">{zoomProps.name}</h2>
        {fileSlice && <img src={fileSlice} width={300} height={600} />}
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

export { ImageZoom, ZoomedImage };
