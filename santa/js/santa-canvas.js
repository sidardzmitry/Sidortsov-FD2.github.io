//глобальные переменные звуков в игре...
const soundEat = document.querySelector('.eat');
const soundBonus = document.querySelector('.bonus');
const soundFinish = document.querySelector('.finish');
const soundBackground = document.querySelector('.sound_background');

//глобальные переменные игрового поля...
const body = document.querySelector('body');
const blockCanvas = document.querySelector('.block_canvas');
const santaCounter = document.querySelector('.santa_counter');
let arrSquares = [];
const width = 18;//длинна поля...
let counterPoints = 0;//счетчик очков...



//создаем массив игрового поля...
const arraySanta = [
1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0,
1, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1,
1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1,
1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1,
1, 0, 0, 1, 0, 0, 4, 4, 4, 4, 4, 4, 0, 1, 0, 1, 0, 1,
1, 0, 0, 0, 0, 0, 4, 2, 2, 2, 2, 4, 0, 1, 0, 1, 0, 1,
1, 0, 1, 0, 0, 0, 4, 2, 2, 2, 2, 4, 0, 0, 0, 0, 0, 1,
1, 0, 1, 0, 0, 0, 4, 2, 2, 2, 2, 4, 0, 1, 1, 1, 0, 1,
1, 0, 1, 0, 0, 0, 4, 4, 2, 2, 4, 4, 0, 0, 0, 0, 0, 1,
1, 0, 1, 0, 0, 0, 0, 0, 4, 4, 0, 0, 0, 0, 1, 1, 0, 1,
1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1,
0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
];

//включаем музыку сразу при загрузке странице...
// window.onload = function () {
//     soundBackground.play();
//     soundBackground.volume = 0.5;
//     soundBackground.loop = true;
// };

//функция для для добавления картинов в массив игрового поля...
function createBlockCanvas() {
    for( let i = 0; i < arraySanta.length; i++) {
        let square = document.createElement('div');
        blockCanvas.appendChild(square);
        arrSquares.push(square);

        if (arraySanta[i] === 0) {
            arrSquares[i].classList.add('santa_eat');
        } else if (arraySanta[i] === 1) {
            arrSquares[i].classList.add('wall');
        } else if (arraySanta[i] === 2) {
            arrSquares[i].classList.add('zona_snowman');
        } else if (arraySanta[i] === 3) {
            arrSquares[i].classList.add('bonus_eat');
        };
    };
};

//вызываем функцию...
createBlockCanvas();

//место расположение санты...
let santaIndex = 210;
arrSquares[santaIndex].classList.add('santa');

//задаем движение санте по клавиатуре...
function moveSanta(e) {
    squares[santaIndex].classList.remove('santa');

    body.addEventListener('keydown', (e) => {
        if(e.code === 'ArrowLeft')
    })
};