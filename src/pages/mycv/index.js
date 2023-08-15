import { Header } from "../../components/header/index.js";
import { SocialMedia } from "../../components/social_media/index.js";
import { PreviewPDF } from "../../components/preview_pdf/PreviewPdf.js";

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
      let _main = Utils.Element.toElement(html.Body);
      OtherCallers.getDriveFilesInforAsync(Utils.Assets.DriveFileNames.CV_ENG)
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
    OtherCallers.PING();
    document.addEventListener("DOMContentLoaded", () => {
      MyCV.Container = document.getElementById("root");
      MyCV.Container.append(
        Header(),
        MyCV.components.Body()
      );
    });
  }
}

MyCV.render();