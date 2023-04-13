import Dom from "../../constants/dom.js";
import {randomString} from "../../utils/stringUtils.js";

class TaskPopup {
  #title;
  #tags;
  #confirmText;
  #confirmCallback;
  #closeCallback;

  constructor(title, tags, confirmText, confirmCallback, closeCallback) {
    this.#title = title;
    this.#tags = tags;
    this.#confirmText = confirmText;
    this.#confirmCallback = confirmCallback;
    this.#closeCallback = closeCallback;

  }

  render() {
    const div = document.createElement('div');
    div.innerHTML = `
<div class='flex flex-col relative min-w-[377px] bg-white p-6 rounded-2xl gap-y-4'>
    <button data-id='btnClose' class='absolute top-7 right-6'>
      <i class='i-material-symbols-cancel-outline block text-neutral-400 hover:text-neutral-800 text-2xl'></i></button>
    <div class='flex flex-row'>
      <span class='text-xl font-bold' data-id="title">${this.#title}</span>
    </div>
    <div class='flex flex-row'>
      <div class='flex flex-col w-full'>
        <label class='ml-1 text-sm text-neutral-600' for='inpDate'>Title: </label>
        <input
                class='bg-neutral-100 p-1.5 rounded w-full border-1 border-neutral-200'
                id='inpTitle'
                type='text'
                placeholder='e.g. Read books'
        />
      </div>
    </div>
    <div class='flex flex-row'>
      <div class='flex flex-col w-full'>
        <label class='ml-1 text-sm text-neutral-600' for='inpDate'>End date: </label>
        <input
                class='bg-neutral-100 p-1.5 rounded w-full border-1 border-neutral-200'
                type='date'
                id='inpDate'
                name='trip-start'
                min='2018-01-01'
        />
      </div>
    </div>
    <div class='flex flex-row'>
      <div class='flex flex-col w-full'>
        <label for='countries' class='ml-1 text-sm text-neutral-600'>Select tag:</label>
        <select
                id='countries'
                class='bg-neutral-100 p-1.5 rounded w-full border-1 border-neutral-200 focus:border-none'
        >
          <option selected>Choose a tag</option>
          <option value='web'>Web</option>
          <option value='update'>Update</option>
          <option value='design'>Design</option>
          <option value='content'>Content</option>
        </select>
      </div>
    </div>
    <div class='flex flex-row pt-2'>
      <button data-id='btnConfirm' class='bg-teal-600 text-white p-2 rounded-lg w-full font-bold'>${this.#confirmText}
      </button>
    </div>
  </div>`;

    const popup = div.children[0];

    const domBtnClose = popup.querySelector('[data-id="btnClose"]');
    const domBtnConfirm = popup.querySelector('[data-id="btnConfirm"]');


    const onClosePopup = () => {
      domBtnClose.onclick = null;
      domBtnConfirm.onclick = null;
      this.#closeCallback();
    };

    domBtnClose.onclick = onClosePopup;

    domBtnConfirm.onclick = () => {
      const taskTitle = randomString(12);
      const taskDate = Date.now();
      const taskTags = '';
      this.#confirmCallback(taskTitle, taskDate, taskTags);
    };

    return div.children[0];
  }


}

export default TaskPopup;