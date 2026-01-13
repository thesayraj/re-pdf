from fastapi import APIRouter, HTTPException
from app.workers.tasks import TASKS
from pydantic import BaseModel
from typing import List
from app.services.storage import storage

import uuid

router = APIRouter()

class FileInfo(BaseModel):
  name: str
  size: int
  upload_name: str

class ValidateRequest(BaseModel):
  files_info: List[FileInfo]


class ValidateResponse(BaseModel):
  job_id: str
  upload_urls: List[str]


@router.post("/validate/{task_type}", response_model=ValidateResponse)
def validate_task(
  task_type: str,
  body: ValidateRequest
):
  if task_type not in TASKS:
    raise HTTPException(status_code=404, detail="Invalid Task")

  job_id = uuid.uuid4().hex

  files_info = body.files_info
  upload_urls = []
  for i in range(len(files_info)):
    info = files_info[i]
    url = storage.generate_upload_url(job_id, info.upload_name)
    upload_urls.append(url)

  return {"job_id": job_id, "upload_urls": upload_urls}
