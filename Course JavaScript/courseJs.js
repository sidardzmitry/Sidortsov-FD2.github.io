// лист задач на HTML...

// let todoList = document.querySelector('.todo-list');
// let todoForm = document.querySelector('.todo-form');
// let todoInput = document.querySelector('.todo-input');

// todoForm.addEventListener('submit', formHandler);

// function formHandler(event) {
//     event.preventDefault();

//     let tastText = todoInput.value;

//     let newTask = document.createElement('li');
//     newTask.innerText = tastText;
//     todoList.insertAdjacentElement('beforeend', newTask);
//     todoInput.value = '';
//     todoInput.focus();
//     let btn = document.createElement('button');
//     btn.innerText = 'Удалить';
//     newTask.append(btn);
//     btn.addEventListener('click', (e) => {
//         e.target.closest('li').remove();
//     });
// };

//делаем счетчик...
// let counterElement = document.querySelector('.counter');
// let startBtn = document.querySelector('.start');
// let stopBtn = document.querySelector('.stop');
// let resetBtn = document.querySelector('.reset');
// let counter = 0;
// let timerID;

// //start
// startBtn.addEventListener('click', () => {
//     timerID = setInterval(() => {
//         console.log('startBtn');
//         counter++;
//         counterElement.innerText = counter;
//     }, 1000);
// });

// //stop
// stopBtn.addEventListener('click', () => {
//     console.log('stopBtn');
//     clearInterval(timerID);
// });

// //reset...
// resetBtn.addEventListener('click', () => {
//     console.log('resetBtn');
//     counter = 0;
//     counterElement.innerHTML = counter;
//     clearInterval(timerID);
// });


//promise...
let myPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        let response = true;

        if(response) {
            let message = 'SUCCESS';
            resolve();
        } else {
            let message = 'FAILED';
            reject();
        }
    }, 1000)
    console.log('Promise created');
});

myPromise.then((data) => {
    console.log('Then 1');
    console.log(data)
    return 'Data from then 1'
}).then((data) => {
    console.log('Then 2');
    console.log(data);
}).catch((data) => {
    console.log('Catch');
    console.log(data);
});
















