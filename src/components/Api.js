export default class Api {
  constructor(token) {
    this._token = token;
    this._user = 'https://mesto.nomoreparties.co/v1/cohort-66/users/me';
    this._cards = 'https://mesto.nomoreparties.co/v1/cohort-66/cards';
  }

  _resStatus(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  getUser() {
    return fetch(this._user, {
      headers: {
        authorization: this._token
      }
    })
    .then(this._resStatus)
    .catch((err) => {
      console.log(err);
    })
  }

  getCards() {
    return fetch(this._cards, {
      headers: {
        authorization: this._token
      }
    })
    .then(this._resStatus)
    .catch((err) => {
      console.log(err);
    })
  }

  editProfile(input) {
    return fetch(this._user, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(input)
    })
    .then(this._resStatus)
    .catch((err) => {
      console.log(err);
    })
  }

  addCard(input) {
    return fetch(this._cards, {
      method: 'POST',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(input)
    })
    .then(this._resStatus)
    .catch((err) => {
      console.log(err);
    })
  }

  deleteCard(id) {
    return fetch(this._cards + `/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
      }
    })
    .then(this._resStatus)
    .catch((err) => {
      console.log(err);
    })
  }

  deleteLike(id) {
    return fetch(this._cards + `/${id}` + '/likes', {
      method: 'DELETE',
      headers: {
        authorization: this._token,
      }
    })
    .then(this._resStatus)
    .catch((err) => {
      console.log(err);
    })
  }

  addLike(id) {
    return fetch(this._cards + `/${id}` + '/likes', {
      method: 'PUT',
      headers: {
        authorization: this._token,
      }
    })
    .then(this._resStatus)
    .catch((err) => {
      console.log(err);
    })
  }

  editAvatar(input) {
    return fetch(this._user + `/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(input)
    })
    .then(this._resStatus)
    .catch((err) => {
      console.log(err);
    })
  }
}

