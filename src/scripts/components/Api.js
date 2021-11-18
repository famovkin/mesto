export default class Api {
  static checkServerResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  constructor({ baseUrl, headers }, renderLoading) {
    this._baseUrl = baseUrl;
    this._headers = headers;
    this._renderLoading = renderLoading;
    this._editFormSumbitBtn = document.forms.information.querySelector('.popup__button');
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}users/me`, {
      headers: this._headers
    })
    .then(res => Api.checkServerResponse(res))
  }

  editUserInfo({ name, job }) {
    return fetch(`${this._baseUrl}users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: job
      })
    })
    .then(res => Api.checkServerResponse(res))
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}cards`, {
      headers: this._headers
    })
    .then(res => Api.checkServerResponse(res))
    .then(res => {
      return res;
    })
    .catch(err => console.log(err));
  }

  pressLike(cardId) {
    return fetch(`${this._baseUrl}cards/likes/${cardId}`, {
      method: 'PUT',
      headers: this._headers
    })
    .then(res => Api.checkServerResponse(res))
  }
}