function showError(form, input, config) {
  const error = form.querySelector(`.${input.id}-error`);
  error.textContent = input.validationMessage;
  input.classList.add(config.inputErrorClass);
  error.classList.add(config.errorClass);
}

function hideError(form, input, config) {
  const error = form.querySelector(`.${input.id}-error`);
  error.textContent = "";
  input.classList.remove(config.inputErrorClass);
  error.classList.remove(config.errorClass);
}

function checkInputValidity(form, input, config) {
  if (input.validity.valid) {
    hideError(form, input, config);
  } else {
    showError(form, input, config);
  }
}

function setButtonState(button, isActive, config) {
  if (isActive) {
    button.classList.remove(config.inactiveButtonClass);
    button.disabled = false;
  } else {
    button.classList.add(config.inactiveButtonClass);
    button.disabled = true;
  }
}

function setEventListener(form, config) {
  const inputList = form.querySelectorAll(config.inputSelector);
  const submitButton = form.querySelector(config.submitButtonSelector);
  inputList.forEach(input => {
    input.addEventListener('input', (event) => {
      checkInputValidity(form, input, config);
      setButtonState(submitButton, form.checkValidity(), config);
    });
  });
}

function enableValidation(config) {
  const forms = document.querySelectorAll(config.formSelector);
  forms.forEach(form => {
    setEventListener(form, config);
    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    const submitButton = form.querySelector(config.submitButtonSelector);
    setButtonState(submitButton, form.checkValidity(), config);
  });
}

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_submit_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

enableValidation(validationConfig);






