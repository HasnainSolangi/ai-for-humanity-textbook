# 🌍 AI for Humanity Textbook

**Building Responsible, Enterprise-Grade AI for the Future.**

[![Docusaurus](https://img.shields.io/badge/Built%20with-Docusaurus-green.svg)](https://docusaurus.io/)
[![React](https://img.shields.io/badge/Frontend-React-blue.svg)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Styling-Tailwind%20CSS-38bdf8.svg)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## 📖 Introduction

**AI for Humanity** is a comprehensive, open-source online textbook designed to bridge the gap between AI theory and real-world application. It serves as a definitive guide for developers, policymakers, and industry leaders to understand, implement, and govern artificial intelligence responsibly.

This platform isn't just a static book—it's an **AI-Native interactive experience** featuring a built-in AI Tutor, rich media generation, and a modern, responsive design.

---

## 🎯 Objectives

- **Democratize AI Knowledge**: Make complex AI concepts accessible to a global audience.
- **Actionable Playbooks**: Provide concrete steps for implementing AI in Health, Education, Finance, and more.
- **Responsible Development**: embed ethics, governance, and safety into every stage of the AI lifecycle.
- **Interactive Learning**: Move beyond static text with an integrated RAG-based AI assistant.

---

## ✨ Key Features

### 🧠 AI-Native Experience
- **RAG Chatbot Integration**: A globally accessible "AI Tutor" widget powered by **Qdrant** (Vector DB) and **Cohere** (Embeddings) that answers questions solely based on the textbook content.
- **Responsive & Modern UI**: Built with **Tailwind CSS**, featuring dark/light mode support, glassmorphism effects, and smooth animations.

### 📚 Comprehensive Content
- **9 Core Parts**: Covering everything from AI Fundamentals to Sector Playbooks, governance, and Autonomous Systems.
- **33+ Chapters**: Detailed, non-coding focused content suitable for strategic understanding.

### 🚀 Technical Excellence
- **Static Site Generation (SSG)**: Fast, SEO-friendly rendering using **Docusaurus 3**.
- **Serverless Backend**: Optimized for Vercel deployment with serverless API functions.
- **Global Navigation**: Custom unified header and footer for seamless exploration.

---

## 🛠️ Technology Stack & Ecosystem

This project leverages a modern, high-performance stack optimized for scalability and developer experience.

### Core Infrastructure
| Component | Technology | Description |
|-----------|------------|-------------|
| **Frontend** | React, Docusaurus 3 | SSG Framework for content sites |
| **Styling** | Tailwind CSS | Utility-first CSS framework |
| **Vector Search** | **Qdrant** | High-performance vector database for RAG w/ semantic search |
| **Embeddings** | **Cohere** | Enterprise-grade text embedding models |
| **LLMs** | **Gemini & Qwen** | Advanced language models for content generation and logic |
| **Structured Data**| **Neon Postgres** | Serverless Postgres database for user data & structured content |
| **Deployment** | Vercel | Frontend hosting & Serverless Functions |

### Agentic & Development Workflow
We utilize a cutting-edge **Spec-Driven Development** methodology:
- **Claude CLI**: Powering the Agent-Driven Development workflow.
- **SpecifyPlus Workflow**: rigorous spec-driven architecture to ensure high-quality documentation and implementation alignment.

---

## 🚀 Getting Started

Follow these steps to set up the project locally.

### Prerequisites
- Node.js (v18+)
- Python (v3.9+) (Only for local RAG backend testing)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/HasnainSolangi/ai-for-humanity-textbook.git
   cd ai-for-humanity-textbook
   ```

2. **Install Frontend Dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env` file in the root directory:
   ```env
   COHERE_API_KEY=your_cohere_key
   QDRANT_URL=your_qdrant_url
   QDRANT_API_KEY=your_qdrant_key
   DATABASE_URL=your_neon_postgres_url
   ```

### Running Locally

**Startup the Frontend:**
```bash
npm start
```
This opens the local development server at `http://localhost:3000`.

**Run the Backend (Optional - for local Python RAG):**
If you want to test the Python-based RAG backend instead of the Vercel serverless function:
```bash
./start-backend.bat
```

---

## 📂 Project Structure

```text
ai-for-humanity-textbook/
├── docs/                   # 📖 Markdown content for the textbook
├── src/
│   ├── components/         # 🧩 React components (ChatWidget, LandingPage, etc.)
│   ├── css/                # 🎨 Global styles & Tailwind directives
│   └── pages/              # 📄 Landing page (index.tsx)
├── api/                    # ☁️ Serverless functions for Vercel (Chat API)
├── specs/                  # 📋 Project specifications & history (SpecifyPlus)
├── docusaurus.config.ts    # ⚙️ Docusaurus configuration
├── tailwind.config.js      # 🎨 Tailwind configuration
└── package.json            # 📦 Dependencies & scripts
```

---

## 🤝 Contribution

We welcome contributions from the community! Whether it's fixing typos, adding new chapters, or improving the code:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/amazing-feature`).
3. Commit your changes (`git commit -m 'Add some amazing feature'`).
4. Push to the branch (`git push origin feature/amazing-feature`).
5. Open a Pull Request.

---

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">
  <p>Built with ❤️ by Hasnain Ahmed</p>
  <p>Free for everyone. Forever.</p>
</div>
