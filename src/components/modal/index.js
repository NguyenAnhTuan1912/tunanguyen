import { createModal } from "https://unpkg.com/tunangn-html-modal@1.6.3/dist/index.js";
import { workDetailsName, WorkDetailsDialog } from "./WorkDetails.js";

function disableScroll() {
  document.body.style.overflow = "hidden";
}
function enableScroll() {
  document.body.style.overflow = "auto";
}

const open = createModal({
  items: [
    {
      name: workDetailsName,
      type: "dialog",
      components: WorkDetailsDialog
    }
  ]
});

export async function openWorkDetailsDialog(data) {
  disableScroll();
  let result = await open(workDetailsName, data);
  enableScroll();
  return result;
}