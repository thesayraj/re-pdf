from typing import Dict, List
from app.services.pdf.pdf_to_image import pdf_to_image

TASKS = {
    "pdf-to-image": pdf_to_image,
}

def run_task(task_name: str, job_id: str, upload_names: List, options: dict) -> Dict:
    if task_name not in TASKS:
        raise ValueError(f"Unknown task: {task_name}")

    # Each tool returns an output artifact (e.g. single file/zip) via storage.save_output*
    tool_fn = TASKS[task_name]
    result = tool_fn(job_id=job_id, inputs=upload_names, options=options)

    return result
