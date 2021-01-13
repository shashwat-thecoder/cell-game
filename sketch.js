var player;
var length = 10;
var grid =[];
var enemy = [];
var gameState = 0;
let time = new Date();
let timeS = {seconds : 0, milliseconds : 0}
let endTime = {seconds : 0, milliseconds : 0}
let final = 0;
let high = Infinity;

function setup() {
  noLoop()

  timeS.seconds = time.getSeconds()
  timeS.milliseconds = time.getMilliseconds()
  createCanvas(1000, 1000);
  player = new Player(950, 950);

  grid = new Array(length);
  for(var i = 0; i<length ; i++){
    grid[i] = new Array(length);
    for(var j = 0; j<length ; j++){
      grid[i][j] = new Cell((i*(width/length)), (j*(width/length)))
    }
  }

  enemy[0] = new Enemy(850, 750)
  enemy[1] = new Enemy(750, 350)
  enemy[2] = new Enemy(350, 550)
  enemy[3] = new Enemy(150, 150)

  for(var i = 0; i < 10; i++){
    let x = parseInt(random(10)), y = parseInt(random(10));
    grid[x][y].visible = false;
    grid[x][y].colour = "black";
  }

  let randX = parseInt(random(10));
  let randY = parseInt(random(10));
  while(grid[randX][randY].colour !== "white"){randX = parseInt(random(10)); randY = parseInt(random(10));}
  grid[randX][randY].colour = "green";

  while(grid[randX][randY].colour !== "white"){randX = parseInt(random(10)); randY = parseInt(random(10));}
  grid[randX][randY].colour = "green";

}

function draw() {
  background(220);
  strokeWeight(8);
  noFill()
  rect(0, 0, 1000, 1000);
  fill(255)

  if(frameCount == 2){
    time = new Date();
    timeS.seconds = time.getSeconds()
    timeS.milliseconds = time.getMilliseconds()
  }
  if(gameState == 0){
    for(var i in enemy){
      grid[(enemy[i].x - 50) / 100][(enemy[i].y - 50) / 100].colour = "red";
    }
    for(var i in enemy){
      enemy[i].move(random([-100, 0, 100]), random([-100, 0, 100]))

      if(enemy[i].x > 1049){
        enemy[i].x = 0 + width/(length*2);
      }

      if(enemy[i].x < -49){
        enemy[i].x = width - (width/(length*2));
      }

      if(enemy[i].y > 1049){
        enemy[i].y = 0 + width/(length*2);
      }

      if(enemy[i].y < -49){
        enemy[i].y = width - (width/(length*2));
      }
    }

    for(var i in grid){
      for(var j in grid[i]){
        grid[i][j].display()
      }
    }


    player.display();

    for(var i in enemy){
      enemy[i].display()
      if(player.check(enemy[i])){
        gameState = 1;
      }
    }
    X_index = (player.x - 50) / 100
    Y_index = (player.y - 50) / 100
    if(player.victory(X_index, Y_index)){redraw(); redraw()}
  } else if(gameState == 1){
      textAlign(CENTER, CENTER);
      textSize(50)
      fill(0)
      text(`You died`, 500, 500)
  }else if(gameState == 2){
      textAlign(CENTER, CENTER);
      textSize(50)
      fill(0)
      text(`You took ${(endTime.seconds - timeS.seconds) / 1000} seconds`, 500, 500)
      if(high > (endTime.seconds - timeS.seconds) / 1000){high = (endTime.seconds - timeS.seconds) / 1000}
      text(`High Score: ${high}`, 500, 550)
      text(`Press SPACEBAR to restart`, 500, 600)
  }
}

function keyPressed(){
  X_index = (player.x - 50) / 100
  Y_index = (player.y - 50) / 100
  if(keyCode == UP_ARROW){
    if(grid[X_index][Y_index - 1].visible){
      player.y=grid[X_index][Y_index - 1].y + 50
      redraw()
    }
  }
  if(keyCode == DOWN_ARROW){
     if(grid[X_index][Y_index + 1].visible){
      player.y=grid[X_index][Y_index + 1].y + 50
      redraw()
    }
  }
  if(keyCode == LEFT_ARROW){
    if(grid[X_index - 1][Y_index].visible){
      player.x=grid[X_index - 1][Y_index].x + 50
      redraw()
    }
  }
  if(keyCode == RIGHT_ARROW){
    if(grid[X_index+ 1][Y_index ].visible){
      player.x=grid[X_index+ 1][Y_index].x + 50
      redraw()
    }
  }
  if(keyCode == 32 && gameState !== 1){player.restart()}

  if(player.x > 1049){
    player.x = 50;
  }

  if(player.x < -49){
    player.x = 950;
  }

  if(player.y > 1049){
    player.y = 50;
  }

  if(player.y < -49){
    player.y = 950;
  }
  player.display()
}