//сбор информации пользователя
export default class UserInfo {
  constructor({ name, about, avatar }) {
    this._name = document.querySelector(name);
    this._about = document.querySelector(about);
    this._avatar = document.querySelector(avatar);
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      about: this._about.textContent,
      avatar: this._avatar.src,
    };
  }

  setUserInfo(info) {
    this._name.textContent = info.name;
    this._about.textContent = info.about;
  }

  setAvatarInfo(avatar) {
    this._avatar.src = avatar;
  }
}
