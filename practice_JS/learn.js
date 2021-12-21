// let str = "15 *25,5 - (10 / 2)";
// let operations = [];
// let result = 0;
// let i = 0;
// function calculator(str) {
//     str = str.split(" ").join("");
//     return str;
// };
// console.log(calculator(str));
const body = document.querySelector("body");
const tree = "/lesson_img/tree.png";
const water = "/lesson_img/water.png";
const flower = "/lesson_img/flower.png";

const area = document.querySelector("#area");
area.style.water = "500px";
area.style.height = "500px";
body.appendChild(area);

const arrArea = [
  [1, 0, 2, 0, 1, 2],
  [2, 1, 0, 1, 0, 2],
  [0, 2, 1, 0, 2, 1],
];

arrArea.forEach((row) => {
  row.forEach((cell) => {
    if (cell === 0) {
      const picturTree = document.createElement("img");
      picturTree.src = "tree";
      picturTree.style.width = "100px";
      picturTree.style.height = "100px";
      area.appendChild(picturTree);
    } else if (cell === 1) {
      const picturWater = document.createElement("img");
      picturWater.src = "water";
      picturWater.style.width = "100px";
      picturWater.style.height = "100px";
      area.appendChild(picturWater);
    } else if (cell === 2) {
      const picturFlower = document.createElement("img");
      picturFlower.src = "flower";
      picturFlower.style.width = "100px";
      picturFlower.style.height = "100px";
      area.appendChild(picturFlower);
    }
  });
});
