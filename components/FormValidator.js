import {popupForm} from "../utils/constants.js";

export class FormValidator {
  constructor(config, popup) {
    this._config = config;
    this._form = popup.querySelector(popupForm);

    this._inputList = this._form.querySelectorAll(this._config.inputSelector);
    this._button = this._form.querySelector(this._config.submitButtonSelector);
  }

  enableValidation() {
    this._setEventListener();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._setButtonState();
  }

  _showError(input) {
    const error = this._form.querySelector(`.${input.id}-error`);
    error.textContent = input.validationMessage;
    input.classList.add(this._config.inputErrorClass);
    error.classList.add(this._config.errorClass);
  }

  _hideError(input) {
    const error = this._form.querySelector(`.${input.id}-error`);
    error.textContent = "";
    input.classList.remove(this._config.inputErrorClass);
    error.classList.remove(this._config.errorClass);
  }

  _checkInputValidity(input) {
    if (input.validity.valid) {
      this._hideError(input);
    } else {
      this._showError(input);
    }
  }

  _setButtonState() {
    const isActive = this._form.checkValidity();
    if (isActive) {
      this._button.classList.remove(this._config.inactiveButtonClass);
      this._button.disabled = false;
    } else {
      this._button.classList.add(this._config.inactiveButtonClass);
      this._button.disabled = true;
    }
  }

  _setEventListener() {
    this._inputList.forEach(input => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
        this._setButtonState();
      });
    });
  }
}
