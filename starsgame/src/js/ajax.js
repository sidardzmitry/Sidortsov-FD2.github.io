"use strict";
btnScore.addEventListener('click', showScore);//show the result on the Score button in the menu
let arrResult = [];
let inputName = document.createElement('input');
inputName.classList = 'inputName';
inputName.setAttribute('placeholder', 'enter your name');
inputName.setAttribute('maxlength', '12');

const gameover = document.createElement('div');
gameover.innerText = 'Game Over';
gameover.classList = 'gameover';
const headerResult = document.createElement('div');
headerResult.classList = 'headResult';
headerResult.innerText = 'Result';
const saveName = document.createElement('button');
saveName.disabled = true;
saveName.innerHTML = 'Save result';
saveName.classList = 'btnSave';
saveName.addEventListener('click', storeInfo)
function saveResult() {
    inputName.value = '';
    wrap.append(gameover);
    wrap.append(inputName);
    wrap.append(saveName);
}
inputName.addEventListener('input', checkInput)
function checkInput() {
    if (inputName.value != '') {
        saveName.style.color = 'orange';
        saveName.disabled = false;
    } else {
        saveName.disabled = true;
        saveName.style.color = 'red';
    }
}

let showList = document.createElement('div');
showList.classList = "resultStyle";

const ajaxHandlerScript = "https://fe.it-academy.by/AjaxStringStorage2.php";
let updatePassword;
let stringName = 'BUBELEV_WAR_GAMEOVER';

function storeInfo() {
    updatePassword = Math.random();
    $.ajax({
        url: ajaxHandlerScript, type: 'POST', cache: false, dataType: 'json',
        data: { f: 'LOCKGET', n: stringName, p: updatePassword },
        success: lockGetReady, error: errorHandler
    }
    );
    backMenu();
}
function lockGetReady(callresult) {
    if (callresult.error != undefined)
        alert(callresult.error);
    else {
        let info = {
            name: inputName.value,
            score: score
        };
        arrResult.push(info)

        $.ajax({
            url: ajaxHandlerScript, type: 'POST', cache: false, dataType: 'json',
            data: { f: 'UPDATE', n: stringName, v: JSON.stringify(arrResult), p: updatePassword },
            success: updateReady, error: errorHandler
        }
        );
    }
}

function updateReady(callresult) {
    if (callresult.error != undefined)
        alert(callresult.error);
}
function showScore() {
    $.ajax(
        {
            url: ajaxHandlerScript, type: 'POST', cache: false, dataType: 'json',
            data: { f: 'READ', n: stringName },
            success: readReady, error: errorHandler
        }
    );
}
function readReady(resultH) {
    if (resultH.error != undefined)
        alert(resultH.error);
    else {
        var strName = '';
        var strScore = '';
        arrResult = JSON.parse(resultH.result);
        function compareScores(A, B) {
            return B.score - A.score;
        }
        arrResult.sort(compareScores);
        if (arrResult.length > 10) {
            arrResult.splice(10)
        }
        function getFrom(V, I, A) {
            strName += `<div class = "resultFlex"><span>${V.name}</span><span>${V.score}</span></div>`;
        }
        arrResult.forEach(getFrom)
        showList.innerHTML = strName + strScore;
        btnStart.remove();
        btnRules.remove();
        btnScore.remove();
        wrap.append(headerResult);
        wrap.append(btnMainMenu);
        wrap.append(showList)
    }
}
function errorHandler(jqXHR, StatusStr, ErrorStr) {
    alert(StatusStr + ' ' + ErrorStr);
}
if (window.jQuery) {
    console.log('ok')
}