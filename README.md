🧠 AI-Native Consumer Health Copilot
Encode: Code to Innovate | UDGAM 2026

An AI-native consumer health experience that helps users understand food ingredients at the exact moment decisions matter. Instead of listing raw data, the system reasons, infers user intent, and explains insights clearly, acting as an intelligent co-pilot rather than a traditional lookup tool.

🚀 Problem Statement

Food labels today are designed for regulatory compliance, not human understanding. Consumers are expected to interpret:

1)Long ingredient lists
2)Unfamiliar chemical names
3)Conflicting or evolving health guidance

Existing solutions fall short because they:

1)Surface raw data instead of insights
2)Require high-friction manual input
3)Treat AI as an add-on, not the interface

This project reimagines how consumers understand food ingredients using an AI-native approach, where AI is the interface itself.

🎯 Project Goal

To design an AI-native consumer health copilot that:

1)Infers what the user likely cares about without forms or filters
2)Interprets ingredient information on the user’s behalf
3)Translates scientific and regulatory context into simple, human-level insights
4)Communicates uncertainty honestly
5)Minimizes cognitive load at decision time

-> The focus is on experience design and reasoning quality, not building a perfect dataset or database.

✨ Key Features

1) Intent-First Interaction
Users can input ingredients via text or image, and the system infers intent automatically.

2) AI-Native Experience
No menus, no forms — the AI itself is the primary interface.

3) Reasoning-Driven Output
Instead of listing ingredients, the AI explains:

Why an ingredient matters

->Potential trade-offs
->Health implications
->Areas of uncertainty

🧑‍⚕️ Human-Level Explanations
Converts complex scientific or regulatory terms into clear, understandable language.

⚖️ Honest Uncertainty Communication
Clearly states what is known, what is unclear, and why.

🏗️ System Architecture (High Level)
User Input (Text / Image)
        ↓
Intent Inference Engine
        ↓
Ingredient Understanding & Reasoning Layer
        ↓
AI Explanation Generator
        ↓
User-Friendly Insight Output

🛠️ Tech Stack

(Adapt this section if you want to be more specific)

Frontend: Web-based UI (AI-first interaction flow)

Backend: Python (FastAPI)

AI / LLM: OpenAI API (reasoning & explanation)

Data Sources:

Simulated / partial ingredient data

OpenFoodFacts (optional)

Deployment: Local / Cloud prototype

⚙️ Installation & Setup
1️) Clone the Repository
git clone [https://github.com/your-username/ai-native-consumer-health.git](https://github.com/sayansamantha1505/vitallens_-ai-native-health-co-pilot.git)
cd ai-native-consumer-health

🎥 Demo: 
<img width="1919" height="850" alt="image" src="https://github.com/user-attachments/assets/36470e0d-2d00-4cac-9cc2-98ecb1380a6d" />


📹 Demo Videos:

1) This video shows the demo of pic regognition and prediction abilities:
https://github.com/user-attachments/assets/0067353b-ee3b-4fde-9fbd-1e2fe1a078c2



https://github.com/user-attachments/assets/2c1c334d-7a21-4150-a101-59edfef84b0d






User uncertainty at decision time

AI-assisted ingredient understanding

Clear, reasoning-based explanations

🧪 Evaluation Focus (As per Hackathon)

This project aligns strongly with the judging criteria:

✅ AI-Native Experience (50%)

AI feels like an intelligent co-pilot

User intent is inferred

Cognitive effort is minimized

✅ Reasoning & Explainability (30%)

Clear justification of conclusions

Honest communication of uncertainty

✅ Technical Execution (20%)

Clean architecture

Thoughtful trade-offs

Stable prototype

🚫 Anti-Goals

This project is NOT about:

Building a database browser

Dumping ingredient lists

Optimizing OCR pipelines

Adding AI on top of a traditional app

We aim to create new interaction paradigms, not AI-powered versions of existing tools.

🌱 Future Enhancements

Image-based ingredient extraction (OCR)

Personalized health preferences learning

Region-specific regulatory insights

Voice-based interaction

Mobile app version

🏆 Hackathon Details

Event: Encode – Code to Innovate (UDGAM 2026)

Category: AI-Native Consumer Health Experience

Submission Deadline: 5th January 2026

👤 Author

Gaurav Jha
AI | Web Development | Consumer Health Tech

<div align="center">
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/temp/1

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`
