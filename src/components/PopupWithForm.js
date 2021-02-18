import {Popup} from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popup, submitCb) {
    super(popup)
    this._element = popup.querySelector('.popup__form');
    this._submitCb = submitCb;
    this._inputList = this._popup.querySelectorAll('.popup__input');
    this._formValues = {};
    this._originalButtonText = this._element.querySelector('.popup__button').textContent;
  }

  //собираем данных всех полей формы и записываем в объект
  _getInputValues() {
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
  }

  setDefaultValues(formValues) {
    this._inputList.forEach((input) => {
      if (formValues[input.name]) {
        input.value = formValues[input.name]
      }
    });
  }

  setEventListeners() {
    super.setEventListeners()
    // отмена стандартного поведения
    this._element.addEventListener('submit', (evt) => {
      (evt).preventDefault();
      this._getInputValues();
      this._submitCb(this._formValues);
      this._renderLoading(true);
    })
  }

  // изменение текста кнопки при загрузке
  _renderLoading(isLoad) {
    if (isLoad) {
      this._element.querySelector('.popup__button').textContent = 'Cохрaнение...'
    } else {
      this._element.querySelector('.popup__button').textContent = this._originalButtonText;
    }
  }

  close() {
    super.close();
    this._renderLoading(false);
    this._element.reset();
  }
}
