const wordsToFind = [ "JAVASCRIPT", "PHP", "HTML", "PYTHON", "CSS", "LANGUAGE" ]; // Table of words

// Selectors
let hangman         = document.querySelector("#hangman");
let word            = document.querySelector("#word");
let form            = document.querySelector("#form");
let input           = document.querySelector("#input");
let restart         = document.querySelector("#restart");
let result          = document.querySelector(".answer");
let score           = document.querySelector("#score");
let chosenLetter    = document.querySelector("#chosen-letter");
let sectionLetters  = document.querySelector("#section-letters");

// Variable
let randomIndex;
let randomWord;
let hiddenWord = [];
let scoreCount = 0;
let maxScore = 6;
let answer;
let lastIndex = 0;
let allLetter = "ABCDEFGHIJKLMNOPKRSTUVWXYZ";

// Functions
// const reset = () => {
//     //hiddenWord = [];
//     // scoreCount = 0;
//     // chosenLetter.style.display = "none";
//     // pickword();
//     // displayScore();
//     init();
// }

const generateRandomNumber = (max) => {
    return Math.floor(Math.random() * Math.floor(max)); // Generate un random nomber between 0 and (max) : max is the parameter
    // return the value to the fonction generateRandomNumber(max)
};

const pickword = () => {
    randomIndex = generateRandomNumber(wordsToFind.length - 1);
    randomWord = wordsToFind[randomIndex];
    return randomWord;
}

const winGame = () => {
    lastIndex = randomIndex;
    console.log(lastIndex);
    form.remove();
    word.textContent = randomWord;
    result.innerHTML = `<h2>You win</h2>`;
    result.style.display = "block";
}

const endGame = () => {
    // word.textContent = randomWord;
    document.body.style.backgroundColor = "red";
    form.remove();
    word.remove();
    sectionLetters.remove();
    result.innerHTML = `<h2>Game over</h2><h3>The word was : ${randomWord}</h3>`;
    result.style.display = "block";
}

const checkLetter = () => {
    // If find the word
    if(randomWord == answer.toUpperCase()) {
        winGame();
    }

    // If letter is the word
    if(randomWord.includes(answer.toUpperCase())) {
        // alert('include');
       // console.log(items.length);
       let items = word.querySelectorAll('li');
        for(let i = 0; i < randomWord.length; i++) { 

            if(randomWord[i] == answer.toUpperCase()) {
                items[i].textContent = hiddenWord[i].replace('_', randomWord[i]);
                sectionLetters.querySelectorAll('li').style.backgroundColor = "green";
            }

            if(word.textContent == randomWord) {
                winGame();
            }

        }
        
    }

    else {
        scoreCount++;
        displayScore();
    }

    if (scoreCount == maxScore) {
        endGame();
    }

}

const displayScore = () => {
    score.innerHTML = `<p>${scoreCount} / ${maxScore}</p>`;
    if(scoreCount >= 1) { // if a mettre
        // answer = input.value.toUpperCase();
        chosenLetter.querySelector('p').append(answer.toUpperCase() + ', ');
        chosenLetter.style.display = 'block';
    }

    hangman.innerHTML = `<img id="image-hangman" src="images/pendus-${scoreCount}.png" alt="image_hangman">`;
}

const displayAllLetters = () => {
    allLetterArray = allLetter.split('');
    for (let i = 0; i < allLetterArray.length; i++) {
        //sectionLetters.querySelector('ul').innerHTML = `<li>${allLetterArray[i]}</li>`;
        let li = document.createElement('li');
        li.textContent = allLetterArray[i];
        sectionLetters.querySelector('ul').append(li);
    }
}

/*const relaunch = () => {
    init();
}*/

// EVENT : Form on submit event
form.addEventListener('submit', (e) => {
    e.preventDefault();
    answer = input.value;
    if(answer.toLocaleLowerCase() != answer.toUpperCase()) { // Verify if is a letter
        //console.log(answer.toUpperCase());
        checkLetter();
        input.value = "";
    }
    else {
        alert('You must enter a letter')
    }
});

sectionLetters.querySelector('ul').addEventListener('click', (evt) => {
    if(evt.target.matches('li')) {
        // console.log(evt.target.innerHTML);
        answer = evt.target.innerHTML;
        evt.target.className = "disable";
        checkLetter();
    }
});

//restart.querySelector('button').addEventListener('click', relaunch);

const init = () => {
    
    //reset();

    do {
        // Pick Word
        randomWord = pickword();
        console.log('randomWord', randomWord);
    } while (lastIndex == randomIndex);

    for (let i = 0; i < randomWord.length; i++) {
        
        hiddenWord[i] = randomWord[i].replace(/[A-Z]/, "_");
        // console.log(randomWord[i]);
        let li = document.createElement('li');
        li.textContent = hiddenWord[i];
        word.append(li);
    }

    // Display all letters
    displayAllLetters();
    
    // Display Score
    displayScore();

}

// On load initiate
window.addEventListener('DOMContentLoaded', () => {
    init();
    input.value = "";
})