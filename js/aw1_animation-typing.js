const text1 = document.getElementById("aw1__text");
const text2 = document.getElementById("aw1__text-2");

text1.style.transition = 'ease-in-out 0.4s';
text2.style.transition = 'ease-in-out 0.4s';
var txt1 = "The Ancient Temple";
var i = 0;
function typing() {
    if(i < text1.textContent.length) {
        text1.innerHTML = text1.innerHTML.replace(text1.textContent[i], txt1.charAt(i));
        i++;
        setTimeout(typing, 90);
    }
}

window.addEventListener('load', function(event) {
    typing();
});
