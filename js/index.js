'use strict';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 720;
canvas.height = 640;

class Garland {
  constructor() {
    this.garland = [];
    let x = 80;
    let y = 160;
    let color = '';
    let border ='';
    let filled = false;
    let i = 0;
    while(!filled) {
      if(i > 0 && x === 80 && y === 160) {
          filled = true;
      }
        
      if (i % 3 === 0) {
        color = 'yellow'; 
        border = 'orange';
      } else if(i % 3 === 1) {
        color = 'pink'; 
        border = 'red';
      } else {
        color = 'blue';  
        border = 'grey';
      }
  
      if(x < 600 && y === 160) {
        x += 40;  
      } else if(y < 480 && x === 600) {
        y += 40; 
      } else if(y === 480 && x > 80) {
        x -= 40;  
      } else if(y > 160 && x < 600) {
        y -= 40; 
      }    

        this.garland.push(new Element(x, y, 10, color, border));
        i++;
      }
    }

  makeCircle() {
    let R = ((this.garland.length-1) * 20) / Math.PI;
    let al = (2 * Math.PI) / (this.garland.length-1); 
    let dx = [];
    let dy = [];

    for(let i = 0; i < this.garland.length; i++) {
        dx.push(Math.round(R * Math.sin(al * i) + 350));
        dy.push(Math.round(R * Math.cos(al * i) + 320));
    }

    function animate(garl) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let circle = true;
      for(let i = 0; i < garl.length; i++) {
            if(garl[i].x === dx[i] && garl[i].y === dy[i]) {
                 garl[i].paint();
                 if(i < garl.length - 1){
                     i++; 
                 }  
            }
            if(garl[i].x !== dx[i]) {
              circle = false;
              garl[i].x < dx[i] ? garl[i].x++ : garl[i].x--;
            }
            if(garl[i].y !== dy[i]) {
                circle = false;
                garl[i].y < dy[i] ? garl[i].y++ : garl[i].y--;
            }
            garl[i].paint();
      }

      if(circle) {
        new Button('Done', 310, 320);
      } else {
        requestAnimationFrame(() => animate(garl));
      }
        
  } 
    animate(this.garland);
  }

  turnOn(){
    setInterval(()=>{this.garland.forEach(elem => elem.changeColor())}, 600);
  }
};

class Element {
    constructor(x, y, radius, color, border) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.border = border;
        this.paint();
    }

    paint(){
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.lineWidth = 2;
        ctx.strokeStyle = this.border;
        ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
        ctx.stroke();
        ctx.fill();
        ctx.closePath();
    }
  
    changeColor(){
      if(this.color === 'yellow'){
        this.color = 'pink'; 
        this.border ='red';
      } else if(this.color === 'pink'){
        this.color = 'blue';
        this.border = 'grey';
      } else {
        this.color = 'yellow';
        this.border = 'orange';
      }
      this.paint()
    }
};

class Button {
    constructor(text, x, y){
        ctx.beginPath();
        ctx.fillStyle = 'yellow';
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 1;
        ctx.font = 'bold 1.7rem Arial';
        ctx.fillText(text, x, y);
        ctx.strokeText(text, x, y);
        ctx.closePath();
    } 
}

class Main {
	constructor() {
        new Button('Circle', 300, 320);
        let garland = new Garland();
        garland.turnOn();
    canvas.addEventListener('click', (e) =>{
            if(e.layerX >= 300 && e.layerX <= 400
            && e.layerY >= 300 && e.layerY <= 340)
                garland.makeCircle();
        });
	}
};

new Main();