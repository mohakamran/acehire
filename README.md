# AceHire

AceHire is an AI-powered interview platform that simulates **real-world job interviews** across multiple fields.  

It conducts structured, role-specific interviews and delivers **honest, realistic evaluation reports** to help candidates assess their true job readiness.

---

## 🚀 Features

- 🎯 Field-based interviews (Programming, IT, QA, WordPress, Accounting, and more)

- 🧑‍💻 Programming subfields (PHP, JavaScript, Python, etc.)

- 📈 Adaptive question difficulty based on answers

- 🧠 Realistic follow-up questions (no hints, no coaching)

- 📊 Detailed post-interview analysis and hiring recommendation

- 🏢 Professional interviewer tone and real hiring standards

---

## 🖼️ Screenshots

### Home Window

![Screenshot](Screenshot.png)

### Interview Window

![Screenshot 2](Screenshot2.png)

### Reports Section 1

![Screenshot 3](Screenshot3.png)

### Reports Section 2

![Screenshot 4](Screenshot4.png)

---

 

## 🛠️ Run Locally

### Prerequisites

- Node.js installed (v18+ recommended)

- npm (comes with Node.js)

- A Google Gemini API key

---

### Clone and Install Dependencies

```bash

git clone https://github.com/mohakamran/acehire.git

cd acehire

```

### API Key Setup
After cloning project, get api key from google studio https://studio.google.ai/
- Create a file named .env.local in the project root
- Add your Gemini API key:
- GEMINI_API_KEY=your_gemini_api_key_here or API_KEY=your_gemini_api_key_here 

```bash
npm install
npm run dev

