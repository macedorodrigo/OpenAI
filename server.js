const cors = require("cors");
const express = require("express");
const OpenAI = require("openai");
const port_server = process.env.PORT_SERVER || 3000;

require("dotenv").config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => res.send("Rodando aplicação OpenAI!"));

app.post("/ask", async (req, res) => {
  const chatCompletionRequest = {
    mensagens: [{ papel: "usuário", conteúdo: req.body.prompt }], // Use req.body.prompt para acessar o prompt enviado pelo cliente
    modelo: "gpt-3.5-turbo",
  };

  try {
    const chatCompletionResponse = await openai.chat.completions.create(
      chatCompletionRequest
    );

    // Processe a resposta de conclusão de bate-papo e gere uma resposta para o cliente
    const resposta = chatCompletionResponse.choices[0].text;

    res.json({ resposta }); // Envia a resposta de volta ao cliente
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Ocorreu um erro" });
  }
});

app.listen(port_server, () =>
  console.log(`Servidor ouvindo na porta ${port_server}`)
);
