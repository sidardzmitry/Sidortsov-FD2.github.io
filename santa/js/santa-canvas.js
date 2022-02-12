//глобальные переменные звуков в игре...
const soundEat = document.querySelector(".eat");
const soundBonus = document.querySelector(".bonus");
const soundFinish = document.querySelector(".finish");
const soundBackground = document.querySelector(".sound_background");

//глобальные переменные игрового поля...
const body = document.querySelector("body");
const blockCanvas = document.querySelector(".block_canvas");
const santaCounter = document.querySelector(".santa_counter");
let arrSquares = [];
const width = 18; //длинна поля...
let counterPoints = 0; //счетчик очков...

//создаем массив игрового поля...
const arraySanta = [
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0,
  0, 0, 1, 0, 0, 0, 0, 3, 0, 0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1,
  0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 0,
  0, 0, 0, 5, 0, 0, 0, 1, 0, 1, 0, 1, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1,
  0, 1, 0, 1, 1, 3, 0, 0, 0, 0, 1, 2, 2, 2, 2, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0,
  1, 0, 1, 2, 2, 2, 2, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 1, 0, 1, 2, 2, 2, 2, 1,
  0, 1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1, 2, 2, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0,
  1, 0, 0, 0, 0, 0, 4, 4, 0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
];

//включаем музыку сразу при загрузке странице...
// window.onload = function () {
//     soundBackground.play();
//     soundBackground.volume = 0.5;
//     soundBackground.loop = true;
// };

//функция для для добавления картинов в массив игрового поля...
function createBlockCanvas() {
  for (let i = 0; i < arraySanta.length; i++) {
    let square = document.createElement("div");
    blockCanvas.appendChild(square);
    arrSquares.push(square);

    if (arraySanta[i] === 0) {
      arrSquares[i].classList.add("santa_eat");
    } else if (arraySanta[i] === 1) {
      arrSquares[i].classList.add("wall");
    } else if (arraySanta[i] === 2) {
      arrSquares[i].classList.add("zona_snowman");
    } else if (arraySanta[i] === 3) {
      arrSquares[i].classList.add("bonus_eat");
    } else if (arraySanta[i] === 5) {
      arrSquares[i].classList.add("santa");
    }
  }
}

//вызываем функцию...
createBlockCanvas();

//место расположение санты...
let santaIndex = 81;

//задаем движение санте по клавиатуре...
function moveSanta(e) {
  arrSquares[santaIndex].classList.remove("santa");

  switch (e.keyCode) {
    case 37:
      if (
        santaIndex % width !== 0 &&
        !arrSquares[santaIndex - 1].classList.contains("wall") &&
        !arrSquares[santaIndex - 1].classList.contains("zona_snowman")
      ) {
        santaIndex = santaIndex - 1;
        break;
      }
      //условие для перехода из одной точки в другую...
      if (arrSquares[santaIndex - 1] === arrSquares[17]) {
        santaIndex = 35;
        break;
      }
      if (arrSquares[santaIndex - 1] === arrSquares[233]) {
        santaIndex = 251;
        break;
      }

    case 38:
      if (
        santaIndex - width >= 0 &&
        !arrSquares[santaIndex - width].classList.contains("wall") &&
        !arrSquares[santaIndex - width].classList.contains("zona_snowman")
      ) {
        santaIndex = santaIndex - width;
        break;
      }

    case 39:
      if (
        santaIndex % width < width - 1 &&
        !arrSquares[santaIndex + 1].classList.contains("wall") &&
        !arrSquares[santaIndex + 1].classList.contains("zona_snowman")
      ) {
        santaIndex = santaIndex + 1;
        break;
      }
      if (arrSquares[santaIndex + 1] === arrSquares[36]) {
        santaIndex = 18;
        break;
      }
      if (arrSquares[santaIndex + 1] === arrSquares[252]) {
        santaIndex = 234;
        break;
      }

    case 40:
      if (
        santaIndex + width < width * width &&
        !arrSquares[santaIndex + width].classList.contains("wall") &&
        !arrSquares[santaIndex + width].classList.contains("zona_snowman")
      ) {
        santaIndex = santaIndex + width;
        break;
      }
  }
  arrSquares[santaIndex].classList.add("santa");

  //здесь будем вызывать функции другие...
  eatSantaFood();
  eatSantaBonus();
  checkForFinish();
  checkForWinner();
}

