import os
import shutil
import contextlib
from typing import Dict, Optional

from app.core.config import settings


class StorageBackend:
    def __init__(self):
        self.local_dir = settings.STORAGE_DIR
        os.makedirs(self.local_dir, exist_ok=True)


    def save_output_file(self, local_file_path: str, job_id: str,
                         extension: Optional[str] = None) -> Dict[str, str]:
        ext = extension or os.path.splitext(local_file_path)[1] or ".bin"
        if not ext.startswith("."):
            ext = f".{ext}"

        prefix = f"jobs/{job_id}/outputs/"
        file_name = f"output{ext}"
        full_path = os.path.join(self.local_dir, prefix, file_name)

        os.makedirs(os.path.dirname(full_path), exist_ok=True)
        shutil.copy(local_file_path, full_path)

        return {
            "job_id": job_id,
            "out_f_name": file_name
        }


    @contextlib.contextmanager
    def input_file(self, job_id: str, file_name: str):
        prefix = f"jobs/{job_id}/inputs/"
        yield os.path.join(self.local_dir, prefix, file_name)


    # URL Helpers
    # (to let Client upload input(s) and download output(s))
    def generate_upload_url(self, job_id: str, file_name: str) -> str:
        prefix = f"jobs/{job_id}/inputs/"
        return f"{settings.BACKEND_HOST}/s3-mock/{prefix}{file_name}"


    def generate_download_url(self, job_id: str, file_name: str) -> str:
        prefix = f"jobs/{job_id}/outputs/"
        return f"{settings.BACKEND_HOST}/s3-mock/{prefix}{file_name}"



storage = StorageBackend()
