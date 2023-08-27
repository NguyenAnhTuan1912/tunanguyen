import { Utils } from "../../utils/index.js";

let sliderContainerStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center"
};

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
  // Bởi vì slide đầu tiên là clone của slide cuối và slide thứ 2 mới thật sự là bắt đầu của slide.
  let index = 1;
  // maxIndex
  let maxSlidableIndex = undefined;
  let isSliding = false;
  let transitionTime = 400;
  let percent = undefined;
  let percentStart = undefined;
  let percentEnd = undefined;
  let maxSlidablePercent = undefined;
  let T = `${transitionTime / 1000}s ease-in-out`;

  let dec = 8;

  /**
   * @param {number} w
   * @param {number} boundary
   * @param {number} direction 
   */
  return function(w, boundary, direction = 1) {
    // Old
    // if(!last) last = -w;

    // New
    // boundary = length of slides
    if(!percent) percent = Utils.Number.round(w / boundary * 100, dec);
    if(!percentStart) percentStart = Utils.Number.round(w / boundary * 100 * -1, dec);
    if(!percentEnd) percentEnd = Utils.Number.round((boundary - (w * 2)) / boundary * 100 * -1, dec);
    if(!maxSlidablePercent) maxSlidablePercent = Utils.Number.round((boundary - w) / boundary * 100 * -1, dec);
    // Index tối đa mà slide có thể kéo tới, không phải là index của slide.
    if(!maxSlidableIndex) maxSlidableIndex = (Math.abs(boundary) / w) - 1;

    if(!isSliding) index -= direction;

    // Old
    // let X = last + (direction * w);
    // let _b = -(boundary - w);

    // New
    let percentMove = Utils.Number.round(percent * index * -1, dec);

    if(index === maxSlidableIndex) percentMove = maxSlidablePercent;

    // Trừ đi 2 slide ảo.
    // maxIndex = (Math.abs(_b) / w) - 2

    // console.log("Boundary: ", _b);
    // console.log("Current index: ", Math.abs(_b) / Math.abs(X));
    // console.log("Slide: ", index);
    // console.log("Number of slides: ", boundary / w);
    // console.log("Percent: ", percentMove);
    // console.log("Percent Start: ", percentStart);
    // console.log("Percent End: ", percentEnd);

    if(!element.style.transition) element.style.transition = T;

    // if(X >= _b && X <= 0 && !isSliding)
    if(percentMove >= maxSlidablePercent && percentMove <= 0 && !isSliding) {
      isSliding = true;
      element.style.transform = `translateX(${percentMove}%)`;
      
      if(percentMove === maxSlidablePercent) {
        setTimeout(() => {
          element.style.transition = "";
          element.style.transform = `translateX(${percentStart}%)`;
          // last = -w;
          isSliding = false;
        }, transitionTime);
        index = 1;
        return index;
      }

      if(percentMove === 0) {
        setTimeout(() => {
          element.style.transition = "";
          element.style.transform = `translateX(${percentEnd}%)`;
          // last = _b + w;
          isSliding = false;
        }, transitionTime);
        index = maxSlidableIndex - 1;
        return index;
      }

      setTimeout(() => {
        isSliding = false;
      }, transitionTime);
      // last = X;
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
  const container = Utils.Element.createElement("div", {
    className: "slider-container",
    style: sliderContainerStyle
  });
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
    currentSlideSpan.textContent = currentIndex;
  });
  nextBtn.addEventListener("click", () => {
    let currentIndex = translateX(_main.offsetWidth, _main.offsetWidth * (totalElement + 2), -1);
    currentSlideSpan.textContent = currentIndex;
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