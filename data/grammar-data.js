const grammarData = {
    debutant: {
        rules: [
            {
                title: 'Present Simple',
                content: 'Use the base form of the verb. Add -s for he/she/it.'
            },
            {
                title: 'SVO Order',
                content: 'English sentences follow Subject-Verb-Object order.'
            },
            {
                title: 'Articles',
                content: 'Use "a" before consonant sounds, "an" before vowel sounds, "the" for specific things.'
            },
            {
                title: 'Pronouns',
                content: 'I, you, we, they (subject); me, you, us, them (object); my, your, our, their (possessive).'
            }
        ],
        exercises: [
            { sentence: ['I', 'like', 'apples'], words: ['apples', 'like', 'I'] },
            { sentence: ['She', 'reads', 'books'], words: ['books', 'reads', 'She'] },
            { sentence: ['They', 'play', 'football'], words: ['football', 'play', 'They'] },
            { sentence: ['He', 'eats', 'bread'], words: ['bread', 'eats', 'He'] },
            { sentence: ['We', 'drink', 'water'], words: ['water', 'drink', 'We'] },
            { sentence: ['The', 'cat', 'sleeps'], words: ['sleeps', 'cat', 'The'] },
            { sentence: ['A', 'dog', 'barks'], words: ['barks', 'dog', 'A'] },
            { sentence: ['You', 'have', 'a', 'pen'], words: ['pen', 'a', 'have', 'You'] },
            { sentence: ['I', 'am', 'happy'], words: ['happy', 'am', 'I'] },
            { sentence: ['She', 'is', 'kind'], words: ['kind', 'is', 'She'] }
        ]
    },
    intermediaire: {
        rules: [
            {
                title: 'Present Continuous',
                content: 'Use am/is/are + verb-ing for actions happening now.'
            },
            {
                title: 'Past Simple',
                content: 'Use the past form of verbs for completed actions in the past.'
            },
            {
                title: 'Question Formation',
                content: 'Start with do/does/did or a question word, then subject, then verb.'
            },
            {
                title: 'Negation',
                content: 'Use do not/does not/did not before the base verb.'
            }
        ],
        exercises: [
            { sentence: ['I', 'am', 'reading', 'now'], words: ['now', 'reading', 'am', 'I'] },
            { sentence: ['She', 'is', 'cooking', 'dinner'], words: ['dinner', 'cooking', 'is', 'She'] },
            { sentence: ['They', 'played', 'yesterday'], words: ['yesterday', 'played', 'They'] },
            { sentence: ['He', 'walked', 'home'], words: ['home', 'walked', 'He'] },
            { sentence: ['Do', 'you', 'like', 'coffee'], words: ['coffee', 'like', 'you', 'Do'] },
            { sentence: ['What', 'did', 'she', 'say'], words: ['say', 'she', 'did', 'What'] },
            { sentence: ['I', 'do', 'not', 'know'], words: ['know', 'not', 'do', 'I'] },
            { sentence: ['She', 'does', 'not', 'agree'], words: ['agree', 'not', 'does', 'She'] },
            { sentence: ['We', 'were', 'studying'], words: ['studying', 'were', 'We'] },
            { sentence: ['Did', 'they', 'arrive'], words: ['arrive', 'they', 'Did'] }
        ]
    },
    avance: {
        rules: [
            {
                title: 'Future Forms',
                content: 'Use "will" for predictions and promises, "going to" for plans.'
            },
            {
                title: 'Modals',
                content: 'Can, could, may, might, must, should express ability, permission, obligation, advice.'
            },
            {
                title: 'Conjunctions',
                content: 'And, but, or, so, because connect ideas and clauses.'
            },
            {
                title: 'Compound Sentences',
                content: 'Join two independent clauses with a conjunction and comma.'
            }
        ],
        exercises: [
            { sentence: ['I', 'will', 'call', 'tomorrow'], words: ['tomorrow', 'call', 'will', 'I'] },
            { sentence: ['She', 'is', 'going', 'to', 'travel'], words: ['travel', 'to', 'going', 'is', 'She'] },
            { sentence: ['You', 'must', 'finish', 'this'], words: ['this', 'finish', 'must', 'You'] },
            { sentence: ['He', 'should', 'study', 'more'], words: ['more', 'study', 'should', 'He'] },
            { sentence: ['I', 'want', 'to', 'go', 'but', 'I', 'cannot'], words: ['cannot', 'I', 'but', 'go', 'to', 'want', 'I'] },
            { sentence: ['She', 'is', 'tired', 'so', 'she', 'rests'], words: ['rests', 'she', 'so', 'tired', 'is', 'She'] },
            { sentence: ['We', 'can', 'help', 'because', 'we', 'care'], words: ['care', 'we', 'because', 'help', 'can', 'We'] },
            { sentence: ['They', 'might', 'come', 'later'], words: ['later', 'come', 'might', 'They'] },
            { sentence: ['You', 'could', 'try', 'again'], words: ['again', 'try', 'could', 'You'] },
            { sentence: ['I', 'promise', 'I', 'will', 'return'], words: ['return', 'will', 'I', 'promise', 'I'] }
        ]
    },
    expert: {
        rules: [
            {
                title: 'Perfect Tenses',
                content: 'Have/has/had + past participle for completed actions with present relevance.'
            },
            {
                title: 'Passive Voice',
                content: 'Be + past participle. The object becomes the subject.'
            },
            {
                title: 'Conditionals',
                content: 'If + present, will + base (1st). If + past, would + base (2nd). If + past perfect, would have + past participle (3rd).'
            },
            {
                title: 'Reported Speech',
                content: 'Backshift tenses when reporting what someone said. Change pronouns and time expressions.'
            }
        ],
        exercises: [
            { sentence: ['I', 'have', 'finished', 'my', 'work'], words: ['work', 'my', 'finished', 'have', 'I'] },
            { sentence: ['She', 'had', 'already', 'left'], words: ['left', 'already', 'had', 'She'] },
            { sentence: ['The', 'book', 'was', 'written', 'by', 'him'], words: ['him', 'by', 'written', 'was', 'book', 'The'] },
            { sentence: ['The', 'house', 'is', 'being', 'built'], words: ['built', 'being', 'is', 'house', 'The'] },
            { sentence: ['If', 'it', 'rains', 'I', 'will', 'stay'], words: ['stay', 'will', 'I', 'rains', 'it', 'If'] },
            { sentence: ['If', 'I', 'were', 'you', 'I', 'would', 'go'], words: ['go', 'would', 'I', 'you', 'were', 'I', 'If'] },
            { sentence: ['He', 'said', 'he', 'was', 'tired'], words: ['tired', 'was', 'he', 'said', 'He'] },
            { sentence: ['She', 'told', 'me', 'she', 'had', 'seen', 'it'], words: ['it', 'seen', 'had', 'she', 'me', 'told', 'She'] },
            { sentence: ['They', 'have', 'been', 'waiting', 'hours'], words: ['hours', 'waiting', 'been', 'have', 'They'] },
            { sentence: ['The', 'decision', 'will', 'be', 'made', 'soon'], words: ['soon', 'made', 'be', 'will', 'decision', 'The'] }
        ]
    }
};
