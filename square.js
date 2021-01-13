class Cell{
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.colour = "white"
        this.visible = true;
    }

    display(){
        stroke(0);
        !this.visible?noStroke():0;
        fill(this.colour)
        rect(this.x, this.y, width/length, height/length)
    }
}