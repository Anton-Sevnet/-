import 'uno.css';
import '@unocss/reset/tailwind.css';

const domBtnCreateTask = document.getElementById("btnCreateTask");
const domPopupCreateTask = document.getElementById("popupCreateTask");
const domCloseBtn = document.getElementById("closeBtn");

domBtnCreateTask.onclick = () => {
  console.log("click");
  domPopupCreateTask.classList.toggle("hidden");
  domCloseBtn.onclick = () => {
    console.log("click");
    domPopupCreateTask.classList.toggle("hidden");
    domCloseBtn.onclick = null;
  }
}
