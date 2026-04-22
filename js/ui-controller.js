const uiController = {
    currentLang: 'mg',
    currentSection: 'home-section',
    activeEngine: null,

    translations: {
        mg: {
            app_title: 'Mianatra Anglisy',
            levels_title: 'Fitsipika Grammaire',
            level_debutant: 'Débutant',
            level_debutant_desc: 'Present simple, SVO order, articles, pronouns',
            level_intermediaire: 'Intermédiaire',
            level_intermediaire_desc: 'Present continuous, past simple, question formation, negation',
            level_avance: 'Avancé',
            level_avance_desc: 'Future forms, modals, conjunctions, compound sentences',
            level_expert: 'Expert',
            level_expert_desc: 'Perfect tenses, passive voice, conditionals, reported speech',
            redaction_title: 'Outil de Rédaction',
            redaction_desc: 'Write and check your English text',
            back_home: 'Miverina any an-trano',
            exercise_vocab: 'Vocabulary',
            exercise_grammar: 'Grammar',
            btn_check: 'Check',
            btn_next: 'Next',
            btn_analyze: 'Analyze',
            btn_clear: 'Clear',
            btn_close: 'Close',
            grammar_instruction: 'Arrange the words to form a correct sentence:',
            banner_title: 'Fanampiana',
            banner_welcome: 'Welcome! Select a level to start learning English.',
            score_label: 'Score:',
            redaction_tool_title: 'Redaction Tool',
            redaction_description: 'Cet outil vérifie uniquement les règles de base — accord sujet-verbe, ordre des mots, temps, articles. / This tool checks basic rules only — subject-verb agreement, word order, tense, articles.',
            correct_answer: 'Correct! Well done!',
            incorrect_try_again: 'Incorrect. Try again!',
            vocab_session_banner: 'Reconstruct the English word from the scrambled letters.',
            grammar_session_banner: 'Build the sentence by clicking words in the correct order.'
        },
        fr: {
            app_title: 'Apprendre l\'Anglais',
            levels_title: 'Règles de Grammaire',
            level_debutant: 'Débutant',
            level_debutant_desc: 'Present simple, SVO order, articles, pronouns',
            level_intermediaire: 'Intermédiaire',
            level_intermediaire_desc: 'Present continuous, past simple, question formation, negation',
            level_avance: 'Avancé',
            level_avance_desc: 'Future forms, modals, conjunctions, compound sentences',
            level_expert: 'Expert',
            level_expert_desc: 'Perfect tenses, passive voice, conditionals, reported speech',
            redaction_title: 'Outil de Rédaction',
            redaction_desc: 'Write and check your English text',
            back_home: 'Retour à l\'accueil',
            exercise_vocab: 'Vocabulary',
            exercise_grammar: 'Grammar',
            btn_check: 'Check',
            btn_next: 'Next',
            btn_analyze: 'Analyze',
            btn_clear: 'Clear',
            btn_close: 'Close',
            grammar_instruction: 'Arrange the words to form a correct sentence:',
            banner_title: 'Aide',
            banner_welcome: 'Welcome! Select a level to start learning English.',
            score_label: 'Score:',
            redaction_tool_title: 'Redaction Tool',
            redaction_description: 'Cet outil vérifie uniquement les règles de base — accord sujet-verbe, ordre des mots, temps, articles. / This tool checks basic rules only — subject-verb agreement, word order, tense, articles.',
            correct_answer: 'Correct! Well done!',
            incorrect_try_again: 'Incorrect. Try again!',
            vocab_session_banner: 'Reconstruct the English word from the scrambled letters.',
            grammar_session_banner: 'Build the sentence by clicking words in the correct order.'
        }
    },

    init: function() {
        this.bindEvents();
        this.updateLanguageDisplay();
    },

    bindEvents: function() {
        const self = this;

        document.querySelectorAll('.lang-toggle-btn').forEach(function(btn) {
            btn.addEventListener('click', function() {
                self.handleLanguageToggle(this.dataset.lang);
            });
        });

        document.querySelectorAll('.level-card').forEach(function(card) {
            card.addEventListener('click', function() {
                self.startLevel(this.dataset.level, 'vocab');
            });
            card.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    self.startLevel(this.dataset.level, 'vocab');
                }
            });
        });

        document.querySelectorAll('[data-action="redaction"]').forEach(function(el) {
            el.addEventListener('click', function() {
                self.showSection('redaction-section');
                self.updateBanner('redaction');
            });
            el.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    self.showSection('redaction-section');
                    self.updateBanner('redaction');
                }
            });
        });

        document.querySelectorAll('[data-action="back-home"]').forEach(function(btn) {
            btn.addEventListener('click', function() {
                self.backToHome();
            });
        });

        document.getElementById('vocab-submit').addEventListener('click', function() {
            vocabEngine.checkAnswer();
        });

        document.getElementById('vocab-next').addEventListener('click', function() {
            vocabEngine.nextExercise();
        });

        document.getElementById('vocab-answer').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                vocabEngine.checkAnswer();
            }
        });

        document.getElementById('grammar-check').addEventListener('click', function() {
            grammarEngine.checkAnswer();
        });

        document.getElementById('grammar-next').addEventListener('click', function() {
            grammarEngine.nextExercise();
        });

        document.getElementById('redaction-check').addEventListener('click', function() {
            self.analyzeRedaction();
        });

        document.getElementById('redaction-clear').addEventListener('click', function() {
            document.getElementById('redaction-textarea').value = '';
            redactionEngine.clearFeedback();
        });

        document.querySelectorAll('[data-action="close-popup"]').forEach(function(el) {
            el.addEventListener('click', function() {
                self.closePopup();
            });
        });

        document.getElementById('pop-up-overlay').addEventListener('click', function(e) {
            if (e.target === this) {
                self.closePopup();
            }
        });
    },

    handleLanguageToggle: function(lang) {
        this.currentLang = lang;
        
        document.querySelectorAll('.lang-toggle-btn').forEach(function(btn) {
            btn.classList.remove('is-active');
            btn.setAttribute('aria-pressed', 'false');
        });
        
        const activeBtn = document.querySelector('[data-lang="' + lang + '"]');
        activeBtn.classList.add('is-active');
        activeBtn.setAttribute('aria-pressed', 'true');

        this.updateLanguageDisplay();
    },

    updateLanguageDisplay: function() {
        const translations = this.translations[this.currentLang];
        
        document.querySelectorAll('[data-i18n]').forEach(function(el) {
            const key = el.dataset.i18n;
            if (translations[key]) {
                if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                    el.placeholder = translations[key];
                } else {
                    el.textContent = translations[key];
                }
            }
        });

        document.documentElement.lang = this.currentLang;
    },

    getTranslation: function(key) {
        return this.translations[this.currentLang][key] || key;
    },

    startLevel: function(level, type) {
        const self = this;
        const appContainer = document.getElementById('app-container');
        appContainer.classList.add('session-active');

        if (type === 'vocab') {
            this.activeEngine = vocabEngine;
            vocabEngine.init(level);
            this.showSection('vocab-section');
            
            const levelNames = {
                debutant: 'Débutant',
                intermediaire: 'Intermédiaire',
                avance: 'Avancé',
                expert: 'Expert'
            };
            document.getElementById('vocab-level-name').textContent = levelNames[level];
            
            this.updateBanner('vocab');
        } else if (type === 'grammar') {
            this.activeEngine = grammarEngine;
            grammarEngine.init(level);
            this.showSection('grammar-section');
            
            const levelNames = {
                debutant: 'Débutant',
                intermediaire: 'Intermédiaire',
                avance: 'Avancé',
                expert: 'Expert'
            };
            document.getElementById('grammar-level-name').textContent = levelNames[level];
            
            this.updateBanner('grammar');
        }
    },

    showSection: function(sectionId) {
        document.querySelectorAll('.page-section').forEach(function(section) {
            section.classList.remove('is-active');
        });
        
        document.getElementById(sectionId).classList.add('is-active');
        this.currentSection = sectionId;
    },

    backToHome: function() {
        const appContainer = document.getElementById('app-container');
        appContainer.classList.remove('session-active');
        
        if (this.activeEngine) {
            this.activeEngine.reset();
            this.activeEngine = null;
        }
        
        document.getElementById('score-value').textContent = '0';
        this.showSection('home-section');
        this.updateBanner('home');
    },

    updateBanner: function(context) {
        const bannerContent = document.getElementById('banner-content');
        const translations = this.translations[this.currentLang];

        if (context === 'home') {
            bannerContent.innerHTML = '<p>' + translations.banner_welcome + '</p>';
        } else if (context === 'vocab') {
            bannerContent.innerHTML = '<p>' + translations.vocab_session_banner + '</p>';
        } else if (context === 'grammar') {
            bannerContent.innerHTML = '<p>' + translations.grammar_session_banner + '</p>';
        } else if (context === 'redaction') {
            bannerContent.innerHTML = '<p>' + translations.redaction_description + '</p>';
        }
    },

    analyzeRedaction: function() {
        const textarea = document.getElementById('redaction-textarea');
        const text = textarea.value.trim();

        if (!text) {
            this.openPopup(
                this.getTranslation('btn_analyze'),
                'Please enter some text to analyze.'
            );
            return;
        }

        const feedback = redactionEngine.analyze(text);
        redactionEngine.renderFeedback(feedback);
    },

    openPopup: function(title, content) {
        document.getElementById('pop-up-title').textContent = title;
        document.getElementById('pop-up-body').innerHTML = '<p>' + content + '</p>';
        document.getElementById('pop-up-overlay').classList.add('is-visible');
    },

    closePopup: function() {
        document.getElementById('pop-up-overlay').classList.remove('is-visible');
    }
};

document.addEventListener('DOMContentLoaded', function() {
    uiController.init();
});
