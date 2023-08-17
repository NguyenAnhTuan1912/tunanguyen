import { Header } from "../../components/header/index.js";
import { PreviewPDF } from "../../components/preview_pdf/PreviewPdf.js";
import { Loading } from "../../components/loading/Loading.js";

import { OtherCallers } from "../../apis/others/index.js";

import { html } from "./html.js";

import { Utils } from "../../utils/index.js";

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