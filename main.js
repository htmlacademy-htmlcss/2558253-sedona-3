const modal = document.querySelector(".modal");
const openModalBtn = document.querySelector(".hotel-search__btn");
const closeModalBtn = document.querySelector(".modal__close-btn");

const toggle = document.querySelector('.tooltip__toggle');
const tooltip = document.querySelector('.tooltip__text');

openModalBtn.addEventListener("click", () => {
  document.body.style.overflow = 'hidden';
  modal.showModal();
})

closeModalBtn.addEventListener("click", () => {
  modal.close();
})

modal.addEventListener("click", (evt) => {
  if (evt.target === modal) {
    modal.close();
  }
})

modal.addEventListener('close', () => {
  resetFunctions.forEach((reset) => reset());
  document.body.style.overflow = '';
});

toggle.addEventListener('click', () => {
  const isOpen = tooltip.classList.toggle('tooltip__text--visible');
  toggle.setAttribute('aria-expanded', isOpen);
});

document.addEventListener('click', (event) => {
  if (!event.target.closest('.tooltip')) {
    tooltip.classList.remove('tooltip__text--visible');
    toggle.setAttribute('aria-expanded', 'false');
  }
});

function initCounter(wrapper) {
  const minusBtn = wrapper.querySelector('.modal-form__counter-btn--minus');
  const plusBtn = wrapper.querySelector('.modal-form__counter-btn--plus');
  const input = wrapper.querySelector('.modal-form__counter-input');

  const min = input.min ? Number(input.min) : 0;
  const max = input.max ? Number(input.max) : 99;

  const updateButtonsState = () => {
    const value = Number(input.value);
    minusBtn.disabled = value <= min;
    plusBtn.disabled = value >= max;
  };

  minusBtn.addEventListener('click', () => {
    const value = Number(input.value);
    if (value > min) {
      input.value = value - 1;
    }
    updateButtonsState();
  });

  plusBtn.addEventListener('click', () => {
    const value = Number(input.value);
    if (value < max) {
      input.value = value + 1;
    }
    updateButtonsState();
  });

  input.addEventListener('change', () => {
    let value = Number(input.value);
    if (Number.isNaN(value)) value = min;
    value = Math.min(Math.max(value, min), max);
    input.value = value;
    updateButtonsState();
  });

  updateButtonsState();

  return function resetCounter() {
    input.value = input.defaultValue;
    updateButtonsState();
  };
}

const resetFunctions = Array.from(
  modal.querySelectorAll('.modal-form__counter-wrapper')
).map(initCounter);
