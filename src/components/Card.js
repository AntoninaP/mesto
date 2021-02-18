
export class Card {

  constructor(data, cardSelector) {
    this._name = data.cardItem.name;
    this._link = data.cardItem.link;
    this._handleCardClick = data.handleCardClick;
    this._handleLikeClick = data.handleLikeClick;
    this._handleDeleteIconClick = data.handleDeleteIconClick;
    this._cardSelector = cardSelector;
    this._id = data.cardItem._id
    this._likes = data.cardItem.likes;
    this._ownerId = data.cardItem.owner._id;
    this._giveLike = this._giveLike.bind(this);
    this._deleteLike = this._deleteLike.bind(this);
    this._removeItem = this._removeItem.bind(this);

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
  generate(id) {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.elements__image');
    this._cardName = this._element.querySelector('.elements__title');
    this._buttonLike = this._element.querySelector('.elements__button-like');
    this._buttonDelite = this._element.querySelector('.elements__button-delite');
    this._compareId(id);
    this._setEventListeners();
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardName.textContent = this._name;
    this._showLikeAmount();

    return this._element;
  }

  // метод обработчик событий
  _setEventListeners() {
    this._buttonLike.addEventListener('click', () => {
      this._handleLikeClick(this._giveLike, this._id, this._deleteLike);
    });
    this._buttonDelite.addEventListener('click', () => {
      this._handleDeleteIconClick(this._removeItem, this._id);
    });
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._link, this._name);
    })
  }

  //добавлениe лайка
  _giveLike(likes) {
    this._setLikes(likes)
    this._buttonLike.classList.add('elements__button-like_black');
    this._showLikeAmount()
  }

  //удаление лайка
  _deleteLike(likes) {
    this._setLikes(likes)
    this._buttonLike.classList.remove('elements__button-like_black');
    this._showLikeAmount()
  }

  //показать количество лайков
  _showLikeAmount() {
    this._element.querySelector('.elements__counter').textContent = this._likes.length;
  }

  //пересчет лайков
  _setLikes(likes) {
    this._likes = likes;
  }

//удаление карточки
  _removeItem() {
    this._element.remove();
  }

// сравнить id
  _compareId(id) {
    if (this._ownerId !== id) {
      this._buttonDelite.remove();
    }
  }
}





