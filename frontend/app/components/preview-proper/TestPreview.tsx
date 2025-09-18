import { useEffect, useState } from "react";
import { loadPdfJs } from "../../utils/pdfService";
import { Document, Page } from "../../utils/pdfComponents";

interface TestProps {
  files: File[];
}

const Test: React.FC<TestProps> = ({ files }) => {
  console.log("Test comp | ", files);
  const [numPages, setNumPages] = useState(null);
  const [pdfJsLoaded, setPdfJsLoaded] = useState(false);

  useEffect(() => {
    loadPdfJs().then(() => {
      setPdfJsLoaded(true);
    });
  }, []);

  function onDocumentLoadSuccess({ numPages }) {
    console.log("numPages: ", numPages);
    setNumPages(numPages);
  }

  if (!pdfJsLoaded) return <p>Loading PDF renderer..</p>;

  return (
    <Document file={files[0]} onLoadSuccess={onDocumentLoadSuccess}>
      {Array.from(new Array(Math.min(numPages, 70)), (el, index) => {
        console.log(" index: ", index);
        return (
            <Page
              key={`page_${index + 1}`}
              pageNumber={index + 1}
              renderAnnotationLayer={false}
              renderTextLayer={false}
              width={170}
              height={300}
              // scale={0.7}
            />
        );
      })}
    </Document>
  );
};

export default Test;
