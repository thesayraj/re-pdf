import os
import pymupdf
from app.services.storage import storage
from app.utils.pdf import repair_pdf
from app.types.common import UpFileInfo

import tempfile
from typing import Dict, List


def delete_pages(job_id: str, inputs: List[UpFileInfo], options: Dict) -> Dict:
    file_info = inputs[0]
    file_name = file_info.name
    page_data: List[Dict] = options["pages"]  # list of PageData dicts to KEEP

    with storage.input_file(job_id, file_name) as input_pdf, tempfile.TemporaryDirectory() as tmpdir:
        repaired_pdf = os.path.join(tmpdir, "repaired.pdf")
        repair_pdf(input_pdf, repaired_pdf)
        src_doc = pymupdf.open(repaired_pdf)

        # Collect valid page indices to keep (0-based)
        pages_to_keep = []
        for p in page_data:
            idx = p["pageNumber"] - 1
            if 0 <= idx < src_doc.page_count:
                pages_to_keep.append(idx)
            else:
                print(f"Skipping invalid page {p['pageNumber']} for {file_name}")

        src_doc.select(pages_to_keep)

        result_pdf = f"{tmpdir}/result.pdf"
        src_doc.save(result_pdf, garbage=4, deflate=True)
        src_doc.close()

        out_meta = storage.save_output_file(result_pdf, job_id, ".pdf")

    return {
        "job_id": job_id,
        "out_f_name": out_meta["out_f_name"],
    }
