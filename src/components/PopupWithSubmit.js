import {Popup} from "./Popup.js";

export class PopupWithSubmit extends Popup {
  constructor(popup) {
    super(popup)
    this._element = popup.querySelector('.popup__form');
  }

  setEventListeners() {
    super.setEventListeners()
    // отмена стандартного поведения
    this._element.addEventListener('submit', (evt) => {
      (evt).preventDefault();
      this._action();
      this.close();
    })
  }

  setAction(action) {
      this._action = action;
  }
}
