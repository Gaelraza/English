const redactionEngine = {
    irregularVerbs: {
        'be': ['am', 'is', 'are', 'was', 'were', 'been'],
        'have': ['has', 'had'],
        'do': ['does', 'did', 'done'],
        'go': ['went', 'gone'],
        'come': ['came'],
        'see': ['saw', 'seen'],
        'take': ['took', 'taken'],
        'make': ['made'],
        'know': ['knew', 'known'],
        'think': ['thought'],
        'get': ['got', 'gotten'],
        'give': ['gave', 'given'],
        'find': ['found'],
        'tell': ['told'],
        'write': ['wrote', 'written'],
        'read': ['read'],
        'run': ['ran'],
        'eat': ['ate', 'eaten'],
        'drink': ['drank', 'drunk'],
        'begin': ['began', 'begun'],
        'break': ['broke', 'broken'],
        'choose': ['chose', 'chosen'],
        'speak': ['spoke', 'spoken'],
        'swim': ['swam', 'swum']
    },

    analyze: function(text) {
        const feedback = [];
        const sentences = text.match(/[^.!?]+[.!?]/g) || [text];

        sentences.forEach(function(sentence, index) {
            const sentenceFeedback = this.analyzeSentence(sentence.trim(), index + 1);
            feedback.push.apply(feedback, sentenceFeedback);
        }, this);

        return feedback;
    },

    analyzeSentence: function(sentence, sentenceNum) {
        const feedback = [];
        const words = sentence.split(/\s+/);
        const lowerWords = words.map(function(w) { return w.toLowerCase().replace(/[^a-z]/gi, ''); });

        if (words.length < 2) {
            return feedback;
        }

        const firstWord = words[0];
        if (firstWord !== firstWord.charAt(0).toUpperCase() + firstWord.slice(1)) {
            feedback.push({
                type: 'warning',
                message: 'Sentence ' + sentenceNum + ': Sentences should start with a capital letter.'
            });
        }

        this.checkSubjectVerbAgreement(lowerWords, sentenceNum, feedback);
        this.checkArticles(lowerWords, sentenceNum, feedback);
        this.checkTenseConsistency(lowerWords, sentenceNum, feedback);
        this.checkWordOrder(words, lowerWords, sentenceNum, feedback);

        return feedback;
    },

    checkSubjectVerbAgreement: function(words, sentenceNum, feedback) {
        const thirdPersonSingular = ['he', 'she', 'it'];
        const pluralSubjects = ['i', 'you', 'we', 'they'];

        for (let i = 0; i < words.length - 1; i++) {
            if (thirdPersonSingular.indexOf(words[i]) !== -1) {
                const nextWord = words[i + 1];
                if (nextWord && !this.endsWithS(nextWord) && !this.isIrregularThirdPerson(nextWord) && !this.isAuxiliary(nextWord)) {
                    if (!this.isBaseFormOnly(nextWord)) {
                        feedback.push({
                            type: 'error',
                            message: 'Sentence ' + sentenceNum + ': Check subject-verb agreement. Third person singular may need -s ending.'
                        });
                    }
                }
            }

            if (pluralSubjects.indexOf(words[i]) !== -1) {
                const nextWord = words[i + 1];
                if (nextWord && this.endsWithS(nextWord) && !this.isPluralVerbException(nextWord)) {
                    feedback.push({
                        type: 'warning',
                        message: 'Sentence ' + sentenceNum + ': Check subject-verb agreement with plural subject.'
                    });
                }
            }
        }
    },

    endsWithS: function(word) {
        return word.length > 1 && word.charAt(word.length - 1) === 's';
    },

    isIrregularThirdPerson: function(word) {
        const irregulars = ['has', 'does', 'is', 'was'];
        return irregulars.indexOf(word) !== -1;
    },

    isAuxiliary: function(word) {
        const auxiliaries = ['will', 'would', 'could', 'should', 'may', 'might', 'must', 'can', 'shall'];
        return auxiliaries.indexOf(word) !== -1;
    },

    isBaseFormOnly: function(word) {
        const baseOnly = ['can', 'must', 'should', 'will', 'would', 'could', 'may', 'might'];
        return baseOnly.indexOf(word) !== -1;
    },

    isPluralVerbException: function(word) {
        const exceptions = ['is', 'has', 'was', 'does'];
        return exceptions.indexOf(word) !== -1;
    },

    checkArticles: function(words, sentenceNum, feedback) {
        const vowels = ['a', 'e', 'i', 'o', 'u'];

        for (let i = 0; i < words.length - 1; i++) {
            if (words[i] === 'a') {
                const nextWord = words[i + 1];
                if (nextWord && vowels.indexOf(nextWord.charAt(0)) !== -1) {
                    feedback.push({
                        type: 'error',
                        message: 'Sentence ' + sentenceNum + ': Use "an" before vowel sounds, not "a".'
                    });
                }
            }

            if (words[i] === 'an') {
                const nextWord = words[i + 1];
                if (nextWord && vowels.indexOf(nextWord.charAt(0)) === -1) {
                    feedback.push({
                        type: 'warning',
                        message: 'Sentence ' + sentenceNum + ': Use "a" before consonant sounds, not "an".'
                    });
                }
            }
        }
    },

    checkTenseConsistency: function(words, sentenceNum, feedback) {
        let hasPast = false;
        let hasPresent = false;

        for (let i = 0; i < words.length; i++) {
            const word = words[i];
            
            if (this.isPastTense(word)) {
                hasPast = true;
            }
            
            if (this.isPresentTense(word)) {
                hasPresent = true;
            }
        }

        if (hasPast && hasPresent && words.length > 5) {
            feedback.push({
                type: 'warning',
                message: 'Sentence ' + sentenceNum + ': Check tense consistency. Consider using the same tense throughout.'
            });
        }
    },

    isPastTense: function(word) {
        if (word.length > 2 && word.charAt(word.length - 2) === 'e' && word.charAt(word.length - 1) === 'd') {
            return true;
        }
        if (word.length > 2 && word.charAt(word.length - 1) === 'd' && word.charAt(word.length - 2) !== 'e') {
            return true;
        }
        
        const pastForms = [];
        for (const key in this.irregularVerbs) {
            const forms = this.irregularVerbs[key];
            for (let i = 0; i < forms.length; i++) {
                if (pastForms.indexOf(forms[i]) === -1) {
                    pastForms.push(forms[i]);
                }
            }
        }
        return pastForms.indexOf(word) !== -1;
    },

    isPresentTense: function(word) {
        if (word.length > 3 && word.substring(word.length - 3) === 'ing') {
            return true;
        }
        if (word.length > 2 && word.charAt(word.length - 1) === 's' && word.charAt(word.length - 2) !== 's') {
            return true;
        }
        
        const presentForms = ['am', 'is', 'are', 'has', 'does'];
        return presentForms.indexOf(word) !== -1;
    },

    checkWordOrder: function(words, lowerWords, sentenceNum, feedback) {
        const questionStarters = ['what', 'where', 'when', 'why', 'how', 'who', 'which', 'do', 'does', 'did', 'is', 'are', 'was', 'were', 'have', 'has', 'had', 'will', 'would', 'could', 'should', 'can', 'may', 'might', 'must'];
        
        const lastChar = words[words.length - 1].replace(/[^a-zA-Z?!.]/g, '');
        const isQuestion = lastChar === '?';

        if (isQuestion) {
            const firstWord = lowerWords[0].toLowerCase();
            if (questionStarters.indexOf(firstWord) === -1) {
                feedback.push({
                    type: 'warning',
                    message: 'Sentence ' + sentenceNum + ': Questions often start with auxiliary verbs or question words.'
                });
            }
        }

        const adjNounPatterns = [['big', 'house'], ['small', 'cat'], ['good', 'day']];
        for (let i = 0; i < lowerWords.length - 1; i++) {
            const pair = [lowerWords[i], lowerWords[i + 1]];
            for (let j = 0; j < adjNounPatterns.length; j++) {
                if (pair[0] === adjNounPatterns[j][0] && pair[1] === adjNounPatterns[j][1]) {
                    break;
                }
            }
        }
    },

    renderFeedback: function(feedback) {
        const container = document.getElementById('redaction-feedback');
        container.innerHTML = '';

        if (feedback.length === 0) {
            container.innerHTML = '<div class="feedback-success">No issues found. Good job!</div>';
            container.classList.remove('hidden');
            return;
        }

        feedback.forEach(function(item) {
            const div = document.createElement('div');
            div.className = 'feedback-' + item.type;
            div.textContent = item.message;
            container.appendChild(div);
        });

        container.classList.remove('hidden');
    },

    clearFeedback: function() {
        const container = document.getElementById('redaction-feedback');
        container.innerHTML = '';
        container.classList.add('hidden');
    }
};
