import { Header } from "../../components/header/index.js";
import { SocialMedia } from "../../components/social_media/index.js";

import { HTML } from "./html.js";

import { Utils } from "../../utils/index.js";
import { Animation } from "../../animations/index.js";


export class Home {
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
      const planetsAroundCV = _main.querySelector("#planetsAroundCV");

      let introductionTextAlternate = "The Ancient Temple";
      
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

      // Run animation.
      Animation.Text.showContinously(
        bodyPart2Text,
        [
          "I'm Anh Tuan,<br>I was born in the Year of the Horse.",
          "I love designing & coding,<br>and I'm attracted by attractive things.",
          "I place information<br>of my projects, works and CV on this site.",
          "Contact me on my social medias<br>on the left of pages or above my head."
        ],
        { canUseInnerHTML: true, intervalTime: 10000 }
      );

      Animation.Text.showContinously(
        bodyPart4Text,
        [
          "The Universe began over 13 billion years ago, It's finite or infinite, no one knows..",
          "Solar System appeared over 4 billion years ago,<br> include our earth and planets orbit the sun.",
          "Evidence of life on earth, microscopic organisms..., date from at least 3.5 billion years ago.",
          "Does life exist outside of the earth? High Possibility.",
          "4 billion years compare with the age of universe is small,<br> but many miraculous things occurred: our life, stars, planets...<br> I believe it. What about you?"
        ],
        { canUseInnerHTML: true, intervalTime: 10000 }
      );

      // Animation.Canvas.ballFly(planetsAroundCV);

      // Add animation to run later.
      Home.animationCallBacks.push(() => Animation.Text.replace(introductionText, introductionTextAlternate));

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
      Home.Container = document.getElementById("root");
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
  }
}

Home.render();