const contentText_page3 = document.getElementsByClassName('body__part-3__container__text');

for(let i = 0; i < contentText_page3.length; i++) {
    contentText_page3[i].style.transition = 'ease-in-out 0.4s';
    contentText_page3[i].style.opacity = 0;
}

var l = 0;

/*
const m = {
    curr: -1,
    prev: -1,
    pre_prev: -1
};


function moveDovn(i) {
    contentText_page3[i].style.transform = 'translateY(200%)';
}

function changeText(j, m) {
    m.curr = j;

    if(m.prev > -1 && m.prev < contentText_page3.length && m.prev != m.curr) {
        contentText_page3[m.prev].style.visibility = 'hidden';
        contentText_page3[m.prev].style.opacity = 0;
        contentText_page3[m.prev].style.transform = 'translateY(-200%)';
    }

    if(m.pre_prev> -1 && m.pre_prev < contentText_page3.length && m.pre_prev != m.curr && m.pre_prev != m.prev) {
        if(m.pre_prev == m.curr) m.pre_prev = m.prev;
        contentText_page3[m.pre_prev].style.transform = 'translateY(200%)';
    }

    contentText_page3[j].style.transform = 'translateY(0)';
    contentText_page3[j].style.visibility = 'visible';
    contentText_page3[j].style.opacity = 1;
    m.pre_prev = m.prev;
    m.prev = m.curr;
}
*/

function currentText(j) {
    for(let i = 0; i < contentText_page3.length; i++) {
        contentText_page3[i].style.visibility = 'hidden';
        contentText_page3[i].style.opacity = 0;
    }

    contentText_page3[j].style.visibility = 'visible';
    contentText_page3[j].style.opacity = 1;

}

$(document).ready(function() {
    $('.artwork-3_sparkling-element').on('click', function() {
        j = $('.artwork-3_sparkling-element').index(this);
        currentText(j);
    });
});

function auto() {
    currentText(l % contentText_page3.length);
    l++;
    setTimeout(auto, 10000);
}

auto();