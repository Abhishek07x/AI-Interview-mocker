import { GoogleGenerativeAI } from "@google/generative-ai";

// 1. API key se Google Generative AI initialize karein
const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const ai = new GoogleGenerativeAI(apiKey);

// 2. Direct model instance ko export karein
// Naye SDK mein isi model ke upar hi .generateContent() chalta hai
const model=ai.getGenerativeModel({
  model: "gemini-2.5-flash", 
  generationConfig: {
    responseMimeType: "application/json",
  },
});
export const chatSession = model.startChat({
history:[],
});





/*
const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
    safetySettings,
  } = require("@google/generative-ai");
  
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
    export const chatSession = model.startChat({
      generationConfig,
      safetySettings,
    });
*/