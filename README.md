# Whisk It Up 👨‍🍳

Whisk It Up is a fully functional AI-powered recipe generator web app. Just enter your ingredients, cooking time, cuisine type, and difficulty level — and it will generate a delicious recipe live, streamed from an AI model.

🌐 [Live Demo on Netlify](https://whiskitup.netlify.app/)  
🔗 [Backend on Render](https://recipe-generator-backend-7oi4.onrender.com)

---

## ✨ Features

- 🍲 Dynamic recipe generation from ingredients and preferences
- ⚡ Live streaming of AI output using Server-Sent Events (SSE)
- 🧠 Markdown rendering for easy-to-read recipe instructions
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

## 📂 Project Structure

project-root/
├── client/                 # Frontend React application
│   ├── node_modules/
│   ├── package.json
│   └── package-lock.json
│
├── recipe-gen/             # Main application
│   ├── node_modules/
│   ├── public/
│   ├── src/                # Source code
│   │   ├── App.js          # Main React component
│   │   ├── App.css         # Styling
│   │   ├── index.js        # Entry point
│   │   ├── index.css       # Global styles
│   │   ├── logo.svg        # Logo
│   │   └── reportWebVitals.js
│   ├── package.json
│   └── README.md
│
├── server/                 # Backend Express server
│   ├── node_modules/
│   ├── server.js           # Server entry point
│   ├── package.json
│   └── package-lock.json
└── node_modules/

## Future Improvements
- Add download/share recipe options
- Design Mobile-Friendly UI
- User login to save favorite recipes
- Use images for recipe steps

## 👥 Contact
Feel free to reach out to give any feedback, suggestions, or improvements.
💌 Email: [shanzayc@outlook.com](mailto:shanzayc@outlook.com)
💼 [LinkedIn](https://linkedin.com/in/shanzaychaudhry)
