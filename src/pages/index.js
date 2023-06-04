import './index.css';
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import { validationConfig } from "../utils/constants.js";
import {
  profileForm,
  placeForm,
  avatarForm,
  formProfileFieldName,
  formProfileFieldStatus,
  profileButton,
  cardButton,
  avatarButton,
  cardsContainerSelector,
  profileAvatar,
  token,
  url,
} from "../utils/constants.js";
import Api from "../components/Api.js";

const api = new Api(token, url); //вызов класса api
let userId = null; //для прокидывания нашего айдишника в класс карточки

const deleteConfirmationPopup = new PopupWithConfirmation(".popup_place_trash"); //класс попапа корзины
const imagePopup = new PopupWithImage(".popup_place_image"); //класс попапа с картинкой

//создание класса Section и загрузка карточек из массива
const cardsSection = new Section(
  { renderer: addCardOnPage },
  cardsContainerSelector
);

//класс профиля UserInfo
const profileInfo = new UserInfo({
  name: ".profile__name",
  about: ".profile__status",
  avatar: ".profile__avatar",
});

//класс редактора профиля
const profilePopupForm = new PopupWithForm(".popup_place_profile", (info) => {
  profilePopupForm.handleButtonText("Сохранение..."); //функция смены кнопки на сохранение...
  api
    .editProfile(info) //обновить данные пользователя
    .then((res) => {
      profileInfo.setUserInfo(res); //обновление данных пользователя на странице
    })
    .then(() => {
      profilePopupForm.close(); //нужно закрыть попап после получения ответа
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      profilePopupForm.handleButtonText("Сохранить");
    });
});

//класс создания новых карточек
const placePopupForm = new PopupWithForm(".popup_place_card", (info) => {
  placePopupForm.handleButtonText("Сохранение..."); //функция смены кнопки на сохранение...
  api
    .addCard(info)
    .then((res) => {
      cardsSection.addItem(createNewCard(res)); //вызов функции создание карточки
    })
    .then(() => {
      placePopupForm.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      placePopupForm.handleButtonText("Создать");
    });
});

//класс редактора аватара
const avatarPopupForm = new PopupWithForm(".popup_place_avatar", (info) => {
  avatarPopupForm.handleButtonText("Сохранение..."); //функция смены кнопки на сохранение...
  api
    .editAvatar(info.link) //вызов экземпляра класса апи для функции смены аватара
    .then((res) => {
      profileAvatar.src = res.avatar;
    })
    .then(() => {
      avatarPopupForm.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      avatarPopupForm.handleButtonText("Сохранить");
    });
});

const profileValidator = new FormValidator(validationConfig, profileForm); //класс валидации попапа профиля
const cardValidator = new FormValidator(validationConfig, placeForm); //класс валидации попапа карточки
const avatarValidator = new FormValidator(validationConfig, avatarForm); //класс валидации попапа аватара

//функция создания новой карточки
function createNewCard(data) {
  const card = new Card(data, userId, ".card-template", {
    handleCardClick: () => {
      imagePopup.open(data); //берем данные из card и передаем их в класс попапа с картинкой
    },
    handleTrashClick: () => {
      deleteConfirmationPopup.open(); //открываем подтверждение удаления конкретной карты
      deleteConfirmationPopup.setSubmitAction(() => {
        //прокидываем данную функцию в класс попапа корзины
        api
          .deleteCard(data._id)
          .then(() => {
            deleteConfirmationPopup.close();
            card.deleteCard();
          })
          .catch((err) => {
            console.log(err);
          });
      });
    },
    handleLike: () => {
      const isLiked = card.isLiked();
      if (isLiked) {
        api
          .deleteLike(data._id)
          .then((res) => {
            card.toggleLikeState();
            card.updateLikesCount(res);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        api
          .addLike(data._id)
          .then((res) => {
            card.toggleLikeState();
            card.updateLikesCount(res);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
  });
  const cardElement = card.generateCard();
  return cardElement;
}

//функция добавления карточек на страницу
function addCardOnPage(data) {
  const card = createNewCard(data);
  cardsSection.appendItem(card);
}

//перенос данных в попап профиля
function initProfilePopup() {
  const { name, about } = profileInfo.getUserInfo();
  formProfileFieldName.value = name;
  formProfileFieldStatus.value = about;
}

//загрузить данные пользователя и карточки с сервера при помощи Promise.all
Promise.all([api.getUserData(), api.getInitialCards()])
  .then(([user, cards]) => {
    userId = user._id; //передаем свой id в переменную
    profileInfo.setUserInfo(user); //данные пользователя устанавливаются через класс UserInfo
    profileInfo.setAvatarInfo(user);
    cardsSection.renderItems({ renderedItems: cards }); //карточки загружаются через класс Section
  })
  .catch((err) => {
    console.log(err);
  });

//обработчик клика кнопки профиля
profileButton.addEventListener("click", () => {
  profilePopupForm.open();
  initProfilePopup();
});

//обработчик клика кнопки карточки
cardButton.addEventListener("click", () => {
  placePopupForm.open();
});

//обработчик клика иконки аватара
avatarButton.addEventListener("click", () => {
  avatarPopupForm.open();
});

//установка слушателей
profilePopupForm.setEventListeners();
placePopupForm.setEventListeners();
avatarPopupForm.setEventListeners();
imagePopup.setEventListeners();
deleteConfirmationPopup.setEventListeners();

//включение валидации
profileValidator.enableValidation();
cardValidator.enableValidation();
avatarValidator.enableValidation();
