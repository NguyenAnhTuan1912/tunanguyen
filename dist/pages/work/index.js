import { createModal } from 'https://unpkg.com/tunangn-html-modal@1.6.3/dist/index.js';

/**
 * @typedef CreateElementOptions
 * @property {string | undefined} className
 * @property {string | undefined} id
 * @property {string | undefined} content
 * @property {any} style
 * @property {{[key in keyof HTMLElementEventMap]: (e: any) => void} | undefined} eventListeners
 */

class Utils {
  static Assets = {
    DriveFileNames: {
      CV_ENG: "END-[CV] NGUYEN ANH TUAN.pdf"
    }
  }

  static Element = {
    /**
     * Phương thức này sẽ chuyển chuỗi html sang một element.
     * @param {string} html 
     */
    toElement(html) {
      let div = document.createElement("div");
      div.innerHTML = html;
      return div.children[0];
    },

    /**
     * Phương thức này dùng để build một HTMLElement
     * @param {keyof HTMLElementTagNameMap} type
     * @param {CreateElementOptions | undefined} options
     */
    createElement(type, options) {
      let element = document.createElement(type);

      if(options) {
        if(options.className) element.classList.add(...options.className.split(" "));
        if(options.id) element.id = options.id;
        if(options.content) element.innerHTML = options.content;
        if(options.style) {
          let _style = options.style;
          for(let key in _style) if(_style[key] !== undefined || _style[key] !== null) element.style[key] = _style[key];
        }        if(options.eventListeners) {
          let _listeners = options.eventListeners;
          for(let key in _listeners)
            element.addEventListener(key, _listeners[key]);
        }      }

      return element;
    }
  }

  static Number = {
    /**
     * Dùng để tạo một số bất kì từ `min` tới `max`
     * @param {number} max 
     * @param {number} min 
     * @returns 
     */
    getRandomNumber(max, min) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    /**
     * Dùng để làm tròn đến số thập phân thứ `dec` nào đó.
     * @param {number} n 
     * @param {number} dec 
     * @returns 
     */
    round(n, dec) {
      let _ = Math.pow(10, dec);
      return Math.round(n * _) / _;
    }
  }

  static Other = {
    /**
     * Use to run a `cb` (perform an action) in `timeout` milisecond.
     * @param {*} cb 
     * @param {*} timeout 
     * @returns 
     */
    wait(cb, timeout) {
      return new Promise(r => {
        setTimeout(() => r(cb()), timeout);
      });
    },

    createMediaBreakPoint(firstPoint, secondPoint, options) {
      options = Object.assign(
        {
          shouldQueryWithMinIncreaseByOne: true,
          canQueryWithMax: false
        },
        options
      );
    
      let increaseBy = options.shouldQueryWithMinIncreaseByOne ? 1 : 0;
      if(secondPoint) return `(min-width: ${firstPoint + increaseBy}px) and (max-width: ${secondPoint}px)`;
      if(options.canQueryWithMax) return `(max-width: ${firstPoint}px)`;
      return `(min-width: ${firstPoint + increaseBy}px)`;
    },

    /**
     * Use to trace the change of screen's size to perform some action.
     * Receive:
     * - Points: is an array contains 1 - 2 break point(s).
     * - CallBack: to perform the action.
     * 
     * @param {Array<number>} points
     * @param {(match: string) => void} cb
     */
    responsive(points, cb) {
      let mqls = [];
      let mqlListeners = [];
      let N = points.length;

      let that = Utils.Other;

      for(let i = 0; i < N; i++) {
        let range = `[${points[i - 1] + 1},${points[i]}]`;
        let mediaBP = that.createMediaBreakPoint(points[i - 1], points[i]);
        let mediaQueryList = window.matchMedia(mediaBP);

        if(i === 0) {
          range = `[,${points[i]}]`;
          mediaBP = that.createMediaBreakPoint(points[i], undefined, {canQueryWithMax: true});
          mediaQueryList = window.matchMedia(mediaBP);
        }
        let listener = function(e) {
          if(mediaQueryList.matches) cb(range);
        };

        mediaQueryList.addEventListener("change", listener);

        mqls.push(mediaQueryList);
        mqlListeners.push(listener);

        listener();

        if(i === N - 1) {
          let range = `[${points[i]},]`;
          let mediaBP = that.createMediaBreakPoint(points[i] + 1, undefined);
          let mediaQueryList = window.matchMedia(mediaBP);

          listener = function(e) {
            if(mediaQueryList.matches) cb(range);
          };
          
          mediaQueryList.addEventListener("change", listener);
          
          mqls.push(mediaQueryList);
          mqlListeners.push(listener);

          listener();
        }
      }

      return function() {
        mqlListeners.forEach((listener, index) => {
          mqls[index].removeEventListener('change', listener);
        });
      }
    }
  }
  
