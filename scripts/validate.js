//валидация попапов

//функция добавления класса с ошибкой
const showInputError = (formElement, inputElement, errorMessage) => {
  inputElement.classList.add('popup__input_type_error');
  const formError = formElement.querySelector(`.${inputElement.id}-error`);
  formError.classList.add('popup__input-error_active');
  formError.textContent = errorMessage;
};

//функция удаления класса с ошибкой
const hideInputError = (formElement, inputElement) => {
  inputElement.classList.remove('popup__input_type_error');
  const formError = formElement.querySelector(`.${inputElement.id}-error`);
  formError.classList.remove('popup__input-error_active');
  formError.textContent = '';
};

//функция проверки валидности поля
const isValid = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('popup__button_submit_inactive');
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove('popup__button_submit_inactive');
    buttonElement.disabled = false;
  }
};

// проверка все ли поля валидны
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

//функция добавления слушателей для всех полей ввода
const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.popup__button');
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

//функция добавления обработчиков всем формам
const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (event) => {
      event.preventDefault();
    });
    setEventListeners(formElement);
  });
};
enableValidation();









