"""
Mock S3-like API to provide file upload and download functionality.
"""
from fastapi import APIRouter, HTTPException, Request
from fastapi.responses import FileResponse
from fastapi.concurrency import run_in_threadpool
from app.core.config import settings

from pathlib import Path

router = APIRouter()


@router.put("/s3-mock/{full_path:path}")
async def upload_file(full_path: str, request: Request):
    base_dir = Path(settings.STORAGE_DIR).resolve()
    dest = (base_dir / full_path).resolve()

    if not str(dest).startswith(str(base_dir)):
        raise HTTPException(status_code=400, detail="Invalid file path")

    dest.parent.mkdir(parents=True, exist_ok=True)

    with open(dest, "wb") as f:
        async for chunk in request.stream():
            await run_in_threadpool(f.write, chunk)

    return {"message": "File uploaded successfully"}


@router.get("/s3-mock/{full_path:path}")
async def download_file(full_path: str):
    base_dir = Path(settings.STORAGE_DIR).resolve()
    file_path = (base_dir / full_path).resolve()

    if not str(file_path).startswith(str(base_dir)):
        raise HTTPException(status_code=400, detail="Invalid path")

    if not file_path.exists():
        raise HTTPException(status_code=404, detail="File not found")

    filename = file_path.name
    return FileResponse(
        file_path,
        filename=filename,
        media_type="application/octet-stream",
        headers={
            "Content-Disposition": f'attachment; filename="{filename}"',
            "Cache-Control": "public, max-age=3600"
        }
    )
