import React, { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import "./App.css";

function fixSpacing(text) {
  return text
    .replace(/^# Generating your recipe\.\.\..*\n*/i, '')
    .replace(/^- *$/gm, '')
    .replace(/^##\s*/gm, '')
    .replace(/^\s*[-*]\s*$/gm, '')
    .replace(/\n{2,}/g, '\n\n')
    .trim();
}

const RecipeCard = ({ onSubmit }) => {
  const [ingredients, setIngredients] = useState("");
  const [mealType, setMealType] = useState("Breakfast");
  const [cuisine, setCuisine] = useState("");
  const [cookingTime, setCookingTime] = useState("Less than 30 minutes");
  const [complexity, setComplexity] = useState("Beginner");

  const handleSubmit = () => {
    const recipeData = { ingredients, mealType, cuisine, cookingTime, complexity };
    onSubmit(recipeData);
  };

  return (
    <div className="card">
      <h2>📃 Recipe Generator</h2>
      <div className="input-group">
        <label>Ingredients</label>
        <input type="text" placeholder="e.g., rice, chicken" value={ingredients} onChange={(e) => setIngredients(e.target.value)} />
      </div>
      <div className="input-group">
        <label>Meal Type</label>
        <select value={mealType} onChange={(e) => setMealType(e.target.value)}>
          <option>Breakfast</option>
          <option>Lunch</option>
          <option>Dinner</option>
          <option>Snack</option>
        </select>
      </div>
      <div className="input-group">
        <label>Cuisine Preference</label>
        <input type="text" placeholder="e.g., Italian, Indian" value={cuisine} onChange={(e) => setCuisine(e.target.value)} />
      </div>
      <div className="input-group">
        <label>Cooking Time</label>
        <select value={cookingTime} onChange={(e) => setCookingTime(e.target.value)}>
          <option>Less than 30 minutes</option>
          <option>30-60 minutes</option>
          <option>More than 1 hour</option>
        </select>
      </div>
      <div className="input-group">
        <label>Complexity</label>
        <select value={complexity} onChange={(e) => setComplexity(e.target.value)}>
          <option>Beginner</option>
          <option>Intermediate</option>
          <option>Advanced</option>
        </select>
      </div>
      <div className="button-container">
        <button onClick={handleSubmit}>Generate Recipe</button>
      </div>
    </div>
  );
};

function App() {
  const [recipeData, setRecipeData] = useState(null);
  const [recipeText, setRecipeText] = useState("");
  const eventSourceRef = useRef(null);

  useEffect(() => {
    return () => {
      closeEventStream();
    };
  }, []);

  useEffect(() => {
    if (!recipeData) return;

    closeEventStream();

    const queryParams = new URLSearchParams(recipeData).toString();
    const url = `https://recipe-generator-backend-7oi4.onrender.com/recipeStream?${queryParams}`;
    console.log("✅ Sending fetch to:", url);

    eventSourceRef.current = new EventSource(url);

    eventSourceRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.action === "close") {
        closeEventStream();
      } else if (data.action === "chunk") {
        setRecipeText((prev) => prev + data.chunk);
      } else if (data.action === "error") {
        setRecipeText("❌ Error: " + data.message);
        closeEventStream();
      }
    };

    eventSourceRef.current.onerror = () => {
      eventSourceRef.current.close();
    };

  }, [recipeData]);

  const closeEventStream = () => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      eventSourceRef.current = null;
    }
  };

  const handleFormSubmit = (data) => {
    setRecipeText("");
    setRecipeData(data);
  };

  const getTitle = (text) => {
    const cleaned = fixSpacing(text);
    const lines = cleaned.split('\n').filter(line => line.trim() !== '');
    return lines.length > 0 ? lines[0].trim() : null;
  };

  const cleanedText = fixSpacing(recipeText);
  const title = getTitle(recipeText);
  const markdownBody = title ? cleanedText.replace(title, '').trim() : cleanedText;

  return (
    <div className="container">
      <h1 className="title">Whisk It Up 👨‍🍳</h1>
      <div className="flex-row">
        <RecipeCard onSubmit={handleFormSubmit} />
        <div className="output">
          {recipeData && !recipeText ? (
            "🍴 Generating your recipe..."
          ) : title ? (
            <>
              <h2 className="recipe-main-title">{title}</h2>
              <p className="recipe-description">
                {markdownBody.split('\n\n')[0]}
              </p>
              <ReactMarkdown
                components={{
                  strong: ({ node, ...props }) => <strong className="recipe-section-title" {...props} />,
                  p: ({ node, ...props }) => <p style={{ margin: '0.4rem 0', lineHeight: 1.6 }} {...props} />,
                  ul: ({ node, ...props }) => <ul style={{ margin: '0.5rem 0', paddingLeft: '1.5rem', listStyleType: 'disc' }} {...props} />,
                  li: ({ node, ...props }) => <li style={{ marginBottom: '0.5rem' }}>{props.children}</li>,
                }}
              >
                {markdownBody.split('\n\n').slice(1).join('\n\n')}
              </ReactMarkdown>
            </>
          ) : (
            "Your AI recipe will appear here!"
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
