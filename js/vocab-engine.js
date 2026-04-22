const vocabEngine = {
    currentLevel: null,
    currentIndex: 0,
    score: 0,
    shuffledLetters: [],
    usedTiles: [],

    init: function(level) {
        this.currentLevel = level;
        this.currentIndex = 0;
        this.score = 0;
        this.loadExercise();
        this.updateScoreDisplay();
    },

    loadExercise: function() {
        const data = vocabData[this.currentLevel][this.currentIndex];
        const emojiEl = document.getElementById('vocab-emoji');
        const containerEl = document.getElementById('scrambled-container');
        const answerInput = document.getElementById('vocab-answer');
        const feedbackEl = document.getElementById('vocab-feedback');
        const nextBtn = document.getElementById('vocab-next');
        const submitBtn = document.getElementById('vocab-submit');

        emojiEl.textContent = data.emoji;
        answerInput.value = '';
        feedbackEl.classList.add('hidden');
        nextBtn.classList.add('hidden');
        submitBtn.disabled = false;

        this.shuffledLetters = data.scrambled.split('');
        this.usedTiles = new Array(this.shuffledLetters.length).fill(false);

        containerEl.innerHTML = '';
        this.shuffledLetters.forEach(function(letter, index) {
            const tile = document.createElement('div');
            tile.className = 'scrambled-letter-tile';
            tile.textContent = letter;
            tile.dataset.index = index;
            tile.addEventListener('click', function() {
                vocabEngine.handleTileClick(index);
            });
            containerEl.appendChild(tile);
        });

        this.updateProgress();
    },

    handleTileClick: function(index) {
        if (this.usedTiles[index]) {
            return;
        }

        const answerInput = document.getElementById('vocab-answer');
        const letter = this.shuffledLetters[index];
        
        answerInput.value += letter;
        this.usedTiles[index] = true;

        const tiles = document.querySelectorAll('.scrambled-letter-tile');
        tiles[index].classList.add('used');
    },

    checkAnswer: function() {
        const data = vocabData[this.currentLevel][this.currentIndex];
        const answerInput = document.getElementById('vocab-answer');
        const feedbackEl = document.getElementById('vocab-feedback');
        const nextBtn = document.getElementById('vocab-next');
        const submitBtn = document.getElementById('vocab-submit');

        const userAnswer = answerInput.value.toLowerCase().trim();
        const correctAnswer = data.word.toLowerCase();

        if (userAnswer === correctAnswer) {
            this.score += 10;
            feedbackEl.textContent = uiController.getTranslation('correct_answer');
            feedbackEl.className = 'feedback-display feedback-correct';
            submitBtn.disabled = true;
            nextBtn.classList.remove('hidden');
        } else {
            feedbackEl.textContent = uiController.getTranslation('incorrect_try_again');
            feedbackEl.className = 'feedback-display feedback-incorrect';
            answerInput.value = '';
            this.usedTiles.fill(false);
            const tiles = document.querySelectorAll('.scrambled-letter-tile');
            tiles.forEach(function(tile) {
                tile.classList.remove('used');
            });
        }

        feedbackEl.classList.remove('hidden');
        this.updateScoreDisplay();
    },

    nextExercise: function() {
        this.currentIndex++;
        if (this.currentIndex >= vocabData[this.currentLevel].length) {
            this.currentIndex = 0;
        }
        this.loadExercise();
    },

    updateScoreDisplay: function() {
        const scoreEl = document.getElementById('score-value');
        scoreEl.textContent = this.score;
    },

    updateProgress: function() {
        const progressBar = document.getElementById('vocab-progress');
        const total = vocabData[this.currentLevel].length;
        const percent = ((this.currentIndex) / total) * 100;
        progressBar.style.width = percent + '%';
    },

    reset: function() {
        this.currentLevel = null;
        this.currentIndex = 0;
        this.score = 0;
        this.shuffledLetters = [];
        this.usedTiles = [];
    }
};
