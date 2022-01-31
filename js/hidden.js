const menu = document.getElementsByClassName("header__navigate__row-1");
const logo = document.getElementsByClassName("header__logo-svg");
const li = document.getElementsByClassName("header__navigate__row-1__col");

var check = false;

var match = window.matchMedia("(max-width: 600px)");

function menuShow() {
    menu[0].classList.remove("menu--hidden");
}

/*
function listShow() {
    for(let i = 0; i < li.length; i++) {
        li[i].className += " li--show";
    }
}
*/
function listTransition() {
    for(let i = 0; i < li.length; i++) {
        li[i].style.transform = 'translateX(150%)';
        //li[i].style.display = 'none';
        li[i].style.opacity = 0;
    }
}

function listMove() {
    for(let i = 0; i < li.length; i++) {
        li[i].style.transform = 'translateX(0)';
        //li[i].style.display = 'block';
        li[i].style.opacity = 1;
    }
}

function responsive(x) {
    if(x.matches) {
        listTransition();
        menu[0].className += " navigate--flex";
        logo[0].onclick = function(event) {
            if(check) {listMove(); check = false;}
            else {listTransition(); check = true;}
        }
    }
}

responsive(match);
match.addListener(responsive);