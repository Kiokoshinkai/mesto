import "./index.css";
import Card from "../components/card.js";
import Section from '../components/section.js';
import FormValidator from '../components/formValidator.js';
import Popup from "../components/popup.js";
import PopupWithImage from "../components/popupWithImage.js";
import PopupWithForm from "../components/popupWithForm.js";
import UserInfo from "../components/userInfo.js";
import {validationConfig} from '../utils/constants.js';
import {initialCards} from '../utils/constants.js';
import {profileForm, placeForm, formProfileFieldName, formProfileFieldStatus,
        profileButton, cardButton, cardsContainer} from '../utils/constants.js';

//функция создания новой карточки
const createNewCard = (data) => {
  const card = new Card(data, '.card-template', { handleCardClick: () => {
    imagePopup.open(data); //берем данные из card и передаем их в класс попапа с картинкой
  }});
  const cardElement = card.generateCard();
  cardList.addItem(cardElement);
  return cardElement;
}

//создание Section и загрузка карточек из массива
const cardList = new Section({ items: initialCards, renderer: createNewCard}, cardsContainer);

cardList.renderItems();

//класс профиля UserInfo
const profileInfo = new UserInfo({ name: '.profile__name', status: '.profile__status' });

//перенос данных в попап профиля
const editProfilePopup = () => {
  const {name, status} = profileInfo.getUserInfo();
  formProfileFieldName.value = name;
  formProfileFieldStatus.value = status;
}

//открытие попапа профиля
const openProfilePopup = new Popup('.popup_place_profile');
openProfilePopup.setEventListeners();
profileButton.addEventListener('click', () => {
  openProfilePopup.open();
  editProfilePopup();
});

//открытие попапа место
const addPlacePopup = new Popup('.popup_place_card');
addPlacePopup.setEventListeners();
cardButton.addEventListener('click', () => {
  addPlacePopup.open()
});

//попап с картинкой
const imagePopup = new PopupWithImage('.popup_place_image');
imagePopup.setEventListeners();

//редактор профиля
const profilePopupForm = new PopupWithForm('.popup_place_profile', (data) =>{
  profileInfo.setUserInfo(data);
});
profilePopupForm.setEventListeners();

//создание новых карточек
const placePopupForm = new PopupWithForm('.popup_place_card', (data) =>{
  createNewCard(data);//вызов функции создание карточки
});
placePopupForm.setEventListeners();

//класс валидации формы
const profileValidator = new FormValidator(validationConfig, profileForm);
const cardValidator = new FormValidator(validationConfig, placeForm);
//включение валидации
profileValidator.enableValidation();
cardValidator.enableValidation();
