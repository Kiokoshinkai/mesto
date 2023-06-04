//управление попапами
export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }
  //открытие попапов
  open() {
    this._popupElement.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }
  //закрытие попапов
  close() {
    this._popupElement.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }
  //закрытие на Esc
  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    //обработчик кнопки закрытия и закрытия по клику на оверлей попапа
    this._popupElement.addEventListener("mousedown", (evt) => {
      if (
        evt.target.classList.contains("popup_opened") ||
        evt.target.classList.contains("popup__close-btn")
      ) {
        this.close();
      }
    });
    //обработчик наведения курсора на оверлей - форму
    this._popupElement.addEventListener("mouseover", (evt) => {
      const isTargetOverlay = evt.target.classList.contains("popup_opened");
      this._popupElement.classList.toggle("popup_pointed", isTargetOverlay);
    });
  }
}
