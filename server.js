const express = require("express");
const OpenAI = require("openai");

const app = express();
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.get("/", (req, res) => {
  res.send("Lukman's AI Assistant is running!");
});

app.post("/chat", async (req, res) => {
  try {
    const message = req.body.message;

    if (!message) {
      return res.status(400).json({
        error: "Please provide a message",
      });
    }

    const response = await openai.responses.create({
      model: "gpt-5.6-luna",
      instructions:
        "You are Lukman's personal AI assistant. Be helpful, friendly, respectful, and concise. You can communicate in Hausa or English. If the user speaks Hausa, reply in Hausa.",
      input: message,
    });

    res.json({
      reply: response.output_text,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Something went wrong",
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Assistant running on port ${PORT}`);
});
