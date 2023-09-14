import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const selector = {
    date: document.querySelector('#datetime-picker'),
    btnStart: document.querySelector('[data-start]'),
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
    spanValue: document.querySelectorAll('.value')
}

let timerId = null;

selector.btnStart.disabled = true;

flatpickr(selector.date, {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      if (selectedDates[0] <= Date.now()) {
        Notiflix.Notify.warning('Please choose a date in the future');
        
      } else {
        selector.btnStart.disabled = false;
        Notiflix.Notify.info('Fulfilled');
        
      };
    },
  });
  const dateChoose = new Date(selector.date.value);
  const dateFinish = dateChoose - Date.now();

  console.log(dateChoose);
  console.log(Date.now());
  console.log(dateFinish);

  selector.btnStart.addEventListener('click', startClickBtn); 
  
  function startClickBtn() {

    selector.btnStart.disabled = true;
    selector.date.disabled = true;
    timerId = setInterval(() => {

      const dateChoose = new Date(selector.date.value);
      const finishTime = dateChoose - Date.now();
      const { days, hours, minutes, seconds } = convertMs(finishTime);
      
      selector.days.textContent = addLeadingZero(days);
      selector.hours.textContent = addLeadingZero(hours);
      selector.minutes.textContent = addLeadingZero(minutes);
      selector.seconds.textContent = addLeadingZero(seconds);
  }, 1000)
}
  
  

  function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
  }

  function addLeadingZero(value) {
      return `${value}`.padStart(2, '0');
    }