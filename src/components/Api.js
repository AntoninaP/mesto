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
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject('сервер не доступен')
        })
    })
  }



  // другие методы работы с API
}