  static Fn = {
    /**
     * @param {() => void} callWhenOn
     * @param {() => void} callWhenOff
     */
    getToggleFn(callWhenOn, callWhenOff) {
      let check = false;

      return function() {
        if(check) { callWhenOn(); check = false; return; }
        callWhenOff();
        check = true;
      }
    }
  }
}

const html$1 = `
  <div class="header">
    <div class="header__logo">
      <div class="header__logo__container"><img src="image/logo/logo.svg" alt="" class="header__logo-svg" id="logo"></div>
    </div>
    <div class="header__name">
      <div class="header__name__container"><a href="/"><p>tunanguyen</p></a></div>
    </div>
    <div class="header__navigate">
      <div class="header__navigate__container">
        <ul class="header__navigate__row-1">
          <li class="header__navigate__row-1__col px-1">
            <a target="_blank" href="work.html" class="txt-clr-onBackground">Work</a>
          </li>
          <li class="header__navigate__row-1__col px-1">
            <a target="_blank" href="mycv.html" class="txt-clr-onBackground">My CV</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
  `;

function Header() {
  const _main = Utils.Element.toElement(html$1);
  const menu = _main.getElementsByClassName("header__navigate__row-1");
  const logo = _main.getElementsByClassName("header__logo-svg");
  const li = _main.getElementsByClassName("header__navigate__row-1__col");

  const listTransition = function() {
    for(let i = 0; i < li.length; i++) {
      li[i].style.transform = 'translateX(150%)';
      //li[i].style.display = 'none';
      li[i].style.opacity = 0;
    }
  };
  
  const listMove = function() {
    for(let i = 0; i < li.length; i++) {
      li[i].style.transform = 'translateX(0)';
      //li[i].style.display = 'block';
      li[i].style.opacity = 1;
    }
  };

  const toggleListAnimate = Utils.Fn.getToggleFn(
    listMove,
    listTransition
  );

  let handleLogoClick = function(e) {
    toggleListAnimate();
  };

  Utils.Other.responsive([600, 1920], (range) => {
    if(range === "[,600]") {
      menu[0].className += " navigate--flex";
      logo[0].addEventListener("click", handleLogoClick);
    }
    
    if(range === "[601,1920]") {
      logo[0].removeEventListener("click", handleLogoClick);
    }
  });

  return _main;
}

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
function Slider(elements) {
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
  }
  clones[0] = slides[0].cloneNode(true);
  clones[N] = slides[N].cloneNode(true);

  slidesElement.append(clones[N], ...slides, clones[0]);
  slidesElement.style.transform = `translateX(${100 / (totalElement + 2) * -1}%)`;

  _main.append(slidesElement);

  container.append(_main, sliderButtons);

  return container;
}

const workDetailsName = "workDetailsDialog";

/**
 * @typedef WorkProps
 * @property {string} name
 * @property {string} avtLink
 * @property {string} type
 * @property {{short: string, long: string}} desc
 * @property {Array<string>} tags
 * @property {Array<string>} imgLinks
 * @property {Array<string>} links
 * @property {number} startDate
 * @property {number} endDate
 * @property {number} updatedAt
 */

/**
 * 
 * @param {*} close 
 * @param {*} item 
 * @param {*} utils 
 */
