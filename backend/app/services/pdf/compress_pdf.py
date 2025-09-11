import pymupdf
from app.services.storage import storage

import os
import tempfile
import subprocess
from typing import Dict, List


PDF_METADATA_FIELDS = ["title", "author", "subject", "keywords", "creator", "producer"]

GHOSTSCRIPT_OPTIONS = [
    "gs",
    "-sDEVICE=pdfwrite",
    "-dCompatibilityLevel=1.7",
    "-dPDFSETTINGS=/prepress",
    "-dNOPAUSE",
    "-dQUIET",
    "-dBATCH"
]


def compress_pdf(job_id: str, inputs: List[str], options: str) -> Dict:
    file_name = inputs[0]

    with storage.input_file(job_id, file_name) as input_pdf, tempfile.TemporaryDirectory() as tmpdir:
        cleaned_pdf = os.path.join(tmpdir, "cleaned.pdf")
        optimized_pdf = os.path.join(tmpdir, "optimized.pdf")

        clean_pdf(input_pdf, cleaned_pdf)
        optimize_pdf(cleaned_pdf, optimized_pdf)

        out_meta = storage.save_output_file(optimized_pdf, job_id, ".pdf")

    return {
        "job_id": job_id,
        "out_f_name": out_meta["out_f_name"]
    }


def clean_pdf(input_path: str, output_path: str) -> None:
    with pymupdf.open(input_path) as pdf:
        pdf.set_metadata({key: "" for key in PDF_METADATA_FIELDS})

        for page_num in range(len(pdf)):
            page = pdf[page_num]
            for annot in page.annots() or []:
                page.delete_annot(annot)
            for widget in page.widgets() or []:
                page.delete_widget(widget)

        pdf.save(output_path, deflate=True, clean=True)


def optimize_pdf(input_path: str, output_path: str) -> None:
    command = GHOSTSCRIPT_OPTIONS + [f"-sOutputFile={output_path}", input_path]
    subprocess.run(command, check=True)
