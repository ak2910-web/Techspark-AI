# Vercel Deployment Guide

## Environment Variables Setup

When deploying to Vercel, you need to configure the following environment variables:

### Required Environment Variables:

1. **VITE_GOOGLE_API_KEY** - Your Google Generative AI API Key
   - Get it from: https://makersuite.google.com/app/apikey
   - Value: `AIzaSyAGoDZgqxAuXEnyJIzPQb0QlP6trZza_ac` (or your own key)

### Steps to Deploy on Vercel:

1. **Push your code to GitHub** (make sure `.env` is in `.gitignore`)

2. **Import Project in Vercel**
   - Go to https://vercel.com
   - Click "Add New" → "Project"
   - Import your repository

3. **Configure Environment Variables**
   - In Vercel project settings, go to "Environment Variables"
   - Add: `VITE_GOOGLE_API_KEY` with your API key
   - Make sure it's available for "Production", "Preview", and "Development"

4. **Deploy**
   - Vercel will automatically build and deploy your app
   - Build command: `npm run build`
   - Output directory: `dist`

### Troubleshooting

If you see a blank screen:

1. **Check Browser Console** (F12)
   - Look for "API Key must be set" error
   - Verify environment variables are loaded

2. **Verify Environment Variables**
   - In Vercel dashboard, check if `VITE_GOOGLE_API_KEY` is set
   - Redeploy after adding environment variables

3. **Check Build Logs**
   - In Vercel, click on your deployment
   - Check the "Build Logs" tab for errors

### Local Development

For local development, create a `.env` file with:

```
VITE_GOOGLE_API_KEY=your_api_key_here
```

The app will work without this key, but AI features will be disabled.

### Important Notes

- **Never commit your `.env` file to Git**
- **API Key Security**: The API key is exposed in the browser. Consider setting up a backend API for production use.
- **Free Tier Limits**: Google Generative AI has rate limits on the free tier
