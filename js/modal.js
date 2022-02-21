import { $ } from "./utils.js";

const expandButton = $("[data-expand]");
const resultsSection = $(".results-section");
const overlay = $(".overlay");

expandButton.onclick = () => {
  expandButton.classList.toggle("turn");
  overlay.toggleAttribute("data-can-hide");
  resultsSection.toggleAttribute("data-can-expand");
};
