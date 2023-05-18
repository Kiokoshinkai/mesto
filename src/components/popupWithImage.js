import Popup from "./popup.js";

//попап с картинкой
export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImg = this._popupElement.querySelector('.popup__image');
    this._caption = this._popupElement.querySelector('.popup__figcaption');
  }

  open(data) {//передача через колбек класса Card
    this._popupImg.src = data.link;
    this._popupImg.alt = data.name;
    this._caption.textContent =  data.name;
    super.open();
    };
}
