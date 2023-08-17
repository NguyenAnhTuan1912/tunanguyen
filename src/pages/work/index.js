import { Header } from "../../components/header/index.js";
import { ProjectCard } from "../../components/project_card/ProjectCard.js";
import { Loading } from "../../components/loading/Loading.js";

import { WorkCallers } from "../../apis/work/index.js";
import { OtherCallers } from "../../apis/others/index.js";

import { html } from "./html.js";

import { Utils } from "../../utils/index.js";

class Project {
  /**
   * @type {HTMLElement}
   */
  static Container;

  static animationCallBacks = [];

  static components = {
    Body: function() {
      const _main = Utils.Element.toElement(html.Body);
      const workContainer = _main.querySelector("#work");

      const totalWorkSpan = _main.querySelector("#totalWork");

      let count = 0;

      WorkCallers
        .getWorksAsync()
        .then(payload => {
          let works = payload.data;
          for(let work of works) {
            workContainer.append(ProjectCard(work));
            count++;
          }
          totalWorkSpan.textContent = count;
        })

      return _main;
    }
  };

  static render() {
    document.addEventListener("DOMContentLoaded", () => {
      let [ element, interval ] = Loading();
      Project.Container = document.getElementById("root");
      Project.Container.append(element);

      OtherCallers.PING()
      .then(() => {
        Project.Container.innerHTML = "";
        clearInterval(interval);

        Project.Container.append(
          Header(),
          // SocialMedia(),
          Project.components.Body()
        );
      });
    });
  }
}

Project.render();