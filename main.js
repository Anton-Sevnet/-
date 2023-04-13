import 'uno.css';
import '@unocss/reset/tailwind.css';
import Dom from './src/constants/dom.js';
import {randomString} from './src/utils/stringUtils.js';
// import './src/view/popup/TaskPopup.js';

const KEY_LOCAL_TASKS = 'tasks';

const Tags = ['Web', 'Update', 'Design', 'Content'];

class TaskVO {

  static fromJSOM(json) {
    return new TaskVO(json.id, json.title, json.date, json.tag);
  }

  constructor(id, title, date, Tags) {
    this.id = id;
    this.title = title;
    this.date = date;
    this.status = Tags;
  }
}

const getDOM = (id) => document.getElementById(id);
const QUERY = (container, id) => container.querySelector(`[data-id="${id}"]`);

const domTaskTemplate = getDOM(Dom.Template.TASK);
const domTaskColumn = domTaskTemplate.parentNode;

domTaskTemplate.removeAttribute('id');
domTaskTemplate.remove();

const rawTasks = localStorage.getItem(KEY_LOCAL_TASKS);

const tasks = rawTasks
  ? JSON.parse(rawTasks).map((json) => TaskVO.fromJSOM(json)) : [];
tasks.forEach((taskVO) => renderTask(taskVO));
console.log('> tasks:', tasks)

domTaskColumn.onclick = (e) => {
  console.log(e.target);
  renderTaskPopUp('Update task', 'Update', () => {
    console.log(">Create task -> On Confirm")
  });
}

getDOM(Dom.Button.CREATE_TASK).onclick = () => {
  console.log('> domPopupContainer.classList');
  renderTaskPopUp('Create task', 'Create', () => {
    console.log(">Create task -> On Confirm")
  });
};

function onCreateTaskClick() {
  const taskId = `task_${Date.now()}`;
  const taskTitle = randomString(12);
  const taskVO = new TaskVO(taskId, taskTitle, Date.now(), Tags[0]);

  renderTask(taskVO);

  tasks.push(taskVO);

  console.log('confirm', TaskVO);

  localStorage.setItem(KEY_LOCAL_TASKS, JSON.stringify(tasks));
}

async function renderTaskPopUp(popupTitle, confirmText, confirmCallback, closeCallback) {

  const domPopupContainer = getDOM(Dom.Popup.CREATE_TASK);
  const domSpinner = domPopupContainer.querySelector('.spinner');

  domPopupContainer.classList.remove('hidden');

  const onClose = () => {
    domPopupContainer.innerHTML = '';
    domPopupContainer.append(domSpinner);
    domPopupContainer.classList.add('hidden');
  }

  const TaskPopup = (await import('./src/view/popup/TaskPopup')).default;
  const taskPopupInstance = new TaskPopup(
    popupTitle,
    Tags,
    confirmText,
    (title, date, tag) => {
      confirmCallback(title, date, tag);
      onClose();
    },
    onClose
  );
  setTimeout(() => {
    domPopupContainer.removeChild(domSpinner);
    domPopupContainer.append(taskPopupInstance.render());
  }, 100);

  domPopupContainer.querySelector('.spinner').classList.add('hidden');
  // domPopupContainer.append(taskPopupInstance.render());

  console.log(TaskPopup);

  return;


}

function renderTask(taskVO) {
  const domTaskClone = domTaskTemplate.cloneNode(true);
  domTaskClone.dataset.id = taskVO.id;
  QUERY(domTaskClone, Dom.Template.Task.TITLE).innerText = taskVO.title;
  domTaskColumn.prepend(domTaskClone);
}
