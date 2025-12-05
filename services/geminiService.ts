import { GoogleGenAI } from "@google/genai";
import { Task } from "../types";

// Initialize the client safely
const apiKey = process.env.API_KEY || '';
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export const generateProjectSummary = async (tasks: Task[]): Promise<string> => {
  if (!ai) {
    return "API Key not configured. Unable to generate AI summary.";
  }

  try {
    const taskSummary = tasks.map(t => `- ${t.title} (${t.status}, Assigned to: ${t.assignee?.name || 'Unassigned'})`).join('\n');
    
    const prompt = `
      You are a project manager assistant for an educational book production team.
      Here is the current list of tasks:
      ${taskSummary}

      Please provide a concise, professional executive summary (max 3 sentences) of the project status. 
      Focus on what is in progress and what needs attention. Use a professional, encouraging tone.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "Could not generate summary.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "An error occurred while generating the summary.";
  }
};

export const refineTaskDescription = async (title: string, currentDesc: string): Promise<string> => {
    if (!ai) return currentDesc;

    try {
        const prompt = `Refine the following task description for an educational book project to be more actionable and clear. 
        Task Title: ${title}
        Current Description: ${currentDesc}
        Return only the refined description text.`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt
        });
        return response.text || currentDesc;
    } catch (e) {
        console.error(e);
        return currentDesc;
    }
}
