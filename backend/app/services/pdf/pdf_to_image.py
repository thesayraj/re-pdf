import os
import zipfile
import tempfile
import pymupdf

from typing import List, Dict
from app.services.storage import storage
from app.types.common import UpFileInfo


def pdf_to_image(job_id: str, inputs: List[UpFileInfo], options: Dict) -> Dict:
    file_info = inputs[0]
    file_name = file_info.name

    ext = options.get("ext", "png")
    dpi = options.get("dpi", 300)

    with storage.input_file(job_id, file_name) as local_pdf, tempfile.TemporaryDirectory() as tmpdir:
        doc = pymupdf.open(local_pdf)

        image_paths = []
        for i, page in enumerate(doc, start=1):
            pix = page.get_pixmap(dpi = dpi)
            img_path = os.path.join(tmpdir, f"page_{i}.{ext}")
            pix.save(img_path)
            image_paths.append(img_path)

        zip_path = os.path.join(tmpdir, "images.zip")
        with zipfile.ZipFile(zip_path, "w", compression=zipfile.ZIP_DEFLATED) as zf:
            for img in image_paths:
                zf.write(img, arcname=os.path.basename(img))

        out_meta = storage.save_output_file(zip_path, job_id, extension=".zip")

    return {
        "job_id": job_id,
        "out_f_name": out_meta["out_f_name"]
    }
