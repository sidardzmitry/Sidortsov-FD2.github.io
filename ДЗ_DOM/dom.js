//добавляем body в переменную...
const body = document.querySelector("body");

//создаем и добавляем элемент div с классом  и вставляем в body...
const divBox = document.createElement("div");
divBox.classList.add("divbox");
divBox.style.marginTop = "30px";
body.appendChild(divBox);

//создаем функцию, которая добавляет 3 инпута...
function createInput(name, placeholder) {
  const inps = document.createElement("input");
  inps.setAttribute("name", name);
  inps.style.width = "350px";
  inps.style.height = "25px";
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

//функция которая должна принимать свойства и значения из input и добавлять <h1></h1>...
function createH1() {
  const newH1 = document.createElement("h1");
  newH1.classList.add("newh1");
  const newObjEl = {};
  for (let inp of divBox.children) {
    newObjEl[inp.name] = inp.value;
  }
  newH1.style[newObjEl.property] = newObjEl.value;
  newH1.innerText = newObjEl.text;
  body.appendChild(newH1);
}

//функция которая должна принимать свойства и значения из input и добавлять <p></p>...
function createP() {
  const newP = document.createElement("p");
  newP.classList.add("newP");
  const newObjElp = {};
  for (let inp1 of divBox.children) {
    newObjElp[inp1.name] = inp1.value;
  }
  newP.style[newObjElp.property] = newObjElp.value;
  newP.innerText = newObjElp.text;
  body.appendChild(newP);
}

//функция которая должна принимать свойства и значения из input и добавлять <ul><li></li></ul>...
const newUl = document.createElement("ul");
function createUl() {
  newUl.classList.add("list");
  const newLi = document.createElement("li");
  const newObjElList = {};
  for (let inpList of divBox.children) {
    newObjElList[inpList.name] = inpList.value;
  }
  newLi.style[newObjElList.property] = newObjElList.value;
  newLi.innerText = newObjElList.text;
  body.appendChild(newUl);
  newUl.append(newLi);
}
