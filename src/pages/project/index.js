import { Header } from "../../components/header/index.js";
import { SocialMedia } from "../../components/social_media/index.js";
import { ProjectCard } from "../../components/project_card/index.js"

import { html } from "./html.js";

import { Utils } from "../../utils/index.js";

const projects = [
  {
    id: "project_04",
    name: "Dong Nai Travel",
    tags: ["react-native", "express", "mongodb", "chatgpt"],
    img: "https://res.cloudinary.com/dhqgfphiy/image/upload/v1691223986/portfolio/works/images/dongnaitravel_iwcuyk.jpg",
    shortDesc: "App help users to manage their travel, find places in Dong Nai.",
    link: "https://github.com/FromSunNews/DongNaiTravelApp"
  },
  {
    id: "project_03",
    name: "Dong Nai Itineraries - With AI",
    tags: ["react", "express", "mongodb", "chatgpt"],
    img: "https://res.cloudinary.com/dhqgfphiy/image/upload/v1691223391/portfolio/works/images/dongnaiitinerary_qtf3ey.png",
    shortDesc: "App help users to create their itineraries (or give suggestions).",
    link: "https://github.com/NekoCyan/DNTU-Research-Conference-2023"
  },
  {
    id: "project_02",
    name: "Chat app",
    tags: ["angular", "asp.net", "sql"],
    img: "https://res.cloudinary.com/dhqgfphiy/image/upload/v1691222404/portfolio/works/images/chatapp_hyjwxk.png",
    shortDesc: "This is my first time project. We build a chat app that users can use to chat with another one or groups.",
    link: "https://github.com/NguyenAnhTuan1912/quiz-app"
  },
  {
    id: "project_01",
    name: "Quiz app",
    tags: ["plain js"],
    img: "https://res.cloudinary.com/dhqgfphiy/image/upload/v1691219869/portfolio/works/images/Quiz_App_-_Preview_Thumbnail-01_r2pcur.png",
    shortDesc: "Users can do quizzes. I build with plain JS, SASS, HTML and Express.",
    link: "https://github.com/NguyenAnhTuan1912/quiz-app"
  }
];

const packages = [
  {
    id: "project_02",
    name: "tunangn-react-modal",
    tags: ["react", "npm package"],
    img: "https://res.cloudinary.com/dhqgfphiy/image/upload/v1691224393/portfolio/works/images/tunangn-react-modal_btipoq.png",
    shortDesc: "Show dialog, snackbar, side in React.",
    link: "https://www.npmjs.com/package/tunangn-react-modal"
  },
  {
    id: "project_01",
    name: "tunangn-html-modal",
    tags: ["plain js", "npm package"],
    img: "https://res.cloudinary.com/dhqgfphiy/image/upload/v1691224394/portfolio/works/images/tunangn-html-modal_yrnr4k.png",
    shortDesc: "Show dialog, snackbar, side in HTML.",
    link: "https://www.npmjs.com/package/tunangn-modal"
  }
];

export class Project {
  /**
   * @type {HTMLElement}
   */
  static Container;

  static animationCallBacks = [];

  static components = {
    Body: function() {
      const _main = Utils.Element.toElement(html.Body);
      const projectsContainer = _main.querySelector("#projects");
      const packagesContainer = _main.querySelector("#packages");

      const totalProjectsSpan = _main.querySelector("#totalProjects");
      const totalPackagesSpan= _main.querySelector("#totalPackages");

      let count = 0;

      for(let project of projects) {
        count++;
        projectsContainer.append(ProjectCard(project));
      };

      totalProjectsSpan.textContent = count;

      count = 0;

      for(let _package of packages) {
        count++;
        packagesContainer.append(ProjectCard(_package));
      };

      totalPackagesSpan.textContent = count;

      return _main;
    }
  };

  static render() {
    document.addEventListener("DOMContentLoaded", () => {
      Project.Container = document.getElementById("root");
      Project.Container.append(
        Header(),
        // SocialMedia(),
        Project.components.Body()
      );
    });
  }
}

Project.render();