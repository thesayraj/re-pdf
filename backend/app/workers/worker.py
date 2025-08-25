from redis import Redis
from rq import Worker, Queue
from app.core.config import settings

redis_conn = Redis(host=settings.REDIS_HOST, port=settings.REDIS_PORT, db=0)

listen = [settings.PDF_JOB_QUEUE_NAME]

if __name__ == "__main__":
    queues = [Queue(name, connection=redis_conn) for name in listen]
    worker = Worker(queues, connection=redis_conn, name="pdf-worker")

    worker.work()
