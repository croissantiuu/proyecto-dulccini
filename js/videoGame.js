class Game {
    constructor(word, incorrectMovesRemaining, guessedLetters) {
        this.word = word;
        this.incorrectMovesRemaining = incorrectMovesRemaining;
        this.guessedLetters = guessedLetters;
    }

    playerGuessed(letter) {
        this.guessedLetters.push(letter);
        if (!this.word.includes(letter)) {
            this.incorrectMovesRemaining--;
        }
    }

    get formattedWord() {
        let guessedWord = '';
        for (let letter of this.word) {
            if (this.guessedLetters.includes(letter)) {
                guessedWord += letter;
            } else {
                guessedWord += '_';
            }
        }
        return guessedWord;
    }
}


$(document).ready(function() {
    let correctWordLabel = $('.word-label');
    let imageView = $('.vg-image');
    let scoreLabel = $('.score-label');

    let letterButtons = $('.key');

    const listOfWords = [
        "muffins",
        "sabor",
        "hogar",
        "postres",
        "delicioso",
        "amor",
        "chocolate",
        "pateleria",
        "mascabado",
        "bicarbonato",
        "cobertura",
    ];

    let incorrectMovesAllowed = 7;
    let totalWins = 0;
    let totalLosses = 0;
    let currentGame;

    newRound();

    function newRound() {
        if (listOfWords.length > 0) {
            let newWord = listOfWords.shift();
            currentGame = new Game(newWord, incorrectMovesAllowed, []);
            enableLetterButtons(true);
            updateUI();
        } else {
            enableLetterButtons(false);
        }
    }

    function updateUI() {
        let letters = [];
        for (let letter of currentGame.formattedWord) {
            letters.push(letter);
        }
        let wordWithSpacing = letters.join(' ');
        correctWordLabel.text(wordWithSpacing);
        scoreLabel.text(`Triunfos: ${totalWins}, derrotas: ${totalLosses}`);
        imageView.attr('src', `../web/images/videogame/sprite_${(currentGame.incorrectMovesRemaining - 7) * -1}.png`);
    }

    letterButtons.click(function() {
        $(this).prop('disabled', true);
        let letterString = $(this).text();
        let letter = letterString.toLowerCase();
        currentGame.playerGuessed(letter); // Llama a playerGuessed en lugar de empujar la letra directamente
        updateGameState();
    });
    

    function updateGameState() {
        if (currentGame.incorrectMovesRemaining === 0) {
            totalLosses++;
            newRound();
        } else if (!currentGame.formattedWord.includes('_')) {
            confetti({
                particleCount: 300,
                spread: 170,
                origin: {y: .6}
            });
            totalWins++;
            newRound();
        } else {
            updateUI();
        }
    }    

    function enableLetterButtons(enable) {
        letterButtons.prop('disabled', !enable);
    }

    console.log(currentGame.incorrectMovesRemaining);
});
