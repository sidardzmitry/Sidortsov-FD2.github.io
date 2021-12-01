//Создаем и добавляем элемент H1 с классом и вставляем в body!
let newH1 = document.createElement("h1");
newH1.classList.add("newh1");
const body = document.querySelector("body");
body.appendChild(newH1);
let newH1El = document.querySelector(".newh1");

//Создаем и добавляем элемент div с классом  и вставляем в body!
let divBox = document.createElement("div");
divBox.classList.add("divbox");
body.appendChild(divBox);
let divBoxEl = document.querySelector(".divbox");

//Создаем и добавляем элементы (input,button) с классом и атрибутами и вставляем в div!
let inp1 = document.createElement("input");
inp1.setAttribute("name", "text");
inp1.setAttribute("placeholder", "text");
divBox.appendChild(inp1);
//let inp1El = document.querySelector("input[name=text]");

//input 1
let inp2 = document.createElement("input");
inp2.setAttribute("name", "property");
inp2.setAttribute("placeholder", "property");
divBox.appendChild(inp2);
//let inp2El = document.querySelector("input[name=property]");

//input 2
let inp3 = document.createElement("input");
inp3.setAttribute("name", "value");
inp3.setAttribute("placeholder", "value");
divBox.appendChild(inp3);
//let inp3El = document.querySelector("input[name=value]");

//input 3
let btn = document.createElement("button");
btn.classList.add("btn");
btn.setAttribute("onclick", "createH1()");
btn.textContent = "Save";
divBox.appendChild(btn);

//функция которая должна принимать свойства и значения из input и добавлять их по кнопке на страницу DOM!
function createH1() {
  let divBoxEl = document.querySelector(".divbox");
  let newObjEl = {};
  for (let inp of divBoxEl.children) {
    newObjEl[inp.name] = inp.value;
  }
  console.log(newObjEl.property);
  console.log(newObjEl.property);
  console.log(newH1El);

  let body = document.querySelector("body");
  body.appendChild(newH1El);

  newH1El.style[newObjEl.property] = newObjEl.value;
  newH1El.innerText = newObjEl.text;
}
