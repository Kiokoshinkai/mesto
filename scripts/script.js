//получить доступ к элементам, профиль
const contentElement = document.querySelector('.content');
const profileElement = contentElement.querySelector('.profile');
const profileName = profileElement.querySelector('.profile__name');
const profileStatus = profileElement.querySelector('.profile__status');
//попап
const popups = document.querySelectorAll('.popup');
const profileFormPopup = document.querySelector('.popup_place_profile');
const placeFormPopup = document.querySelector('.popup_place_card');
const imageZoomPopup = document.querySelector('.popup_place_image');
const placeImage = imageZoomPopup.querySelector('.popup__image');
const popupFigcaption = imageZoomPopup.querySelector('.popup__figcaption');
const profileForm = profileFormPopup.querySelector('.popup__form_el_profile');
const placeForm = placeFormPopup.querySelector('.popup__form_el_card');
//поля форм
const formProfileFieldName = profileFormPopup.querySelector('.popup__form-item_el_name');
const formProfileFieldStatus = profileFormPopup.querySelector('.popup__form-item_el_status');
const formPlaceFieldPlace = placeFormPopup.querySelector('.popup__form-item_el_place-name');
const formPlaceFieldLink = placeFormPopup.querySelector('.popup__form-item_el_place-link');
const formErrors = document.querySelectorAll('.popup__form-error');
const formInputs = document.querySelectorAll('.popup__form-item');
//кнопки
const profileSubmitButton = profileFormPopup.querySelector('.popup__save-button_place_profile');
const cardSubmitButton = placeFormPopup.querySelector('.popup__save-button_place_card');
const profileButton = profileElement.querySelector('.profile__edit-button');
const cardButton = profileElement.querySelector('.profile__add-button');
const closeButtons = document.querySelectorAll('.popup__close-btn');
//получить доступ к секции карточек, к темплейт элементу карточки
const cardsContainer = contentElement.querySelector('.elements');
const cardTemplate = contentElement.querySelector('.card-template').content;

//функция открытия попапа с аргументом для переиспользования
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupToEsc);
}

//функция закрытия попапа с аргументом для переиспользования
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupToEsc);
}

//функция переноса данных профиля в поля формы профиля
function fillProfileFormInputs() {
  formProfileFieldName.value = profileName.textContent;
  formProfileFieldStatus.value = profileStatus.textContent;
}

//функция обнуления данных формы Место
function clearFormPlace() {
  formPlaceFieldPlace.value = '';
  formPlaceFieldLink.value = '';
}

//функция обнуления ошибок форм
function clearFormError() {
  const errors = Array.from(formErrors);
  const inputs = Array.from(formInputs);
  errors.forEach((element) => {
    element.classList.remove(validationConfig.errorClass);
  });
  inputs.forEach((element) => {
    element.classList.remove(validationConfig.inputErrorClass);
  });
}

//функция перезаписывает данные профиля с полей ввода
function handleProfileFormSubmit (evt) {
  evt.preventDefault();

  profileName.textContent = formProfileFieldName.value;
  profileStatus.textContent = formProfileFieldStatus.value;

  //нужно вызывать для пддержания логики закрытия попапа
  closePopup(profileFormPopup);
}

//функция добавления карточки
function handlePlaceFormSubmit (evt) {
  evt.preventDefault();

  const placeValueObject = {
    name: formPlaceFieldPlace.value,
    link: formPlaceFieldLink.value
  };

  //добавляем карточку на переднюю позицю
  cardsContainer.prepend(createCard(placeValueObject));

  evt.target.reset();
  //нужно вызывать для пддержания логики закрытия попапа
  closePopup(placeFormPopup);
}

//функция клонирует один элемент(карточку) и заносит в него данные из массива, добавляет карточку первым элементом
function createCard(cardInfo) {
  const templateClone = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImageClone = templateClone.querySelector('.card__image');
  cardImageClone.src = cardInfo.link;
  cardImageClone.alt = cardInfo.name;
  templateClone.querySelector('.card__title').textContent = cardInfo.name;
  //обработчик черных сердец
  templateClone.querySelector('.card__like').addEventListener('click', (evt) => {
    evt.target.classList.toggle('card__like_active');
    });
  //удаление карточек
  templateClone.querySelector('.card__trash').addEventListener('click', (evt) => {
    evt.target.closest('.card').remove();
    });
  //обработка клика по картинке
  cardImageClone.addEventListener('click', () => {
    placeImage.src = cardInfo.link;
    placeImage.alt = cardInfo.name;
    popupFigcaption.textContent = cardInfo.name;
    openPopup(imageZoomPopup)
  });

  return templateClone;
}

//функция перебирает все данные массива и добавляет карточки через функцию createCard
function addAllCardsFromArray() {
  initialCards.forEach(cardInfo => {
    cardsContainer.append(createCard(cardInfo));
  });
}
//вызов функции для добавления всех карточек из массива
addAllCardsFromArray();

//вызов функции по нажатию на кнопку (открыть/закрыть редактор профиля, добавить место)
profileButton.addEventListener('click', () => {
  openPopup(profileFormPopup);
  fillProfileFormInputs();//перенос данных профиля в форму
  clearFormError();//обнуление ошибок
  disableButton(profileSubmitButton, validationConfig);
});
cardButton.addEventListener('click', () => {
  openPopup(placeFormPopup);
  clearFormError();
  disableButton(cardSubmitButton, validationConfig);
});

//функция закрытия на esc
function closePopupToEsc (evt) {
  if (evt.key === 'Escape') {
    closePopup(profileFormPopup);
    closePopup(placeFormPopup);
  }
}

//обработчик всех кнопок закрытия
closeButtons.forEach(button => {
  const buttonsPopup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(buttonsPopup));
});

//обработчик закрытия по клику на оверлей всех попапов
popups.forEach(overlay => {
  overlay.addEventListener('mousedown', evt => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(overlay);
    }
  });
});

//обработчик наведения курсора на оверлей - форму
popups.forEach(overlay => {
  overlay.addEventListener('mouseover', evt => {
    const isTargetOverlay = evt.target.classList.contains('popup_opened');
    overlay.classList.toggle('popup_pointed', isTargetOverlay)
  });
});

//слушатель на форму т.к отправляем данные формы на сервер
profileForm.addEventListener('submit', handleProfileFormSubmit);
placeForm.addEventListener('submit', handlePlaceFormSubmit);

