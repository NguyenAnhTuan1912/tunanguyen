const canvas = document.querySelector("canvas");
const c1 = canvas.getContext('2d');
const PI = Math.PI;

canvas.width = 290;
canvas.height = 290;

var match = window.matchMedia("(max-width: 600px)");

function responsive(x) {
    if(x.matches) {
        canvas.width = innerWidth * 0.5;
        canvas.height = canvas.width;
    }
}

responsive(match);
match.addListener(responsive);

const size = {
    x : canvas.width,
    y : canvas.height
}

function Ball(x, y, dx, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.radius = radius;

    this.draw = function() {
        c1.beginPath();
        c1.arc(this.x, this.y, this.radius, 0, PI * 2, true);
        c1.strokeStyle = "#262626";
        c1.stroke();
        c1.fillStyle = '#fff';
        c1.fill();
    }

    this.update = function() {
        this.x += this.dx;
        if(this.x + this.radius > size.x) {this.x = this.radius;}
        if(this.x - this.radius < 0) {this.x = size.x - this.radius;}
        this.draw();
    }
}

function getNumber(max, min) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const ball = [];

function initBall() {
    for(var i = 0; i < 5; i++) {
        var radius = getNumber(12, 10);
        var x = getNumber(size.x - radius, 10 + radius);
        var y = getNumber(-50, 50);
        var dx = getNumber(4, 1);
        ball.push(new Ball(x, size.y / 2 + y, dx, radius));
    }

    for(var i = 0; i < 5; i++) {
        var radius = getNumber(size.x * 0.05, size.x * 0.04);
        var x = getNumber(size.x - radius, 10 + radius);
        var y = getNumber(-50, 50);
        var dx = getNumber(1, 4);
        ball.push(new Ball(x, size.y / 2 + y, -dx, radius));
    }
}

initBall();




function animate() {
    requestAnimationFrame(animate);
    c1.clearRect(0, 0, size.x, size.y);
    for(var i = 0; i < 10; i++) {
        ball[i].update();
    }
}

animate();