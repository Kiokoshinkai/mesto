import {Card} from './card.js';
import {FormValidator} from './formValidator.js';
import {validationConfig} from './validationConfig.js';
import {initialCards} from './cardsConfig.js';

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

  //добавляем карточку на переднюю позицю через класс
  renderElements(placeValueObject, cardsContainer);

  evt.target.reset();
  //нужно вызывать для пддержания логики закрытия попапа
  closePopup(placeFormPopup);
}

//вызов функции по нажатию на кнопку (открыть/закрыть редактор профиля, добавить место)
profileButton.addEventListener('click', () => {
  openPopup(profileFormPopup);
  fillProfileFormInputs();//перенос данных профиля в форму
  // clearFormError();//обнуление ошибок
  profileValidator.enableValidation();
  // disableButton(profileSubmitButton, validationConfig);
});
cardButton.addEventListener('click', () => {
  openPopup(placeFormPopup);
  // clearFormError();
  cardValidator.enableValidation();
  // disableButton(cardSubmitButton, validationConfig);
});

//функция закрытия на esc
function closePopupToEsc (evt) {
  if (evt.key === 'Escape') {
    closePopup(profileFormPopup);
    closePopup(placeFormPopup);
    closePopup(imageZoomPopup);
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


//рендер карты из массива с данными
function renderElements(item, cards) {
  const card = new Card(item, '.card-template');

  const cardElement = card.generateCard();
  cards.prepend(cardElement);
}
//отрисовка карточек из массива
initialCards.forEach(item => {
  renderElements(item, cardsContainer);
});

const profileValidator = new FormValidator(validationConfig, profileForm);
const cardValidator = new FormValidator(validationConfig, placeForm);

profileValidator.enableValidation();
cardValidator.enableValidation();

export {imageZoomPopup, placeImage, popupFigcaption, openPopup};
