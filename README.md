# Whisk It Up 👨‍🍳

Whisk It Up is a fully functional AI-powered recipe generator web app. Just enter your ingredients, cooking time, cuisine type, and difficulty level — and it will generate a delicious recipe live, streamed from an AI model.

🌐 [Live Demo on Netlify](https://your-netlify-site.netlify.app)  
🔗 [Backend on Render](https://recipe-generator-backend-7oi4.onrender.com)

---

## ✨ Features

- 🍲 Dynamic recipe generation from ingredients and preferences
- ⚡ Live streaming of AI output using Server-Sent Events (SSE)
- 🧠 Markdown rendering for easy-to-read recipe instructions
- 🎨 Clean, mobile-friendly UI
- 🔒 Secure API key usage via environment variables

---

## 🛠 Tech Stack

### 🔧 Frontend (React)
- React 19 + Hooks (`useState`, `useEffect`, `useRef`)
- `react-markdown` for parsing AI output
- Plain CSS styling
- Font families from Google Fonts: `Poppins` and `Lato`
- Deployed on **Netlify**

### 🖥 Backend (Node.js + Express)
- Express.js server
- Server-Sent Events (SSE) for live response streaming
- `.env` for storing secrets (API key)
- Deployed on **Render**

