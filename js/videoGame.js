class Game {
    constructor(word, incorrectMovesRemaining, guessedLetters, sound) {
        this.word = word;
        this.incorrectMovesRemaining = incorrectMovesRemaining;
        this.guessedLetters = guessedLetters;
        this.sound = sound;
    }

    playerGuessed(letter) {
        this.guessedLetters.push(letter);
        if (!this.word.includes(letter)) {
            this.incorrectMovesRemaining--;
            this.sound.play();
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
    let derrotasLabel = $('.score-lost');
    let infoBtn = $('.info-videogame');
    let closeInfoBtn = $('.btn-close');
    let musicBtn = $('.music-on');
    const infoWrapper = $('.popup-info-wrapper');

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

    const btnPressedAudio = new Audio('../web/audio/btn-preesed.wav');
    const wordGuessedSound = new Audio('../web/audio/word-guessed.wav');
    const roundLost = new Audio('../web/audio/round-lost.wav');
    const videoGameMusic = new Audio('../web/audio/game-music.wav');
    const incorrectLetter = new Audio('../web/audio/incorrect-letter.wav');


    infoBtn.on('click', function(e) {
        e.preventDefault();
        infoWrapper.removeClass('hide-btn');
        btnPressedAudio.play();
    });

    closeInfoBtn.on('click', function(e) {
        e.preventDefault();
        infoWrapper.addClass('hide-btn');
        btnPressedAudio.play();
    });

    musicBtn.on('click', function(e) {
        e.preventDefault();
        videoGameMusic.play();
        videoGameMusic.volume = 0.2;
    });


    musicBtn.click();
    infoBtn.click();

    if ($(window).width() < 769) {
        setTimeout(function() {
            infoBtn.addClass('videogame-btn-hide');
        }, 1500)
    }

    newRound();

    videoGameMusic.addEventListener('ended', function() {
        this.currentTime = 0;
        this.play();
    }, false);

    function newRound() {
        if (listOfWords.length > 0) {
            let newWord = listOfWords.shift();
            currentGame = new Game(newWord, incorrectMovesAllowed, [], incorrectLetter);
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
        scoreLabel.text(`Triunfos: ${totalWins}`);
        derrotasLabel.text(`Derrotas: ${totalLosses}`);
        imageView.attr('src', `../web/images/videogame/sprite_${(currentGame.incorrectMovesRemaining - 7) * -1}.png`);
    }

    letterButtons.click(function() {
        btnPressedAudio.play();
        $(this).prop('disabled', true);
        let letterString = $(this).text();
        let letter = letterString.toLowerCase();
        currentGame.playerGuessed(letter); // Llama a playerGuessed en lugar de empujar la letra directamente
        updateGameState();
    });
    
    function updateGameState() {
        if (currentGame.incorrectMovesRemaining === 0) {
            totalLosses++;
            roundLost.play();
            newRound();
        } else if (!currentGame.formattedWord.includes('_')) {
            wordGuessedSound.play();
            congratulations(.25, {
                spread: 30,
                startVelocity: 60
            });
            congratulations(.2, {
                spread: 60
            });
            congratulations(.35, {
                spread: 130,
                startVelocity: 30,
                decay: .92,
                scalar: 1.2
            });
            congratulations(.2, {
                spread: 120,
                startVelocity: 45
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
    
    function congratulations(ratio, opt) {
        confetti(Object.assign({}, opt, {
            origin: {y: .6},
            particleCount: Math.floor(200 * ratio)
        }));
    }
});
