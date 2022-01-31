var dot = document.getElementsByClassName("indexdot__containner__dot");
var pageName = document.getElementsByClassName("footer__text__container__name");
const sy = window.innerHeight;

function dotActive(n) {
    for(let i = 0; i < dot.length; i++) {
        dot[i].className = dot[i].className.replace(" dot--active", "");
    }
    dot[n].className += " dot--active";
}


$(document).ready(function() {
    dotActive(0);
    pageName[0].innerHTML = "The Ancient Temple";
    $(window).on('scroll', function(event) {
        if(window.scrollY >= 0 && window.scrollY < sy) {
            dotActive(0);
            pageName[0].innerHTML = "The Ancient Temple";
        }
        if(window.scrollY >= sy && window.scrollY < sy * 2) {
            dotActive(1);
            pageName[0].innerHTML = "About me";
        }
        if(window.scrollY >= sy * 2) {
            dotActive(2);
            pageName[0].innerHTML = "The Strange Planet";
        }
    });

    $(".indexdot__containner__dot").on('click', function(event) {
        var nameID = "#body_" + this.value;
        $('html, body').animate({
            scrollTop: $(nameID).offset().top
        }, 800, function(){
            nameID = "";
        });
    });
});