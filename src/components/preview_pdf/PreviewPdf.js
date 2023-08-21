import { Utils } from "../../utils/index.js";

export function PreviewPDF(fileId) {
  let i = Utils.Element.createElement("embed", {
    className: "pdf-preview",
    style: {
      width: "100%",
      height: "100%"
    }
  });
  i.type = "application/pdf";
  if(fileId) i.src = `https://drive.google.com/file/d/${fileId}/preview`;
  return i;
}