import os
from typing import Dict, List
import pymupdf
import tempfile

from app.services.storage import storage
from app.types.common import UpFileInfo


def protect_pdf(job_id: str, inputs: List[UpFileInfo], options: Dict) -> Dict:
    file_info = inputs[0]
    file_name = file_info.name
    psw = options["psw"]

    with storage.input_file(job_id, file_name) as input_pdf, tempfile.TemporaryDirectory() as tmpdir:
        doc = pymupdf.open(input_pdf)
        result_pdf = os.path.join(tmpdir, "result.pdf")

        doc.save(
            result_pdf,
            user_pw=psw,
            encryption=pymupdf.PDF_ENCRYPT_AES_256
        )
        doc.close()

        out_meta = storage.save_output_file(result_pdf, job_id, ".pdf")

    return {
        "job_id": job_id,
        "out_f_name": out_meta["out_f_name"]
    }
