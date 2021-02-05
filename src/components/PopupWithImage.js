import {Popup} from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(popup, image, title) {
    super(popup);
    this._image = image;
    this._title = title;
  }

  open(image, title) {
    this._image.src = image;
    this._title.textContent = title;
      super.open();
    }
}
