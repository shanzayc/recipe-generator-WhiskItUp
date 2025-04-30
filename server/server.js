
// server.js
console.log("Starting server.js...");

import express from "express";
import cors from "cors";
import { GoogleGenAI } from "@google/genai";

const app = express();
const PORT = 4000;

// Your Gemini API key
const GEMINI_API_KEY = "AIzaSyCQrx_6myAfJ835BXha_fqT_pKsrvoJagM"; // Replace this
const genAI = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

app.use(cors());
app.use(express.json());

app.get("/recipeStream", async (req, res) => {
  console.log("🔥 /recipeStream was hit");
console.log("Query params:", req.query);
  const { ingredients, mealType, cuisine, cookingTime, complexity } = req.query;

  console.log("Incoming request:", req.query);

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  // Build the prompt
  const prompt = `
Create a detailed, well-formatted recipe using:
- Ingredients: ${ingredients}
- Meal Type: ${mealType}
- Cuisine Preference: ${cuisine}
- Cooking Time: ${cookingTime}
- Complexity: ${complexity}

Recipe Structure:
1. Give it a fun, authentic, short TITLE related to the cuisine.
2. Write a 1-2 sentence DESCRIPTION.
3. Ingredients: (use bullet points, no empty bullets)
4. Equipment: (if needed, short bullet list)
5. Preparation Steps: (clear numbered steps)
6. Cooking Instructions: (numbered if necessary)
7. Tips & Variations: 
   - Each tip should be a short sentence.
   - DO NOT create empty bullet points.
   - Only make a bullet if there's real text after it.

Rules:
- Use clean, consistent Markdown.
- No empty lines between bullet points.
- Keep sections tight and professional.
- Always fill bullets with real information.
`;


  try {
    const result = await genAI.models.generateContent({
      model: "gemini-1.5-pro-latest",  // ✅ Correct working model
      contents: prompt          // ✅ Exactly like working test.js
    });


    console.log("✅ Gemini result object:", JSON.stringify(result, null, 2));

    const generatedText = result.candidates
  ?.map((c) => c.content?.parts?.map((p) => p.text).join(""))
  .join("\n")
  .trim();

if (!generatedText) throw new Error("Gemini returned no text.");

res.write(`data: ${JSON.stringify({ action: "chunk", chunk: generatedText })}\n\n`);
res.write(`data: ${JSON.stringify({ action: "close" })}\n\n`);
    res.end();
  } catch (error) {
    console.error("Error fetching from Gemini API:", error.message);
    res.write(`data: ${JSON.stringify({ action: "error", message: error.message })}\n\n`);
    res.end();
  }

  req.on("close", () => {
    console.log("Client disconnected.");
    res.end();
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
