import { openWorkDetailsDialog } from "../modal/index.js";

import { Utils } from "../../utils/index.js";

/**
 * @typedef ComponentOptions
 * @property {boolean} isHTML
 */

/**
 * @typedef CardDataProps
 * @property {string} name
 * @property {string} avtLink
 * @property {{long: string, short: string}} desc
 * @property {string} type
 * @property {string} links
 * @property {string} tags
 */

function createLink(name, link) {
  let html = `<p class="mt-1">${name}: <a class="fw-bold" href="${link}" target="_blank">here</a></p>`;
  return Utils.Element.toElement(html);
}

/**
 * 
 * @param {ComponentOptions & CardDataProps} props 
 * @returns 
 */
export function ProjectCard(props) {
  const html = `
    <div class="project-card">
      <div class="project-card-header">
        <img src="${props.avtLink}" alt="No Image" />
      </div>
      <div class="project-card-content p-1">
        <p class="project-card-tags mb-1" id="tags">
          ${props.tags}
        </p>
        <h2 class="project-card-name">${props.name}</h2>
        <p class="project-card-desc">${props.desc.short}</p>
        <p class="txt-clr-primary" style="cursor: pointer" id="readmoreBtn">Read more</p>
        <div class="project-card-links"></div>
      </div>
    </div>
  `;

  if(props?.isHTML) return html;

  const _main = Utils.Element.toElement(html);
  const readmoreBtn = _main.querySelector("#readmoreBtn");
  const pcl = _main.querySelector(".project-card-links");

  readmoreBtn.addEventListener("click", () => {
    openWorkDetailsDialog(props);
  });

  if(props.links[0]) pcl.append(createLink("Github", props.links[0]));
  if(props.links[1]) pcl.append(createLink("NPM", props.links[1]));

  return _main;
}