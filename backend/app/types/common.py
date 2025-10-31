from pydantic import BaseModel


class UpFileInfo(BaseModel):
    name: str
    psw: str
