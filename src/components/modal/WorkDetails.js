import { Slider } from "../slider/Slider.js";

import { Utils } from "../../utils/index.js";

export const workDetailsName = "workDetailsDialog";

/**
 * @typedef WorkProps
 * @property {string} name
 * @property {string} avtLink
 * @property {string} type
 * @property {{short: string, long: string}} desc
 * @property {Array<string>} tags
 * @property {Array<string>} imgLinks
 * @property {Array<string>} links
 * @property {number} startDate
 * @property {number} endDate
 * @property {number} updatedAt
 */

/**
 * 
 * @param {*} close 
 * @param {*} item 
 * @param {*} utils 
 */
export function WorkDetailsDialog(close, item, utils) {
  /**
   * @type {WorkProps}
   */
  let data = item.getData();
  let [githubLink, npmLink, ...otherLinks] = data.links;
  let tags = data.tags.join(", ");
  otherLinks = otherLinks.map(link => link.split("::"));

  let container = Utils
    .Element
    .createElement("div", {
      className: "work-details p-4",
      style: utils.getContainerStyle({ borderRadius: 0, boxShadow: null, width: "90%", maxHeight: "90vh", maxWidth: "780px" })
    });

  // Close button
  let closeBtnContainer = Utils.Element.createElement("div", {
    className: "work-details-close-btn py-1"
  });
  let closeBtn = Utils.Element.createElement("button", {
    className: "btn btn-close",
    content: `<span class="material-symbols-outlined">close</span>`,
    eventListeners: {
      "click": close
    }
  });
  
  // Body
  let body = Utils.Element.createElement("div", {
    content: `
      <div class="mb-2">
        <h1>${data.name}</h1>
        <div>
          <h2>Information</h2>
          <p><strong>Time:</strong> ${(new Date(data.startDate)).toLocaleDateString()} - ${(new Date(data.endDate)).toLocaleDateString()}</p>
          <p><strong>Type:</strong> <span class="txt-clr-error">${data.type}</span></p>
          <p><strong>Tags:</strong> ${tags}</p>
        </div>
        <div class="mt-1">
          <h2>Links</h2>
          <p><strong>Github:</strong> ${githubLink ? `<a href="${githubLink}" target="_blank">${githubLink}</a>` : "Not yet"}</p>
          <p><strong>NPM:</strong> ${npmLink ? `<a href="${npmLink}" target="_blank">${npmLink}</a>` : "Not yet"}</p>
        </div>
        <div class="mt-1" id="linksContainer">
          <h2>Other links</h2>
        </div>
      </div>
      <div class="work-details-images mb-4">
        <h2>Images</h2>
      </div>
      <div>
        <h2>Description</h2>
        <p class="description-content">${data.desc.long}</p>
      </div>
    `,
    className: "work-details-body"
  });
  let workDetailsImages = body.querySelector(".work-details-images");
  let imageElements = [Utils.Element.toElement(`<img src="${data.avtLink}" class="work-details-image" />`)];
  let linksContainer = body.querySelector("#linksContainer");

  otherLinks.forEach(link => {
    if(link[1]) 
      linksContainer
      .appendChild(
        Utils.Element.toElement(
          `<p><strong>${link[0]}:</strong> <a href="${link[1]}" target="_blank">${link[1] ? link[1] : "Not yet"}</a></p>`
        ));
  });

  for(let imgLink of data.imgLinks) {
    let imageElement = Utils.Element.toElement(`<img src="${imgLink}" class="work-details-image" />`);
    imageElements.push(imageElement);
  }

  // Append closeBtn
  closeBtnContainer.append(closeBtn);

  // Append work details image
  workDetailsImages.append(Slider(imageElements));

  // Append first.
  container.append(closeBtnContainer, body);

  return container;
}