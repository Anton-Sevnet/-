import 'uno.css';
import '@unocss/reset/tailwind.css';
import DOM from './src/constants/dom';
import {randomString} from './src/utils/stringUtils.js';

const KEY_LOCAL_TASKS = 'tasks';

const Tags = ['Web', 'Update', 'Design', 'Content'];

class TaskVO {
  static fromJSON(json) {
    return new TaskVO(json.id, json.title, json.date, json.tag);
  }

  constructor(id, title, date, tag) {
    this.id = id;
    this.title = title;
    this.date = date;
    this.tag = tag;
  }


}

const getDOM = (id) => document.getElementById(id);
const QUERY = (container, id) => container.querySelector(`[data-id="${id}"]`);

const domTemplateTask = getDOM(DOM.Template.TASK);
const domTaskColumn = domTemplateTask.parentNode;
domTemplateTask.removeAttribute('id');
domTemplateTask.remove();

const rawTasks = localStorage.getItem(KEY_LOCAL_TASKS);

const tasks = rawTasks
  ? JSON.parse(rawTasks).map((json) => TaskVO.fromJSON(json))
  : [];
tasks.forEach((taskVO) => renderTask(taskVO));
console.log('> tasks:', tasks);

domTaskColumn.onclick = (e) => {
  e.stopPropagation();
  console.log('domTaskColumn', e.target);
  const taskId = e.target.dataset.id;
  if (!taskId) return;

  const taskVO = tasks.find((task) => task.id === taskId);
  console.log('. taskVO: ', taskVO)
  renderTaskPopup(taskVO, 'Update task', 'Update', () => {
    console.log('> Update task -> On Confirm', {
      taskTitle,
      taskDate,
      tasTag,
    });
    taskVO.title = taskTitle;
    const domTask = renderTask(taskVO);
    e.target.parentNode.replaceChild(e.target, domTask);
    saveTask();

  });
};
getDOM(DOM.Button.CREATE_TASK).onclick = () => {
  console.log('> domPopupCreateTask.classList');
  renderTaskPopup(null, 'Create task', 'Create', (taskTitle, taskDate, taskTags) => {
    console.log('> Main -> Create task -> On Confirm');
    const taskId = `task_${Date.now()}`;
    const taskVO = new TaskVO(taskId, taskTitle, taskDate, taskTags);

    renderTask(taskVO);
    tasks.push(taskVO);

    console.log('confirm', taskVO);
    saveTask();


  });
};


function renderTask(taskVO) {
  const domTaskClone = domTemplateTask.cloneNode(true);
  domTaskClone.dataset.id = taskVO.id;
  QUERY(domTaskClone, DOM.Template.Task.TITLE).innerText = taskVO.title;
  domTaskColumn.prepend(domTaskClone);
  return domTaskClone;
}

async function renderTaskPopup(taskVO, popupTitle, confirmText, processDataCallback) {
  const domPopupContainer = getDOM(DOM.Popup.CREATE_TASK);
  const domSpinner = domPopupContainer.querySelector('.spinner');

  domPopupContainer.classList.remove('hidden');

  const onClosePopup = () => {
    domPopupContainer.children[0].remove();
    domPopupContainer.append(domSpinner);
    domPopupContainer.classList.add('hidden');
  };

  const TaskPopup = (await import('./src/view/popup/TaskPopup')).default;
  const taskPopupInstance = new TaskPopup(
    popupTitle,
    Tags,
    confirmText,
    (taskTitle, taskDate, taskTags) => {
      console.log('Main -> processDataCallback', {taskTitle, taskDate, taskTags});
      processDataCallback(taskTitle, taskDate, taskTags);
      onClosePopup();
    },
    onClosePopup
  );

  if (taskVO) {
    taskPopupInstance.taskTitle = taskVO.title;
  }
  // setTimeout(() => {
  domSpinner.remove();
  document.onkeyup = (e) => {
    if (e.key === "Escape") {
      onClosePopup();
    }
  }
  domPopupContainer.append(taskPopupInstance.render());
  // }, 1000);
}

function saveTask() {
  localStorage.setItem(KEY_LOCAL_TASKS, JSON.stringify(tasks));
};
