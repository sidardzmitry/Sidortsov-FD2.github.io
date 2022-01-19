//добавляем body в переменную...
const body = document.querySelector("body");
body.style.backgroundColor = "rgba(0, 0, 0, .3)";

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
  inps.style.margin = "0 4px 3px 0";
  inps.setAttribute("placeholder", placeholder);
  return inps;
};

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
divBox.appendChild(createButton("btn", "createH1()")).textContent = "SAVE_H1";
divBox.appendChild(createButton("btn", "createP()")).textContent = "SAVE_P";
divBox.appendChild(createButton("btn", "createUlInput()")).textContent = "SAVE_Ul";
divBox.appendChild(createButton("btn", "createLi()")).textContent = "SAVE_Li";

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
  // body.appendChild(newH1);
  divBox.insertAdjacentElement("afterend", newH1);
};

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
  // body.appendChild(newP);
  divBox.insertAdjacentElement("afterend", newP);
};

//функция которая должна добавлять 3 доп. инпута на страницу для <li></li>...
function createUlInput() {
  divBox.insertAdjacentHTML("beforeend",
  `<input name="textLi" placeholder="text_Li" style="width: 350px; height: 25px;">
  <input name="propertyLi" placeholder="property_Li" style="width: 350px; height: 25px;">
  <input name="valueLi" placeholder="value_Li" style="width: 350px; height: 25px;">`)
};

//функция которая должна принимать свойства и значения из input и добавлять <li></li> в <ul></ul>...
const newUl = document.createElement("ul");
divBox.insertAdjacentElement("afterend", newUl);
function createLi() {
  newUl.classList.add("list_Li");
  const newLi = document.createElement("li");
  const newObjElList = {};
  for (let inpListLi of divBox.children) {
    newObjElList[inpListLi.name] = inpListLi.value;
  }
  newLi.style[newObjElList.propertyLi] = newObjElList.valueLi;
  newLi.innerText = newObjElList.textLi;
  newUl.appendChild(newLi);
};
