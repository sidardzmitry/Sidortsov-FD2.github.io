"use strict";
//импортируем переменные...
import {btnLinkPlay, btnLinkRec, btnLinkRul, wrap} from './main.js';
import {score, grinchScore, quitGame} from './game.js';


let modalRecord = document.querySelector('.modal_record');
btnLinkRec.addEventListener('click', showScore);

let arrResult = [];

let blockSaveResult = document.createElement('div');
blockSaveResult.classList.add('blockSaveResult');
wrap.insertAdjacentElement('beforeend', blockSaveResult)


let inputName = document.createElement('input');
inputName.classList.add('inputName');
inputName.setAttribute('placeholder', 'enter your name');
inputName.setAttribute('maxlength', '12');

let headerResult = document.createElement('div');
headerResult.classList.add('headerResult');
headerResult.innerText = 'Result';

let saveName = document.createElement('button');
saveName.disabled = true;
saveName.innerHTML = 'Save Result';
saveName.classList.add('btnSave');
saveName.setAttribute('type', 'button');
saveName.addEventListener('click', storeInfo);


inputName.value = '';
blockSaveResult.insertAdjacentElement('beforeend', inputName);
blockSaveResult.insertAdjacentElement('beforeend', saveName);



inputName.addEventListener('input', checkInput);
function checkInput() {
    if(inputName.value != '') {
        saveName.style.color = 'white';
        saveName.disabled = false;
    } else {
        saveName.disabled = true;
        saveName.style.color = 'grey';
    };
};

let showList = document.createElement('div');
showList.classList.add('resultStyle');

let ajaxHandlerScript = 'https://fe.it-academy.by/AjaxStringStorage2.php';
let updatePassword;
let stringName = 'SIDORTSOV_CHRISTMAS_PACMAN_RESULTS';

function storeInfo() {
    updatePassword = Math.random();
    $.ajax({
        url: ajaxHandlerScript, type: 'POST', cache: false, dataType: 'json',
        data: { f: 'LOCKGET', n: stringName, p: updatePassword },
        success: lockGetReady, error: errorHandler
    });
    quitGame();
};
function lockGetReady(callresult) {
    if(callresult.error != undefined)
    alert(callresult.error);
    else {
        let info = {
            name: inputName.value,
            score: score,
            grinchScore: grinchScore
        };
        arrResult.push(info);

        $.ajax({
            url: ajaxHandlerScript, type: 'POST', cache: false, dataType: 'json',
            data: { f: 'UPDATE', n: stringName, v: JSON.stringify(arrResult), p: updatePassword },
            success: updateReady, error: errorHandler
        });
    };
};

function updateReady(callresult) {
    if(callresult.error != undefined)
    alert(callresult.error);
};

function showScore() {
    $.ajax({
        url: ajaxHandlerScript, type: 'POST', cache: false, dataType: 'json',
        data: { f: 'READ', n: stringName },
        success: readReady, error: errorHandler
    });
};

function readReady(resultH) {
    if(resultH.error != undefined)
    alert(resultH.error);
    else{
        let strName = '';
        let strScore = '';
        let strGrinchScore = '';
        arrResult = JSON.parse(resultH.result);
        function compareScores(A, B) {
            return B.score - A.score && B.grinchScore - A.grinchScore
        }
        arrResult.sort(compareScores);
        if(arrResult.length > 10) {
            arrResult.splice(10)
        }
        function getFrom(V, I, A) {
            strName += `<div class = 'resultFlex'><span>${V.name}</span><span>${V.score}</span><span>${V.grinchScore}</span></div>`;
        };
        arrResult.forEach(getFrom)
        showList.innerHTML = strName + strScore + strGrinchScore;
        btnLinkPlay.remove();
        btnLinkRec.remove();
        btnLinkRul.remove();
        modalRecord.append(headerResult);
        modalRecord.append(showList);
    }
}

function errorHandler(jqXHR, StatusStr, ErrorStr) {
    alert(StatusStr + ' ' + ErrorStr);
};

if (window.jQuery) {
    console.log('hello');
};

export{blockSaveResult};