function WorkDetailsDialog(close, item, utils) {
  /**
   * @type {WorkProps}
   */
  let data = item.getData();
  let [githubLink, npmLink, ...otherLinks] = data.links;
  let tags = data.tags.join(", ");
  otherLinks = otherLinks.map(link => link.split("::"));

  let container = Utils
    .Element
    .createElement("div", {
      className: "work-details p-4",
      style: utils.getContainerStyle({ borderRadius: 0, boxShadow: null, width: "90%", maxHeight: "90vh", maxWidth: "780px" })
    });

  // Close button
  let closeBtnContainer = Utils.Element.createElement("div", {
    className: "work-details-close-btn py-1"
  });
  let closeBtn = Utils.Element.createElement("button", {
    className: "btn btn-close",
    content: `<span class="material-symbols-outlined">close</span>`,
    eventListeners: {
      "click": close
    }
  });
  
  // Body
  let body = Utils.Element.createElement("div", {
    content: `
      <div class="mb-2">
        <h1>${data.name}</h1>
        <div>
          <h2>Information</h2>
          <p><strong>Time:</strong> ${(new Date(data.startDate)).toLocaleDateString()} - ${(new Date(data.endDate)).toLocaleDateString()}</p>
          <p><strong>Type:</strong> <span class="txt-clr-error">${data.type}</span></p>
          <p><strong>Tags:</strong> ${tags}</p>
        </div>
        <div class="mt-1">
          <h2>Links</h2>
          <p><strong>Github:</strong> ${githubLink ? `<a href="${githubLink}" target="_blank">${githubLink}</a>` : "Not yet"}</p>
          <p><strong>NPM:</strong> ${npmLink ? `<a href="${npmLink}" target="_blank">${npmLink}</a>` : "Not yet"}</p>
        </div>
        <div class="mt-1" id="linksContainer">
          <h2>Other links</h2>
        </div>
      </div>
      <div class="work-details-images mb-4">
        <h2>Images</h2>
      </div>
      <div>
        <h2>Description</h2>
        <p class="description-content">${data.desc.long}</p>
      </div>
    `,
    className: "work-details-body"
  });
  let workDetailsImages = body.querySelector(".work-details-images");
  let imageElements = [Utils.Element.toElement(`<img src="${data.avtLink}" class="work-details-image" />`)];
  let linksContainer = body.querySelector("#linksContainer");

  otherLinks.forEach(link => {
    if(link[1]) 
      linksContainer
      .appendChild(
        Utils.Element.toElement(
          `<p><strong>${link[0]}:</strong> <a href="${link[1]}" target="_blank">${link[1] ? link[1] : "Not yet"}</a></p>`
        ));
  });

  for(let imgLink of data.imgLinks) {
    let imageElement = Utils.Element.toElement(`<img src="${imgLink}" class="work-details-image" />`);
    imageElements.push(imageElement);
  }

  // Append closeBtn
  closeBtnContainer.append(closeBtn);

  // Append work details image
  workDetailsImages.append(Slider(imageElements));

  // Append first.
  container.append(closeBtnContainer, body);

  return container;
}

function disableScroll() {
  document.body.style.overflow = "hidden";
}
function enableScroll() {
  document.body.style.overflow = "auto";
}

const open = createModal({
  items: [
    {
      name: workDetailsName,
      type: "dialog",
      components: WorkDetailsDialog
    }
  ]
});

async function openWorkDetailsDialog(data) {
  disableScroll();
  let result = await open(workDetailsName, data);
  enableScroll();
  return result;
}

/**
 * @typedef ComponentOptions
 * @property {boolean} isHTML
 */

/**
 * @typedef CardDataProps
 * @property {string} name
 * @property {string} avtLink
 * @property {{long: string, short: string}} desc
 * @property {string} type
 * @property {string} links
 * @property {Array<string>} tags
 */

function createLink(name, link) {
  let html = `<p class="mt-1">${name}: <a class="fw-bold" href="${link}" target="_blank">here</a></p>`;
  return Utils.Element.toElement(html);
}

/**
 * 
 * @param {ComponentOptions & CardDataProps} props 
 * @returns 
 */
function ProjectCard(props) {
  const tags = props.tags.join(", ");

  const html = `
    <div class="project-card">
      <div class="project-card-header">
        <img src="${props.avtLink}" alt="No Image" />
      </div>
      <div class="project-card-content p-1">
        <h5 class="project-card-tags mb-1" id="tags">
          ${tags}
        </h5>
        <h2 class="project-card-name">${props.name}</h2>
        <p class="project-card-desc">${props.desc.short}</p>
        <p class="txt-clr-primary" style="cursor: pointer" id="readmoreBtn">Read more</p>
        <div class="project-card-links"></div>
      </div>
    </div>
  `;

  if(props?.isHTML) return html;

  const _main = Utils.Element.toElement(html);
  const readmoreBtn = _main.querySelector("#readmoreBtn");
  const pcl = _main.querySelector(".project-card-links");

  readmoreBtn.addEventListener("click", () => {
    openWorkDetailsDialog(props);
  });

  if(props.links[0]) pcl.append(createLink("Github", props.links[0]));
  if(props.links[1]) pcl.append(createLink("NPM", props.links[1]));

  return _main;
}

