import { Ball } from "../classes/Ball.js";

import { Utils } from "../utils/index.js";


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

export class Animation {
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
        }

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

        return function() { clearInterval(_) }

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
        }

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
        }

        initBall();

        const animate = function() {
          requestAnimationFrame(animate);
          context.clearRect(0, 0, size.x, size.y);
          for(let i = 0; i < 10; i++) {
            balls[i].update();
          }
        }

        animate();
      } catch (error) {
        console.error("Animation Error: ", error.message);
      }
    }
  }
}