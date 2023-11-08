require("dotenv").config();

const cors = require("cors");
const express = require("express");
const OpenAI = require("openai");
const port = process.env.PORT_SERVER || 3000;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => res.send("Rodando aplicação OpenAI!"));

app.post("/ask", (req, res) => {
  const messages = req.body.messages;

  if (!messages) {
    return res.status(400).json({ erro: "Sem mensagem" });
  }

  openai.chat.completions
    .create({
      messages: messages,
      max_tokens: 4000,
      model: "gpt-3.5-turbo",
    })
    .then((chatCompletion) => {
      const retorno = chatCompletion.choices[0].message.content;
      res.status(200).json(retorno);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ erro: error.message });
    });
});

app.listen(port, () => console.log(`Servidor ouvindo na porta ${port}`));
