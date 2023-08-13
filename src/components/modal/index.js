import { createModal } from "https://unpkg.com/tunangn-html-modal@1.6.3/dist/index.js";
import { workDetailsName, WorkDetailsDialog } from "./WorkDetails.js";

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
  return open(workDetailsName, data);
}