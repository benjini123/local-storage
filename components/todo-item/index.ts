import { state } from "../../src/state";

export function initPostItElement() {
  customElements.define(
    "post-it",
    class extends HTMLElement {
      shadow: ShadowRoot;
      title: string = "";
      checked: boolean = false;

      constructor() {
        super();
        this.shadow = this.attachShadow({ mode: "open" });
        this.connectedCallback();
      }
      connectedCallback() {
        this.title = this.getAttribute("title") || "";
        this.checked = this.hasAttribute("checked");
        this.id = this.getAttribute("itemId");

        const style = document.createElement("style");
        style.innerHTML = `

        *{
          box-sizing: border-box;
        }
        h3{
          margin: 0px;
        }
        .container{
          margin: 0px;
          padding: 22px 13px;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: flex-start;
          width: 100%;
          max-width: 411px;
          min-height: 93px;
          background-color: #FFF599;
        }
        .title.checked{
          text-decoration: line-through;
        }
        `;
        this.shadow.appendChild(style);
        this.render();
      }
      addListeners() {
        const checkboxEl = this.shadow.querySelector(".checkbox");
        checkboxEl.addEventListener("click", (e: any) => {
          const target = e.target as any;
          const event = new CustomEvent("change", {
            detail: {
              id: this.id,
              value: target.checked,
            },
          });
          this.dispatchEvent(event);
        });
      }

      render() {
        const div = document.createElement("div");
        div.innerHTML = `

        <div class="container">
          <h3 class="title ${this.checked ? "checked" : ""}">${this.title}</h3>
          <input class="checkbox" type="checkbox" ${
            this.checked ? "checked" : ""
          }></input>
        </div>
        `;

        this.shadow.appendChild(div);
        this.addListeners();
      }
    }
  );
}
