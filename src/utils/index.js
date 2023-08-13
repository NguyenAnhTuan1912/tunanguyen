/**
 * @typedef CreateElementOptions
 * @property {string | undefined} className
 * @property {string | undefined} id
 * @property {string | undefined} content
 * @property {any} style
 * @property {{[key in keyof HTMLElementEventMap]: (e: any) => void} | undefined} eventListeners
 */

export class Utils {
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
        };
        if(options.eventListeners) {
          let _listeners = options.eventListeners;
          for(let key in _listeners)
            element.addEventListener(key, _listeners[key]);
        };
      }

      return element;
    }
  }

  static Number = {
    getRandomNumber(max, min) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
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
        };

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