function Loading() {
  let _main = Utils.Element.createElement("div", {
    style: {
      width: "100%",
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center"
    },
    content: `<h1 id="loadingTxt">Loading</h1><p class="mt-1">Please, wait a few second.</p>`
  });
  let loadingTxt = _main.querySelector("#loadingTxt");

  let _loop = 4;
  let _i = 0;
  let _interval = setInterval(() => {
    let text = "Loading" + ".".repeat(_i % _loop);
    loadingTxt.textContent = text;
    _i++;
  }, 500);

  return [_main, _interval];
}

/**
 * Phương thức này dùng để lấy Base URL cho API.
 * @param {boolean} isDev 
 * @returns 
 */
function getBaseURL(isDev = false, isAPI = true) {
  let baseUrl = {
    dev: "http://localhost:3000",
    prod: "https://tunanguyen-api.vercel.app"
  };
  let api = isAPI ? "/api" : "";
  return (isDev ? baseUrl.dev : baseUrl.prod) + api;
}

const APIUtils = {
  getBaseURL
};

const base = {
  work: APIUtils.getBaseURL() + "/work",
  works: APIUtils.getBaseURL() + "/works"
};

function getWorksAsync(limit, skip, query) {
  return fetch(base.works).then(res => res.json());
}

/**
 * Object này chứa các hàm call api cho work.
 */
const WorkCallers = {
  getWorksAsync
};

/**
 * Dùng function này để PING tới server.
 * @returns 
 */
async function PING(isDev = false) {
  let url = APIUtils.getBaseURL(isDev, false);
  return fetch(url).then(res => res.json());
}

/**
 * Dùng để lấy thông tin files trong một folder nào đó.
 * @param {string} name 
 * @param {keyof KnownDriveFolder} knownDriveFolder 
 */
async function getSavedDriveFilesInforAsync(name) {
  let url = APIUtils.getBaseURL() + `/drive/saved/file?name=${name}`;
  return fetch(url).then(res => res.json());
}

async function getDriveFileInforAsync(name, alt = "media") {
  let url = APIUtils.getBaseURL() + `/drive/file?name=${name}&alt=${alt}`;
  return fetch(url).then(res => res.json());
}

/**
 * Some others callers
 */
const OtherCallers = {
  PING,
  getSavedDriveFilesInforAsync,
  getDriveFileInforAsync
};

const html = {
  Body: `
    <div class="project">
      <div>
        <h1 class="txt-center mb-4">My works</h1>
        <p class="txt-center mb-1">Total: <span class="fw-bold" id="totalWork">0</span></p>
        <div class="project-cards-container" id="work">
        </div>
      </div>
    </div>
  `
};

class Project {
  /**
   * @type {HTMLElement}
   */
  static Container;

  static animationCallBacks = [];

  static components = {
    Body: function() {
      const _main = Utils.Element.toElement(html.Body);
      const workContainer = _main.querySelector("#work");

      const totalWorkSpan = _main.querySelector("#totalWork");

      let count = 0;

      WorkCallers
        .getWorksAsync()
        .then(payload => {
          let works = payload.data;
          for(let work of works) {
            workContainer.append(ProjectCard(work));
            count++;
          }
          totalWorkSpan.textContent = count;
        });

      return _main;
    }
  };

  static render() {
    document.addEventListener("DOMContentLoaded", () => {
      let [ element, interval ] = Loading();
      Project.Container = document.getElementById("root");
      Project.Container.append(element);

      OtherCallers.PING()
      .then(() => {
        Project.Container.innerHTML = "";
        clearInterval(interval);

        Project.Container.append(
          Header(),
          // SocialMedia(),
          Project.components.Body()
        );
      });
    });
  }
}

Project.render();
