const grammarEngine = {
    currentLevel: null,
    currentIndex: 0,
    score: 0,
    currentSentence: [],
    availableWords: [],

    init: function(level) {
        this.currentLevel = level;
        this.currentIndex = 0;
        this.score = 0;
        this.loadRule();
        this.loadExercise();
        this.updateScoreDisplay();
    },

    loadRule: function() {
        const rules = grammarData[this.currentLevel].rules;
        const ruleIndex = this.currentIndex % rules.length;
        const rule = rules[ruleIndex];

        const titleEl = document.getElementById('grammar-rule-title');
        const contentEl = document.getElementById('grammar-rule-content');

        titleEl.textContent = rule.title;
        contentEl.textContent = rule.content;
    },

    loadExercise: function() {
        const data = grammarData[this.currentLevel].exercises[this.currentIndex];
        const sentenceContainer = document.getElementById('sentence-container');
        const wordBank = document.getElementById('word-bank');
        const feedbackEl = document.getElementById('grammar-feedback');
        const nextBtn = document.getElementById('grammar-next');
        const checkBtn = document.getElementById('grammar-check');

        this.currentSentence = [];
        this.availableWords = data.words.slice();
        
        sentenceContainer.innerHTML = '';
        wordBank.innerHTML = '';
        feedbackEl.classList.add('hidden');
        nextBtn.classList.add('hidden');
        checkBtn.disabled = false;

        this.renderWordBank();
        this.updateProgress();
    },

    renderWordBank: function() {
        const wordBank = document.getElementById('word-bank');
        wordBank.innerHTML = '';

        const self = this;
        this.availableWords.forEach(function(word, index) {
            if (word !== null) {
                const block = document.createElement('div');
                block.className = 'word-block';
                block.textContent = word;
                block.dataset.index = index;
                block.addEventListener('click', function() {
                    self.moveToSentence(index);
                });
                wordBank.appendChild(block);
            }
        });
    },

    renderSentence: function() {
        const sentenceContainer = document.getElementById('sentence-container');
        sentenceContainer.innerHTML = '';

        const self = this;
        this.currentSentence.forEach(function(word, index) {
            const block = document.createElement('div');
            block.className = 'word-block';
            block.textContent = word;
            block.addEventListener('click', function() {
                self.moveToBank(index);
            });
            sentenceContainer.appendChild(block);
        });
    },

    moveToSentence: function(wordIndex) {
        const word = this.availableWords[wordIndex];
        this.availableWords[wordIndex] = null;
        this.currentSentence.push(word);
        
        this.renderWordBank();
        this.renderSentence();
    },

    moveToBank: function(sentenceIndex) {
        const word = this.currentSentence[sentenceIndex];
        this.currentSentence.splice(sentenceIndex, 1);
        
        for (let i = 0; i < this.availableWords.length; i++) {
            if (this.availableWords[i] === null) {
                this.availableWords[i] = word;
                break;
            }
        }

        this.renderWordBank();
        this.renderSentence();
    },

    checkAnswer: function() {
        const data = grammarData[this.currentLevel].exercises[this.currentIndex];
        const feedbackEl = document.getElementById('grammar-feedback');
        const nextBtn = document.getElementById('grammar-next');
        const checkBtn = document.getElementById('grammar-check');

        const isCorrect = this.arraysEqual(this.currentSentence, data.sentence);

        if (isCorrect) {
            this.score += 10;
            feedbackEl.textContent = uiController.getTranslation('correct_answer');
            feedbackEl.className = 'feedback-display feedback-correct';
            checkBtn.disabled = true;
            nextBtn.classList.remove('hidden');
        } else {
            feedbackEl.textContent = uiController.getTranslation('incorrect_try_again');
            feedbackEl.className = 'feedback-display feedback-incorrect';
        }

        feedbackEl.classList.remove('hidden');
        this.updateScoreDisplay();
    },

    arraysEqual: function(arr1, arr2) {
        if (arr1.length !== arr2.length) {
            return false;
        }
        for (let i = 0; i < arr1.length; i++) {
            if (arr1[i] !== arr2[i]) {
                return false;
            }
        }
        return true;
    },

    nextExercise: function() {
        this.currentIndex++;
        if (this.currentIndex >= grammarData[this.currentLevel].exercises.length) {
            this.currentIndex = 0;
        }
        this.loadRule();
        this.loadExercise();
    },

    updateScoreDisplay: function() {
        const scoreEl = document.getElementById('score-value');
        scoreEl.textContent = this.score;
    },

    updateProgress: function() {
        const progressBar = document.getElementById('grammar-progress');
        const total = grammarData[this.currentLevel].exercises.length;
        const percent = ((this.currentIndex) / total) * 100;
        progressBar.style.width = percent + '%';
    },

    reset: function() {
        this.currentLevel = null;
        this.currentIndex = 0;
        this.score = 0;
        this.currentSentence = [];
        this.availableWords = [];
    }
};
