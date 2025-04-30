// test.js

import { GoogleGenAI } from "@google/genai";

// Your Gemini API key here
const GEMINI_API_KEY = "AIzaSyCQrx_6myAfJ835BXha_fqT_pKsrvoJagM"; // <-- replace this
const genAI = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

async function main() {
  const prompt = "Write a short poem about coding.";

  try {
    const response = await genAI.models.generateContent({
      //latest or pro seem to work
      model: "gemini-1.5-pro-latest",
      contents: prompt
    });

    console.log("AI Response:\n");
    console.log(response.text);
  } catch (error) {
    console.error("Error:", error.message);
  }
}

main();


