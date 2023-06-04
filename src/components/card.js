//класс добавления карточки
export default class Card {
  constructor(
    data,
    userId,
    templateSelector,
    { handleCardClick, handleTrashClick, handleLike }
  ) {
    //конструктор принимает данные карточек и темплейт селектор
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
      .content.querySelector(".card")
      .cloneNode(true);

    return cardElement;
  }

  //проверка лайкнута ли карточка
  isLiked() {
    const myLike = this._likes.some((user) => {
      return user._id === this._userId;
    });
    return myLike;
  }

  //отключить корзину на чужих карточках
  _checkTrashButtonVisibility() {
    if (this._ownerId !== this._userId) {
      this._trash.remove();
    }
  }

  //удалить карточку
  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  //обновление счетчика лайков
  updateLikesCount(data) {
    this._likeCount.textContent = data.likes.length;
    this._likes = data.likes;
  }

  _renderLikes() {
    this._likeCount.textContent = this._likes.length; //загрузить количество лайков
  }

  //установка активного сердца
  _setInitialLikeState() {
    if (this.isLiked()) {
      this._buttonLike.classList.add("card__like_active");
    }
  }

  //переключить состояние сердца
  toggleLikeState() {
    this._buttonLike.classList.toggle("card__like_active");
  }

  //установка слушателей для лайк, корзины, попапа картинки
  _setEventListeners() {
    this._buttonLike.addEventListener("click", this._handleLike);
    this._setInitialLikeState();

    this._trash.addEventListener("click", this._handleTrashClick);

    //изображению добавляется слушатель для срабатывания функции handleCardClick
    this._img.addEventListener("click", this._handleCardClick);
  }

  //генерация готовой карты
  generateCard() {
    this._element = this._getTemplate();
    this._img = this._element.querySelector(".card__image");
    this._trash = this._element.querySelector(".card__trash");
    this._buttonLike = this._element.querySelector(".card__like");
    this._likeCount = this._element.querySelector(".card__like-counter");

    this._element.querySelector(".card__title").textContent = this._name;
    this._img.src = this._link;
    this._img.alt = this._name;

    this._checkTrashButtonVisibility();
    this._renderLikes();

    this._setEventListeners();
    return this._element;
  }
}
