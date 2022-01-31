const canvas = document.querySelector("canvas.rain");
const c = canvas.getContext("2d");
const size = {
    x : window.innerWidth,
    y : window.innerHeight
}
canvas.width = size.x / 4;
canvas.height = size.y / 2;

function getNumber(max, min) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function Line(x, y, dy, w, length) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.dy = dy;
    this.length = length;

    this.draw = function() {
        c.beginPath();
        c.lineWidth = this.w + "px";
        c.strokeStyle = "#262626";
        c.moveTo(this.y, this.y - this.length);
        c.lineTo(this.y, this.y);
        c.stroke();
    }

    this.update = function() {
        if(this.y > Math.random() * (size.y * 0.98)) {this.y = 0;}
        if(this.x < 0) {this.y = 0;}
        this.x += 1;
        this.y = this.x;
        this.draw();
    }
}

const line = [];
for(var i = 0; i < 10; i++) {
    var x = (Math.random() * ((size.x + 100) - (-100)) -100);
    var y = Math.random() * size.y * 0.02;
    this.dx = 0;
    var dy = 0;
    var w = 5;
    var length = Math.random() * (20 - 10 + 1) + 10;
    line.push(new Line(x, y, dy, w, length));
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, size.x, size.y);
    for(var i = 0; i < line.length; i++) {
        line[i].update();
    }
}

animate();