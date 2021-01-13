class Player{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }

    display(){
        fill(0);
        ellipse(this.x, this.y, width/(length*2), width/(length*2))
        noFill()
    }
    check(obj){
        return(obj.x == this.x && obj.y == this.y)
    }
    victory(sq_x, sq_y){
        if(grid[sq_x][sq_y].colour == "green"){
            gameState = 2;
            time = new Date();
            endTime.seconds = time.getSeconds()
            endTime.milliseconds = time.getMilliseconds()
            endTime.seconds *= 1000;
            timeS.seconds *= 1000;
            endTime.seconds += endTime.milliseconds
            timeS.seconds += timeS.milliseconds
            
            return true;
        } else{
            return false;
        }
    }
    restart(){
        noLoop()
        gameState = 0;
        time = new Date()

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
}