import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const dateTimePicker = document.querySelector('#datetime-picker');
const startButton = document.querySelector('[data-start]');
const daysValue = document.querySelector('[data-days]');
const hoursValue = document.querySelector('[data-hours]');
const minutesValue = document.querySelector('[data-minutes]');
const secondsValue = document.querySelector('[data-seconds]');

const addLeadingZero = value => String(value).padStart(2, '0');

let countdownIntervalId;

startButton.addEventListener('click', () => {
  const selectedDate = new Date(dateTimePicker.value);
  const currentDate = new Date();

  if (selectedDate <= currentDate) {
    alert('Please choose a date in the future.');
    return;
  }

  startButton.disabled = true;

  function updateCountdown() {
    const timeDifference = selectedDate - new Date();
    if (timeDifference <= 0) {
      clearInterval(countdownIntervalId);
      daysValue.textContent = '00';
      hoursValue.textContent = '00';
      minutesValue.textContent = '00';
      secondsValue.textContent = '00';
      startButton.disabled = false;
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(timeDifference);
    daysValue.textContent = addLeadingZero(days);
    hoursValue.textContent = addLeadingZero(hours);
    minutesValue.textContent = addLeadingZero(minutes);
    secondsValue.textContent = addLeadingZero(seconds);
  }

  countdownIntervalId = setInterval(updateCountdown, 1000);
  updateCountdown();
});

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const currentDate = new Date();

    if (selectedDate <= currentDate) {
      startButton.disabled = true;
    } else {
      startButton.disabled = false;
    }
  },
});
