import {Popup} from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popup, submitCb) {
    super(popup)
    this._element = popup.querySelector('.popup__form');
    this._submitCb = submitCb;
  }

  //собираем данных всех полей формы и записываем в объект
  _getInputValues () {
    this._inputList = this._popup.querySelectorAll('.popup__input');
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
  }

  setEventListeners () {
    super.setEventListeners()
    // отмена стандартного поведения
    this._element.addEventListener('submit', (evt) => {
      (evt).preventDefault();
      this._getInputValues();
      this._submitCb(this._formValues);
      this.close();
    })
  }

  close() {
    super.close();
    this._element.reset();
  }
}
