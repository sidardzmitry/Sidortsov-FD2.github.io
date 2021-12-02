//Вытягиваем body в переменну...
const body = document.querySelector("body");

//Создаем и добавляем элемент div с классом  и вставляем в body...
const divBox = document.createElement("div");
divBox.classList.add("divbox");
body.appendChild(divBox);

//создаем функцию, которая добавляет 3 инпута...
function createInput(name, placeholder) {
  const inps = document.createElement("input");
  inps.setAttribute("name", name);
  inps.setAttribute("placeholder", placeholder);
  return inps;
}

//вызываем функцию...
divBox.appendChild(createInput("text", "text"));
divBox.appendChild(createInput("property", "property"));
divBox.appendChild(createInput("value", "value"));

//создаем кнопку и передаем функцию в нее...
const btnH1 = document.createElement("button");
btnH1.classList.add("btn");
btnH1.setAttribute("onclick", "createH1()");
btnH1.textContent = "SaveH1";
divBox.appendChild(btnH1);

//Создаем кнопку и передаем в нее функцию...
const btnP = document.createElement("button");
btnP.classList.add("btnP");
btnP.setAttribute("onclick", "createP()");
btnP.textContent = "SaveP";
divBox.appendChild(btnP);

//функция которая должна принимать свойства и значения из input и добавлять <h1></h1> в DOM...
function createH1() {
  const divBoxEl = document.querySelector(".divbox");
  const newH1 = document.createElement("h1");
  newH1.classList.add("newh1");
  const newObjEl = {};
  for (let inp of divBoxEl.children) {
    newObjEl[inp.name] = inp.value;
  }
  body.appendChild(newH1);
  newH1.style[newObjEl.property] = newObjEl.value;
  newH1.innerText = newObjEl.text;
}

//функция которая должна принимать свойства и значения из input и добавлять <p></p> в DOM...
function createP() {
  const divBoxElp = document.querySelector(".divbox");
  const newP = document.createElement("p");
  newP.classList.add("newP");
  const newObjElp = {};
  for (let inp1 of divBoxElp.children) {
    newObjElp[inp1.name] = inp1.value;
  }
  body.appendChild(newP);
  newP.style[newObjElp.property] = newObjElp.value;
  newP.innerText = newObjElp.text;
}


