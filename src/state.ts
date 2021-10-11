const state = {
  data: {
    tasks: [
      { id: 1, title: "ejemplo-1", checked: false },
      { id: 2, title: "ejemplo-2", checked: true },
      { id: 3, title: "ejemplo-3", deleted: true },
    ],
  },

  listeners: [],

  init() {
    const localData = localStorage.getItem("saved-state");
    // this.setState(JSON.parse(localData));
  },

  getState() {
    return this.data;
  },

  setState(newState: any) {
    this.data = newState;
    for (const cb of this.listeners) {
      cb();
    }
    localStorage.setItem("saved-state", JSON.stringify(newState));
  },

  getEnabledTasks() {
    const currentState = this.getState();
    return currentState.tasks.filter((t: any) => !t.deleted);
  },

  changeItemState(id: number, value: boolean) {
    const currentState = this.getState();
    const found = currentState.find((t: any) => t.id == id);
    found.status = value;
    this.setState(currentState);
  },

  addTasks(title: string, id: number) {
    const currentState = this.getState();

    currentState.tasks.push({ id, title, completed: false });
    this.setState(currentState);
  },

  removeTask(task: any) {
    const lastState = state.getState();
    localStorage.removeItem(task);

    lastState.remove(task);
  },

  subscribe(callback: (any: any) => any) {
    this.listeners.push(callback);
  },
};

export { state };
