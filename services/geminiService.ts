import { GoogleGenAI, Type } from "@google/genai";
import { Tone, Length, Language, Formality } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

interface GenerationParams {
  scenario: string;
  tone: Tone;
  length: Length;
  language: Language;
  formality: Formality;
  recipientName: string;
  relationship: string;
}

export const generateWhatsAppMessage = async ({
  scenario,
  tone,
  length,
  language,
  formality,
  recipientName,
  relationship,
}: GenerationParams): Promise<string[]> => {
  const prompt = `
    You are KoshurConvo, an expert WhatsApp message writer. Your task is to generate 3 distinct WhatsApp messages based on the user's instructions.
    
    Follow these rules:
    1.  **Clarity & Natural Tone:** Messages must be clear, concise, and sound natural for WhatsApp communication.
    2.  **Emojis:** Intelligently add relevant emojis that fit the specified tone and context.
    3.  **Variations:** Provide 3 different versions of the message, each with a slightly different phrasing or style.
    4.  **Personalization:** If a recipient's name is provided, incorporate it naturally. Use placeholders like [Event] or [Time] where appropriate.
    5.  **Localization & Cultural Nuance:** Adapt the message to the specified language. Use appropriate local idioms, cultural references, and even regional slang to make it feel authentic and personal. For mixed languages like 'Hinglish' or 'Kashmiri (Mixed)', blend the languages naturally, just as a native speaker would in a casual conversation.
    6.  **Output Format:** Your entire output must be a single JSON object with a key "messages" containing an array of the 3 generated message strings.

    ---

    **User's Instructions:**
    - Scenario: "${scenario}"
    - Tone: "${tone}"
    - Desired Length: "${length}"
    - Language: "${language}"
    - Formality Level: "${formality}"
    - Recipient's Name/Nickname: "${recipientName || 'Not provided'}"
    - My Relationship to Recipient: "${relationship || 'Not provided'}"

    ---

    Generate the JSON output now.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            messages: {
              type: Type.ARRAY,
              description: "An array of 3 distinct WhatsApp message variations.",
              items: {
                type: Type.STRING,
              },
            },
          },
          required: ["messages"],
        },
      },
    });

    const jsonText = response.text.trim();
    const result = JSON.parse(jsonText);

    if (result.messages && Array.isArray(result.messages)) {
      return result.messages.filter((msg: any) => typeof msg === 'string');
    } else {
      throw new Error("Invalid response format from AI. Expected a 'messages' array.");
    }
  } catch (error) {
    console.error("Error generating message:", error);
    if (error instanceof SyntaxError) {
      throw new Error("Failed to parse the AI's response. It may be malformed.");
    }
    throw new Error("Failed to generate message. Please check the console for details.");
  }
};