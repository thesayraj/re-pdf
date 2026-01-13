import pymupdf
import os
from app.services.storage import storage
from app.types.common import UpFileInfo

import tempfile
from typing import Dict, List


def image_to_pdf(job_id: str, inputs: List[UpFileInfo], options: Dict) -> Dict:
    page_data: List[Dict] = options["pages"] # ordered collection
    file_names = [p["fileId"] for p in page_data]

    with tempfile.TemporaryDirectory() as tmpdir:
        result_pdf = os.path.join(tmpdir, "result.pdf")
        doc = pymupdf.open()
        for file_name in file_names:
            with storage.input_file(job_id, file_name) as f:
                img = pymupdf.open(f)
                rect = img[0].rect
                pdfbytes = img.convert_to_pdf()
                img.close()

                imgPDF = pymupdf.open("pdf", pdfbytes)
                page = doc.new_page(width = rect.width,
                                    height = rect.height)
                page.show_pdf_page(rect, imgPDF, 0)

        doc.save(result_pdf)
        doc.close()

        out_meta = storage.save_output_file(result_pdf, job_id, ".pdf")

    return {
        "job_id": job_id,
        "out_f_name": out_meta["out_f_name"]
    }
