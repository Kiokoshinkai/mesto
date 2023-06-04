export default class Api {
  constructor(token, url) {
    this._token = token;
    this._url = url;
  }

  _getResponseData(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  getUserData() {
    return fetch(this._url + `users/me`, {
      headers: {
        authorization: this._token,
      },
    }).then(this._getResponseData);
  }

  getInitialCards() {
    return fetch(this._url + `cards`, {
      headers: {
        authorization: this._token,
      },
    }).then(this._getResponseData);
  }

  editProfile(input) {
    return fetch(this._url + `users/me`, {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    }).then(this._getResponseData);
  }

  addCard(input) {
    return fetch(this._url + `cards`, {
      method: "POST",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    }).then(this._getResponseData);
  }

  deleteCard(id) {
    return fetch(this._url + `cards/${id}`, {
      method: "DELETE",
      headers: {
        authorization: this._token,
      },
    }).then(this._getResponseData);
  }

  deleteLike(id) {
    return fetch(this._url + `cards/${id}/likes`, {
      method: "DELETE",
      headers: {
        authorization: this._token,
      },
    }).then(this._getResponseData);
  }

  addLike(id) {
    return fetch(this._url + `cards/${id}/likes`, {
      method: "PUT",
      headers: {
        authorization: this._token,
      },
    }).then(this._getResponseData);
  }

  editAvatar(data) {
    return fetch(this._url + `users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ avatar: data }),
    }).then(this._getResponseData);
  }
}
