import 'uno.css';
import '@unocss/reset/tailwind.css';
import Dom from './src/constants/dom.js';
import { randomString } from './src/utils/stringUtils.js';

const Tags = ['Web', 'Update', 'Design', 'Content'];

class TaskVO {
  constructor(title, date, Tags) {
    this.title = title;
    this.date = date;
    this.status = Tags;
  }
}

const task = new TaskVO('Read', Date.now(), Tags);
const getDOM = (id) => document.getElementById(id);
const QUERY = (container, id) => container.querySelector(`[data-id="${id}"]`);

const domTask = getDOM(Dom.Template.TASK);

const tasks = [];
getDOM(Dom.Button.CREATE_TASK).onclick = () => {
  console.log('> domPopupCreateTask.classList');

  const domPopupCreateTask = getDOM(Dom.Popup.CREATE_TASK);
  const domBtnConfirm = QUERY(
    domPopupCreateTask,
    Dom.Button.POPUP_CREATE_TASK_CONFIRM,
  );
  const domBtnClose = QUERY(
    domPopupCreateTask,
    Dom.Button.CLOSE_POPUP_CREATE_TASK,
  );

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
    const taskVO = new TaskVO(randomString(12), Date.now(), Tags[0]);

    const taskView = domTask.cloneNode(true);
    QUERY(taskView, Dom.Template.Task.TITLE).innerText = taskVO.title;
    domTask.parentNode.prepend(taskView);
    tasks.push(taskVO);
    console.log('confirm', TaskVO);
    onClosePopup();
  };
};
