
import express from "express";
import cors from "cors";
import OpenAI from "openai";

const app = express();

app.use(cors());
app.use(express.json());

const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey) {
  console.error("OPENAI_API_KEY is missing!");
}

const ai = new OpenAI({
  apiKey: apiKey
});

app.get("/", (req, res) => {
  res.send("JARVIS AI is Online! 🤖");
});

app.get("/health", (req, res) => {
  res.json({
    status: "online",
    assistant: "JARVIS AI"
  });
});

app.post("/chat", async (req, res) => {
  try {
    const message = req.body.message;

    if (!message || typeof message !== "string") {
      return res.status(400).json({
        error: "Please enter a message"
      });
    }

    const response = await ai.responses.create({
      model: "gpt-4.1",
      instructions: `
        You are JARVIS, a smart personal AI assistant.
        Understand Telugu and English.
        Reply in the same language as the user.
        Be friendly, helpful and intelligent.
      `,
      input: message
    });

    res.json({
      success: true,
      reply: response.output_text
    });

  } catch (error) {
    console.error("JARVIS ERROR:", error.message);

    res.status(500).json({
      success: false,
      error: "JARVIS AI connection failed"
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log("JARVIS AI is running on port " + PORT);
});
