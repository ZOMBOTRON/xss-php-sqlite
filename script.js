// DOM-Based XSS
function processInput() {
  const input = document.getElementById('dom-input').value;
  const resultDiv = document.getElementById('dom-result');
  resultDiv.innerHTML = `Você digitou: ${input}`; // Vulnerável a inserção direta de HTML
}
