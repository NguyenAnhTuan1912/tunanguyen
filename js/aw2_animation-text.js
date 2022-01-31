const contentText_page2 = document.getElementsByClassName("body__part-2__container__text");

var q = 0;

for(let i = 0; i < contentText_page2.length; i++) {
    contentText_page2[i].style.transition = 'ease-in-out 0.4s';
}

function changeText2(j) {
    for(let i = 0; i < contentText_page2.length; i++) {
        contentText_page2[i].style.opacity = 0;
        contentText_page2[i].style.visibility = 'hidden';
    }

    contentText_page2[j].style.opacity = 1;
    contentText_page2[j].style.visibility = 'visible';
}

function auto2() {
    changeText2(q % contentText_page2.length);
    q++;
    setTimeout(auto2, 8000);
}

auto2();