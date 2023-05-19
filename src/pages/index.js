import './index.css';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import {validationConfig} from '../utils/constants.js';
import {initialCards} from '../utils/constants.js';
import {profileForm, placeForm, formProfileFieldName, formProfileFieldStatus,
        profileButton, cardButton, cardsContainer, contentElement} from '../utils/constants.js';

//функция создания новой карточки
const createNewCard = (data) => {
  const card = new Card(data, '.card-template', { handleCardClick: () => {
    imagePopup.open(data); //берем данные из card и передаем их в класс попапа с картинкой
  }});
  const cardElement = card.generateCard();
  return cardElement;
}

//создание Section и загрузка карточек из массива
const cardList = new Section({ renderer: createNewCard }, cardsContainer);
cardList.renderItems({ renderedItems: initialCards });
initialCards.forEach((item) => {
  cardList.addItem(createNewCard(item));
});

//класс профиля UserInfo
const profileInfo = new UserInfo({ name: '.profile__name', status: '.profile__status' });

//перенос данных в попап профиля
const editProfilePopup = () => {
  const {name, status} = profileInfo.getUserInfo();
  formProfileFieldName.value = name;
  formProfileFieldStatus.value = status;
}

//попап с картинкой
const imagePopup = new PopupWithImage('.popup_place_image');
imagePopup.setEventListeners();

//редактор профиля
const profilePopupForm = new PopupWithForm('.popup_place_profile', (data) =>{
  profileInfo.setUserInfo(data);
  profileValidator.enableValidation();
});
profileButton.addEventListener('click', () => {
  profilePopupForm.open();
  editProfilePopup();
});
profilePopupForm.setEventListeners();

//создание новых карточек
const placePopupForm = new PopupWithForm('.popup_place_card', (data) =>{
  const newCard = createNewCard(data);//вызов функции создание карточки
  contentElement.querySelector(cardsContainer).prepend(newCard);
  cardValidator.enableValidation();
});
cardButton.addEventListener('click', () => {
  placePopupForm.open()
});
placePopupForm.setEventListeners();

//класс валидации формы
const profileValidator = new FormValidator(validationConfig, profileForm);
const cardValidator = new FormValidator(validationConfig, placeForm);
//включение валидации
profileValidator.enableValidation();
cardValidator.enableValidation();
