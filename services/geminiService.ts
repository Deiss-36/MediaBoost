
import { GoogleGenAI, Type } from "@google/genai";
import { SERVICES } from "../constants";
import { AIRecommendation } from "../types";

// Initialize Gemini
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getGrowthStrategy = async (userQuery: string): Promise<AIRecommendation> => {
  const model = "gemini-2.5-flash";

  const availableServices = SERVICES.map(s => `${s.id}: ${s.title} (${s.price}$)`).join(", ");

  const prompt = `
    You are an expert digital marketing consultant for a platform called "MediaBoost AI".
    We sell comprehensive digital services including:
    1. Social Growth (Followers, Likes).
    2. Detailed Interactions (Custom comments, Views, Shares).
    3. Ad Accounts & Management (Google Ads, Meta Business Managers, Campaign Setup).
    4. Aged Accounts & Monetized Channels.
    5. Web Development (Stores, Landing Pages).
    
    The user is asking: "${userQuery}"
    
    Our available services catalog:
    ${availableServices}

    Analyze the user's need and recommend a specific strategy.
    If they mention "Ads" or "Advertising", suggest our Ad Accounts or Management services.
    If they mention "Engagement", suggest comments and views.
    
    Select specific IDs from our catalog that would help them.
    
    Return the response in JSON format.
  `;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            strategyTitle: { type: Type.STRING, description: "A catchy title for the recommended strategy" },
            analysis: { type: Type.STRING, description: "Brief analysis of what the user needs to succeed (max 2 sentences)." },
            recommendedServiceIds: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING },
              description: "Array of Service IDs from the catalog that match the strategy." 
            }
          },
          required: ["strategyTitle", "analysis", "recommendedServiceIds"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    return JSON.parse(text) as AIRecommendation;

  } catch (error) {
    console.error("AI Error:", error);
    return {
      strategyTitle: "استشارة عامة",
      analysis: "حدث خطأ أثناء تحليل طلبك، ولكن يمكنك تصفح خدماتنا الشاملة للنمو.",
      recommendedServiceIds: []
    };
  }
};
