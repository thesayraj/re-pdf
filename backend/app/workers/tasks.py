from typing import Dict, List
from app.services.pdf.pdf_to_image import pdf_to_image
from app.services.pdf.compress_pdf import compress_pdf
from app.services.pdf.delete_pages import delete_pages
from app.services.pdf.rearrange_pages import rearrange_pages
from app.services.pdf.image_to_pdf import image_to_pdf
from app.services.pdf.unlock_pdf import unlock_pdf
from app.services.pdf.protect_pdf import protect_pdf
from app.services.pdf.split_pdf import split_pdf
from app.services.pdf.merge_pdf import merge_pdf

TASKS = {
    "pdf-to-image": pdf_to_image,
    "compress-pdf": compress_pdf,
    "delete-pdf-pages": delete_pages,
    "rearrange-pdf-pages": rearrange_pages,
    "img-to-pdf": image_to_pdf,
    "unlock-pdf": unlock_pdf,
    "protect-pdf": protect_pdf,
    "split-pdf": split_pdf,
    "merge-pdf": merge_pdf,
}

def run_task(task_name: str, job_id: str, upload_info: List, options: Dict) -> Dict:
    if task_name not in TASKS:
        raise ValueError(f"Unknown task: {task_name}")

    # Each tool returns an output artifact (e.g. single file/zip) via storage.save_output*
    tool_fn = TASKS[task_name]
    result = tool_fn(job_id=job_id, inputs=upload_info, options=options)

    return result
