import os
from typing import Dict, List
import pymupdf
import tempfile

from app.services.storage import storage
from app.types.common import UpFileInfo


def unlock_pdf(job_id: str, inputs: List[UpFileInfo], options: Dict) -> Dict:
    file_info = inputs[0]
    file_name = file_info.name
    file_psw = file_info.psw

    with storage.input_file(job_id, file_name) as input_pdf, tempfile.TemporaryDirectory() as tmpdir:
        try:
            # Attempt to open the document
            doc = pymupdf.open(input_pdf)

            if doc.needs_pass:
                auth_result = doc.authenticate(file_psw)

                # Codes 1, 4, 6 = valid user or owner password
                if auth_result not in (1, 4, 6):
                    return {
                        "error": "invalid_password",
                        "msg": "The password given is incorrect."
                    }

            # Save the PDF with *no encryption at all*
            result_pdf = os.path.join(tmpdir, "result.pdf")
            doc.save(result_pdf, encryption=pymupdf.PDF_ENCRYPT_NONE)
            doc.close()

        except:
            return {
                "error": "unlock_failed",
                "msg": "Failed to unlock PDF."
            }

        out_meta = storage.save_output_file(result_pdf, job_id, ".pdf")

    return {
        "job_id": job_id,
        "out_f_name": out_meta["out_f_name"]
    }
