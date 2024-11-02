import { GoogleGenerativeAI } from '@google/generative-ai';

export async function GetGeminiResult(prompt: string) {
    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const result = await model.generateContent(prompt);
        return result.response.text()
    } catch (error) {
        throw error
    }
}