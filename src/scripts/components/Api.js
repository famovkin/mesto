export default class Api {
  static checkServerResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  constructor({ baseUrl, token }, renderLoading) {
    this._baseUrl = baseUrl;
    this._token = token;
    this._renderLoading = renderLoading;
    this._editFormSumbitBtn = document.forms.information.querySelector('.popup__button');
  }

  getUserInfo(renderer) {
    return fetch(`${this._baseUrl}users/me`, {
      headers: {
        authorization: this._token,
      }
    })
    .then(res => Api.checkServerResponse(res))
    .then(res => {
      renderer(res);
      this.userId = res._id;
    })
    .catch(err => console.log(err));
  }

  editUserInfo({ name, job }, renderer) {
    return fetch(`${this._baseUrl}users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        about: job
      })
    })
    .then(res => Api.checkServerResponse(res))
    .then(res => {
      renderer(res);
    })
    .catch(err => console.log(err))
    .finally(() => {
      this._renderLoading(this._editFormSumbitBtn, false);
    });
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}cards`, {
      headers: {
        authorization: this._token
      }
    })
    .then(res => Api.checkServerResponse(res))
    .then(res => {
      return res;
    })
    .catch(err => console.log(err));
  }
}
