import Notiflix from 'notiflix';


// Напиши скрипт, який на момент сабміту форми викликає функцію createPromise(position, delay) стільки разів, скільки ввели в поле amount. Під час кожного виклику передай їй номер промісу (position), що створюється, і затримку, враховуючи першу затримку (delay), введену користувачем, і крок (step).
// Доповни код функції createPromise таким чином, щоб вона повертала один проміс, який виконується або відхиляється через delay часу. Значенням промісу повинен бути об'єкт, в якому будуть властивості position і delay зі значеннями однойменних параметрів. Використовуй початковий код функції для вибору того, що потрібно зробити з промісом - виконати або відхилити.

const formEl = document.querySelector('.form');

formEl.addEventListener('submit', callCreatePromise);

function callCreatePromise(e) {
  e.preventDefault();
  
  const { delay, step, amount } = e.currentTarget.elements;

  if (delay.value < 0 || step.value < 0 || amount.value <= 0) {
    Notiflix.Notify.failure(`❌ ENTER a number greater than ZERO`);
  } else 
  {
    for (let position = 1; position < amount.value; position += 1) {
      const firstDelay = Number(delay.value) + step.value * position;

      createPromise(position, firstDelay)
        .then(({ position, delay }) => {
          Notiflix.Notify.success(
            `✅ Fulfilled promise ${position} in ${delay}ms`
          );
        })
        .catch(({ position, delay }) => {
          Notiflix.Notify.failure(
            `❌ Rejected promise ${position} in ${delay}ms`
          );
        });
    }
  }

  e.currentTarget.reset();

}

function createPromise(position, delay) {
  
  return new Promise((resolve, reject) => {

    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

