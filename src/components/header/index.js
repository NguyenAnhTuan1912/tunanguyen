import { Utils } from "../../utils/index.js";

const html = `
  <div class="header">
    <div class="header__logo">
      <div class="header__logo__container"><img src="image/logo/logo.svg" alt="" class="header__logo-svg" id="logo"></div>
    </div>
    <div class="header__name">
      <div class="header__name__container"><p>tunanguyen</p></div>
    </div>
    <div class="header__navigate">
      <div class="header__navigate__container">
        <ul class="header__navigate__row-1">
          <li class="header__navigate__row-1__col">
            <a href="project.html">Project</a>
          </li>
          <li class="header__navigate__row-1__col">
            <a href="portfolio.html">Portfolio</a>
          </li>
          <li class="header__navigate__row-1__col">
            <a href="contact.html">Contact</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
  `;

export function Header() {
  const _main = Utils.Element.toElement(html);
  const menu = _main.getElementsByClassName("header__navigate__row-1");
  const logo = _main.getElementsByClassName("header__logo-svg");
  const li = _main.getElementsByClassName("header__navigate__row-1__col");

  const listTransition = function() {
    for(let i = 0; i < li.length; i++) {
      li[i].style.transform = 'translateX(150%)';
      //li[i].style.display = 'none';
      li[i].style.opacity = 0;
    }
  }
  
  const listMove = function() {
    for(let i = 0; i < li.length; i++) {
      li[i].style.transform = 'translateX(0)';
      //li[i].style.display = 'block';
      li[i].style.opacity = 1;
    }
  }

  const toggleListAnimate = Utils.Fn.getToggleFn(
    listMove,
    listTransition
  );

  Utils.Other.responsive([600], () => {
    menu[0].className += " navigate--flex";
    logo[0].onclick = function(event) {
      toggleListAnimate();
    }
  });

  return _main;
}