import {Popup} from './Popup.js';
import {popupPreview, previewImagePicture, previewTitle} from '../utils/constants.js';

export class PopupWithImage extends Popup {
  constructor(popup) {
    super(popup);
  }

  open(image, title) {
    previewImagePicture.src = image;
    previewTitle.textContent = title;
    super.open();
  }
}
