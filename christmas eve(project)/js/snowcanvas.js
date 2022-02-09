// window.onload = function () {
    let canvas = document.querySelector("canvas");
    let ctx = canvas.getContext("2d");
    //размеры canvas...
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
  
    //снежинки...
    const maxNumSnowflakes = 150; //max кол-во снежинок...
    const arrParticles = [];
    for (let i = 0; i < maxNumSnowflakes; i++) {
      arrParticles.push({
        x: Math.random() * width, //x-координаты...
        y: Math.random() * height, //y-координаты...
        r: Math.random() * 6 + 1, //радиус...
        d: Math.random() * maxNumSnowflakes, //плотность...
      });
    };
  
    //рисуем хлопья...
    function draw() {
      ctx.clearRect(0, 0, width, height);
  
      ctx.fillStyle = "rgb(255, 255, 255)";
      ctx.beginPath();
      for (let i = 0; i < maxNumSnowflakes; i++) {
        let smallParticles = arrParticles[i];
        ctx.moveTo(smallParticles.x, smallParticles.y);
        ctx.arc(smallParticles.x,smallParticles.y,smallParticles.r,0,Math.PI * 2,true);
      };
      ctx.fill();
      update();
      drawName();
    };
  
    //функция отрисовываем название игры...
    function drawName() {
      ctx.fillStyle = "#FFFFE5";
      ctx.font = "110px sunshiney";
      ctx.fillText("Christma’s Eve",canvas.width / 2 + 50,canvas.height / 2 + 230);
    };
    drawName();
    //функция перемещения снежинок...
    //угол будет постоянным инкрементным флагом. К нему будут применены функции Sin и Cos для создания вертикального и горизонтального движения хлопьев...
    let angle = 0;
    function update() {
      angle += 0.01;
      for (let i = 0; i < maxNumSnowflakes; i++) {
        let smallParticles = arrParticles[i];
        //Обновляем координаты X и Y...
        //Мы добавим 1 к функции cos, чтобы предотвратить отрицательные значения, которые заставят хлопья двигаться вверх...
        //Каждая частица имеет свою собственную плотность, которую можно использовать, чтобы сделать движение вниз различным для каждого хлопья...
        //Давайте сделаем его более случайным, добавив радиус...
        smallParticles.y += Math.cos(angle + smallParticles.d) + 1 + smallParticles.r / 2;
        smallParticles.x += Math.sin(angle) * 2;
  
        //Отправляем хлопья обратно сверху, когда он выходит...
        //Давайте сделаем это немного более органичным и позволим хлопьям входить слева и справа также...
        if (
          smallParticles.x > width + 5 ||
          smallParticles.x < -5 ||
          smallParticles.y > height
        ) {
          if (i % 3 > 0) {
            //66,67% хлопьев...
            arrParticles[i] = {
              x: Math.random() * width,
              y: -10,
              r: smallParticles.r,
              d: smallParticles.d,
            };
          } else {
            //Если отщеп выходит справа...
            if (Math.sin(angle) > 0) {
              //Вход слева...
              arrParticles[i] = {
                x: -5,
                y: Math.random() * height,
                r: smallParticles.r,
                d: smallParticles.d,
              };
            } else {
              //Вход справа...
              arrParticles[i] = {
                x: width + 5,
                y: Math.random() * height,
                r: smallParticles.r,
                d: smallParticles.d,
              };
            };
          };
        };
      };
    };
  
    //цикл анимации...
    setInterval(draw, 25);
  // };


