# FundSpark AI Backend

FastAPI backend for the FundSpark AI startup intelligence platform.

## Quick Start

1. **Create virtual environment:**
```bash
cd backend
python -m venv venv
.\venv\Scripts\Activate  # Windows
```

2. **Install dependencies:**
```bash
pip install -r requirements.txt
```

3. **Set up environment variables:**
```bash
copy .env.example .env
# Edit .env and add your GEMINI_API_KEY
```

4. **Run the server:**
```bash
uvicorn app.main:app --reload --port 8000
```

Server will run at: http://localhost:8000
API docs: http://localhost:8000/docs

## API Endpoints

### Startups
- `POST /api/startups` - Create startup
- `GET /api/startups` - List all startups
- `GET /api/startups/{id}` - Get startup details

### Content
- `POST /api/startups/{id}/content` - Add content
- `GET /api/startups/{id}/content` - List content
- `DELETE /api/startups/{id}/content/{content_id}` - Delete content

### Analysis
- `POST /api/startups/{id}/analyze` - Run AI analysis

## Project Structure

```
backend/
├── app/
│   ├── main.py          # FastAPI app & routes
│   ├── api/             # Route handlers (future)
│   ├── models/          # Database models (future)
│   ├── schemas/         # Pydantic schemas (future)
│   ├── services/        # Business logic (future)
│   └── db/              # Database config (future)
├── requirements.txt
├── .env.example
└── README.md
```

## Next Steps

1. Replace in-memory storage with PostgreSQL
2. Add user authentication (JWT)
3. Integrate real Gemini AI for analysis
4. Add file upload for documents
5. Implement web scraping for URLs