document.addEventListener("keydown", moveSanta);

//создаем функцию (съедая еду)...
function eatSantaFood() {
  if (arrSquares[santaIndex].classList.contains("santa_eat")) {
    soundEat.play(); //звук при сьдании еды...
    counterPoints++; //счетчик увеличиваем...
    santaCounter.innerHTML = counterPoints; //отрисовываем счетчик на странице...
    arrSquares[santaIndex].classList.remove("santa_eat");
  }
}

//создаем функцию (съедая бонусы)...
function eatSantaBonus() {
  if (arrSquares[santaIndex].classList.contains("bonus_eat")) {
    soundBonus.play();
    counterPoints = counterPoints + 10;
    arrSquares[santaIndex].classList.remove("bonus_eat");
    grinches.forEach((grinch) => (grinch.isCold = true));
    setInterval(unCold, 10000);
    arrSquares[santaIndex].classList.remove("bonus_eat");
  }
}

function unCold() {
  grinches.forEach((grinch) => (grinch.isCold = false));
}

//создаем функцию класс с гринвичи...
class grinch {
  constructor(className, startIndex, speed) {
    (this.className = className),
      (this.startIndex = startIndex),
      (this.speed = speed),
      (this.timeId = NaN),
      (this.currentIndex = startIndex),
      (this.isCold = false);
  }
}

let grinches = [
  new grinch("grinch_one", 115, 250),
  new grinch("grinch_two", 118, 300),
  new grinch("grinch_three", 134, 350),
  new grinch("grinch_four", 135, 400),
  // new grinch('grinch_five', 151, 450),
  // new grinch('grinch_six', 154, 500),
];

grinches.forEach((grinch) => {
  arrSquares[grinch.currentIndex].classList.add(grinch.className);
  arrSquares[grinch.currentIndex].classList.add("grinch");
});

//создаем функцию которая будет перемещать гринчи случайным образом...
grinches.forEach((grinch) => movegrinch(grinch));
function movegrinch(grinch) {
  let directions = [-1, +1, -width, +width];
  let direction = directions[Math.floor(Math.random() * directions.length)];

  grinch.timeId = setInterval(function () {
    if (
      !arrSquares[grinch.currentIndex + direction].classList.contains("wall") &&
      !arrSquares[grinch.currentIndex + direction].classList.contains("grinch")
    ) {
      //удаляем классы...
      arrSquares[grinch.currentIndex].classList.remove(grinch.className);
      arrSquares[grinch.currentIndex].classList.remove("grinch", "grinch_cold");
      grinch.currentIndex += direction;
      arrSquares[grinch.currentIndex].classList.add(grinch.className, "grinch");
      //иначе нужно искать другое направление...
    } else {
      direction = directions[Math.floor(Math.random() * directions.length)];
    }
    //если застыл гринч...
    if (grinch.isCold) {
      arrSquares[grinch.currentIndex].classList.add("grinch_cold");
    }

    //если гринч замерз и санта на нем...
    if (
      grinch.isCold &&
      arrSquares[grinch.currentIndex].classList.contains("santa")
    ) {
      soundBonus.play();
      arrSquares[grinch.currentIndex].classList.remove(
        grinch.classList,
        "grinch",
        "grinch_cold"
      );
      grinch.currentIndex = grinch.startIndex;
      counterPoints += 100;
      arrSquares[grinch.currentIndex].classList.add(grinch.className, "grinch");
    }
  }, grinch.speed);
}

//создаем функцию окончания игры...
function checkForFinish() {
  if (
    arrSquares[santaIndex].classList.contains("grinch") &&
    !arrSquares[santaIndex].classList.contains("grinch_cold")
  ) {
    document.removeEventListener("keyup", moveSanta);
    grinches.forEach((grinch) => clearInterval(grinch.timerId));
    soundFinish.play(); //запускаем звук конца игры...
    setTimeout(function () {
      console.log("Game Over");
    }, 300);
  }
}

//функция проверки на победителя...
function checkForWinner() {
  if (counterPoints === 100) {
    document.removeEventListener("keyup", moveSanta);
    grinches.forEach((grinch) => clearInterval(grinch.timerId));
    setTimeout(function () {
      console.log("You have Winner");
    }, 300);
  }
}
