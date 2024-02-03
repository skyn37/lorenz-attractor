const AXIS_STEP = 20;

class Renderer{

    canvas : HTMLCanvasElement;
    random: () => number = Math.random;
    private ctx : CanvasRenderingContext2D;
    constructor(private id: string){
        this.canvas = document.getElementById(id) as HTMLCanvasElement;
        if (!this.canvas) {
            throw new Error(`Canvas element with id '${id}' not found.`);
        }
        this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;
    
        this.ctx.imageSmoothingEnabled = true;
        if (!this.ctx) {
            throw new Error("Unable to get 2D rendering context.");
        }
    }


   public DrawAxis(){

        this.ctx.strokeStyle = "blue";

        // DRAW X AND Y axis
        this.ctx.moveTo(0, this.canvas.height / 2);
        this.ctx.lineTo(this.canvas.width, this.canvas.height / 2);
        this.ctx.moveTo(this.canvas.width /2 , 0);
        this.ctx.lineTo(this.canvas.width / 2 , this.canvas.height);


        // DRAW X tick marks
        for(let i =0; i < this.canvas.width; i+= AXIS_STEP){
            this.ctx.moveTo(i, this.canvas.height / 2 - 5);
            this.ctx.lineTo(i, this.canvas.height / 2 + 5);    
        }

        // DRAW Y tick marks
        for(let i = 0; i < this.canvas.height; i+= AXIS_STEP){
            this.ctx.moveTo( this.canvas.width /2 -5, i);
            this.ctx.lineTo(this.canvas.width /2 +5, i);
        }

        this.ctx.stroke();
    }

    public AnimatedDraw(x : number, y : number, z : number, color : string, opacity: number){

        this.ctx.lineWidth = 0.1;
        let s=10;
        let r=28;
        let b= 8 / 3;

        let dx = (s*(y - x ));
        let dy = (r * x - y - x * z);
        let dz = (x * y - b * z);

                
        let x2 = x + (dx * 0.01);
        let y2 = y + (dy * 0.01);
        let z2 = z + (dz * 0.01);
        let scale = 10;
        
        this.ctx.scale(scale,scale);
        this.ctx.translate(this.canvas.width / (2 * scale), this.canvas.height / (2 * scale));
        this.ctx.beginPath();
        this.ctx.strokeStyle = `rgba(${color}, ${Math.max(0, opacity)})`;
        this.ctx.moveTo(x,y);
        this.ctx.lineTo(x2,y2);
        this.ctx.stroke();
        this.ctx.closePath();

        
        // WITH RECTANGLES MAYBE ? 
        //this.ctx.fillStyle = `rgba(${color}, ${Math.max(0, opacity)})`;
        //this.ctx.fillRect(x , y, 1,1);
        
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);


        x = x2;
        y = y2;
        z = z2;

        window.requestAnimationFrame(() => this.AnimatedDraw(x,y,z, color, opacity));
    }

    static random_rgba(){
        let o = Math.round, r = Math.random, s = 255;
        return `${o(r()*s)},${o(r()*s)},${o(r()*s)}`;
    }
}




function main(){

    const r = new Renderer("canvas");

    r.canvas.width = 1920;
    r.canvas.height = 1080;
    let x = 84 +  r.random();
    let y = 66+r.random();
    let z = r.random();
    r.DrawAxis();

    for(let i =0; i<100;++i){
        r.AnimatedDraw(x * (r.random())  ,-(y * r.random()) , z * (r.random()), Renderer.random_rgba(), 0.2);

    }

  //  r.AnimatedDraw(x,y, z + Math.random() * 10, "255,0,0", 0.2);
  //  r.AnimatedDraw(x,y, z + Math.random(), "0,255,0", 0.4);
  //  r.AnimatedDraw(x,y, z + Math.random(), "0,0,255", 0.3);
  //  r.AnimatedDraw(x +25,y + -45, z + 25, Renderer.random_rgba(), 0.2);
  //  r.AnimatedDraw(x +15,y + -41.111221, z + 11.213141435, Renderer.random_rgba(), 0.2);

}


main();
