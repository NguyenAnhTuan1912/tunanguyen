import { Header } from "../../components/header/index.js";
import { SocialMedia } from "../../components/social_media/index.js";

import { OtherCallers } from "../../apis/others/index.js";

import { html } from "./html.js";

import { Utils } from "../../utils/index.js";

export class MyCV {
  /**
   * @type {HTMLElement}
   */
  static Container;

  static animationCallBacks = [];

  static components = {
    Body: function() {
      return Utils.Element.toElement(html.Body);
    }
  };

  static render() {
    OtherCallers.PING();
    document.addEventListener("DOMContentLoaded", () => {
      MyCV.Container = document.getElementById("root");
      MyCV.Container.append(
        Header(),
        SocialMedia(),
        MyCV.components.Body()
      );
    });
  }
}

MyCV.render();