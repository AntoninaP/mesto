export class Card {

  constructor(data, cardSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  }

// метод для возврата разметки
  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.elements__item')
      .cloneNode(true);

    return cardElement;
  }

  //добавление данных в разметку
  generate() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.elements__image');
    this._cardName = this._element.querySelector('.elements__title');
    this._buttonLike = this._element.querySelector('.elements__button-like');
    this._buttonDelite = this._element.querySelector('.elements__button-delite');
    this._setEventListeners();
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardName.textContent = this._name;

    return this._element;
  }

  // метод обработчик событий
  _setEventListeners() {
    this._buttonLike.addEventListener('click', () => {
      this._giveLike();
    });
    this._buttonDelite.addEventListener('click', () => {
      this._removeItem();
    });
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._link, this._name);
    })
  }

  //добавлениe и удаление лайка
  _giveLike() {
    this._buttonLike.classList.toggle('elements__button-like_black');
  }

//удаление карточки
  _removeItem() {
    this._element.remove();
  }

}








