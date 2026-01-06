
import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import { AnalysisResult } from "./types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export async function analyzeIngredients(
  input: { type: 'image' | 'text'; content: string },
  modelName: string = 'gemini-3-flash-preview'
): Promise<AnalysisResult> {
  const parts: any[] = [];
  
  if (input.type === 'image') {
    parts.push({
      inlineData: {
        mimeType: 'image/jpeg',
        data: input.content
      }
    });
    parts.push({ text: "Identify the food packaging or ingredients list in this image. Do not just OCR; think about why a health-conscious user would be scanning this. Infer their goal (weight loss, allergy check, general longevity, or metabolic health) and explain the trade-offs of the found ingredients. Categorize each ingredient specifically as Beneficial, Neutral, Questionable, Avoid, Allergen, Preservative, Sweetener, or Stabilizer. Crucially, identify any potential interactions between ingredients (e.g., how a sweetener might affect nutrient absorption or how preservatives impact gut health when combined with other compounds)." });
  } else {
    parts.push({ text: `The user provided the following ingredients list: ${input.content}. Analyze this from a health-co-pilot perspective, identifying specific categories and potential interactions between ingredients (synergies or conflicts).` });
  }

  const response = await ai.models.generateContent({
    model: modelName,
    contents: { parts },
    config: {
      temperature: 0.2,
      thinkingConfig: { thinkingBudget: 4000 },
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          inferredIntent: {
            type: Type.STRING,
            description: "A short sentence about what you think the user is looking for based on context."
          },
          reasoningChain: {
            type: Type.STRING,
            description: "Your internal logic on why certain ingredients are flagged."
          },
          ingredients: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                significance: { type: Type.STRING, description: "Why this matters biologically." },
                tradeOffs: { type: Type.STRING, description: "The good vs bad balance." },
                category: { 
                  type: Type.STRING, 
                  enum: ['Beneficial', 'Neutral', 'Questionable', 'Avoid', 'Allergen', 'Preservative', 'Sweetener', 'Stabilizer']
                }
              },
              required: ["name", "significance", "tradeOffs", "category"]
            }
          },
          ingredientInteractions: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING, description: "The name of the interaction or compound group." },
                description: { type: Type.STRING, description: "Explanation of how these ingredients interact (e.g., impact on absorption, gut health)." },
                impact: { type: Type.STRING, enum: ['Synergy', 'Conflict', 'Caution'] }
              },
              required: ["name", "description", "impact"]
            },
            description: "Subtle interactions between the found ingredients."
          },
          uncertaintyDisclaimer: {
            type: Type.STRING,
            description: "Express your uncertainty in natural language."
          },
          summary: {
            type: Type.STRING,
            description: "A human-like summary of the health impact."
          },
          suggestedAction: {
            type: Type.STRING,
            description: "A gentle recommendation."
          }
        },
        required: ["inferredIntent", "reasoningChain", "ingredients", "ingredientInteractions", "uncertaintyDisclaimer", "summary", "suggestedAction"]
      }
    }
  });

  if (!response.text) {
    throw new Error("Empty response from AI engine.");
  }

  return JSON.parse(response.text.trim()) as AnalysisResult;
}
