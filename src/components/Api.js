export class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

 // запрос данных пользователя с сервера
  getProfileInfo() {
    return fetch(this.baseUrl + 'users/me', {
      headers: this.headers
    })
      .then((res) => {
        if (res.ok){
          return res.json();
        }
          return Promise.reject('сервер не доступен')
      })
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
      .then((res) => {
        if (res.ok){
          return res.json();
        }
        return Promise.reject('сервер не доступен')
      })
  }

  // загрузка массива карточек с сервера
  getInitialCards() {
    return fetch(this.baseUrl + 'cards', {
      headers: this.headers
    })
      .then((res) => {
        if (res.ok){
          return res.json();
        }
        return Promise.reject('сервер не доступен')
      })
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
        .then((res) => {
          if (res.ok){
            return res.json();
          }
          return Promise.reject('сервер не доступен')
        })
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
      .then((res) => {
        if (res.ok){
          return res.json();
        }
        return Promise.reject('сервер не доступен')
      })
  }

  // удаление карточки
  deleteCard(id) {
    return fetch(this.baseUrl + 'cards/cardId', {
      method: 'DELETE',
      headers: this.headers,
      body: JSON.stringify({
        _id: id,
      })
    })
      .then((res) => {
        if (res.ok){
          return res.json();
        }
        return Promise.reject('сервер не доступен')
      })
  }

  //поставить лайк
  putLike() {
    return fetch(this.baseUrl + 'cards/likes/cardId', {
      method: 'PUT',
      headers: this.headers,
      body: JSON.stringify({

      })
    })
      .then((res) => {
        if (res.ok){
          return res.json();
        }
        return Promise.reject('сервер не доступен')
      })
  }

  //удалить лайк
  deleteLike() {
    return fetch(this.baseUrl + 'cards/likes/cardId', {
      method: 'DELETE',
      headers: this.headers,
      body: JSON.stringify({

      })
    })
      .then((res) => {
        if (res.ok){
          return res.json();
        }
        return Promise.reject('сервер не доступен')
      })
  }


}


