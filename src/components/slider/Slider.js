import { Utils } from "../../utils/index.js";

let sliderStyle = {
  position: "relative",
  width: "100%",
  maxWidth: "960px",
  aspectRatio: "16 / 9",
  overflow: "hidden"
};

let slideStyle = {
  float: "left",
  height: "100%",
  aspectRatio: "16 / 9",
};

let sliderButtonsStyle = {
  position: "absolute",
  width: "100%",
  maxWidth: "960px",
  display: "flex",
  justifyContent: "space-between",
  top: "50%",
  transform: "translateY(-50%)",
  zIndex: 2
};

/**
 * Hàm này dùng để translate x một element nào đó bằng animation.
 * Với một lượng bằng với width của element đó.
 */
const translateX = (function() {
  let last = 0;
  /**
   * @param {HTMLDivElement} element 
   * @param {number} w
   * @param {number} boundary
   * @param {number} direction 
   */
  return function(element, w, boundary, direction = 1) {
    let amount = last + (direction * w);
    let _b = -(boundary);
    console.log("Amount: ", amount);
    console.log("Boundary: ", _b);
    if(amount > _b && amount < 0) {
      element.animate(
        [
          { transform: `translateX(${last}px)` },
          { transform: `translateX(${amount}px)` }
        ],
        {
          duration: 400,
          fill: "forwards",
          easing: "ease-in-out"
        }
      );
      last = amount;
    }
  }
})();
export function Slider(elements) {
  let _main = Utils.Element.createElement("div", {
    className: "slider",
    style: sliderStyle
  });
  let slidesElement = Utils.Element.createElement("div", {
    className: "slides",
    style: { width: `${elements.length}00%`, height: "100%" }
  });
  let sliderButtons = Utils.Element.createElement("div", {
    className: "slider-button",
    style: sliderButtonsStyle,
    content: `
      <button class="btn p-1" id="prevBtn"><span class="material-symbols-outlined">keyboard_arrow_left</span></button>
      <button class="btn p-1" id="nextBtn"><span class="material-symbols-outlined">keyboard_arrow_right</span></button>
    `
  });
  let prevBtn = sliderButtons.querySelector("#prevBtn");
  let nextBtn = sliderButtons.querySelector("#nextBtn");

  prevBtn.addEventListener("click", () => { translateX(slidesElement, _main.offsetWidth, _main.offsetWidth * elements.length, 1) });
  nextBtn.addEventListener("click", () => { translateX(slidesElement, _main.offsetWidth, _main.offsetWidth * elements.length, -1) });

  let slides = [];

  for(let element of elements) {
    let slide = Utils.Element.createElement("div", {
      className: "slide",
      style: slideStyle
    });
    slide.append(element);
    slides.push(slide);
  }

  slidesElement.append(...slides);

  _main.append(slidesElement, sliderButtons);

  return _main;
}