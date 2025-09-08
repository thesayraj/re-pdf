from fastapi import APIRouter

from app.api.routes import pdf_tasks, jobs, pre_task, s3_mock

api_router = APIRouter()
api_router.include_router(pre_task.router)
api_router.include_router(pdf_tasks.router)
api_router.include_router(jobs.router)

api_router.include_router(s3_mock.router)

@api_router.get("/")
def get_root():
  return {"message": "HEY FROM BACKEND!"}
