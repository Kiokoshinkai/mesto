import FormValidator from '../components/formValidator.js';
import {validationConfig} from '../utils/constants.js';

import {profileName, profileStatus, popups, profileFormPopup, placeFormPopup, imageZoomPopup,
        profileForm, placeForm, formProfileFieldName, formProfileFieldStatus,
        formPlaceFieldPlace, formPlaceFieldLink, profileButton, cardButton, closeButtons, cardsContainer} from '../utils/constants.js';

import Section from '../components/section.js';
import {initialCards} from '../utils/constants.js';

const cardList = new Section({ items: initialCards}, cardsContainer);

cardList.renderItems();

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
  new Section(placeValueObject, cardsContainer);

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
// function renderElements(item, cards) {
//   const card = new Card(item, '.card-template');

//   const cardElement = card.generateCard();
//   cards.prepend(cardElement);
// }
//отрисовка карточек из массива
// initialCards.forEach(item => {
//   renderElements(item, cardsContainer);
// });



const profileValidator = new FormValidator(validationConfig, profileForm);
const cardValidator = new FormValidator(validationConfig, placeForm);

profileValidator.enableValidation();
cardValidator.enableValidation();



export {openPopup};
