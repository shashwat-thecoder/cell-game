class Enemy{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }

    move(a, b){
        this.x += a;
        this.y += b;
    }
    display(){
        stroke(0);
        fill(255, 0, 0);
        ellipse(this.x, this.y, width/(length*2), width/(length*2))
        noFill()
    }
}