const startBtnRef = document.querySelector('button[data-start]');
const stopBtnRef = document.querySelector('button[data-stop]');
const bodyColorRef = document.body.style;
const btnCls = startBtnRef.classList;
let timerId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}


function handleBtnStart(e) {
  btnCls.add('active');
  timerId = setInterval(() => {
    bodyColorRef.backgroundColor = getRandomHexColor();
  }, 1000);

  if (btnCls.contains('active')) {
    e.target.disabled = true;
  }
}


function handleBtnStop() {
  clearInterval(timerId);

  btnCls.remove('active');

  startBtnRef.disabled = false;
}


startBtnRef.addEventListener('click', handleBtnStart);
stopBtnRef.addEventListener('click', handleBtnStop);
