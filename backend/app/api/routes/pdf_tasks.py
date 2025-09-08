from typing import List, Dict, Any
from fastapi import APIRouter
from pydantic import BaseModel
from redis import Redis
from rq import Queue

from app.workers.tasks import run_task  # dispatcher
from app.core.config import settings

router = APIRouter()
redis = Redis(host=settings.REDIS_HOST, port=settings.REDIS_PORT, db=0)
queue = Queue(settings.PDF_JOB_QUEUE_NAME, connection=redis)


class TaskRequest(BaseModel):
    upload_names: List[str]
    options: Dict[str, Any] = {}


class TaskResponse(BaseModel):
    job_id: str
    task: str
    status: str


@router.post("/tasks/{task_name}/{job_id}", response_model=TaskResponse)
async def submit_task(
    task_name: str,
    job_id: str,
    body: TaskRequest
):
    upload_names, options = body.upload_names, body.options

    queue.enqueue(run_task,
                  args = (task_name, job_id, upload_names, options), # passed to job's fn (as per doc)
                  job_id = job_id,
                  result_ttl = 2000  # TODO: REMOVE IT
                  )

    return {
        "job_id": job_id,
        "task": task_name,
        "status": "queued"
    }
