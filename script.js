import confetti from 'confetti';

// Question banks
const questionBanks = {
    general: [
        "What's your favorite book and why?",
        "If you could travel anywhere in the world, where would you go?",
        "Describe your ideal day from start to finish.",
        "What's one skill you wish you had?",
        "What's your favorite movie and why do you like it?",
        "If you could have dinner with any historical figure, who would it be?",
        "What's your favorite childhood memory?",
        "If you could only eat one food for the rest of your life, what would it be?",
        "What three items would you bring to a deserted island?",
        "What's your favorite season and why?",
        "If you could live in any fictional world, which would you choose?",
        "What superpower would you want to have?",
        "Describe your dream job.",
        "What's something you've always wanted to try but haven't yet?",
        "What's the best piece of advice you've ever received?",
        "If you could master any instrument, which would you choose?",
        "What's your favorite way to relax after a long day?",
        "If you could meet any celebrity, who would it be?",
        "What's a goal you have for the next year?",
        "Describe the perfect vacation.",
        "What's your favorite hobby and how did you get into it?",
        "If you could instantly learn any language, which would you choose?",
        "What's your favorite game to play with friends or family?",
        "If you could time travel, which era would you visit?",
        "What's something that always makes you laugh?",
        "If you could change one thing about the world, what would it be?",
        "What's your favorite thing about your hometown?",
        "Describe your perfect weekend.",
        "What's a movie or book that changed how you think?",
        "If you could have any animal as a pet, what would you choose?"
    ],
    personal: [
        "What accomplishment are you most proud of?",
        "Describe a challenge you've overcome in your life.",
        "What's something most people don't know about you?",
        "Who has been the biggest influence in your life and why?",
        "What are three things on your bucket list?",
        "Describe a time when you failed at something and what you learned.",
        "What's your earliest memory?",
        "What do you value most in friendships?",
        "What's a belief or opinion you've changed over time?",
        "Describe a perfect day in your life that has actually happened.",
        "What's a habit you're trying to build or break?",
        "Describe your personal style in three words.",
        "What's something you're looking forward to in the future?",
        "What do you think your best quality is?",
        "Describe a time when you were brave.",
        "What's something you regret not doing?",
        "How do you define success for yourself?",
        "What's a small thing that brings you joy?",
        "What's a tradition you want to pass on to future generations?",
        "Describe a moment when you felt truly peaceful.",
        "What's something you're grateful for today?",
        "What's a lesson you've learned the hard way?",
        "Describe your relationship with a family member you're close to.",
        "What's a skill you've taught yourself?",
        "What do you do when you need to cheer yourself up?",
        "What's a promise you've made to yourself?",
        "Describe a time when you were proud of someone else.",
        "What's something you're excited to learn more about?",
        "Describe a place that feels like home to you.",
        "What's something you wish you could tell your younger self?"
    ],
    opinion: [
        "Do you think social media has overall been good or bad for society?",
        "Should schools focus more on practical skills or academic knowledge?",
        "Is it better to be brutally honest or compassionately tactful?",
        "Do you think humans will ever colonize another planet?",
        "Should art be accessible to everyone or is exclusivity important?",
        "Is technology making us more connected or more isolated?",
        "Do you think people should be able to work remotely for most jobs?",
        "Is competition good or harmful for child development?",
        "Should everyone be expected to learn a second language?",
        "Do you think space exploration is worth the investment?",
        "Is it better to specialize deeply or have broad knowledge across fields?",
        "Should public transportation be free?",
        "Is it important to preserve cultural traditions or embrace change?",
        "Do you think artificial intelligence will ultimately benefit humanity?",
        "Should voting be mandatory?",
        "Is it better to watch movies at home or in theaters?",
        "Should schools have dress codes?",
        "Do you think people will read physical books in 50 years?",
        "Is privacy or convenience more important in the digital age?",
        "Should healthcare be free for everyone?",
        "Do you think everyone should travel internationally at least once?",
        "Is it better to save money or spend on experiences?",
        "Should everyone learn basic coding skills?",
        "Do you think we'll ever fully understand how the human brain works?",
        "Is it better to be early, on time, or fashionably late?",
        "Should people be allowed to work 4-day weeks instead of 5?",
        "Do you think humans should be vegetarian or vegan?",
        "Is social media making us more or less informed?",
        "Should students be allowed to use AI tools for homework?",
        "Do you think physical money will eventually disappear?"
    ],
    custom: []
};

