
export class Popup {
  constructor(popup) {
    this._closeButton = popup.querySelector('.popup__close-button');
    this._popupOverlay = popup
    this._popup = popup;
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this._handleEscClose = this._handleEscClose.bind(this);

  }
  open () {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close () {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  // закрытие попапа кликом на esc
  _handleEscClose (evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners () {
    this._closeButton.addEventListener('click', this.close);
    // закрытие попапа кликом на оверлей
    this._popupOverlay.addEventListener('click', (event) => {
      if (event.target.classList.contains('popup')) {
      this.close();
      }
    })
  }
}

