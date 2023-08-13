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
  let container = Utils
    .Element
    .createElement("div", {
      className: "work-details p-4",
      style: utils.getContainerStyle({ borderRadius: 0, boxShadow: null, maxHeight: null })
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
          <p><strong>Type:</strong> <span class="txt-clr-error">${data.type}</span></p>
          <p><strong>Tags:</strong> ${data.tags}</p>
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