let gameSeq = [];
let userSeq = [];

let started = false;
let level = 0;

let highestScore = 0;
let highestScoreDisplay = document.querySelector("#highest-score");

let soundFlash = new Audio("soundflash.mp3");
let soundButtonPress = new Audio("soundButtonPress.mp3");
let soundGameOver = new Audio("gameover.mp3");

let h2 = document.querySelector("h2");

let btns = ["pink","blue","green","yellow"];

document.addEventListener("keypress", function(){
    if (started == false){
        console.log("game is started");
        started = true;
    }

    levelUp();
});

function gameFlash(btn){
    btn.classList.add("flash");
    soundFlash.play();
    setTimeout(function(){
        btn.classList.remove("flash");
    } , 200);
}

function userFlash(btn){
    btn.classList.add("userflash");
    soundButtonPress.play();
    setTimeout(function(){
        btn.classList.remove("userflash");
    } , 200);
}

function levelUp(){
    userSeq = [];
    level++;
    h2.innerText = (`level ${level}`);

    if(level > highestScore){
        highestScore = level;
        highestScoreDisplay.innerText = `Highest Score: ${highestScore}`;
    }
    
    let randomIdx = Math.floor(Math.random() * 4);
    let randomColor = btns[randomIdx];
    let randomBtn = document.querySelector(`.${randomColor}`);
    gameSeq.push(randomColor);
    console.log(gameSeq);
    gameFlash(randomBtn);
}

function checkAns(idx){
    if(userSeq[idx] === gameSeq[idx]){
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp, 1000);
        }
    } else{
        h2.innerHTML=`Game Over!<br>Your score was <b>${level}</b> <br> press anywhere to start.`;
        document.querySelector("body").style.backgroundColor = "black";
        document.querySelector(".heading").style.backgroundColor = "red";
        soundGameOver.play();
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor ="rgb(240,193,225)";
            document.querySelector(".heading").style.backgroundColor ="rgb(222, 191, 214)";
        }, 1000);
        reset();
    }
}

function buttonPressed(){
    let btn = this;
    userFlash(btn);

    let usercolor = btn.getAttribute("id");
    userSeq.push(usercolor);
    checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
    btn.addEventListener("click", buttonPressed);

    // Touch event for touchscreens (like phones/tablets)
    btn.addEventListener("touchstart", function(e) {
        e.preventDefault();  // Prevents default touch behavior like scrolling
        buttonPressed.call(this);  // Call the same function as for click
    });
}

function reset(){
    gameSeq = [];
    started = false;
    userSeq = [];
    level = 0;
    highestScoreDisplay.innerText = `Highest Score: ${highestScore}`;
}
