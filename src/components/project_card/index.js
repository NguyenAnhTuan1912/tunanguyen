import { Utils } from "../../utils/index.js";

/**
 * @typedef ComponentOptions
 * @property {boolean} isHTML
 */

/**
 * @typedef CardDataProps
 * @property {string} name
 * @property {string} img
 * @property {string} shortDesc
 * @property {string} link
 * @property {string} tags
 */

/**
 * 
 * @param {ComponentOptions & CardDataProps} props 
 * @returns 
 */
export function ProjectCard(props) {
  const _main = Utils.Element.toElement(`
    <div class="project-card">
      <div class="project-card-header">
        <img src="${props.img}" alt="No Image" />
      </div>
      <div class="project-card-content p-1">
        <p class="project-card-tags mb-1" id="tags">
          ${props.tags}
        </p>
        <h2 class="project-card-name">${props.name}</h2>
        <p class="project-card-desc">${props.shortDesc}</p>
        <p class="txt-clr-primary" style="cursor: pointer">Read more</p>
        <p class="mt-1">Link: <a class="fw-bold" href="${props.link}" target="_blank">here</a></p>
      </div>
    </div>
  `);

  if(props?.isHTML) return _main.outerHTML;
  return _main;
}