const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const changeColorBody = document.querySelector('body');
let timerId = null;


function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
  };
  
  stopBtn.setAttribute('disabled', true);

  function startClickBtn() {
    startBtn.setAttribute('disabled', true);
    stopBtn.removeAttribute('disabled');
    timerId = setInterval(() => {
    changeColorBody.style.backgroundColor = getRandomHexColor();
  }, 1000);

  }

  startBtn.addEventListener('click', startClickBtn);
  
  function stopClickBtn() {
    stopBtn.setAttribute('disabled', true);
    startBtn.removeAttribute('disabled');
    clearInterval(timerId);
  }
  
  stopBtn.addEventListener('click', stopClickBtn);
  
  

