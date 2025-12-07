import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', event => {
  event.preventDefault();
  const formData = new FormData(form);
  const formValues = Object.fromEntries(formData.entries());
  const delay = Number(formValues.delay);
  const state = formValues.state;

  if (delay < 0) {
    iziToast.error({
      message: 'Delay must be a positive number!',
      position: 'topCenter',
    });
    return;
  }

  const makePromise = ({ delay, state }) =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        state === 'fulfilled' ? resolve() : reject();
      }, delay);
    });

  makePromise({ delay, state })
    .then(() => {
      iziToast.show({
        title: '✅',
        message: `Fulfilled promise in ${delay}ms`,
        color: 'green',
        position: 'topCenter',
        timeout: 2000,
        messageColor: 'white',
        messageSize: '18px',
      });
    })
    .catch(() => {
      iziToast.show({
        title: '❌',
        message: `Rejected promise in ${delay}ms`,
        color: 'red',
        position: 'topCenter',
        timeout: 2000,
        messageColor: 'white',
        messageSize: '18px',
      });
    });
  form.reset();
});