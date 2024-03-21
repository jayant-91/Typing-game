const AUTO_QUOTE_URL = `http://api.quotable.io/random`;
const displayQuot = document.getElementById('quote-display');
const inputQuote = document.getElementById('quote-input');
const timer = document.querySelector('.timer').querySelector('span');
const word = document.querySelector('.word').querySelector('span');
const speed = document.querySelector('.speed').querySelector('span');
const pass = document.querySelector('.pass');
const stop = document.querySelector('.stop');
let stopGame;
let wordCount = 0;
let checkStack = [];

pass.addEventListener('click', () => {
    genarateQuote()
})

stop.addEventListener('click', () => {
    clearInterval(stopGame);
})

async function genarateQuote(){
    inputQuote.value = null;
    displayQuot.innerText = null;
    checkString = [];
    const data = await fetch(AUTO_QUOTE_URL)
    const quote = await data.json()
    quote.content.split('').forEach(element => {
        const cherecter = document.createElement('span');
        cherecter.innerText = element
        displayQuot.appendChild(cherecter)

    });
}
genarateQuote()

let correct = false;
inputQuote.addEventListener('input',(key) => {
    const displayText = displayQuot.querySelectorAll('span')
    const inputText = inputQuote.value
    displayText.forEach((charecter,index) => {
        const inputCharecter = inputText[index]

        if(inputCharecter == null){
            charecter.classList.remove('incorrect')
            charecter.classList.remove('correct')
            correct = false;
        }
        else if(inputCharecter === charecter.innerText){
            charecter.classList.add('correct');
            charecter.classList.remove('incorrect')
            correct = true;
        }
        else{
            charecter.classList.add('incorrect')
            charecter.classList.remove('correct')
            correct = false;
        }
    })

    if(correct)genarateQuote();
    if(key.data != null){
        checkString.push(key.data)
    }
    
})



inputQuote.addEventListener('keydown', (target) => {
    if(target.key === " ")wordCount++;
    else if(target.key === 'Backspace'){
        if(checkString.pop() === " "){
            wordCount--;
        }
    }
})



function timeindex(){
    const time = new Date();
    function settime(){
        stopGame = setInterval(() => {
            let totalTime = Math.floor((new Date() - time) / 1000);
            let min = Math.floor(totalTime / 60)
            let sec = Math.floor(totalTime % 60);
            if(min < 10)min = '0'+ min;
            if(sec < 10)sec = '0' + sec;
            timer.innerText = `${min}:${sec}`;
            word.innerText = wordCount;
            speed.innerText = Math.ceil(60 / totalTime * wordCount);

        },1000)
    }
    // timer.innerText = time;
    settime()
}

timeindex()


