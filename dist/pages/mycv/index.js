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

function PreviewPDF(fileId) {
  let i = Utils.Element.createElement("embed", {
    className: "pdf-preview",
    style: {
      width: "100%",
      height: "100%"
    }
  });
  i.type = "application/pdf";
  if(fileId) i.src = `https://drive.google.com/file/d/${fileId}/preview`;
  return i;
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

const html = {
  Body: `
    <div class="mycv">
      <h1>Loading PDF...</h1>
    </div>
  `
};

class MyCV {
  /**
   * @type {HTMLElement}
   */
  static Container;

  static animationCallBacks = [];

  static components = {
    Body: function() {
      let _main = Utils.Element.toElement(html.Body);
      OtherCallers.getSavedDriveFilesInforAsync(Utils.Assets.DriveFileNames.CV_ENG)
      .then(payload => {
        let data = payload.data;
        let id = data.fileId;
        _main.innerHTML = "";
        _main.append(PreviewPDF(id));
      });
      return _main;
    }
  };

  static render() {
    document.addEventListener("DOMContentLoaded", () => {
      let [ element, interval ] = Loading();
      MyCV.Container = document.getElementById("root");
      MyCV.Container.append(element);

      OtherCallers.PING()
      .then(() => {
        MyCV.Container.innerHTML = "";
        clearInterval(interval);

        MyCV.Container.append(
          Header(),
          MyCV.components.Body()
        );
      });
    });
  }
}

MyCV.render();
