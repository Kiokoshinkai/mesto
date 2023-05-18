//сбор информации пользователя
export default class UserInfo {
  constructor ({ name, status }) {
    this._name = document.querySelector(name);
    this._status = document.querySelector(status);
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      status: this._status.textContent
    }
  }

  setUserInfo(info) {
    this._name.textContent = info.name;
    this._status.textContent = info.status;
  }
}
