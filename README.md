# Aplicação de XSS com PHP e SQLite

Este projeto é uma demonstração de três tipos de vulnerabilidades de Cross-Site Scripting (XSS): **Reflected XSS**, **DOM-Based XSS** e **Stored XSS**. Ele é implementado utilizando **PHP** para o back-end e **SQLite** como banco de dados para armazenar os comentários.

## Funcionalidades

A aplicação permite que o usuário insira comentários e realize buscas, onde serão demonstradas as seguintes vulnerabilidades:

1. **Reflected XSS**: A entrada do usuário é refletida diretamente na página sem sanitização, permitindo a execução de scripts.
2. **DOM-Based XSS**: A entrada do usuário é injetada diretamente no DOM do navegador, permitindo a execução de scripts.
3. **Stored XSS**: O comentário inserido pelo usuário é armazenado no banco de dados SQLite e exibido na página sem sanitização, permitindo a execução de scripts armazenados.

## Tecnologias Utilizadas

- **PHP**: Backend para processar as requisições e interagir com o banco de dados.
- **SQLite**: Banco de dados para armazenar os comentários.
- **JavaScript**: Para manipulação do DOM e demonstração de XSS baseado em JavaScript.
- **HTML/CSS**: Estrutura e estilo da página.

## Como Rodar o Projeto

### Passo 1: Instalar PHP e SQLite

1. **Verifique se o PHP está instalado**:

   - No terminal, digite:
     ```bash
     php -v
     ```
   - Se o PHP não estiver instalado, siga as instruções para instalação:

     - **Ubuntu**:

       ```bash
       sudo apt update
       sudo apt install php php-cli php-pdo php-sqlite3
       ```

     - **Mac** (usando Homebrew):

       ```bash
       brew install php
       ```

     - **Windows**: Baixe e instale o PHP a partir do site oficial.

2. **Verifique se o SQLite está instalado**:

   - Execute:

     ```bash
     php -m | grep sqlite3
     ```

     Caso não apareça, instale o SQLite.

### Passo 2: Preparar a Estrutura de Arquivos

1. Clone ou baixe este repositório.

2. Navegue até o diretório do projeto:

   ```bash
   cd xss-php-sqlite
   ```

3. Crie o banco de dados SQLite executando o seguinte comando:

   ```bash
   php -r "include('db.php');"
   ```

   - Isso criará o banco de dados comments.db e a tabela comments.

### Passo 3: Iniciar o Servidor PHP

1. No terminal, execute:

   ```bash
   php -S localhost:8000
   ```

2. Abra o navegador e vá para http://localhost:8000.

### Passo 4: Testar as Vulnerabilidades

1. Reflected XSS:
   Na seção "Reflected XSS", insira o seguinte:

   ```html
   <script>
     alert('Reflected XSS');
   </script>
   ```

   - Clique no botão "Buscar". O alerta será exibido.

2. DOM-Based XSS:
   Na seção "DOM-Based XSS", insira:

   ```html
   <img src="x" onerror="alert('DOM XSS')" />
   ```

   - Clique no botão "Buscar". O alerta será exibido.

3. Stored XSS:
   Na seção "Stored XSS", insira:

   ```html
   <script>
     alert('Stored XSS');
   </script>
   ```

   - Clique em "Enviar". O comentário será armazenado no banco de dados e o script será executado ao recarregar a página.

### Como Funciona

- **Reflected XSS**: O valor inserido na busca é refletido diretamente na página sem nenhuma sanitização, permitindo a execução de scripts.
- **DOM-Based XSS**: O valor inserido no campo de texto é diretamente injetado no DOM, permitindo a execução de scripts.
- **Stored XSS**: O comentário inserido é armazenado no banco de dados SQLite e exibido sem sanitização, permitindo que scripts inseridos no comentário sejam executados.

### Explicação do README

Este README foi criado utilizando a linguagem de marcação Markdown. Ele fornece uma visão geral do projeto, incluindo as funcionalidades, tecnologias utilizadas, instruções para rodar o projeto e uma explicação de como as vulnerabilidades de XSS são demonstradas.
