# 🚀 FundSpark AI - MVP Setup Guide

## ✅ What's Complete

### Backend (FastAPI)
- ✅ Complete backend structure created
- ✅ 8 working API endpoints
- ✅ In-memory data storage (will migrate to PostgreSQL later)
- ✅ CORS configured for frontend
- ✅ Basic AI analysis (ready for Gemini upgrade)

### Frontend (React + TypeScript)
- ✅ Create Startup page with real API integration
- ✅ Startup Detail page with content management
- ✅ Add/delete content functionality
- ✅ AI analysis trigger and results display
- ✅ Error handling and loading states

## 🎯 Quick Start (10 Minutes to Working Product!)

### Step 1: Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment (Windows)
.\venv\Scripts\Activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
copy .env.example .env
# Edit .env if you have Gemini API key (optional for now)

# Start the server
uvicorn app.main:app --reload --port 8000
```

Backend will run at: **http://localhost:8000**
API docs: **http://localhost:8000/docs**

### Step 2: Frontend Setup

```bash
# In a new terminal, from project root
npm install

# Start frontend
npm run dev
```

Frontend will run at: **http://localhost:3000** (or 5173 depending on Vite config)

### Step 3: Test the MVP!

1. **Go to http://localhost:3000**
2. **Click "Get Started"** → goes to dashboard
3. **Navigate to "Create Startup"** from sidebar
4. **Fill in the form:**
   - Name: "My Awesome Startup"
   - Description: "We're building AI-powered solutions for small businesses..."
   - Industry: "SaaS"
   - Stage: "MVP"
   - Location: "San Francisco, CA"
5. **Click "Create Startup Profile"**
6. **You'll be redirected to Startup Detail page**
7. **Click "Add Content"**
   - Add some text about your startup (e.g., product details, target market)
8. **Click "Run Analysis"**
9. **See AI-generated insights!** 📊

## 📋 API Endpoints Reference

### Startups
```
POST   /api/startups              Create new startup
GET    /api/startups              List all startups
GET    /api/startups/{id}         Get startup details
```

### Content
```
POST   /api/startups/{id}/content     Add content
GET    /api/startups/{id}/content     List content
DELETE /api/startups/{id}/content/{content_id}  Delete content
```

### Analysis
```
POST   /api/startups/{id}/analyze     Run AI analysis
```

### Health
```
GET    /health                    Check server status
GET    /                          API info
```

## 🧪 Testing the API Directly

Open **http://localhost:8000/docs** for interactive API documentation.

Or use curl:

```bash
# Create startup
curl -X POST http://localhost:8000/api/startups \
  -H "Content-Type: application/json" \
  -d '{"name":"Test Startup","description":"AI platform","industry":"SaaS","stage":"MVP"}'

# Add content (use startup ID from response)
curl -X POST http://localhost:8000/api/startups/1/content \
  -H "Content-Type: application/json" \
  -d '{"source_type":"manual","text":"We help startups grow with AI insights"}'

# Run analysis
curl -X POST http://localhost:8000/api/startups/1/analyze
```

## 🎨 User Flow

```
Home Page → Get Started
    ↓
Dashboard (overview)
    ↓
Create Startup (form)
    ↓
Startup Detail (ID: 1)
    ↓
Add Content (manual/URL/document)
    ↓
Run AI Analysis
    ↓
View Results (summary, strengths, weaknesses, recommendations)
```

## 🔧 Current Limitations (MVP Phase)

- ✅ Working: Create startup, add content, run analysis
- ⚠️ In-memory storage (data resets on server restart)
- ⚠️ Basic AI analysis (rule-based, will upgrade to Gemini)
- ⚠️ No authentication yet
- ⚠️ No file upload for documents yet
- ⚠️ No web scraping for URLs yet

## 🚀 Phase 2 (After MVP Works)

1. **Database**: Replace in-memory storage with PostgreSQL
2. **Real AI**: Integrate Google Gemini API for analysis
3. **Auth**: Add JWT authentication
4. **File Upload**: Handle PDF/DOC uploads
5. **Web Scraping**: Auto-extract content from URLs
6. **Investor Features**: Match startups with investors
7. **Pitch Deck**: Full pitch deck analyzer

## 📝 Troubleshooting

**Backend not starting?**
- Check if port 8000 is available
- Make sure virtual environment is activated
- Verify all dependencies installed: `pip list`

**Frontend can't connect?**
- Confirm backend is running at http://localhost:8000
- Check CORS settings in `backend/app/main.py`
- Open browser console for error messages

**Create startup fails?**
- Open Network tab in browser DevTools
- Check if API request reaches backend
- Verify backend logs for errors

## 🎉 Success Metrics

You've successfully set up the MVP when:

✅ Backend responds at http://localhost:8000/health
✅ Frontend loads at http://localhost:3000
✅ You can create a startup profile
✅ You can add content to the startup
✅ AI analysis runs and shows results
✅ No console errors

## 📞 Need Help?

Check the logs:
- **Backend**: Terminal running uvicorn
- **Frontend**: Browser console (F12)
- **API**: http://localhost:8000/docs

---

**You're now ready to build a real AI-powered startup platform! 🚀**
