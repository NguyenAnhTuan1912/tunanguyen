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
        let mediaBP = that.createMediaBreakPoint(points[i - 1], points[i]);
        let mediaQueryList = window.matchMedia(mediaBP);
        let range = `[${points[i - 1] + 1},${points[i]}]`;

        if(i === 0) {
          range = `[,${points[i]}]`;
          mediaBP = that.createMediaBreakPoint(points[i], undefined, {canQueryWithMax: true});
          mediaQueryList = window.matchMedia(mediaBP);
        }

        if(i === N - 1 && N > 1) {
          range = `[${points[i]},]`;
          mediaBP = that.createMediaBreakPoint(points[i], undefined);
          mediaQueryList = window.matchMedia(mediaBP);
        }

        const listener = function(e) {
          if(mediaQueryList.matches) cb(range);
        };

        listener();

        mediaQueryList.addEventListener("change", listener);

        mqls.push(mediaQueryList);
        mqlListeners.push(listener);
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