class TasksModel {
  #tasks = [];
  #updateCallBack = [];


  constructor() {

  }

  set tasks(value) {
    this.#tasks = value;
    this.#notify();
  }

  #notify() {
    this.#updateCallBack.forEach(c => c(this.#tasks));
  }

  addUpdateCallBack(updateCallback) {
    if (!updateCallback || !(updateCallback instanceof Function)) {
      throw new Error(`Wrong callback: ${updateCallback}`);

    }
    this.#updateCallBack.push(updateCallback);
  }

  getTaskById(id) {
    const taskId = parseInt(id);
    const taskVO = this.#tasks.find((task) => task.id === taskId);
    console.log('> TasksModel > taskVO:', id, taskVO);
    return taskVO;
  }

  deleteTaskById(id) {
    // console.log('> TasksModel > deleteTaskById:', taskId);
    const taskId = parseInt(id);
    const index = this.#tasks.findIndex((taskVO) => taskVO.id === taskId);
    console.log('> TasksModel > deleteTaskById: index =', index);
    this.#tasks.splice(index, 1);
    this.#notify();
    // this.tasks = this.#tasks.filter((taskVO) => taskVO.id !== taskId);
  }

  addTask(taskVO) {
    console.log('> TasksModel -> addTask:', taskVO);
    this.#tasks.push(taskVO);
    this.#notify();
  }

  updateTaskById(taskId, data) {
    console.log('> TasksModel -> updateTaskById:', {taskId, data});
    const taskVO = this.getTaskById(taskId);
    Object.assign(taskVO, data);
    this.#notify();
  }
}

export default TasksModel;