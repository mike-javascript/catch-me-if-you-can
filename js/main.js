"use trict";

const btns = {
  high : document.getElementById("high"),
  title : document.getElementById("head"),
  timer : document.getElementById("timer"),
  black : document.getElementById("black"),
  score : document.getElementById("score"),
  level : document.getElementById("level"),
  clickMe : document.getElementById("clickMe"),
  misseClick : document.getElementById("misseClick"),
  pointLevel : document.getElementById("pointLevel")
};

const gameVar = {
  anim : 2,
  score : 0,
  level : 1,
  time : 60,
  point : 10,
  pointLevel :10,
  misseClick : 0,
  timerStop : null,
  mouseStop : null,
  goMouseTime : 300,
  animationTime : "s"
};

var winners = [
  { date: "05/30/2017", score: 278, name: "Ringo Starr" },
  { date: "07/23/2019", score: 226, name: "Mike Sabbah" },
  { date: "08/16/2015", score: 512, name: "John Lennon" },
  { date: "10/27/2018", score: 496, name: "Paul McCartney" },
  { date: "01/02/2014", score: 317, name: "George Harrison" }
];

var winners = [];
var winnersJSON = localStorage.getItem("objLocal");
if (winnersJSON != null) {
  winners = JSON.parse(winnersJSON);
};

objSort ()
highScore();
function highScore() {
  var winnersJSON = JSON.stringify(winners);
  localStorage.setItem("objLocal", winnersJSON);
  btns.high.innerHTML = "";
  winners.forEach(x => {
    btns.high.innerHTML += `<div class="name"><div class="date">${x.date}</div>${x.score} - ${x.name}</div>`;
  });
}

function objSort () {
  winners.sort((a, b) => {
    if (a.score > b.score) {
      return -1;
    }
    if (a.score < b.score) {
      return 1;
    }
    return 0;
  });
}

btns.title.addEventListener("mouseover", changeName);
function changeName() {
  if(btns.title.innerHTML == "CATCH ME IF YOU CAN!") {
    btns.title.innerHTML = "CLICK TO START";
  } else {
    btns.title.innerHTML = "CATCH ME IF YOU CAN!";
  }
}

btns.title.addEventListener("click", conf);
function conf () {
  var ready = confirm("Ready to start ?");
  if(ready) {
    start();
    btns.title.removeEventListener("click", conf);
    btns.title.removeEventListener("mouseover", changeName);
    btns.title.innerHTML = "CATCH ME IF YOU CAN!"
  }
}

function start() {
  btns.clickMe.addEventListener("click", myPlay);
  btns.black.addEventListener("click", myPlay);
  btns.clickMe.addEventListener("mouseover", go, {once: true });
  btns.clickMe.style.animationDuration = gameVar.anim + gameVar.animationTime;
  gameVar.timerStop = setInterval(() => {
    gameVar.time --;
    btns.timer.innerHTML = gameVar.time;
    if(gameVar.time < 0) {
      stop(); 
    }
  }, 1000);
}

function go() {
  gameVar.mouseStop = setTimeout(() => {
    if(btns.clickMe.addEventListener("mouseover", go, {once: true }) == btns.clickMe.addEventListener("mouseover", go, {once: true })) {
      btns.clickMe.addEventListener("mouseover", go,{once: false })
    } else {
      btns.clickMe.addEventListener("mouseover", go, {once: true })
    }
    btns.clickMe.style.top = Math.trunc(Math.random() * 520) + "px";
    btns.clickMe.style.left = Math.trunc(Math.random() * 850) + "px";
  }, gameVar.goMouseTime)
}

function myPlay(e) {
  e.stopPropagation();
  if(this.id == "clickMe") {
    play();
  } 
  if(this.id == "black") {
    black();
  }
}

function black() {
  gameVar.misseClick++
  btns.misseClick.innerText = gameVar.misseClick;
  gameVar.score -= gameVar.level
  btns.score.innerText = gameVar.score;
}

function play() {
  gameVar.score += gameVar.point*gameVar.level;
  gameVar.pointLevel--;
  if(gameVar.pointLevel < 1) {
    gameVar.level++;
    gameVar.time += 10;
    gameVar.pointLevel = 10;
    gameVar.anim -= 0.25;
    btns.clickMe.style.animationDuration = gameVar.anim + gameVar.animationTime;
    gameVar.goMouseTime -= 50;
  }
  btns.score.innerText = gameVar.score;
  btns.pointLevel.innerText = gameVar.pointLevel;
  btns.level.innerText = gameVar.level;
  if(gameVar.level > 5) {
    alert("YOU WIN \nYOU SCORE IS: " + gameVar.score);
    stop();
  }
}

function stop() {
  clearTimeout(gameVar.mouseStop);
  if(gameVar.score > winners[4].score) {
    var myDate = new Date;
    var format = {month: "2-digit", day: "2-digit", year: "numeric"};
    var newUser = {date: myDate.toLocaleDateString("en", format), score: gameVar.score, name: prompt("YOU'VE MADE IT TO THE LEADERBOARD! \nENTER YOUR NAME:")};
    winners.push(newUser);
    objSort ();
    winners.pop();
    highScore();
  } else {
      if(gameVar.level < 5) {
        alert("GAME OVER \nYOU HAVE NOT REACHED LEVEL 5 \nYOU SCORE IS: " + gameVar.score);
      }  
    }
  init();
}

function init() {
  btns.title.addEventListener("click", conf);
  btns.title.addEventListener("mouseover", changeName);
  btns.clickMe.removeEventListener("mouseover", go, {once: true });
  btns.clickMe.removeEventListener("mouseover", go, {once: false });
  btns.clickMe.removeEventListener("click", myPlay);
  btns.black.removeEventListener("click", myPlay);
  btns.clickMe.style.animationDuration = "0s";
  gameVar.anim = 2;
  gameVar.goMouseTime = 300;
  clearInterval(gameVar.timerStop);
  btns.score.innerText = 0;
  gameVar.score = 0;
  btns.pointLevel.innerText = 10;
  gameVar.pointLevel = 10;
  btns.level.innerText = 1;
  gameVar.level = 1;
  btns.misseClick.innerText = 0;
  gameVar.misseClick =0;
  btns.timer.innerHTML = 60;
  gameVar.time = 60;
  btns.clickMe.style.top = 0;
  btns.clickMe.style.left = 0;
}






