export class Ball {
  /**
   * 
   * @param {{x: number, y: number, dx: number, radius: number, cv: HTMLCanvasElement}} options 
   */
  constructor(options) {
    this.x = options.x;
    this.y = options.y;
    this.dx = options.dx;
    this.radius = options.radius;
    this.cv = options.cv;
    this.ddContext = options.cv.getContext("2d");

    this.draw = this.draw.bind(this);
    this.update = this.update.bind(this);
  }

  draw() {
    this.ddContext.beginPath();
    this.ddContext.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    this.ddContext.strokeStyle = "#262626";
    this.ddContext.stroke();
    this.ddContext.fillStyle = '#fff';
    this.ddContext.fill();
  }

  update() {
    this.x += this.dx;
    if(this.x + this.radius > this.cv.width) {this.x = this.radius;}
    if(this.x - this.radius < 0) {this.x = this.cv.width - this.radius;}
    this.draw();
  }
}