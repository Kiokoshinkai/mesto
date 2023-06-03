//массив для карточек
// const arkhyz = new URL('../images/element_arkhyz.jpg', import.meta.url);
// const chelyabinsk = new URL('../images/element_chelyabinsk-oblast.jpg', import.meta.url);
// const ivanovo = new URL('../images/element_ivanovo.jpg', import.meta.url);
// const kamchatka = new URL('../images/element_kamchatka.jpg', import.meta.url);
// const kholmogorsky = new URL('../images/element_kholmogorsky-rayon.jpg', import.meta.url);
// const baikal = new URL('../images/element_baikal.jpg', import.meta.url);

// export const initialCards = [
//   {
//     name: 'Архыз',
//     link: arkhyz
//   },
//   {
//     name: 'Челябинская область',
//     link: chelyabinsk
//   },
//   {
//     name: 'Иваново',
//     link: ivanovo
//   },
//   {
//     name: 'Камчатка',
//     link: kamchatka
//   },
//   {
//     name: 'Холмогорский район',
//     link: kholmogorsky
//   },
//   {
//     name: 'Байкал',
//     link: baikal
//   }
// ];
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
export const profileAvatar = document.querySelector('.profile__avatar');
export const profileName = document.querySelector('.profile__name');
export const profileStatus = document.querySelector('.profile__status');
//попап
const profileFormPopup = document.querySelector('.popup_place_profile');
const placeFormPopup = document.querySelector('.popup_place_card');
const avatarFormPopup = document.querySelector('.popup_place_avatar')
const imageZoomPopup = document.querySelector('.popup_place_image');
export const placeImage = imageZoomPopup.querySelector('.popup__image');
export const profileForm = profileFormPopup.querySelector('.popup__form_el_profile');
export const placeForm = placeFormPopup.querySelector('.popup__form_el_card');
export const avatarForm = avatarFormPopup.querySelector('.popup__form_el_avatar');
//поля форм
export const formProfileFieldName = profileFormPopup.querySelector('.popup__form-item_el_name');
export const formProfileFieldStatus = profileFormPopup.querySelector('.popup__form-item_el_status');
//кнопки
export const profileButton = profileElement.querySelector('.profile__edit-button');
export const cardButton = profileElement.querySelector('.profile__add-button');
export const avatarButton = profileElement.querySelector('.profile__avatar-btn');

export const cardsContainer = '.elements';
