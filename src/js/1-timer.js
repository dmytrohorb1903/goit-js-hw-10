import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let userSelectedDate = 0;

const refs = {
  startBtn: document.querySelector('button[data-start]'),
  inputDate: document.querySelector('#datetime-picker'),
  dataDays: document.querySelector('span[data-days]'),
  dataHours: document.querySelector('span[data-hours]'),
  dataMin: document.querySelector('span[data-minutes]'),
  dataSec: document.querySelector('span[data-seconds]'),
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= new Date()) {
      iziToast.show({
        title: '❌',
        message: 'Please choose a date in the future',
        color: 'red',
        position: 'topCenter',
        timeout: 2000,
        messageColor: 'white',
        messageSize: '18px',
      });
      refs.startBtn.disabled = true;
      return;
    } else {
      userSelectedDate = selectedDates[0];
      refs.startBtn.disabled = false;
    }
  },
};

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

document.addEventListener('DOMContentLoaded', () => {
  refs.startBtn.disabled = true;
});

flatpickr('#datetime-picker', options);

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function updateTimer(ms) {
  const { days, hours, minutes, seconds } = convertMs(ms);
  refs.dataDays.textContent = addLeadingZero(days);
  refs.dataHours.textContent = addLeadingZero(hours);
  refs.dataMin.textContent = addLeadingZero(minutes);
  refs.dataSec.textContent = addLeadingZero(seconds);
}

function startTimer(date) {
  refs.startBtn.disabled = true;
  refs.inputDate.disabled = true;

  const idInterval = setInterval(() => {
    const diff = date - new Date();

    if (diff <= 0) {
      clearInterval(idInterval);
      updateTimer(0);
      iziToast.show({
        title: '✅',
        message: 'Timer finished!',
        color: 'green',
        position: 'topCenter',
        timeout: 2000,
        messageColor: 'white',
        messageSize: '18px',
      });
      refs.inputDate.disabled = false;
      return;
    }

    updateTimer(diff);
  }, 1000);
}

refs.startBtn.addEventListener('click', () => {
  startTimer(userSelectedDate);
});