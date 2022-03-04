const area = document.querySelector('.area');
let countMove = 0;
let result = '';
area.addEventListener('click', e => {
    if (e.target.className === 'cell') {
        if (countMove % 2 === 0) {
            e.target.innerHTML = 'X';
        } else {
            e.target.innerHTML = '0';
        }
        countMove++;
        checkWinner()
    }
});

const checkWinner = () => {
    const cells = document.querySelectorAll('.cell')
    const arrCell = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];
    for ( let i = 0; i < arrCell.length; i++) {
        if (cells[arrCell[i][0]].innerHTML == 'X' && cells[arrCell[i][1]].innerHTML == 'X' && cells[arrCell[i][2]].innerHTML == 'X') {
            result += 'крестики';
            prepResult(result);
        } else if (cells[arrCell[i][0]].innerHTML == '0' && cells[arrCell[i][1]].innerHTML == '0' && cells[arrCell[i][2]].innerHTML == '0') {
            result += 'нолики';
            prepResult(result);
        }
    }
};

let prepResult = winner => {
    alert(`Победили ${winner}`);
};