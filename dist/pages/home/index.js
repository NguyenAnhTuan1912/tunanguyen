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

const html = `
  <div class="socialmedia">
    <div class="socialmedia__containner">
      <a target="_blank" href="https://github.com/NguyenAnhTuan1912" class="fa fa-github"></a>
      <a target="_blank" href="https://www.facebook.com/tunanguyen19" class="fa fa-facebook"></a>
      <a target="_blank" href="https://www.instagram.com/tunangu.yen" class="fa fa-instagram"></a>
      <a target="_blank" href="https://www.behance.net/tngnguyn55" class="fa fa-behance"></a>
    </div>
  </div>
`;

function SocialMedia() {
  return Utils.Element.toElement(html);
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

const HTML = {
  Body: `
  <div class="body">
    <div class="body__part body__part-1" id="body_1">
      <div class="body__part-1__midground" style="display: flex; align-items: center;">
        <div class="body__part-1__midground__artwork">
          <img src="image/svg/temple_body-01.svg" alt="" class="artwork-svg" style="position: absolute;">
          <img src="image/svg/temple_head-01.svg" alt="" class="artwork-svg" style="position: absolute;">
          <div class="artwork_effect" style="position: relative; display: flex; align-items: center; justify-content: center;">
            <p style="display: flex; justify-content: center; align-items: center;">
              <span class="dot--animate" style="position: absolute;"></span>
              <span class="dot" style="position: absolute;"></span>
            </p>

            <div class="artwork_starfall_bg" style="position: absolute; transform: rotateZ(150deg); overflow: hidden;">
              <div class="artwork_starfall-element"></div>
              <div class="artwork_starfall-element"></div>
              <div class="artwork_starfall-element"></div>
              <div class="artwork_starfall-element"></div>
              <div class="artwork_starfall-element"></div>
            </div>
            <div class="artwork_sparkling_bg" style="position: absolute; visibility: hidden;">
              <img src="image/svg/sparkling star.svg" class="artwork_sparkling-element"></img>
              <img src="image/svg/sparkling star.svg" class="artwork_sparkling-element"></img>
              <img src="image/svg/sparkling star.svg" class="artwork_sparkling-element"></img>
              <img src="image/svg/sparkling star.svg" class="artwork_sparkling-element"></img>
              <img src="image/svg/sparkling star.svg" class="artwork_sparkling-element"></img>
              <img src="image/svg/sparkling star.svg" class="artwork_sparkling-element"></img>
            </div>
          </div>
        </div>
      </div>
      <div class="body__part-1__content">
        <div class="body__part-1__container__text">
          <p class="body__part-1__text fw-bold" id="aw1__text">1%s )a=@#bd u1$%1g</p>
          <p class="body__part-1__text" id="aw1__text-2"></p>
        </div>
        <div class="body__part-1__content__toggle__button">
          <p class="body__part-1__content__button">Falling Stars</p>
          <p class="body__part-1__content__slash">/</p>
          <p class="body__part-1__content__button">Sparkling Temple</p>
        </div>
      </div>
    </div>

    <div class="body__part body__part-2" id="body_2">
      <div class="body__part-2__content-mid">
        <div class="body__part-2__container__text-mid">
          <p class="body__part-2__text-mid fw-bold">TUNA NGUYEN</p>
        </div>
      </div>
      <div class="body__part-2__midground" style="display: flex; align-items: center;">
        <div class="body__part-2__midground__artwork">
          <img src="image/svg/CHARACTER-01.svg" alt="" class="artwork-2-svg" style="position: absolute;">
          <img src="image/svg/L_eye-01.svg" alt="" class="artwork-2-svg" style="position: absolute;">
          <img src="image/svg/R_eye-01.svg" alt="" class="artwork-2-svg" style="position: absolute;">
        </div>
      </div>
      <div class="body__part-2__content">
        <div class="body__part-2__container__text">
          <p class="body__part-2__text"></p>
        </div>
      </div>
    </div>

    <div class="body__part body__part-3" id="body_3">
      <div class="body__part-3__content p-1">
        <p class="body__part-3__title fw-bold">My skills</p>
        <div id="skillsContainer"><h1 style="text-align: center" class="my-2">Loading...</h1></div>
      </div>
    </div>

    <div class="body__part body__part-4" id="body_4">
      <div class="body__part-4__midground" style="display: flex; align-items: center;">
        <div class="body__part-4__midground__artwork">
          <video autoplay="autoplay" loop="loop" muted defaultMuted playsinline  oncontextmenu="return false;"  preload="auto" style="pointer-events: none; position: absolute;">
            <source src="https://res.cloudinary.com/dhqgfphiy/video/upload/v1690968932/portfolio/video/WEB_ARTWORK_TWO_w7rzrv.mp4" type="video/mp4">
          </video>
          <canvas class="body__part-4__midground__artwork__planets" id="planetsAroundCV"></canvas>

          <div class="artwork-3_effect" style="position: relative; display: flex; align-items: center; justify-content: center;">
            <span class="dot--animate" style="position: absolute;"></span>
            <span class="dot--animate" style="position: absolute;"></span>
            <span class="dot--animate" style="position: absolute;"></span>

            <div class="artwork-3_sparkling_bg" style="position: absolute;">
              <img src="image/svg/sparkling star.svg" class="artwork-3_sparkling-element" value="1"></img>
              <img src="image/svg/sparkling star.svg" class="artwork-3_sparkling-element" value="2"></img>
              <img src="image/svg/sparkling star.svg" class="artwork-3_sparkling-element" value="3"></img>
              <img src="image/svg/sparkling star.svg" class="artwork-3_sparkling-element" value="4"></img>
              <img src="image/svg/sparkling star.svg" class="artwork-3_sparkling-element" value="5"></img>
            </div>
          </div>
        </div>
      </div>
      <div class="body__part-4__content">
        <div class="body__part-4__container__text" style="position: absolute; visibility: visible;">
          <p class="body__part-4__text" id="aw3__text-1" style="text-align: center; padding: 0 10px;"></p>
        </div>
      </div>
    </div>
  </div>
  `,
  IndexDots: `
  <div class="indexdot">
    <div class="indexdot__containner">
        <ul>
            <li class="indexdot__containner__dot" value="1"></li>
            <li class="indexdot__containner__dot" value="2"></li>
            <li class="indexdot__containner__dot" value="3"></li>
            <li class="indexdot__containner__dot" value="4"></li>
        </ul>
    </div>
  </div>
  `,
  Footer: `
  <div class="footer">
    <div class="footer__name">
      <div class="footer__name__container"><p class="footer__name__container__name">Nguyen Anh Tuan</p></div>
    </div>
    <div class="footer__information-output"></div>
    <div class="footer__text">
      <div class="footer__text__container">
        <p class="footer__text__container__name"></p>
      </div>
    </div>
  </div>
  `
};

class Ball {
  /**
   * 
   * @param {{x: number, y: number, dx: number, radius: number, cv: HTMLCanvasElement}} options 
   */
  constructor(options) {
    this.x = options.x;
    this.y = options.y;
    this.dx = options.dx;
    this.radius = options.radius;
    this.cv = options.cv;
    this.ddContext = options.cv.getContext("2d");

    this.draw = this.draw.bind(this);
    this.update = this.update.bind(this);
  }

  draw() {
    this.ddContext.beginPath();
    this.ddContext.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    this.ddContext.strokeStyle = "#262626";
    this.ddContext.stroke();
    this.ddContext.fillStyle = '#fff';
    this.ddContext.fill();
  }

  update() {
    this.x += this.dx;
    if(this.x + this.radius > this.cv.width) {this.x = this.radius;}
    if(this.x - this.radius < 0) {this.x = this.cv.width - this.radius;}
    this.draw();
  }
}

/**
 * @typedef AnimationTextTypingOptions
 * @property {number} timeout
 */

/**
 * @typedef AnimationTextShowContinouslyOptions
 * @property {number} intervalTime
 * @property {boolean} canUseInnerHTML
 * @property {boolean} canClick
 * @property {(keyframes: Keyframe[] | PropertyIndexedKeyframes | null, options?: number | KeyframeAnimationOptions | undefined) => void} runAnimation
 */

class Animation {
  static Text = {
    /**
     * Use to typing animation.
     * @param {HTMLElement} txtElement 
     * @param {string} alternate
     * @param {AnimationTextTypingOptions} options
     */
    async replace(txtElement, alternate, options) {
      try {
        if(!txtElement.textContent === undefined) throw new Element("Element must support textContent property.");
        if(txtElement.textContent.length !== alternate.length) throw new Element("Original text and alternate text must have the same length.");

        let N = txtElement.textContent.length;

        options = Object.assign(
          {
            timeout: 90
          },
          options
        );

        for(let i = 0; i < N; i++) {
          let c = await Utils.Other.wait(
            () => {
              return txtElement.textContent.replace(
                txtElement.textContent[i],
                alternate.charAt(i)
              );
            },
            options.timeout
          );

          txtElement.textContent = c;
        }
      } catch (error) {
        console.error("Animation Error: ", error.message);
      }
    },

    /**
     * Use to show continously an array of text in an Element. Return a clear interval function.
     * @param {HTMLElement} txtElement 
     * @param {Array<string>} texts 
     * @param {AnimationTextShowContinouslyOptions} options
     */
    showContinously(txtElement, texts, options) {
      try {
        if(
          !txtElement.textContent === undefined
          || !txtElement.innerHTML === undefined
        ) throw new Error("Element must support textContent or innerHTML property.");
        
        options = Object.assign(
          {
            intervalTime: 5000,
            canUseInnerHTML: false,
            canClick: true,
            runAnimation: function() {
              let keyframes = [
                {
                  opacity: 0
                },
                {
                  opacity: 1
                }
              ];

              let options = { duration: 400, easing: "ease-in-out" };

              txtElement.animate(keyframes, options);
            }
          },
          options
        );

        let i = 1;
        let N = texts.length;
        let show = function() {
          let currentText = texts[i % N];
          if(options.canUseInnerHTML) {
            txtElement.innerHTML = currentText;
          } else {
            txtElement.textContent = currentText;
          };

          options.runAnimation();

          i++;
          if(i > N - 1) i = 0;
        };

        if(options.canUseInnerHTML) {
          txtElement.innerHTML = texts[0];
        } else {
          txtElement.textContent = texts[0];
        }

        if(options.canClick) {
          txtElement.addEventListener("click", () => show());
        }

        let _ = setInterval(() => {
          show();
        }, options.intervalTime);

        return function() { clearInterval(_); }

      } catch (error) {
        console.error("Animation Error: ", error.message);
      }
    }
  }

  static Canvas = {
    /**
     * Use to animate balls in an canvas element.
     * @param {HTMLCanvasElement} cv 
     */
    ballFly(cv) {
      try {
        if(!cv) throw new Error("Canvas element not found!!!");

        cv.width = 290;
        cv.height = 290;

        Utils.Other.responsive([600], (range) => {
          if(range === "[,600]") {
            cv.width = innerWidth * 0.5;
            cv.height = innerWidth * 0.5;
          };
        });

        const context = cv.getContext("2d");
        const balls = [];
        const size = {
          x: cv.width,
          y: cv.height
        };

        const initBall = function() {
          for(let i = 0; i < 5; i++) {
            let radius = Utils.Number.getRandomNumber(12, 10);
            let x = Utils.Number.getRandomNumber(size.x - radius, 10 + radius);
            let y = Utils.Number.getRandomNumber(-50, 50);
            let dx = Utils.Number.getRandomNumber(4, 1);
            balls.push(new Ball({x, y: size.y / 2 + y, dx, radius, cv}));
          }

          for(let i = 0; i < 5; i++) {
            let radius = Utils.Number.getRandomNumber(size.x * 0.05, size.x * 0.04);
            let x = Utils.Number.getRandomNumber(size.x - radius, 10 + radius);
            let y = Utils.Number.getRandomNumber(-50, 50);
            let dx = Utils.Number.getRandomNumber(1, 4);
            balls.push(new Ball({x, y: size.y / 2 + y, dx: -dx, radius, cv}));
          }
        };

        initBall();

        const animate = function() {
          requestAnimationFrame(animate);
          context.clearRect(0, 0, size.x, size.y);
          for(let i = 0; i < 10; i++) {
            balls[i].update();
          }
        };

        animate();
      } catch (error) {
        console.error("Animation Error: ", error.message);
      }
    }
  }
}

/**
 * Dùng để tạo một list có hoặc không có title.
 * @param {{name: string, values: Array<string>}} data
 * @param {{isBullet: boolean} | undefined} options
 */
function createList(data, options) {
  if(!options) options = { isBullet: true };
  else options = Object.assign({ isBullet: true }, options);

  let container = Utils.Element.createElement("div", {
    className: "mt-1",
    content: `<p class="fw-bold">${data.name}</p>`
  });
  let listHTML = `<ul></ul>`;
  let list;

  if(!options.isBullet) listHTML = `<ol></ol>`;

  list = Utils.Element.toElement(listHTML);

  for(let value of data.values) {
    list.append(Utils.Element.toElement(`<li>${value}</li>`));
  }

  container.append(list);

  return container;
}

class Home {
  /**
   * @type {HTMLElement}
   */
  static Container;

  static animationCallBacks = [];

  static components = {
    Body() {
      const _main = Utils.Element.toElement(HTML.Body);

      const starfall = _main.getElementsByClassName("artwork_starfall_bg");
      const sparklingtemple = _main.getElementsByClassName("artwork_sparkling_bg");
      const button = _main.getElementsByClassName("body__part-1__content__button");
      const introductionText = _main.querySelector("#aw1__text");
      const text2 = _main.querySelector("#aw1__text-2");
      const bodyPart2Text = _main.querySelector(".body__part-2__content .body__part-2__container__text .body__part-2__text");
      const bodyPart4Text = _main.querySelector(".body__part-4__content .body__part-4__container__text .body__part-4__text");
      const skillsContainer = _main.querySelector("#skillsContainer");
      
      // Get toggle function to toggle animation when click (On First part).
      let toggleAnimation = Utils.Fn.getToggleFn(
        () => {
          sparklingtemple[0].style.visibility = 'hidden';
          starfall[0].style.visibility = 'visible';
          button[0].style.color = '#262626';
          button[1].style.color = '#E1E1E1';
        },
        () => {
          sparklingtemple[0].style.visibility = 'visible';
          starfall[0].style.visibility = 'hidden';
          button[0].style.color = '#E1E1E1';
          button[1].style.color = '#262626';
        }
      );

      introductionText.style.transition = 'ease-in-out 0.4s';
      text2.style.transition = 'ease-in-out 0.4s';

      button[0].style.color = '#262626';
      button[1].style.color = '#E1E1E1';

      button[0].style.transition = 'ease-in-out 0.4s';
      button[1].style.transition = 'ease-in-out 0.4s';

      button[0].addEventListener('click', function() {
        toggleAnimation();
      });

      button[1].addEventListener('click', function() {
        toggleAnimation();
      });

      // Get skills
      let promises = [
        OtherCallers.getDriveFileInforAsync("skills.json"),
        OtherCallers.getDriveFileInforAsync("homecontent.json")
      ];
      Promise.all(promises)
      .then(payloads => {
        let skillsPayload = payloads[0];
        let contentPayload = payloads[1];

        let { desc, skills } = skillsPayload.data;
        let { part_1, part_2, part_4 } = contentPayload.data;

        skillsContainer.innerHTML = desc.html;

        for(let skill of skills) {
          skillsContainer.append(createList(skill));
        }
        // Add content for HOME
        text2.innerHTML = part_1.content.html;

        // Run animation.
        Animation.Text.showContinously(
          bodyPart2Text,
          part_2.content.html,
          { canUseInnerHTML: true, intervalTime: 10000 }
        );

        Animation.Text.showContinously(
          bodyPart4Text,
          part_4.content.html,
          { canUseInnerHTML: true, intervalTime: 10000 }
        );

        Animation.Text.replace(introductionText, part_1.title.text);
      });

      return _main;
    },

    IndexDots() {
      return Utils.Element.toElement(HTML.IndexDots);
    },

    Footer() {
      return Utils.Element.toElement(HTML.Footer);
    }
  }

  static render() {
    document.addEventListener("DOMContentLoaded", () => {
      let [ element, interval ] = Loading();
      Home.Container = document.getElementById("root");
      Home.Container.append(element);

      // PING SERVER FIRST!!!
      OtherCallers.PING()
      .then(() => {
        Home.Container.innerHTML = "";
        clearInterval(interval);

        Home.Container.append(
          Header(),
          Home.components.Body(),
          Home.components.IndexDots(),
          SocialMedia(),
          Home.components.Footer()
        );
  
        // Run animation
        for(let animationCallBack of Home.animationCallBacks) {
          animationCallBack();
        }
  
        let dots = document.getElementsByClassName("indexdot__containner__dot");
        let pageName = document.getElementsByClassName("footer__text__container__name");
        let sy = window.innerHeight;
  
        function dotActive(n) {
          for(let i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" dot--active", "");
          }
          dots[n].className += " dot--active";
        }
  
        function run(y) {
          if(y >= 0 && y < sy) {
            dotActive(0);
            pageName[0].innerHTML = "The Ancient Temple";
          }
          if(y >= sy && y < sy * 2) {
            dotActive(1);
            pageName[0].innerHTML = "About me";
          }
          if(y >= sy * 2 && y < sy * 3) {
            dotActive(2);
            pageName[0].innerHTML = "Skills";
          }
          if(y >= sy * 3) {
            dotActive(3);
            pageName[0].innerHTML = "The Strange Planet";
          }
        }
  
        run(window.scrollY);
  
        $(document).ready(function() {
          pageName[0].innerHTML = "The Ancient Temple";
          $(window).on('scroll', function(e) {
            run(window.scrollY);
          });
  
          $(".indexdot__containner__dot").on('click', function(e) {
            let nameID = "#body_" + this.value;
            $('html, body').animate({
              scrollTop: $(nameID).offset().top
            }, 800, function(){
              nameID = "";
            });
          });
        });
      });
    });
  }
}

Home.render();
