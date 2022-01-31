const starfall = document.getElementsByClassName("artwork_starfall_bg");
const sparklingtemple = document.getElementsByClassName("artwork_sparkling_bg");
const button = document.getElementsByClassName("body__part-1__content__button");
var check = true;

button[0].style.color = '#262626';
button[1].style.color = '#E1E1E1';

button[0].style.transition = 'ease-in-out 0.4s';
button[1].style.transition = 'ease-in-out 0.4s';

button[0].addEventListener('click', function() {
    check = true;
    toggle();
});

button[1].addEventListener('click', function() {
    check = false;
    toggle();
});

function toggle() {
    if(check == true) {sparklingtemple[0].style.visibility = 'hidden'; starfall[0].style.visibility = 'visible'; button[0].style.color = '#262626'; button[1].style.color = '#E1E1E1';}
    else if(check == false) {sparklingtemple[0].style.visibility = 'visible'; starfall[0].style.visibility = 'hidden'; button[0].style.color = '#E1E1E1'; button[1].style.color = '#262626';}
}