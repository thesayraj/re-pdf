import pymupdf
import os
from app.services.storage import storage
from app.types.common import UpFileInfo

import tempfile
from typing import Dict, List


def merge_pdf(job_id: str, inputs: List[UpFileInfo], options: Dict) -> Dict:
    pages: List[Dict] = options["pages"]  # ordered list of {fileId, pageNumber}

    # Cache opened PDFs to avoid reopening
    opened_docs: Dict[str, pymupdf.Document] = {}

    with tempfile.TemporaryDirectory() as tmpdir:
        result_pdf = os.path.join(tmpdir, "result.pdf")
        out_doc = pymupdf.open()  # empty PDF

        try:
            for p in pages:
                file_id = p["fileId"]
                page_number = p["pageNumber"]  # 1-based

                if file_id not in opened_docs:
                    with storage.input_file(job_id, file_id) as f:
                        opened_docs[file_id] = pymupdf.open(f)

                src_doc = opened_docs[file_id]

                # Convert to 0-based index
                page_index = page_number - 1

                if page_index < 0 or page_index >= src_doc.page_count:
                    raise ValueError(
                        f"Invalid page number {page_number} for file {file_id}"
                    )

                # Insert exactly one page
                out_doc.insert_pdf(
                    src_doc,
                    from_page=page_index,
                    to_page=page_index
                )

            out_doc.save(result_pdf)

        finally:
            out_doc.close()
            for d in opened_docs.values():
                d.close()

        out_meta = storage.save_output_file(result_pdf, job_id, ".pdf")

    return {
        "job_id": job_id,
        "out_f_name": out_meta["out_f_name"]
    }
