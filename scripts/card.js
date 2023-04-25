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
      evt.target.closest('.card').remove();
      });

    this._element.querySelector('.card__image').addEventListener('click', () => {
      placeImage.src = this._link;
      placeImage.alt = this._name;
      popupFigcaption.textContent = this._name;
      openPopup(imageZoomPopup);
    });
  }
//генерация готовой карты
  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.card__title').textContent = this._name;
    this._element.querySelector('.card__image').src = this._link;
    this._element.querySelector('.card__image').alt = this._name;

    return this._element;
  }
}
//рендер карты из массива с данными
const renderElements = () => {
  initialCards.forEach((item) => {
    const card = new Card(item, '.card-template');

    const cardElement = card.generateCard();
    cardsContainer.append(cardElement);
  });
};

renderElements();


