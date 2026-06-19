# TrendAI

TrendAI is an AI-powered platform tailored for the health and wellness supplements industry. It leverages artificial intelligence to analyze product packaging, extract marketing claims, and categorize market positioning automatically.

### Key Features
* **Product Upload:** Upload images of product packaging.
* **AI Analysis Pipeline:** Automatically extracts product claims, hero ingredients, and market positioning using Groq.
* **Smart Categorization:** Automatically groups products into predefined wellness categories (e.g., Immunity, Sleep, Energy, Beauty).
* **Product Explorer:** Browse a dashboard of all uploaded products, view detailed AI insights, and delete products with one click.
* **AI Chat Assistant:** Built-in chat functionality for exploring market insights and trends.

### Tech Stack
* **Frontend:** React, TypeScript, Vite, Tailwind CSS, Framer Motion, Lucide React
* **Backend:** Node.js, Express, TypeScript
* **Database:** MongoDB (Mongoose)
* **AI Integration:** Groq (Llama 3.1 for text processing and market matching)

### Getting Started

* **Prerequisites:**
  * Node.js installed on your machine
  * A running MongoDB database (or MongoDB Atlas cluster)
  * A Groq API Key

* **Environment Variables:**
  * Create a `.env` file in the `backend` directory containing:
    * `PORT=5000`
    * `MONGODB_URI=<your-mongodb-connection-string>`
    * `GROQ_API_KEY=<your-groq-api-key>`

* **Installation:**
  * Install backend dependencies: `cd backend && npm install`
  * Install frontend dependencies: `cd frontend && npm install`

* **Running the Application Locally:**
  * Start the backend server: `cd backend && npm run dev`
  * Start the frontend development server: `cd frontend && npm run dev`
  * Access the frontend via your browser (typically `http://localhost:5173`)
