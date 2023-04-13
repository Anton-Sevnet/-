import 'uno.css';
import '@unocss/reset/tailwind.css';
import Dom from './src/constants/dom.js';
import {randomString} from './src/utils/stringUtils.js';

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
  console.log('> domPopupCreateTask.classList');
  renderTaskPopUp();
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

function renderTaskPopUp(popupTitle, btnCofirmText, confirmCallback) {

  const domPopupCreateTask = getDOM(Dom.Popup.CREATE_TASK);
  const domBtnConfirm = QUERY(
    domPopupCreateTask,
    Dom.Button.POPUP_CREATE_TASK_CONFIRM,
  );
  const domBtnClose = QUERY(
    domPopupCreateTask,
    Dom.Button.CLOSE_POPUP_CREATE_TASK,
  );

  const domTitle = QUERY(domPopupCreateTask, Dom.Popup.CreateTask.TITLE);
  domBtnConfirm.innerText = btnCofirmText;
  domTitle.innerText = popupTitle;

  domPopupCreateTask.classList.remove('hidden');

  const onClosePopup = () => {
    domPopupCreateTask.classList.add('hidden');
    domBtnClose.onclick = null;
    domBtnConfirm.onclick = null;
  };

  domBtnClose.onclick = () => {
    domPopupCreateTask.classList.add('hidden');
    domBtnClose.onclick = null;
  };

  domBtnConfirm.onclick = () => {
    if (confirmCallback) confirmCallback();
    onClosePopup();
  };
}

function renderTask(taskVO) {
  const domTaskClone = domTaskTemplate.cloneNode(true);
  domTaskClone.dataset.id = taskVO.id;
  QUERY(domTaskClone, Dom.Template.Task.TITLE).innerText = taskVO.title;
  domTaskColumn.prepend(domTaskClone);
}
