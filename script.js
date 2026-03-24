// Lista de questões de matemática (6º ao 8º ano)
const perguntas = [
    { q: "Quanto é 3/4 de 80?", options: ["40", "60", "20", "50"], correct: "60" },
    { q: "Qual o valor de x na equação 2x + 10 = 20?", options: ["5", "10", "2", "15"], correct: "5" },
    { q: "Quanto é 15% de 200?", options: ["20", "25", "30", "35"], correct: "30" },
    { q: "Qual a raiz quadrada de 144?", options: ["10", "11", "12", "14"], correct: "12" },
    { q: "O resultado de -7 + 12 é:", options: ["-5", "5", "19", "-19"], correct: "5" },
    { q: "Qual a área de um retângulo de base 8cm e altura 5cm?", options: ["13cm²", "26cm²", "40cm²", "35cm²"], correct: "40cm²" },
    { q: "Quanto é 2 elevado à potência 5?", options: ["10", "16", "32", "64"], correct: "32" },
    { q: "A soma dos ângulos internos de um triângulo é:", options: ["90°", "180°", "360°", "270°"], correct: "180°" },
    { q: "O que é um número primo?", options: ["Divisível por 2", "Divisível por 1 e ele mesmo", "Sempre ímpar", "Múltiplo de 10"], correct: "Divisível por 1 e ele mesmo" },
    { q: "Quanto é 0,5 x 0,2?", options: ["0,1", "0,01", "1,0", "0,100"], correct: "0,1" }
];

let perguntaAtualIndex = 0;
let acertos = 0;

const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const feedbackElemento = document.getElementById('feedback'); // [cite: 2]
const scoreElement = document.getElementById('score');

function startQuiz() {
    perguntaAtualIndex = 0;
    acertos = 0;
    scoreElement.textContent = acertos;
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = perguntas[perguntaAtualIndex];
    questionElement.textContent = currentQuestion.q;

    currentQuestion.options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.classList.add('btn');
        button.addEventListener('click', () => selectAnswer(option, button));
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    feedbackElemento.textContent = "";
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(selecionada, botaoClicado) {
    const correta = perguntas[perguntaAtualIndex].correct; // [cite: 1]
    
    // Bloquear outros botões após o clique
    const todosBotoes = document.querySelectorAll('.btn');
    todosBotoes.forEach(b => b.disabled = true);

    // Verificar se a resposta está correta [cite: 3]
    if (selecionada === correta) {
        acertos++;
        scoreElement.textContent = acertos;
        botaoClicado.classList.add('correct');
        feedbackElemento.textContent = "Excelente! Acertou.";
        feedbackElemento.style.color = "#4CAF50";
    } else { // [cite: 4]
        botaoClicado.classList.add('incorrect');
        feedbackElemento.textContent = `Ops! A resposta era ${correta}.`;
        feedbackElemento.style.color = "#f44336"; // [cite: 5]
    }

    // Esperar 1.5 segundos e ir para a próxima pergunta [cite: 6]
    setTimeout(() => {
        perguntaAtualIndex++;
        if (perguntaAtualIndex < perguntas.length) {
            showQuestion();
        } else {
            showResult();
        }
    }, 1500);
}

function showResult() {
    resetState();
    questionElement.textContent = "Quiz Finalizado!";
    feedbackElemento.textContent = `Você acertou ${acertos} de ${perguntas.length} questões.`;
    feedbackElemento.style.color = "#333";
    
    const restartBtn = document.createElement('button');
    restartBtn.textContent = "Reiniciar Quiz";
    restartBtn.classList.add('btn');
    restartBtn.style.marginTop = "20px";
    restartBtn.addEventListener('click', startQuiz);
    answerButtonsElement.appendChild(restartBtn);
}

// Iniciar o quiz ao carregar a página
startQuiz();