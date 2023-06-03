//класс добавления карточки
export default class Card {
  constructor(data, userId, templateSelector, { handleCardClick, handleTrashClick, handleLike }) {//конструктор принимает данные карточек и темплейт селектор
    this._templateSelector = templateSelector;
    this._name = data.name;
    this._link = data.link;
    this._userId = userId;
    this._ownerId = data.owner._id;
    this._likes = data.likes;
    this._handleCardClick = handleCardClick;
    this._handleTrashClick = handleTrashClick;
    this._handleLike = handleLike;
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

  isLiked() {
    const myLike = this._likes.find((user) => {
      return user._id === this._userId;
    })
    return myLike;
  }

  _hideTrash() {
    if (this._ownerId !== this._userId) {
      this._trash.remove();
    }
  }

  deleteCard() {
    this._element.remove();
  }

  likesCount(data) {
    this._likeCount.textContent = data.likes.length;
  }

  _heartCheck() {
    if (this._likes.filter((data) =>
      data._id === this._userId).length > 0)
  {this._like.classList.add('card__like_active')}
  }

  toggleHeart() {
    this._like.classList.toggle('card__like_active');
  }

  updateLikes(data) {
    this._likes = data.likes;
  }

//установка слушателей для лайк, корзины, попапа картинки
  _setEventListeners() {
    this._like.addEventListener('click', this._handleLike);
    this._heartCheck();

    this._trash.addEventListener('click', this._handleTrashClick);

    //изображению добавляется слушатель для срабатывания функции handleCardClick
    this._img.addEventListener('click', this._handleCardClick);
  }

//генерация готовой карты
  generateCard() {
    this._element = this._getTemplate();
    this._img = this._element.querySelector('.card__image');
    this._trash = this._element.querySelector('.card__trash');
    this._like = this._element.querySelector('.card__like');
    this._likeCount = this._element.querySelector('.card__like-counter');

    this._element.querySelector('.card__title').textContent = this._name;
    this._img.src = this._link;
    this._img.alt = this._name;

    this._hideTrash();

    this._setEventListeners();
    return this._element;
  }
}
