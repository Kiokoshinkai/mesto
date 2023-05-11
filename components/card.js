import {imageZoomPopup, placeImage, popupFigcaption} from '../utils/constants.js';
import {openPopup} from '../pages/index.js';

//класс добавления карточки
class Card {
  constructor(data, templateSelector) {//конструктор принимает данные карточек и темплейт селектор
    this._templateSelector = templateSelector;
    this._name = data.name;
    this._link = data.link;
  }

//клон темплейта
  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);

    return cardElement;
  }
//установка слушателей для лайк, корзины, попапа картинки
  _setEventListeners() {
    this._element.querySelector('.card__like').addEventListener('click', (evt) => {
      evt.target.classList.toggle('card__like_active');
      });

    this._element.querySelector('.card__trash').addEventListener('click', (evt) => {
      this._element.remove();
      });

    this._img.addEventListener('click', () => {
      placeImage.src = this._link;
      placeImage.alt = this._name;
      popupFigcaption.textContent = this._name;
      openPopup(imageZoomPopup);
    });
  }
//генерация готовой карты
  generateCard() {
    this._element = this._getTemplate();
    this._img = this._element.querySelector('.card__image');

    this._element.querySelector('.card__title').textContent = this._name;
    this._img.src = this._link;
    this._img.alt = this._name;

    this._setEventListeners();
    return this._element;
  }
}

export default Card;
