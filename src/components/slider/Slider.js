import { Utils } from "../../utils/index.js";

let sliderStyle = {
  position: "relative",
  width: "100%",
  maxWidth: "960px",
  aspectRatio: "16 / 9",
  overflowX: "hidden"
};

let slideStyle = {
  float: "left",
  height: "100%",
  aspectRatio: "16 / 9",
  overflow: "hidden"
};

let sliderButtonsStyle = {
  width: "100%",
  maxWidth: "960px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center"
};

/**
 * Hàm này dùng để translate x một element nào đó bằng animation.
 * Với một lượng bằng với width của element đó.
 * @param {HTMLDivElement} element 
 */
const createTranslateXFn = function(element) {
  let last = undefined;
  let index = 0;
  let maxIndex = undefined;
  let isSliding = false;
  let transitionTime = 400;
  let T = `${transitionTime / 1000}s ease-in-out`;

  /**
   * @param {number} w
   * @param {number} boundary
   * @param {number} direction 
   */
  return function(w, boundary, direction = 1) {
    if(!last) last = -w;

    let X = last + (direction * w);
    let _b = -(boundary - w);

    // Trừ đi một slide ảo, trừ luôn 1 nữa mới về đúng index thật (zero-based).
    if(!maxIndex) maxIndex = (Math.abs(_b) / w) - 2;

    // console.log("X: ", X);
    // console.log("Boundary: ", _b);
    // console.log("Current index: ", Math.abs(_b) / Math.abs(X));

    if(!element.style.transition) element.style.transition = T;

    if(X >= _b && X <= 0 && !isSliding) {
      isSliding = true;
      element.style.transform = `translateX(${X}px)`;
      index += -direction;
      
      if(X === _b) {
        setTimeout(() => {
          element.style.transition = "";
          element.style.transform = `translateX(${-w}px)`;
          last = -w;
          isSliding = false;
        }, transitionTime);
        index = 0;
        return index;
      }

      if(X === 0) {
        setTimeout(() => {
          element.style.transition = "";
          element.style.transform = `translateX(${_b + w}px)`;
          last = _b + w;
          isSliding = false;
        }, transitionTime);
        index = maxIndex;
        return index;
      }

      setTimeout(() => {
        isSliding = false;
      }, transitionTime);
      last = X;
    }
    return index;
  }
};

/**
 * 
 * @param {Array<HTMLElement>} elements
 * @returns 
 */
export function Slider(elements) {
  let totalElement = elements.length;
  const container = Utils.Element.createElement("div", { className: "slider-container" });
  const _main = Utils.Element.createElement("div", {
    className: "slider mb-4",
    style: sliderStyle
  });
  const slidesElement = Utils.Element.createElement("div", {
    className: "slides",
    style: { width: `${totalElement + 2}00%`, height: "100%", transition: "0.4s ease-in-out" }
  });
  const sliderButtons = Utils.Element.createElement("div", {
    className: "slider-button",
    style: sliderButtonsStyle,
    content: `
      <button class="btn p-1" id="prevBtn"><span class="material-symbols-outlined">keyboard_arrow_left</span></button>
      <h3><span id="currentSlideSpan"></span> / <span id="totalSlideSpan"></span></h3>
      <button class="btn p-1" id="nextBtn"><span class="material-symbols-outlined">keyboard_arrow_right</span></button>
    `
  });
  const prevBtn = sliderButtons.querySelector("#prevBtn");
  const nextBtn = sliderButtons.querySelector("#nextBtn");
  const currentSlideSpan = sliderButtons.querySelector("#currentSlideSpan");
  const totalSlideSpan = sliderButtons.querySelector("#totalSlideSpan");

  currentSlideSpan.textContent = 1;
  totalSlideSpan.textContent = totalElement;

  let translateX = createTranslateXFn(slidesElement);

  prevBtn.addEventListener("click", () => { 
    let currentIndex = translateX(_main.offsetWidth, _main.offsetWidth * (totalElement + 2), 1);
    currentSlideSpan.textContent = currentIndex + 1;
  });
  nextBtn.addEventListener("click", () => {
    let currentIndex = translateX(_main.offsetWidth, _main.offsetWidth * (totalElement + 2), -1);
    currentSlideSpan.textContent = currentIndex + 1;
  });

  let slides = [];
  let clones = [];
  let N = -1;

  for(let element of elements) {
    let slide = Utils.Element.createElement("div", {
      className: "slide",
      style: slideStyle
    });
    slide.append(element);
    slides.push(slide);
    N++;
  };

  clones[0] = slides[0].cloneNode(true);
  clones[N] = slides[N].cloneNode(true);

  slidesElement.append(clones[N], ...slides, clones[0]);
  slidesElement.style.transform = `translateX(${100 / (totalElement + 2) * -1}%)`;

  _main.append(slidesElement);

  container.append(_main, sliderButtons);

  return container;
}