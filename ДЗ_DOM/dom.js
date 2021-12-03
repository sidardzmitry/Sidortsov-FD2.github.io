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

//создаем функцию, которая добавляет кнопки...
function createButton(className, nameFunction) {
  const btns = document.createElement("button");
  btns.setAttribute("class", className);
  btns.setAttribute("onclick", nameFunction);
  return btns;
}

//вызываем функцию...
divBox.appendChild(createButton("btn", "createH1()")).textContent = "SaveH1";
divBox.appendChild(createButton("btn", "createP()")).textContent = "SaveP";
divBox.appendChild(createButton("btn", "createUl()")).textContent = "SaveUl";

//функция которая должна принимать свойства и значения из input и добавлять <h1></h1> в DOM...
function createH1() {
  let divBoxEl = document.querySelector(".divbox");
  const newH1 = document.createElement("h1");
  newH1.classList.add("newh1");
  const newObjEl = {};
  for (let inp of divBoxEl.children) {
    newObjEl[inp.name] = inp.value;
  }
  newH1.style[newObjEl.property] = newObjEl.value;
  newH1.innerText = newObjEl.text;
  body.appendChild(newH1);
}

//функция которая должна принимать свойства и значения из input и добавлять <p></p> в DOM...
function createP() {
  let divBoxElp = document.querySelector(".divbox");
  const newP = document.createElement("p");
  newP.classList.add("newP");
  const newObjElp = {};
  for (let inp1 of divBoxElp.children) {
    newObjElp[inp1.name] = inp1.value;
  }
  newP.style[newObjElp.property] = newObjElp.value;
  newP.innerText = newObjElp.text;
  body.appendChild(newP);
}

function createUl() {
  let divBoxElList = document.querySelector(".divbox");
  const newUl = document.createElement("ul");
  newUl.classList.add("list");
  const newLi = document.createElement("li");
  const newObjElList = {};
  for (let inpList of divBoxElList.children) {
    newObjElList[inpList.name] = inpList.value;
  }
  newLi.style[newObjElList.property] = newObjElList.value;
  newLi.innerText = newObjElList.text;
  newUl.appendChild(newLi);
  if(!body.newUl) {
    body.appendChild(newUl);
  }else{
    break;
  }
}
