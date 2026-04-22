const vocabEngine = {
    currentLevel: null,
    currentIndex: 0,
    score: 0,
    shuffledLetters: [],
    usedTiles: [],
    shuffledOrder: [],

    shuffleArray: function(array) {
        var newArray = array.slice();
        for (var i = newArray.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = newArray[i];
            newArray[i] = newArray[j];
            newArray[j] = temp;
        }
        return newArray;
    },

    scrambleWord: function(word) {
        var letters = word.split('');
        var scrambled = this.shuffleArray(letters);
        while (scrambled.join('') === word && letters.length > 1) {
            scrambled = this.shuffleArray(letters);
        }
        return scrambled;
    },

    init: function(level) {
        this.currentLevel = level;
        this.currentIndex = 0;
        this.score = 0;
        this.shuffledOrder = this.shuffleArray(vocabData[this.currentLevel].slice());
        this.loadExercise();
        this.updateScoreDisplay();
    },

    loadExercise: function() {
        var data = this.shuffledOrder[this.currentIndex];
        var emojiEl = document.getElementById('vocab-emoji');
        var containerEl = document.getElementById('scrambled-container');
        var answerInput = document.getElementById('vocab-answer');
        var feedbackEl = document.getElementById('vocab-feedback');
        var nextBtn = document.getElementById('vocab-next');
        var submitBtn = document.getElementById('vocab-submit');

        emojiEl.textContent = data.emoji;
        answerInput.value = '';
        feedbackEl.classList.add('hidden');
        nextBtn.classList.add('hidden');
        submitBtn.disabled = false;

        this.shuffledLetters = this.scrambleWord(data.word);
        this.usedTiles = new Array(this.shuffledLetters.length).fill(false);

        containerEl.innerHTML = '';
        var self = this;
        this.shuffledLetters.forEach(function(letter, index) {
            var tile = document.createElement('div');
            tile.className = 'scrambled-letter-tile';
            tile.textContent = letter;
            tile.dataset.index = index;
            tile.addEventListener('click', function() {
                self.handleTileClick(index);
            });
            containerEl.appendChild(tile);
        });

        this.updateProgress();
    },

    handleTileClick: function(index) {
        if (this.usedTiles[index]) {
            return;
        }

        var answerInput = document.getElementById('vocab-answer');
        var letter = this.shuffledLetters[index];
        
        answerInput.value += letter;
        this.usedTiles[index] = true;

        var tiles = document.querySelectorAll('.scrambled-letter-tile');
        tiles[index].classList.add('used');
    },

    checkAnswer: function() {
        var data = this.shuffledOrder[this.currentIndex];
        var answerInput = document.getElementById('vocab-answer');
        var feedbackEl = document.getElementById('vocab-feedback');
        var nextBtn = document.getElementById('vocab-next');
        var submitBtn = document.getElementById('vocab-submit');

        var userAnswer = answerInput.value.toLowerCase().trim();
        var correctAnswer = data.word.toLowerCase();

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
            var tiles = document.querySelectorAll('.scrambled-letter-tile');
            var self = this;
            tiles.forEach(function(tile) {
                tile.classList.remove('used');
            });
        }

        feedbackEl.classList.remove('hidden');
        this.updateScoreDisplay();
    },

    nextExercise: function() {
        this.currentIndex++;
        if (this.currentIndex >= this.shuffledOrder.length) {
            this.shuffledOrder = this.shuffleArray(vocabData[this.currentLevel].slice());
            this.currentIndex = 0;
        }
        this.loadExercise();
    },

    updateScoreDisplay: function() {
        var scoreEl = document.getElementById('score-value');
        scoreEl.textContent = this.score;
    },

    updateProgress: function() {
        var progressBar = document.getElementById('vocab-progress');
        var total = this.shuffledOrder.length;
        var percent = ((this.currentIndex) / total) * 100;
        progressBar.style.width = percent + '%';
    },

    reset: function() {
        this.currentLevel = null;
        this.currentIndex = 0;
        this.score = 0;
        this.shuffledLetters = [];
        this.usedTiles = [];
        this.shuffledOrder = [];
    }
};
