const score = document.querySelector(".score");
const start = document.querySelector(".strtScreen");
const Area = document.querySelector(".gameArea");

/*

>>>>>>OBJECT USE FOR GAME PORTION<<<<<<

*/
//create object to store player is playing or not
let player = { speed: 5, score: 0 };
//tocheck wether wich key is pressed
let keys = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowLeft: false,
  ArrowRight: false,
};

/*

>>>>>>KEY HANDLER PORTION<<<<<<

*/
//when our key gets pressed print this
document.addEventListener("keydown", keyUP);

function keyUP(e) {
  e.preventDefault();
  keys[e.key] = true;
  // console.log(keys);
}
//when our key gets released press this
document.addEventListener("keyup", keyDOWN);
function keyDOWN(e) {
  e.preventDefault();
  keys[e.key] = false;
  //console.log(keys);
}

//this will print once whwn our key gets pressed imeans comb9ination of press and rrelease both.
/*document.addEventListener("keypress", (e) => {
  e.preventDefault();
  console.log(e.key);
});*/

/*

>>>>>>GAME START PORTION<<<<<<

*/
start.addEventListener("click", startgame);

function startgame() {
  player.start = true; //putting value start in object.
  player.score = 0; //putting score as 0 when game start again.
  window.requestAnimationFrame(gamePlay);
  //Area.classList.remove("hide");
  Area.innerHTML = "";
  start.classList.add("hide");
  score.style.display = "initial";

  //creating road line div
  for (let x = 0; x < 5; x++) {
    let roadLine = document.createElement("div");
    roadLine.setAttribute("class", "line");
    roadLine.y = x * 150;
    roadLine.style.top = roadLine.y + "px";
    Area.appendChild(roadLine);
  }

  //creating car div
  let car = document.createElement("div");
  car.setAttribute("class", "car");
  //car.innerText = "Car is waiting for u.";
  Area.appendChild(car);

  player.x = car.offsetLeft;
  player.y = car.offsetTop;

  //console.log("left side " + car.offsetLeft);
  //console.log("top side " + car.offsetTop);

  for (let x = 0; x < 3; x++) {
    let enemyCar = document.createElement("div");
    enemyCar.setAttribute("class", "enemy");
    enemyCar.y = (x + 1) * 400 * -1;
    enemyCar.style.top = enemyCar.y + "px";
    enemyCar.style.backgroundColor = randomColor();
    enemyCar.innerHTML = "<h1>" + x + "</h1>";
    enemyCar.style.left = Math.floor(Math.random() * 400) + "px";
    Area.appendChild(enemyCar);
  }
}

/*

>>>>>>GAME PALY PORTION<<<<<<

*/

function gamePlay() {
  //console.log("game is start.");
  let carpos = document.querySelector(".car");
  let roadpos = Area.getBoundingClientRect();
  //console.log(roadpos);
  if (player.start) {
    moveLines(); //move Lines function grt invoke
    moveEnemy(carpos); //move cars top to bottom
    if (keys.ArrowDown && player.y < roadpos.bottom - 100) {
      player.y += player.speed;
    }
    if (keys.ArrowUp && player.y > roadpos.top + 170) {
      player.y -= player.speed;
    }
    if (keys.ArrowLeft && player.x > 0) {
      player.x -= player.speed;
    }
    if (keys.ArrowRight && player.x < roadpos.width - 50) {
      player.x += player.speed;
    }
    carpos.style.top = player.y + "px";
    carpos.style.left = player.x + "px";
    window.requestAnimationFrame(gamePlay);
    player.score++;
    score.innerHTML = "<h1> Score : " + player.score + "</h1>";
  }
}

/*

>>>>>>FUNCTIONS FOR GAME PORTION<<<<<<

*/
//move lines function
function moveLines() {
  let mline = document.querySelectorAll(".line");

  mline.forEach(function (item) {
    if (item.y >= 700) {
      item.y -= 750;
    }
    item.y += player.speed;
    item.style.top = item.y + "px";
  });
}

function finishGame() {
  player.start = false; //function fot end game
  start.classList.remove("hide");
  start.innerHTML =
    "GAME OVER <br> Your final score is :- " +
    (player.score + 1) +
    "<br> Press here to start again. <br> Thanks For Playing.";
}
function moveEnemy(car) {
  let Enemy = document.querySelectorAll(".enemy");

  Enemy.forEach(function (item) {
    if (collision(car, item)) {
      console.log("BOOM HIT CAR!");
      finishGame(); //when two cars collide each othe game will be over and stop.
    }
    if (item.y >= 750) {
      item.y = -300;
      item.style.left = Math.floor(Math.random() * 400) + "px";
    }
    item.y += player.speed;
    item.style.top = item.y + "px";
  });
}

function randomColor() {
  function c() {
    let hex = Math.floor(Math.random() * 256).toString(16);
    return ("0" + String(hex)).substr(-2);
  }
  return "#" + c() + c() + c();
}

function collision(a, b) {
  aPos = a.getBoundingClientRect();
  bPos = b.getBoundingClientRect();

  return !(
    aPos.bottom < bPos.top ||
    aPos.top > bPos.bottom ||
    aPos.right < bPos.left ||
    aPos.left > bPos.right
  );
}
