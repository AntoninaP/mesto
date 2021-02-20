export class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }

 // запрос данных пользователя с сервера
  getProfileInfo() {
    return fetch(this.baseUrl + 'users/me', {
      headers: this.headers
    })
      .then(this._checkResponse)
  }

  // редактирование данных пользователя
  editProfileInfo(name, about) {
    return fetch(this.baseUrl + 'users/me', {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
      .then(this._checkResponse)
  }

  // загрузка массива карточек с сервера
  getInitialCards() {
    return fetch(this.baseUrl + 'cards', {
      headers: this.headers
    })
      .then(this._checkResponse)
  }

// добавление новой карточки
  addNewCard(name, link) {
    return fetch(this.baseUrl + 'cards', {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
      .then(this._checkResponse)
  }

// редактирование аватара
  addNewAvatar(avatar) {
    return fetch(this.baseUrl + 'users/me/avatar', {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        avatar: avatar,
      })
    })
      .then(this._checkResponse)
  }

  // удаление карточки
  deleteCard(cardId) {
    return fetch(this.baseUrl + `cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: this.headers,
    })
      .then(this._checkResponse)
  }

  //поставить лайк
  putLike(cardId) {
    return fetch(this.baseUrl + `cards/likes/${cardId}`, {
      method: 'PUT',
      headers: this.headers,
    })
      .then(this._checkResponse)
  }

  //удалить лайк
  deleteLike(cardId) {
    return fetch(this.baseUrl + `cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: this.headers,
    })
      .then(this._checkResponse)
  }
}


