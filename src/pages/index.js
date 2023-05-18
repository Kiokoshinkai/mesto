import "./index.css";
import Card from "../components/Card.js";
import Section from '../components/Section.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
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
  return cardList.addItem(cardElement);
}

//создание Section и загрузка карточек из массива
const cardList = new Section({ renderer: createNewCard }, cardsContainer);
cardList.renderItems({ renderedItems: initialCards })

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
});
profileButton.addEventListener('click', () => {
  profilePopupForm.open();
  editProfilePopup();
  profileValidator.enableValidation();
});
profilePopupForm.setEventListeners();

//создание новых карточек
const placePopupForm = new PopupWithForm('.popup_place_card', (data) =>{
  createNewCard(data);//вызов функции создание карточки
});
cardButton.addEventListener('click', () => {
  placePopupForm.open()
  cardValidator.enableValidation();
});
placePopupForm.setEventListeners();

//класс валидации формы
const profileValidator = new FormValidator(validationConfig, profileForm);
const cardValidator = new FormValidator(validationConfig, placeForm);
//включение валидации
profileValidator.enableValidation();
cardValidator.enableValidation();
