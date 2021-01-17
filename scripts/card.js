
export class Card {

  constructor(data) {
    this._name = data.name;
    this._link = data.link;
  }

// метод для возврата разметки
  _getTemplate() {
    const cardElement = document
      .querySelector('.template')
      .content
      .querySelector('.elements__item')
      .cloneNode(true);

    return cardElement;
  }

  //добавление данных в разметку
  generate() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector('.elements__image').src = this._link;
    this._element.querySelector('.elements__title').textContent = this._name;

    return this._element;
  }

  // метод обработчик событий
  _setEventListeners() {
    this._element.querySelector('.elements__button-like').addEventListener('click', () => {
      this._giveLike();
    });
    this._element.querySelector('.elements__button-delite').addEventListener('click', () => {
      this._removeItem();
    });
  }

  //добавлениe и удаление лайка
  _giveLike() {
    this._element.querySelector('.elements__button-like').classList.toggle('elements__button-like_black');
  }

//удаление карточки
  _removeItem() {
    this._element.remove();
  }

}








