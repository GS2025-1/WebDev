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
        },
        {
            question: "O que é uma 'enchente relâmpago'?",
            options: ["Uma enchente que ocorre rapidamente após chuvas intensas", "Uma enchente causada por derretimento de neve", "Uma enchente que dura muitos dias", "Uma enchente que afeta apenas áreas rurais"],
            answer: 0
        },
        {
            question: "Qual o papel dos pluviômetros no monitoramento de nível de água?",
            options: ["Medir a temperatura do ar", "Medir a quantidade de chuva acumulada", "Medir a velocidade do vento", "Medir a pressão atmosférica"],
            answer: 1
        },
        {
            question: "O que é um sistema de alerta precoce para inundações?",
            options: ["Um sistema que impede a chuva", "Um sistema que emite avisos à população antes de uma enchente", "Um sistema que limpa a água do rio", "Um sistema que desvia o curso dos rios"],
            answer: 1
        },
        {
            question: "Por que a desmatamento de áreas ribeirinhas aumenta o risco de enchentes?",
            options: ["Melhora a visibilidade do rio", "Remove a vegetação que absorve água e fixa o solo", "Aumenta a pesca", "Facilita a construção de casas"],
            answer: 1
        },
        {
            question: "O que é 'cota de inundação'?",
            options: ["O valor do metro cúbico de água", "O nível de água a partir do qual uma área começa a ser inundada", "A profundidade máxima de um rio", "A altura de uma barragem"],
            answer: 1
        },
        {
            question: "Qual a importância de um bom sistema de drenagem urbana?",
            options: ["Para embelezar a cidade", "Para escoar a água da chuva e evitar alagamentos", "Para armazenar água para consumo", "Para atrair pássaros para a cidade"],
            answer: 1
        },
        {
            question: "O que é 'seca hidrológica'?",
            options: ["Falta de chuva em uma região", "Redução prolongada dos níveis de água em rios, lagos e aquíferos", "Alta umidade do ar", "Excesso de água no solo"],
            answer: 1
        },
        {
            question: "Como a poluição afeta a gestão dos recursos hídricos e o monitoramento?",
            options: ["Facilita a medição de nível", "Compromete a qualidade da água e a saúde dos ecossistemas aquáticos", "Aumenta a transparência da água", "Não tem impacto algum"],
            answer: 1
        },
        {
            question: "Qual o benefício de se ter um mapa de áreas de risco de inundação?",
            options: ["Para decorar a casa", "Para identificar locais seguros e planejar medidas preventivas", "Para saber onde não construir", "Para determinar o valor dos imóveis"],
            answer: 1
        },
        {
            question: "O que é um 'sensor de nível' em um contexto de monitoramento de água?",
            options: ["Um dispositivo que detecta movimento", "Um dispositivo que mede a altura da superfície da água", "Um dispositivo que mede a qualidade da água", "Um dispositivo que mede a temperatura da água"],
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

    const NUMBER_OF_QUESTIONS_TO_SHOW = 10; 

    let selectedQuizQuestions = []; 
    let currentQuestionIndex = 0;
    let score = 0;
    let answered = false;

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function initQuiz() {
        const allShuffledQuestions = shuffleArray([...quizData]);

        selectedQuizQuestions = allShuffledQuestions.slice(0, NUMBER_OF_QUESTIONS_TO_SHOW);

        currentQuestionIndex = 0;
        score = 0;
        answered = false;
        resultsContainer.style.display = 'none';
        quizContainer.style.display = 'block';
        loadQuestion();
    }

    function loadQuestion() {
        answered = false;
        nextButton.disabled = true;
        clearOptionFeedback();

        const currentQuestionOriginal = selectedQuizQuestions[currentQuestionIndex];
        
        const optionsWithIndexes = currentQuestionOriginal.options.map((option, originalIndex) => ({ option, originalIndex }));
        const shuffledOptionsWithIndexes = shuffleArray(optionsWithIndexes);

        questionTextElement.textContent = `Pergunta ${currentQuestionIndex + 1} de ${selectedQuizQuestions.length}: ${currentQuestionOriginal.question}`;

        optionsListElement.innerHTML = '';
        shuffledOptionsWithIndexes.forEach((item, displayIndex) => {
            const li = document.createElement('li');
            const button = document.createElement('button');
            button.textContent = item.option;
            button.dataset.originalIndex = item.originalIndex;
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
        const selectedOriginalAnswerIndex = parseInt(selectedButton.dataset.originalIndex);
        const correctAnswerOriginalIndex = selectedQuizQuestions[currentQuestionIndex].answer;

        if (selectedOriginalAnswerIndex === correctAnswerOriginalIndex) {
            score++;
            selectedButton.classList.add('correct');
        } else {
            selectedButton.classList.add('incorrect');
            const correctButton = optionsListElement.querySelector(`button[data-original-index="${correctAnswerOriginalIndex}"]`);
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
        totalQuestionsElement.textContent = selectedQuizQuestions.length;
    }

    function resetQuiz() {
        initQuiz(); 
    }

    nextButton.addEventListener('click', () => {
        if (answered) {
            if (currentQuestionIndex < selectedQuizQuestions.length - 1) {
                currentQuestionIndex++;
                loadQuestion();
            } else {
                showResults();
            }
        }
    });

    restartButton.addEventListener('click', resetQuiz);

    initQuiz();
});