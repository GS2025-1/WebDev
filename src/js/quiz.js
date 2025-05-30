document.addEventListener('DOMContentLoaded', () => {
    const quizData = [
        {
            question: "Qual a principal função de um sistema de monitoramento de nível de água?",
            options: ["Medir a temperatura da água", "Detectar e alertar sobre níveis de água anormais", "Controlar a vazão de rios", "Filtrar a água para consumo"],
            answer: 1
        },
        {
            question: "Que tipo de sensor é comumente usado para medir o nível de água?",
            options: ["Sensor de umidade do solo", "Sensor de temperatura infravermelho", "Sensor ultrassônico de nível", "Sensor de pressão atmosférica"],
            answer: 2
        },
        {
            question: "Qual a importância do monitoramento de nível de água em áreas de risco?",
            options: ["Aumentar a conta de luz", "Prevenir inundações e secas", "Melhorar a qualidade da água potável", "Atrair mais turistas"],
            answer: 1
        },
        {
            question: "O que significa 'nível de água crítico'?",
            options: ["O nível ideal para navegação", "Um nível que indica risco de enchente ou seca", "A temperatura ideal da água para peixes", "A quantidade de água necessária para irrigação"],
            answer: 1
        },
        {
            question: "Como as informações do monitoramento de nível de água podem ser utilizadas pela população?",
            options: ["Para apostar em corridas de barco", "Para planejar atividades diárias e evacuações em caso de risco", "Para regular o preço dos imóveis", "Para escolher o melhor local para pescar"],
            answer: 1
        },
        {
            question: "Qual tecnologia permite o envio de alertas em tempo real sobre níveis de água anormais?",
            options: ["Bluetooth", "Wi-Fi", "Internet das Coisas (IoT)", "Ondas de rádio AM/FM"],
            answer: 2
        },
        {
            question: "Além de inundações e secas, que outros eventos podem ser previstos com o monitoramento de nível de água?",
            options: ["Terremotos", "Erupções vulcânicas", "Deslizamentos de terra e erosão costeira", "Queda de meteoritos"],
            answer: 2
        },
        {
            question: "Por que a bateria e a fonte de energia são importantes em sistemas de monitoramento remoto de nível de água?",
            options: ["Para manter o sistema aquecido", "Para garantir a operação contínua em locais sem energia elétrica", "Para atrair animais selvagens", "Para emitir luz durante a noite"],
            answer: 1
        },
        {
            question: "Qual o papel das agências governamentais no monitoramento de nível de água?",
            options: ["Organizar competições de natação", "Coletar dados, emitir alertas e gerenciar recursos hídricos", "Vender água engarrafada", "Construir barragens sem planejamento"],
            answer: 1
        },
        {
            question: "Como a análise dos dados históricos de nível de água pode ser útil?",
            options: ["Para ganhar dinheiro na bolsa de valores", "Para identificar padrões climáticos e tendências de longo prazo", "Para decorar paredes com gráficos", "Para escrever ficção científica"],
            answer: 1
        }
    ];

    const quizContainer = document.getElementById('quiz');
    const resultsContainer = document.getElementById('results');
    const questionTextElement = document.getElementById('question-text');
    const optionsListElement = document.getElementById('options-list');
    const nextButton = document.getElementById('next-button');
    const restartButton = document.getElementById('restart-button');
    const scoreElement = document.getElementById('score');
    const correctAnswersElement = document.getElementById('correct-answers');
    const totalQuestionsElement = document.getElementById('total-questions');

    let currentQuestionIndex = 0;
    let score = 0;
    let answered = false;

    function loadQuestion() {
        answered = false;
        nextButton.disabled = true;
        clearOptionFeedback();

        const currentQuestion = quizData[currentQuestionIndex];
        questionTextElement.textContent = `Pergunta ${currentQuestionIndex + 1} de ${quizData.length}: ${currentQuestion.question}`;

        optionsListElement.innerHTML = '';
        currentQuestion.options.forEach((option, index) => {
            const li = document.createElement('li');
            const button = document.createElement('button');
            button.textContent = option;
            button.dataset.answer = index;
            button.addEventListener('click', selectAnswer);
            li.appendChild(button);
            optionsListElement.appendChild(li);
        });
    }

    function selectAnswer(event) {
        if (answered) {
            return;
        }
        answered = true;
        
        const selectedButton = event.target;
        const selectedAnswerIndex = parseInt(selectedButton.dataset.answer);
        const correctAnswerIndex = quizData[currentQuestionIndex].answer;

        if (selectedAnswerIndex === correctAnswerIndex) {
            score++;
            selectedButton.classList.add('correct');
        } else {
            selectedButton.classList.add('incorrect');
            const correctButton = optionsListElement.querySelector(`button[data-answer="${correctAnswerIndex}"]`);
            if (correctButton) {
                correctButton.classList.add('correct');
            }
        }

        Array.from(optionsListElement.children).forEach(li => {
            li.querySelector('button').disabled = true;
        });

        nextButton.disabled = false;
    }

    function clearOptionFeedback() {
        Array.from(optionsListElement.children).forEach(li => {
            const button = li.querySelector('button');
            button.classList.remove('correct', 'incorrect');
            button.disabled = false;
        });
    }

    function showResults() {
        quizContainer.style.display = 'none';
        resultsContainer.style.display = 'block';
        correctAnswersElement.textContent = score;
        totalQuestionsElement.textContent = quizData.length; 
    }

    function resetQuiz() {
        currentQuestionIndex = 0;
        score = 0;
        answered = false;
        resultsContainer.style.display = 'none';
        quizContainer.style.display = 'block';
        loadQuestion();
    }

    nextButton.addEventListener('click', () => {
        if (answered) {
            if (currentQuestionIndex < quizData.length - 1) {
                currentQuestionIndex++;
                loadQuestion();
            } else {
                showResults();
            }
        }
    });

    restartButton.addEventListener('click', resetQuiz);

    loadQuestion();
});