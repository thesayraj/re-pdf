import os
import zipfile
import pymupdf
from app.services.storage import storage
from app.utils.pdf import repair_pdf
from app.types.common import UpFileInfo

import tempfile
from typing import Dict, List


def split_pdf(job_id: str, inputs: List[UpFileInfo], options: Dict) -> Dict:
    file_info = inputs[0]
    file_name = file_info.name
    splits: List[int] = sorted(options["splits"])

    with storage.input_file(job_id, file_name) as input_pdf, tempfile.TemporaryDirectory() as tmpdir:
        repaired_pdf = os.path.join(tmpdir, "repaired.pdf")
        repair_pdf(input_pdf, repaired_pdf)

        src_doc = pymupdf.open(repaired_pdf)
        total_pages = src_doc.page_count

        # ensure final cut exists
        if not splits or splits[-1] < total_pages:
            splits.append(total_pages)

        zip_path = os.path.join(tmpdir, "pdfs.zip")
        with zipfile.ZipFile(zip_path, "w", compression=zipfile.ZIP_DEFLATED) as zf:
            start_page = 1  # 1-based
            part_idx = 1

            for end_page in splits:
                if start_page > total_pages:
                    break
                if end_page < start_page:
                    continue

                end_page = min(end_page, total_pages)

                out_doc = pymupdf.open()
                out_doc.insert_pdf(
                    src_doc,
                    from_page=start_page - 1,
                    to_page=end_page - 1,
                )

                pdf_bytes = out_doc.tobytes()
                out_doc.close()

                pdf_name = f"part_{part_idx}_{start_page}-{end_page}.pdf"
                zf.writestr(pdf_name, pdf_bytes)

                start_page = end_page + 1
                part_idx += 1


        src_doc.close()
        out_meta = storage.save_output_file(zip_path, job_id, ".zip")

    return {
        "job_id": job_id,
        "out_f_name": out_meta["out_f_name"],
    }