let gameState = {
    player1: "",
    player2: "",
    currentPlayer: "",
    player1Score: 0,
    player2Score: 0,
    selectedQuestionBank: "general",
    gameQuestions: [],
    remainingCards: 25
};

// DOM Elements
const startScreen = document.getElementById('start-screen');
const gameScreen = document.getElementById('game-screen');
const questionModal = document.getElementById('question-modal');
const settingsModal = document.getElementById('settings-modal');
const gameOverModal = document.getElementById('game-over-modal');
const gameBoard = document.getElementById('game-board');
const player1Input = document.getElementById('player1');
const player2Input = document.getElementById('player2');
const startGameBtn = document.getElementById('start-game-btn');
const settingsBtn = document.getElementById('settings-btn');
const settingsCancel = document.getElementById('settings-cancel');
const settingsSave = document.getElementById('settings-save');
const backToStartBtn = document.getElementById('back-to-start');
const endNowBtn = document.getElementById('end-now-btn');
const correctBtn = document.getElementById('correct-btn');
const incorrectBtn = document.getElementById('incorrect-btn');
const newGameBtn = document.getElementById('new-game-btn');
const questionText = document.getElementById('question-text');
const customQuestionsContainer = document.getElementById('custom-questions-container');
const customQuestionsTextarea = document.getElementById('custom-questions');
const questionCountDisplay = document.getElementById('question-count');
const currentPlayerDisplay = document.getElementById('current-player');
const player1ScoreDisplay = document.querySelector('#player1-score .score');
const player2ScoreDisplay = document.querySelector('#player2-score .score');
const player1NameDisplay = document.querySelector('#player1-score .player-name');
const player2NameDisplay = document.querySelector('#player2-score .player-name');

// Initialize game
function init() {
    // Event listeners
    startGameBtn.addEventListener('click', startGame);
    settingsBtn.addEventListener('click', openSettings);
    settingsCancel.addEventListener('click', closeSettings);
    settingsSave.addEventListener('click', saveSettings);
    backToStartBtn.addEventListener('click', goBackToStart);
    endNowBtn.addEventListener('click', endGameEarly);
    correctBtn.addEventListener('click', handleCorrectAnswer);
    incorrectBtn.addEventListener('click', handleIncorrectAnswer);
    newGameBtn.addEventListener('click', goBackToStart);

    // Settings radio buttons
    const bankRadios = document.querySelectorAll('input[name="question-bank"]');
    bankRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            if (e.target.value === 'custom') {
                customQuestionsContainer.classList.remove('hidden');
            } else {
                customQuestionsContainer.classList.add('hidden');
            }
        });
    });

    // Custom questions textarea
    customQuestionsTextarea.addEventListener('input', updateQuestionCount);
}

function updateQuestionCount() {
    const questions = customQuestionsTextarea.value.split('\n').filter(q => q.trim() !== '');
    questionCountDisplay.textContent = `${questions.length} questions`;
    
    if (questions.length < 25) {
        questionCountDisplay.style.color = '#e74c3c';
    } else {
        questionCountDisplay.style.color = '#2ecc71';
    }
}

function openSettings() {
    settingsModal.classList.remove('hidden');
}

function closeSettings() {
    settingsModal.classList.add('hidden');
}

function saveSettings() {
    const selectedBank = document.querySelector('input[name="question-bank"]:checked').value;
    gameState.selectedQuestionBank = selectedBank;
    
    if (selectedBank === 'custom') {
        const questions = customQuestionsTextarea.value.split('\n').filter(q => q.trim() !== '');
        if (questions.length < 25) {
            alert('Please enter at least 25 custom questions (one per line).');
            return;
        }
        questionBanks.custom = questions;
    }
    
    closeSettings();
}

