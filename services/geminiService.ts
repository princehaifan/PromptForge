
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export async function generatePromptFromImage(
  imageDataUrl: string,
  mimeType: string
): Promise<string> {
  try {
    const base64Data = imageDataUrl.split(',')[1];
    if (!base64Data) {
        throw new Error("Invalid image data URL format.");
    }

    const imagePart = {
      inlineData: {
        mimeType: mimeType,
        data: base64Data,
      },
    };

    const textPart = {
      text: 'analyze this thumbnail perfectly and provide me detailed image prompts for generating a 100% similar thumbnail for my channel, provide exactly a 100% similar prompt to the thumbnail. keep prompts in a single paragraph only.',
    };

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: { parts: [imagePart, textPart] },
    });
    
    return response.text;
  } catch (error) {
    console.error("Error generating prompt from image:", error);
    if (error instanceof Error) {
        throw new Error(`Failed to generate prompt: ${error.message}`);
    }
    throw new Error("An unexpected error occurred while communicating with the AI model.");
  }
}
