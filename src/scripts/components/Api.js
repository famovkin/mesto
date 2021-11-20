export default class Api {
  constructor({ baseUrl, headers }, renderLoading, renderError) {
    this._baseUrl = baseUrl;
    this._headers = headers;
    this._renderLoading = renderLoading;
    this._renderError = renderError;
  }

  _checkServerResponse(res) {
    if (res.status <= 200) {
      return res.json();
    }
    return Promise.reject(res)
    .catch(res => this._renderError(res.status))
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}users/me`, {
      headers: this._headers
    })
    .then(res => this._checkServerResponse(res))
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
    .then(res => this._checkServerResponse(res))
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}cards`, {
      headers: this._headers
    })
    .then(res => this._checkServerResponse(res))
    .then(res => {
      return res;
    })
  }

  pressLike(cardId) {
    return fetch(`${this._baseUrl}cards/likes/${cardId}`, {
      method: 'PUT',
      headers: this._headers
    })
    .then(res => this._checkServerResponse(res))
  }

  removeLike(cardId) {
    return fetch(`${this._baseUrl}cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(res => this._checkServerResponse(res))
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then(res => this._checkServerResponse(res))
  }

  addNewCard(newCard) {
    return fetch(`${this._baseUrl}cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: newCard.name,
        link: newCard.link
      })
    })
    .then(res => this._checkServerResponse(res))
  }

  updateProfileAvatar(newAvatarLink) {
    return fetch(`${this._baseUrl}users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: newAvatarLink
      })
    })
    .then(res => this._checkServerResponse(res))
  }
}
