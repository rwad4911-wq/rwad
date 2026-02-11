
import { GoogleGenAI } from "@google/genai";

// دالة مساعدة لإنشاء كائن الذكاء الاصطناعي عند الحاجة فقط
const getAI = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key is missing from environment variables.");
  }
  return new GoogleGenAI({ apiKey });
};

export const refineText = async (text: string): Promise<string> => {
  try {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `قم بتحسين النص التالي ليكون أكثر احترافية وجاذبية لملف إنجاز طالب عمره 14 سنة يحب كرة القدم. اجعل اللغة قوية وملهمة: "${text}"`,
    });
    return response.text || text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return text;
  }
};

export const getCharityThankYou = async (donorName: string, item: string): Promise<string> => {
  try {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `اكتب رسالة شكر قصيرة وملهمة جداً للمتبرع "${donorName}" الذي ساهم بـ "${item}" لأطفال محتاجين. اربط بين حب الرياضة وعمل الخير. اجعلها لمسة إنسانية بلهجة عربية فصحى جميلة.`,
    });
    return response.text || "شكراً لك على عطائك الكريم!";
  } catch (error) {
    console.error("Gemini Charity Error:", error);
    return "عطاؤك يصنع الفرق في حياة الأبطال الصغار.";
  }
};

export const getTeamTrainingFocus = async (teamName: string): Promise<string> => {
  try {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `بصفتك مدرب كرة قدم خبير، اقترح تركيزاً تدريبياً واحداً (جملة واحدة ملهمة) لفريق "${teamName}" اليوم. 
      - البراعم: ركز على المرح والمهارة الأساسية.
      - الناشئين: ركز على التكتيك والروح القتالية.
      - الفريق الأول: ركز على الفوز والتركيز الذهني العالي.`,
    });
    return response.text || "التدريب المستمر هو طريق النجومية.";
  } catch (error) {
    console.error("Gemini Coach Error:", error);
    return "الاستمرارية هي مفتاح النجاح.";
  }
};
