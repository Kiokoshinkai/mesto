//класс добавления карточки
export default class Card {
  constructor(data, templateSelector, { handleCardClick }) {//конструктор принимает данные карточек и темплейт селектор
    this._templateSelector = templateSelector;
    this._name = data.name;
    this._link = data.link;
    this._handleCardClick = handleCardClick;
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
    //изображению добавляется слушатель для срабатывания функции handleCardClick
    this._img.addEventListener('click', this._handleCardClick);
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
