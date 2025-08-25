from fastapi import APIRouter, HTTPException
from redis import Redis
from rq import Queue
from rq.exceptions import NoSuchJobError
from rq.job import Job
from app.core.config import settings
from app.services.storage import storage

router = APIRouter()
redis = Redis(host=settings.REDIS_HOST, port=settings.REDIS_PORT, db=0)
queue = Queue(settings.PDF_JOB_QUEUE_NAME, connection=redis)


@router.get("/jobs/{job_id}")
def get_status(job_id: str):
    try:
        job: Job = Job.fetch(job_id, connection=redis)
    except NoSuchJobError:
        raise HTTPException(status_code=404, detail="Job not found")

    if job.is_finished:
        result = job.result or {}
        out_f_name = result["out_f_name"]
        url = storage.generate_download_url(job_id, out_f_name)
        return {"status": "finished", "download_url": url}

    if job.is_failed:
        return {"status": "failed", "reason": str(job.exc_info)[:500]}

    if job.is_started:
        return {"status": "processing"}

    return {"status": "queued"}
