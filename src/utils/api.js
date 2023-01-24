class Api {
  constructor(data) {
    this._baseUrl = data.baseUrl;
    this._headers = data.headers;
  }
  _getResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}cards`, {
      method: 'GET',
      headers: this._headers,
    })
      .then((res) => this._getResponse(res))
  }
  createCard({name, link}) {
    return fetch(`${this._baseUrl}cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({ name, link })
    })
      .then(res => this._getResponse(res));
  }
  deleteCard(cardId) {
    return fetch(`${this._baseUrl}cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then((res) => this._getResponse(res))
  }

  setLike(cardId) {
    return fetch(`${this._baseUrl}cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers,
    })
      .then((res) => this._getResponse(res))
  }

  deleteLike(cardId) {
    return fetch(`${this._baseUrl}cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then((res) => this._getResponse(res))
  }
  getUserInfo() {
    return fetch(`${this._baseUrl}users/me`, {
      method: 'GET',
      headers: this._headers,
    })
      .then((res) => this._getResponse(res))
  }

  editUserInfo(data) {
    return fetch(`${this._baseUrl}users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(data)
    })
      .then(res => this._getResponse(res));
  }

  editAvatar(avatar) {
    return fetch(`${this._baseUrl}users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify( avatar )
    })
      .then((res) => this._getResponse(res))
  }
}
const api = new Api({ 
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-54/',
  headers: {
authorization: 'e73982ce-3140-4f09-8668-b08c6beaa106',
'Content-Type': 'application/json'
}});

export default api;