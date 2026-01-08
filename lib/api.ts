import { GoogleGenAI, Type, Schema } from "@google/genai";
import { ContentAnalysisResult, MarketTrend, FundraisingGeneratedContent } from "../types/index";

let ai: GoogleGenAI | null = null;

const getAI = () => {
  if (!ai) {
    const apiKey = import.meta.env.VITE_API_KEY || import.meta.env.VITE_GOOGLE_API_KEY || '';
    if (!apiKey) {
      throw new Error('API key not configured. Please set VITE_GOOGLE_API_KEY in your environment variables.');
    }
    ai = new GoogleGenAI({ apiKey });
  }
  return ai;
};

export const analyzeMarketingContent = async (text: string): Promise<ContentAnalysisResult> => {
  const prompt = `Analyze the following marketing copy for a startup. Provide a score (0-100), identify the tone, list specific actionable suggestions for improvement, and write a significantly improved version of the copy.

  Copy to analyze:
  "${text}"`;

  const schema: Schema = {
    type: Type.OBJECT,
    properties: {
      score: { type: Type.NUMBER, description: "Effectiveness score from 0 to 100" },
      tone: { type: Type.STRING, description: "Detected tone of the text" },
      suggestions: {
        type: Type.ARRAY,
        items: { type: Type.STRING },
        description: "List of actionable suggestions"
      },
      improvedVersion: { type: Type.STRING, description: "A rewritten, optimized version of the text" }
    },
    required: ["score", "tone", "suggestions", "improvedVersion"]
  };

  try {
    const response = await getAI().models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: schema
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as ContentAnalysisResult;
    }
    throw new Error("No response from AI");
  } catch (error: any) {
    console.error("Gemini Analysis Error:", error);
    
    // Return mock data if API key is not configured
    if (error.message?.includes('API key') || error.message?.includes('API Key')) {
      return {
        score: 75,
        tone: "Professional",
        suggestions: [
          "Configure your VITE_GOOGLE_API_KEY environment variable to enable AI analysis",
          "Add more specific value propositions",
          "Include quantifiable results or metrics"
        ],
        improvedVersion: "⚠️ AI features require API key configuration. Please add VITE_GOOGLE_API_KEY to your environment variables."
      };
    }
    
    throw error;
  }
};

export const generateFundraisingMaterial = async (
  companyDetails: string,
  type: 'email' | 'pitch_deck_outline' | 'elevator_pitch',
  targetAudience: string
): Promise<FundraisingGeneratedContent> => {
  let prompt = "";
  
  if (type === 'email') {
    prompt = `Write a compelling cold email to a potential investor (${targetAudience}) for the following startup. 
    Keep it concise, personalized, and action-oriented.
    
    Startup Details: ${companyDetails}`;
  } else if (type === 'pitch_deck_outline') {
    prompt = `Create a 10-slide pitch deck outline for the following startup targeting ${targetAudience}. 
    Include key points for each slide.
    
    Startup Details: ${companyDetails}`;
  } else {
    prompt = `Write a punchy 30-second elevator pitch for the following startup targeting ${targetAudience}.
    
    Startup Details: ${companyDetails}`;
  }

  try {
    const response = await getAI().models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        thinkingConfig: { thinkingBudget: 1024 },
      }
    });

    const text = response.text || "";
    
    let subject = undefined;
    let content = text;
    
    if (type === 'email') {
      const subjectMatch = text.match(/Subject:(.*)/i);
      if (subjectMatch) {
        subject = subjectMatch[1].trim();
        content = text.replace(/Subject:.*\n/i, '').trim();
      }
    }

    return {
      type,
      content,
      subject
    };
  } catch (error: any) {
    console.error("Gemini Fundraising Error:", error);
    
    // Return mock data if API key is not configured
    if (error.message?.includes('API key') || error.message?.includes('API Key')) {
      return {
        type,
        content: `⚠️ AI features require API key configuration.\n\nPlease add VITE_GOOGLE_API_KEY to your environment variables to enable AI-generated content.\n\nFor development: Add it to your .env file\nFor Vercel: Add it in Project Settings → Environment Variables`,
        subject: type === 'email' ? 'API Configuration Required' : undefined
      };
    }
    
    throw error;
  }
};

export const getMarketIntelligence = async (industry: string): Promise<{ trends: MarketTrend[], summary: string, sources?: string[] }> => {
  const prompt = `Research the current market trends for the ${industry} industry. 
  Identify 3 major trends, their potential impact on early-stage startups, and the opportunity they present.
  Also provide a brief executive summary of the market state.`;

  try {
    const response = await getAI().models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: {
            type: Type.OBJECT,
            properties: {
                summary: { type: Type.STRING },
                trends: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            trend: { type: Type.STRING },
                            impact: { type: Type.STRING },
                            opportunity: { type: Type.STRING }
                        }
                    }
                }
            }
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No text generated");

    const data = JSON.parse(text);
    
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    const sources: string[] = [];
    if (chunks) {
        chunks.forEach((c: any) => {
            if (c.web?.uri) sources.push(c.web.uri);
        });
    }

    return {
        trends: data.trends,
        summary: data.summary,
        sources: Array.from(new Set(sources))
    };

  } catch (error: any) {
    console.error("Gemini Market Intel Error:", error);
    
    // Return mock data if API key is not configured
    if (error.message?.includes('API key') || error.message?.includes('API Key')) {
      return {
        summary: "⚠️ Market intelligence requires API key configuration. Please add VITE_GOOGLE_API_KEY to your environment variables.",
        trends: [
          {
            trend: "API Configuration Required",
            impact: "AI-powered market research is currently unavailable",
            opportunity: "Configure your Google Generative AI API key to unlock market intelligence features"
          }
        ],
        sources: []
      };
    }
    
    throw error;
  }
};