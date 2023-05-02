import TaskVO from "../model/vo/TaskVO.js";

// import taskVO from "../model/vo/TaskVO.js";

class TasksController {
  #model;
  #networkService;

  constructor(model, networkService) {
    this.#model = model;
    this.#networkService = networkService;
  }

  async retrieveTasks() {
    try {
      this.#model.tasks = await this.#networkService
        .retrieveFromPath('tasks')
        .then((rawTasks) => {
          if (rawTasks && rawTasks instanceof Array) {
            console.log('json', rawTasks);
            return rawTasks.map((json) => TaskVO.fromJSON(json));
          } else {
            window.alert('Problem with data parsing, try refresh later');
            return [];
          }
        })
        .catch((e) => {
          window.alert('Server error:' + e.toString());
          return [];
        });
    } catch (error) {
      throw error;
    }
  }

  deleteTask(taskId) {
    console.log('> TasksController -> deleteTask: taskId', taskId);
    return fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: 'DELETE'
      }
    )
      .then((response) => {
        console.log('> TasksController -> deleteTask: ok =', response.ok);
        if (response.ok) {
          this.#model.deleteTaskById(taskId);
        }
      })
      .catch((e) => {
        console.log('> TasksController -> deleteTask: error', e);
        throw new Error(e.toString());
      });

  }

  createTask(taskTitle, taskDate, taskTags) {
    console.log('> TasksController -> createTask');

    return fetch('http://localhost:3000/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: taskTitle,
        date: taskDate,
        tags: taskTags,
      })
    }).then((response) => response.json())
      .then(data => {
        const taskVO = TaskVO.fromJSON(data);
        this.#model.addTask(taskVO);
        console.log('> TaskController -> createTask: data ', data);
        return taskVO;
      }).catch((e) => {
        console.error('> TaskController -> createTask: data ', e);
        throw new Error(e.toString());
      });
  }

  updateTaskById(taskId, taskTitle, taskDate, taskTag) {
    console.log('> TasksController ->  updateTaskById: taskId', taskId);
    return fetch(`http://localhost:3000/tasks/${taskId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: taskTitle,
      }),
    }).then((response) => response.json())
      .then((data) => {
        console.log('> TaskController -> updateTaskById: data ', data);
        // const taskVO = TaskVO.fromJSON(data);
        this.#model.updateTaskById(taskId, data);
        // console.log('> TaskController -> updateTaskById: data ', data);
        // return taskVO;
      }).catch((e) => {
        console.error('> TaskController -> updateTaskById: data ', e);
        throw new Error(e.toString());
      });
  }
}

export default TasksController;