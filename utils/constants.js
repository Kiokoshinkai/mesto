//массив для карточек
export const initialCards = [
  {
    name: 'Архыз',
    link: './images/element_arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: './images/element_chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: './images/element_ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: './images/element_kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: './images/element_kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: './images/element_baikal.jpg'
  }
];
//конфиг для валидации
export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__form-item',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__form-item_type_error',
  errorClass: 'popup__form-error_visible'
}

//получить доступ к элементам, профиль
const contentElement = document.querySelector('.content');
const profileElement = contentElement.querySelector('.profile');
//попап
export const popups = document.querySelectorAll('.popup');
const profileFormPopup = document.querySelector('.popup_place_profile');
const placeFormPopup = document.querySelector('.popup_place_card');
const imageZoomPopup = document.querySelector('.popup_place_image');
export const placeImage = imageZoomPopup.querySelector('.popup__image');
export const profileForm = profileFormPopup.querySelector('.popup__form_el_profile');
export const placeForm = placeFormPopup.querySelector('.popup__form_el_card');
//поля форм
export const formProfileFieldName = profileFormPopup.querySelector('.popup__form-item_el_name');
export const formProfileFieldStatus = profileFormPopup.querySelector('.popup__form-item_el_status');
//кнопки
export const profileButton = profileElement.querySelector('.profile__edit-button');
export const cardButton = profileElement.querySelector('.profile__add-button');

export const cardsContainer = '.elements';
