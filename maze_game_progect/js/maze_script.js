// Создаем глобальные переменные для канваса и контекста...
let canvas;
let context;
let x = 0;
let y = 0;
let timer;

//Создаем функцию, которая должна отобразить наш готовый лабиринт сразу при запуске странице windows...
window.onload = function () {
    canvas = document.querySelector('#canvas');
    //console.log(canvas)
    context = canvas.getContext('2d');
    //console.log(context)
    drawMaze('/maze_game_progect/assets/maze.svg', 265, 5)
}

//Создаем функцию которая загрузит наш лабиринт...
function drawMaze (mazeFile, startingX, startingY) {

    clearTimeout(timer);

    dx = 0;
    dy = 0;

    let imgMaze = new Image();

    imgMaze.onload = function () {
        canvas.width = imgMaze.width;
        canvas.height = imgMaze.height;

        context.drawImage(imgMaze,0,0);

        x = startingX;
        y = startingY;

        //вставляем наш смайлик...
        let imgFace = document.querySelectorAll('.face')
        context.drawImage(imgFace, x, y);
        context.stroke();
        
        //рисуем новый кадр каждые 10 мл.сек...
        timer = setTimeout(drawMaze(), 10)
    };
    imgMaze.src = mazeFile;
}