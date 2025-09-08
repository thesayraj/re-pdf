# FastAPI Project

This is a backend service built using [FastAPI](https://fastapi.tiangolo.com/), a modern, fast (high-performance) web framework for building APIs with Python.

## Features

- High-performance API endpoints.
- Automatic interactive API documentation with Swagger UI and ReDoc.
- Easy integration with databases and other services.
- Asynchronous programming support.

## Requirements

- Python 3.8+
- FastAPI
- Uvicorn (ASGI server)

## Installation

1. Clone the repository:
  ```bash
  git clone https://github.com/--/re-pdf.git
  cd re-pdf/backend
  ```

2. Create a virtual environment and activate it:
  ```bash
  python -m venv venv
  source venv/bin/activate  # On Windows: venv\Scripts\activate
  ```

3. Install dependencies:
  ```bash
  pip install -r requirements.txt
  ```

## Running the Application

1. Start the development server:
  ```bash
  uvicorn app.main:app --reload
  ```

2. Run worker
```bash
  python -m app.workers.worker
```

3. Open your browser and navigate to:
  - Swagger UI: `http://127.0.0.1:8000/docs`
  - ReDoc: `http://127.0.0.1:8000/redoc`

## Project Structure

```
backend/
├── app/
│   ├── api/          # API routes
│   ├── core/         # Core configurations
│   ├── models/       # Database models
│   ├── schemas/      # Pydantic models
│   ├── services/     # Business logic
│   └── main.py       # Entry point
├── tests/            # Test cases
├── requirements.txt  # Python dependencies
└── README.md         # Project documentation
```
