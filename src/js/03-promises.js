import Notiflix from 'notiflix';

const formRef = document.querySelector('.form');


function createPromise(position, delay) {
  return new Promise ((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay)
  })
}


function fn2(e) {
e.preventDefault();

const {
  elements: { delay, step, amount},
} = e.currentTarget;

delayValue = Number(delay.value);
stepValue = Number(step.value);
amountValue = Number(amount.value);

const onSuccess = ({ position, delay }) => Notiflix.Notify.success(`Fullfilled promise ${position} in ${delay} ms`);
const onError = ({ position, delay }) => Notiflix.Notify.failure(`Rejected promise ${position} in ${delay} ms`);

for(let i = 1; i <= amountValue; i += 1) {
  createPromise(i, delayValue)
  .then(onSuccess)
  .catch(onError);

  delayValue += stepValue;
}

}


formRef.addEventListener('submit', fn2);