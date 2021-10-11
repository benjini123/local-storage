// import { initPostItElement } from "../../components/todo-item";
import { state } from "../../src/state";

export function initPageWelcome(params: any) {
  const div = document.createElement("div");
  const style = document.createElement("style");
  const tasks = state.getEnabledTasks();

  style.innerHTML = `
  * {
  box-sizing: border-box;
  }
  .main{
    padding: 0 31px ;
    display: flex;
    justifyContent: center;
    alignItems: center;
    gap: 20px;
  }
  .header{
    height: 60px;
    background-color: red;
  }
  .main{
    display: flex;
    flex-direction: column;
  } 
  .form{
    display:flex;
    gap: 10px;
    flex-direction:column;
  }
  .label{
    font-size:18px;
  }
  .input{
    font-size:18px;
    border: solid 2px;
    border-radius: 4px;
    padding: 17px 13px;
    max-width: 412px;
    width: 100%;
  }
  .button{
    width: 100%;
    max-width: 412px;
    height:50px;
    background-color: #9CBBE9;
  }
  .container{
    margin: 0px;
    display: grid;
    gap: 15px;
    height: 200px;
  }
  
  `;

  div.innerHTML = `
  
  <header class="header"></header>
  <div class="main">
    <h1>Mis Pendientes</h1>
    <form class="form" type="form" id="form">
      <label class="label" for="input">
        nuevo pendiente:
      </label> 
      <input id="input" name="input" class="input" type="text"> 
      <div>
        <button class="button">agregar</button>
      </div>  
    </form>
    <div class="container"></div>
  </div>
  `;

  const containerEl: HTMLElement = div.querySelector(".container");
  console.log(containerEl);

  function createTasks(items: any) {
    containerEl.innerHTML = "";
    for (const item of items) {
      const postItEl = document.createElement("post-it");
      postItEl.setAttribute("title", item.title);
      postItEl.setAttribute("id", item.id);

      if (item.completed) {
        postItEl.setAttribute("checked", "true");
      }
      postItEl.addEventListener("change", (e: any) => {
        console.log(e);
        state.changeItemState(e.detail.id, e.detail.value);
      });
      containerEl.appendChild(postItEl);
    }
  }

  state.subscribe(() => {
    createTasks(state.getEnabledTasks());
  });

  createTasks(tasks);

  div.querySelector(".button").addEventListener("click", (e) => {
    e.preventDefault;
    state.addTasks("desde el boton", Math.random());
  });

  params.appendChild(div);
  params.appendChild(style);
}
