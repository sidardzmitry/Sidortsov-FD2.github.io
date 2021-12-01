//Создаем и добавляем элемент H1 с классом и вставляем в body!
let newH1 = document.createElement("h1");
newH1.classList.add("newh1");
const body = document.querySelector("body");
body.appendChild(newH1);

//Создаем и добавляем элемент div с классом  и вставляем в body!
let divBox = document.createElement("div");
divBox.classList.add("divbox");
body.appendChild(divBox);

//Создаем и добавляем элементы (input,button) с классом и атрибутами и вставляем в div!
let inp1 = document.createElement("input");
inp1.setAttribute("name", "text");
inp1.setAttribute("placeholder", "text");
divBox.appendChild(inp1);

//input 1
let inp2 = document.createElement("input");
inp2.setAttribute("name", "proper");
inp2.setAttribute("placeholder", "proper");
divBox.appendChild(inp2);

//input 2
let inp3 = document.createElement("input");
inp3.setAttribute("name", "value");
inp3.setAttribute("placeholder", "value");
divBox.appendChild(inp3);

//input 3
let btn = document.createElement("button");
btn.classList.add("btn");
btn.setAttribute("onclick", "createH1()");
btn.textContent = "Save";
divBox.appendChild(btn);

//функция которая должна принимать свойства и значения из input и добавлять их по кнопке на страницу DOM!
let newObj = {};
function createH1() {
  for ( let inp of divBox.children) {
      divBox[inp.name] = inp.value;
  }
  console.log("newObj.proper");
  console.log("newObj.value");
  console.log("newH1");
}
