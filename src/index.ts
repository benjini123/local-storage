import "../components/todo-item";
import { initPageWelcome } from "../page/principal";
import { state } from "./state";

(function () {
  state.init();
  initPageWelcome(document.querySelector(".root"));
})();
