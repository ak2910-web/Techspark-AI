
# Techspark AI

**AI-Powered Startup Accelerator for Founders & Investors**

---

## 🚀 Product Vision
Techspark AI is an AI-powered platform that helps early-stage startups and investors with:
- Pitch deck analysis
- Startup scoring
- Customer insight
- Competitor mapping
- Investor matching
- Business report generation
- Marketing & content suggestions

---

## ⭐ Core Features
1. **Startup Creator**: Multi-step form for startup data, AI autofill, and validation.
2. **Pitch Deck Analyzer**: Upload PDF or text, get AI scores and suggestions.
3. **Startup Score Engine**: AI-calculated strength, funding readiness, and innovation index.
4. **Customer Analysis**: Persona, ICP, pain points, and acquisition channels.
5. **Competitor Analyzer**: Side-by-side competitor comparison and feature gap analysis.
6. **Investor Matcher**: AI-matched investors, pitch personalization, and email templates.
7. **Content AI Engine**: Generate taglines, hero text, social posts, and elevator pitches.
8. **Recommendation Engine**: Actionable next steps and improvement suggestions.

---

## ⭐ Architecture
- **Frontend**: React + Vite, TailwindCSS, Shadcn UI, Recharts
- **Backend**: Cloudflare Worker, Gemini 2.0 API
- **Storage**: Cloudflare D1/KV or localStorage (demo)

---

## ⭐ API Endpoints (Cloudflare Worker)
- `/api/analyze-deck` — Analyze pitch deck (PDF/text)
- `/api/startup-score` — Calculate startup scores
- `/api/customers` — Customer persona and insights
- `/api/competitors` — Competitor analysis
- `/api/investor-match` — Investor matching
- `/api/content` — Content generation
- `/api/recommendations` — Next-step suggestions

---

## ⭐ Setup & Usage

### Local Development
1. **Clone the repo**
   ```bash
   git clone <your-repo-url>
   cd Techspark-AI
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   - Copy `.env.example` to `.env`
   - Add your Google Generative AI API key:
     ```
     VITE_GOOGLE_API_KEY=your_api_key_here
     ```
   - Get your API key from: https://makersuite.google.com/app/apikey

4. **Run the development server**
   ```bash
   npm run dev
   ```
   - Open http://localhost:5173 in your browser

### Deployment to Vercel

1. **Push your code to GitHub** (make sure `.env` is in `.gitignore`)

2. **Import project in Vercel**
   - Go to https://vercel.com
   - Click "Add New" → "Project"
   - Import your repository

3. **Configure Environment Variables in Vercel**
   - In Vercel project settings, go to "Environment Variables"
   - Add: `VITE_GOOGLE_API_KEY` = `your_api_key_here`
   - Make sure it's available for all environments (Production, Preview, Development)

4. **Deploy**
   - Vercel will automatically build and deploy
   - Visit your deployment URL

**Note**: The app will work without the API key, but AI features will be disabled. You'll see a banner at the top indicating this.

For detailed deployment instructions, see [VERCEL_DEPLOYMENT.md](VERCEL_DEPLOYMENT.md)

---

## ⭐ Contribution
- Fork, branch, and PR for new features
- See `/components/mockups/` for UI ideas
- All feedback and issues welcome!

---

## ⭐ License
MIT