function startGame() {
    const player1Name = player1Input.value.trim() || "Player 1";
    const player2Name = player2Input.value.trim() || "Player 2";
    
    gameState.player1 = player1Name;
    gameState.player2 = player2Name;
    gameState.player1Score = 0;
    gameState.player2Score = 0;
    gameState.remainingCards = 25;

    // Randomly choose starting player
    gameState.currentPlayer = Math.random() < 0.5 ? player1Name : player2Name;
    
    // Update displays
    player1NameDisplay.textContent = player1Name;
    player2NameDisplay.textContent = player2Name;
    player1ScoreDisplay.textContent = "0";
    player2ScoreDisplay.textContent = "0";
    currentPlayerDisplay.textContent = gameState.currentPlayer;

    // Select random questions for the game
    const questionsSource = questionBanks[gameState.selectedQuestionBank];
    gameState.gameQuestions = [...questionsSource];
    
    // Shuffle questions
    for (let i = gameState.gameQuestions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [gameState.gameQuestions[i], gameState.gameQuestions[j]] = [gameState.gameQuestions[j], gameState.gameQuestions[i]];
    }
    
    // Take the first 25 questions
    gameState.gameQuestions = gameState.gameQuestions.slice(0, 25);
    
    // Create game board
    createGameBoard();
    
    // Switch screens
    startScreen.classList.add('hidden');
    gameScreen.classList.remove('hidden');
}

function createGameBoard() {
    gameBoard.innerHTML = '';
    
    for (let i = 0; i < 25; i++) {
        const card = document.createElement('div');
        card.className = 'card';
        card.dataset.index = i;
        
        card.innerHTML = `
            <div class="card-inner">
                <div class="card-front">${i + 1}</div>
                <div class="card-back">${gameState.gameQuestions[i]}</div>
            </div>
        `;
        
        card.addEventListener('click', handleCardClick);
        gameBoard.appendChild(card);
    }
}

function handleCardClick(e) {
    const card = e.currentTarget;
    
    // Prevent clicking if card is already flipped or not current player's turn
    if (card.classList.contains('flipped') || card.classList.contains('player1') || card.classList.contains('player2')) {
        return;
    }
    
    const index = card.dataset.index;
    
    // Show question
    questionText.textContent = gameState.gameQuestions[index];
    questionModal.classList.remove('hidden');
    
    // Store currently selected card in gameState
    gameState.currentCardIndex = index;
    gameState.currentCard = card;
    
    // Flip the card
    card.classList.add('flipped');
}

function handleCorrectAnswer() {
    const card = gameState.currentCard;
    
    // Mark card for current player
    if (gameState.currentPlayer === gameState.player1) {
        card.classList.add('player1');
        gameState.player1Score++;
        player1ScoreDisplay.textContent = gameState.player1Score;
    } else {
        card.classList.add('player2');
        gameState.player2Score++;
        player2ScoreDisplay.textContent = gameState.player2Score;
    }
    
    questionModal.classList.add('hidden');
    
    // Check if game is over
    gameState.remainingCards--;
    if (gameState.remainingCards === 0) {
        endGame();
    } else {
        switchPlayer();
    }
}

function handleIncorrectAnswer() {
    questionModal.classList.add('hidden');
    
    // Flip the card back
    gameState.currentCard.classList.remove('flipped');
    
    switchPlayer();
}

function switchPlayer() {
    gameState.currentPlayer = gameState.currentPlayer === gameState.player1 ? gameState.player2 : gameState.player1;
    currentPlayerDisplay.textContent = gameState.currentPlayer;
}

function endGameEarly() {
    if (confirm("Are you sure you want to end the game now?")) {
        endGame();
    }
}

function endGame() {
    const winnerDisplay = document.getElementById('winner-display');
    const finalScore = document.getElementById('final-score');
    
    let winnerText;
    if (gameState.player1Score > gameState.player2Score) {
        winnerText = `${gameState.player1} wins!`;
        launchConfetti();
    } else if (gameState.player2Score > gameState.player1Score) {
        winnerText = `${gameState.player2} wins!`;
        launchConfetti();
    } else {
        winnerText = "It's a tie!";
    }
    
    winnerDisplay.textContent = winnerText;
    finalScore.textContent = `${gameState.player1}: ${gameState.player1Score} | ${gameState.player2}: ${gameState.player2Score}`;
    
    gameOverModal.classList.remove('hidden');
}

function launchConfetti() {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });
}

function goBackToStart() {
    gameScreen.classList.add('hidden');
    gameOverModal.classList.add('hidden');
    startScreen.classList.remove('hidden');
    
    // Reset input fields
    player1Input.value = '';
    player2Input.value = '';
}

// Initialize the game
document.addEventListener('DOMContentLoaded', init);