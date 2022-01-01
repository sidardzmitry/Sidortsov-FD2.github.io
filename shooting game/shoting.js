let body = document.querySelector('body');
let beer = document.querySelectorAll('.cola');
let count = document.querySelector('.count strong');
let counter = 0;

document.body.addEventListener('click', playShot);

function playShot (e) {
    let el = e.target;
    if (el.classList.contains('cola')) {
        counter++;
        count.textContent = counter;
        el.classList.add('drop');
        if (counter ===5) {
            setTimeout(replay,400);
        }
    }
}

function replay () {
    beer.forEach(item => {
        item.classList.remove('drop');
    });
    counter = 0;
    count.textContent = counter;
}