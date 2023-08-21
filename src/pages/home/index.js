import { Header } from "../../components/header/index.js";
import { SocialMedia } from "../../components/social_media/SocialMedia.js";
import { Loading } from "../../components/loading/Loading.js";

import { OtherCallers } from "../../apis/others/index.js";

import { HTML } from "./html.js";

import { Utils } from "../../utils/index.js";
import { Animation } from "../../animations/index.js";

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
        };

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