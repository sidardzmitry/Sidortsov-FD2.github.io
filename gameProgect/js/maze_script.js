// Создаем глобальные переменные для канваса и контекста...
let canvas;
let context;
let body = document.querySelector('body');
let x = 0;
let y = 0;
let stopX = 0;
let stopY = 0;
let timer;

//Создаем функцию, которая должна отобразить наш готовый лабиринт сразу при запуске странице windows...
window.onload = function () {
  canvas = document.querySelector("#canvas");
  context = canvas.getContext("2d");
  drawMaze("/gameProgect/assets/maze40sol.svg", 307, 0);
};

//Создаем функцию которая загрузит наш лабиринт...
function drawMaze(mazeFile, startingX, startingY) {
  clearTimeout(timer);
  stopX = 0;
  stopY = 0;
  let imgMaze = new Image();
  imgMaze.onload = function () {

    //Изменяем размеры санваса под любую картинку...
    canvas.width = imgMaze.width;
    canvas.height = imgMaze.height;

    //Вставляем лабиринт...
    context.drawImage(imgMaze, 0, 0);
    x = startingX;
    y = startingY;

    //Вставляем смайлик...
    let imgFace = document.querySelector(".face");
    context.drawImage(imgFace, x, y);
    context.stroke();

    //рисуем новый кадр каждые 10 мл.сек...
    timer = setTimeout(drawMaze(), 10);
  }
  imgMaze.src = mazeFile;
};

//Функция которая обрабатывает нажатие клавишь...
body.addEventListener('keydown',(e) => {
  stopX = 0;
  stopY = 0;

  //Обработаем клавиши...
  if (e.code == 'ArrowUp') {
    stopY -=1;
  }
  if (e.code == "ArrowDown") {
    stopY += 1;
  }
  if (e.cCode == "ArrowLeft") {
    stopY -= 1;
  }
  if (e.code == "ArrowRight") {
    stopY += 1;
  }
});
//Функция перерисовки на холсте...
function redraw() {
  if (stopX != 0 || stopY != 0) {
    context.beginPath();
    context.fillStyle = 'blue';
    context.rect(x,y,15,15);
    context.fill();

    x += stopX;
    y += stopY;

    context.drawImage(imgFace, x, y);
  }
  timer = setTimeout(redraw(), 10);
};

