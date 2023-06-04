//конфиг для валидации
export const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__form-item",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_disabled",
  inputErrorClass: "popup__form-item_type_error",
  errorClass: "popup__form-error_visible",
};

//получить доступ к элементам, профиль
const contentElement = document.querySelector(".content");
const profileElement = contentElement.querySelector(".profile");
export const profileAvatar = document.querySelector(".profile__avatar");
//попап
const profileFormPopup = document.querySelector(".popup_place_profile");
const placeFormPopup = document.querySelector(".popup_place_card");
const avatarFormPopup = document.querySelector(".popup_place_avatar");
const imageZoomPopup = document.querySelector(".popup_place_image");
export const placeImage = imageZoomPopup.querySelector(".popup__image");
export const profileForm = profileFormPopup.querySelector(
  ".popup__form_el_profile"
);
export const placeForm = placeFormPopup.querySelector(".popup__form_el_card");
export const avatarForm = avatarFormPopup.querySelector(
  ".popup__form_el_avatar"
);
//поля форм
export const formProfileFieldName = profileFormPopup.querySelector(
  ".popup__form-item_el_name"
);
export const formProfileFieldStatus = profileFormPopup.querySelector(
  ".popup__form-item_el_status"
);
//кнопки
export const profileButton = profileElement.querySelector(
  ".profile__edit-button"
);
export const cardButton = profileElement.querySelector(".profile__add-button");
export const avatarButton = profileElement.querySelector(
  ".profile__avatar-btn"
);

export const cardsContainerSelector = ".elements";
export const token = "30890c08-2ed4-44b3-b5d6-ec734b5a14d4";
export const url = "https://mesto.nomoreparties.co/v1/cohort-66/";
