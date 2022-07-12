import Notiflix from 'notiflix';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const dayRefs = document.querySelector('span[data-days]');
const hourRefs = document.querySelector('span[data-hours]');
const minRefs = document.querySelector('span[data-minutes]');
const secRefs = document.querySelector('span[data-seconds]');
const btnCDRef = document.querySelector('button[data-start]');
const inputRef = document.querySelector('#datetime-picker');
let timerId = null;

btnCDRef.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectDate = new Date(selectedDates[0]);
    const currentDate = new Date();

    if (selectDate.getTime() < currentDate.getTime()) {
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      btnCDRef.disabled = false;
    }
  },
};

const fp = flatpickr('#datetime-picker', options);


function handleStartCD() {
  btnCDRef.disabled = true;
  const setDate = fp.selectedDates[0].getTime();

  timerId = setInterval(() => {
    inputRef.disabled = true;
    const currentDate = new Date().getTime();
    const deltaDate = setDate - currentDate;
    const formattedTime = convertMs(deltaDate);
    updateCountDown(formattedTime);

    if (deltaDate < 999) {
      inputRef.disabled = false;
      clearInterval(timerId);
    }
  }, 1000);
}


function updateCountDown({ days, hours, minutes, seconds }) {
  dayRefs.textContent = days;
  hourRefs.textContent = hours;
  minRefs.textContent = minutes;
  secRefs.textContent = seconds;
}


function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}


function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}


btnCDRef.addEventListener('click', handleStartCD);