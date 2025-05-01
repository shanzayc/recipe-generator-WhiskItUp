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

WhiskItUp/ ├── client/ # Frontend React app │ └── recipe-gen/ # Main React application │ ├── public/ # Static files (HTML, icons, etc.) │ ├── src/ # Source code │ │ ├── App.js # Main React component │ │ ├── App.css # Styling │ │ ├── index.js # Entry point │ │ ├── index.css # Global styles │ │ ├── logo.svg # Logo │ │ └── ... # Other component files │ ├── package.json # React app dependencies and scripts │ └── README.md │ ├── server/ # Backend Express server │ ├── server.js # Server entry point │ └── package.json # Backend dependencies │ ├── .env # Environment variables (ignored by Git) └── README.md # Project documentation

## Future Improvements
- Add download/share recipe options
- Design Mobile-Friendly UI
- User login to save favorite recipes
- Use images for recipe steps

## 👥 Contact
Feel free to reach out to give any feedback, suggestions, or improvements.

💌 Email: [shanzayc@outlook.com](mailto:shanzayc@outlook.com)
