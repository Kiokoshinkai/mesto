//сбор информации пользователя
export default class UserInfo {
  constructor ({ name, about }) {
    this._name = document.querySelector(name);
    this._about = document.querySelector(about);
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      about: this._about.textContent
    }
  }

  setUserInfo(info) {
    this._name.textContent = info.name;
    this._about.textContent = info.about;
  }
}
