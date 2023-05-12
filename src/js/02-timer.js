import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import '../css/common.css';

const refs = {
    datetimePicker : document.getElementById('datetime-picker'),
    btnStart : document.querySelector('button[data-start]'),
    daysEl : document.querySelector('span[data-days]'),
    hoursEl : document.querySelector('span[data-hours]'),
    minutesEl : document.querySelector('span[data-minutes]'),
    secondsEl : document.querySelector('span[data-seconds]'),
}
const {datetimePicker, btnStart, daysEl, hoursEl, minutesEl, secondsEl} = refs;

let countdownDate = 0;
let timerId = null;
btnStart.disabled = true;

btnStart.addEventListener('click', startTimer);

function startTimer() {
  Notify.success('Countdown has started!');
  timerId = setInterval(() => {
    const currentTime = Date.now();
    const deltaTime = countdownDate - currentTime;
    const { days, hours, minutes, seconds } = convertMs(deltaTime);
    updateTimerInterface({ days, hours, minutes, seconds });
    stopTimer(deltaTime);
  }, 1000);
  btnStart.disabled = true;
  datetimePicker.disabled = true;
}

function stopTimer(time) {
  if (time < 1000) {
    clearInterval(timerId);
    datetimePicker.disabled = false;
    Notify.success(' 🎉 The time has come!');
  }
}

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0] < Date.now()) {
          Notify.failure('Please choose a date in the future');}
        else {      
            btnStart.disabled = false;
            countdownDate = selectedDates[0];}    
        },
};

function updateTimerInterface({ days, hours, minutes, seconds }) {
    daysEl.textContent = addLeadingZero(days);
    hoursEl.textContent = addLeadingZero(hours);
    minutesEl.textContent = addLeadingZero(minutes);
    secondsEl.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
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

flatpickr(datetimePicker, options)