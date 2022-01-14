//переменные звуков игры...
let soundEat = document.querySelector(".eat");
let soundBonus = document.querySelector('.bonus');
let soundGameOver = document.querySelector('.finish');
let soundBackgroup = document.querySelector('.sound_backgroup');

//переменные главного поля...
let container = document.querySelector(".container");
let display = document.querySelector(".score");

let width = 28;
let score = 0;
const layout = [
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 
  1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
  1, 3, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 3, 1,
  1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
  1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
  1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
  1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
  1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
  1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 2, 2, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
  4, 4, 4, 4, 4, 4, 0, 0, 0, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 0, 0, 0, 4, 4, 4, 4, 4, 4,
  1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
  1, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 1,
  1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
  1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
  1, 3, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 3, 1,
  1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1,
  1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1,
  1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1,
  1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
  1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
  1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
];

//включаем музыку сразу при загрузке странице...
// window.onload = function () {
//   soundBackgroup.play();
//   soundBackgroup.volume = 0.5;
//   soundBackgroup.loop = true;
// };


let squares = [];

//Пишем функцию CreateBord, запускаем функцию для добавления классов(картинки) в массив...
function createBoard() {
  for (let i = 0; i < layout.length; i++) {
    let square = document.createElement("div");
    container.appendChild(square);
    squares.push(square);

    if (layout[i] === 0) {
      squares[i].classList.add("pacmanFood");
    } else if (layout[i] === 1) {
      squares[i].classList.add("wall");
    } else if (layout[i] === 2) {
      squares[i].classList.add("notallow");
    } else if (layout[i] === 3) {
      squares[i].classList.add("powerpellet");
    }
  }
}

//Вызываем функцию...
createBoard();

let pacmanCurrentIndex = 490; //место расположения героя...
squares[pacmanCurrentIndex].classList.add("pacman");

function movePacman(e) {
  squares[pacmanCurrentIndex].classList.remove("pacman");

  //пишем перемещение для героя...
  switch (e.keyCode) {
    case 37:
      if (
        pacmanCurrentIndex % width !== 0 &&
        !squares[pacmanCurrentIndex - 1].classList.contains("wall") &&
        !squares[pacmanCurrentIndex - 1].classList.contains("notallow")
      ) {
        pacmanCurrentIndex -= 1;
        break;
      }
      if (squares[pacmanCurrentIndex - 1] === squares[363]) {
        pacmanCurrentIndex = 391;
        break;
      }

    case 38:
      if (
        pacmanCurrentIndex - width >= 0 &&
        !squares[pacmanCurrentIndex - width].classList.contains("wall") &&
        !squares[pacmanCurrentIndex - width].classList.contains("notallow")
      ) {
        pacmanCurrentIndex -= width;
        break;
      }
    case 39:
      if (
        pacmanCurrentIndex % width < width - 1 &&
        !squares[pacmanCurrentIndex + 1].classList.contains("wall") &&
        !squares[pacmanCurrentIndex + 1].classList.contains("notallow")
      ) {
        pacmanCurrentIndex += 1;
        break;
      }
      if (squares[pacmanCurrentIndex + 1] === squares[392]) {
        pacmanCurrentIndex = 364;
        break;
      }
    case 40:
      if (
        pacmanCurrentIndex + width < width * width &&
        !squares[pacmanCurrentIndex + width].classList.contains("wall") &&
        !squares[pacmanCurrentIndex + width].classList.contains("notallow")
      ) {
        pacmanCurrentIndex += width;
        break;
      }
  }

  squares[pacmanCurrentIndex].classList.add("pacman");
  foodEaten();
  powerPellet();
  checkForGameOver();
  checkForWin();
};

document.addEventListener("keyup", movePacman);

//Создаем функцию (съеденая еда)...
function foodEaten() {
  if (squares[pacmanCurrentIndex].classList.contains("pacmanFood")) {
    soundEat.play(); //звук при съедании еды...
    score++; //счетчик увеличиваем...
    display.innerHTML = score; //отрисовываем счетчик на странице...
    squares[pacmanCurrentIndex].classList.remove("pacmanFood"); //удаляем класс для съеденой еды...
  }
}

//Создаем функцию съедаем бонусную еду...
function powerPellet() {
  if (squares[pacmanCurrentIndex].classList.contains("powerpellet")) {
    soundBonus.play();
    score += 10;
    armys.forEach((army) => (army.isScared = true));
    setInterval(unScared, 10000);
    squares[pacmanCurrentIndex].classList.remove("powerpellet");
  }
}

function unScared() {
  armys.forEach((army) => (army.isScared = false));
}

//Создаем функцию (класс) и создаем врагов...
class Army {
  constructor(className, startIndex, speed) {
    this.className = className;
    this.startIndex = startIndex;
    this.speed = speed;
    this.timerId = NaN;
    this.currentIndex = startIndex;
    this.isScared = false;
  }
}

let armys = [
  new Army('army1', 348, 250),
  new Army('army2', 376, 400),
  new Army('army3', 351, 300),
  new Army('army4', 379, 500),
];

armys.forEach((army) => {
  squares[army.currentIndex].classList.add(army.className);
  squares[army.currentIndex].classList.add("army");
});

//Функция перемещения армии случайным образом...
armys.forEach((army) => moveArmy(army));
function moveArmy(army) {
  let directions = [-1, +1, -width, +width];
  let direction = directions[Math.floor(Math.random() * directions.length)];

  army.timerId = setInterval(function () {
    if ( !squares[army.currentIndex + direction].classList.contains('wall') && !squares[army.currentIndex + direction].classList.contains('army')) {
      //удаляем классы...
      squares[army.currentIndex].classList.remove(army.className);
      squares[army.currentIndex].classList.remove('army', 'armyScr');
      army.currentIndex += direction;
      squares[army.currentIndex].classList.add(army.className, 'army');
      //иначе нужно искать другое направление...
    } else {
      direction = directions[Math.floor(Math.random() * directions.length)];
    };
    //если напуган армия...
    if (army.isScared) {
      squares[army.currentIndex].classList.add('armyScr');
    };

    //если призрак сейчас напуган и на нем герой...
    if ( army.isScared && squares[army.currentIndex].classList.contains('pacman')) {
      soundBonus.play();
      squares[army.currentIndex].classList.remove(
        army.classList, 'army', 'armyScr');
      army.currentIndex = army.startIndex;
      score += 100;
      squares[army.currentIndex].classList.add(army.className, 'army');
    };
  }, army.speed);
};

//Создаем функцию окончания игры...
function checkForGameOver() {
  if (squares[pacmanCurrentIndex].classList.contains('army') && !squares[pacmanCurrentIndex].classList.contains('armyScr')) {
    document.removeEventListener('keyup', movePacman);
    armys.forEach(army => clearInterval(army.timerId));
    soundGameOver.play(); //запускаем звук конца игры...
    setTimeout(function() {
      console.log('Game Over');
    }, 300);
  };
};

//функция проверки на победителя...
function checkForWin() {
  if (score === 100) {
    document.removeEventListener('keyup', movePacman);
    armys.forEach(army => clearInterval(army.timerId));
    setTimeout(function() {
      console.log('You have Winner');
    }, 300);
  };
};

