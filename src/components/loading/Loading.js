import { Utils } from "../../utils/index.js";

export function Loading() {
  let _main = Utils.Element.createElement("div", {
    style: {
      width: "100%",
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center"
    },
    content: `<h1 id="loadingTxt">Loading</h1><p class="mt-1">Please, wait a few second.</p>`
  });
  let loadingTxt = _main.querySelector("#loadingTxt");

  let _loop = 4;
  let _i = 0;
  let _interval = setInterval(() => {
    let text = "Loading" + ".".repeat(_i % _loop);
    loadingTxt.textContent = text;
    _i++;
  }, 500);

  return [_main, _interval];
}