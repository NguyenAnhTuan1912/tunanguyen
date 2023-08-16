export const HTML = {
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
}