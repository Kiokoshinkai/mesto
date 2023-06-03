// import './index.css';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithConfirmation from '../components/popupWithConfirmation.js';
import {validationConfig} from '../utils/constants.js';
import {initialCards} from '../utils/constants.js';
import {profileForm, placeForm, formProfileFieldName, formProfileFieldStatus,
        profileButton, cardButton, cardsContainer} from '../utils/constants.js';
import Api from '../components/Api.js';

const api = new Api('30890c08-2ed4-44b3-b5d6-ec734b5a14d4');

//загрузить данные пользователя с сервера
api.getUser().then(info => {
  document.querySelector('.profile__avatar').src = info.avatar
  document.querySelector('.profile__name').textContent = info.name
  document.querySelector('.profile__status').textContent = info.about
  userId = info._id;
})
.catch((err) => {
  console.log(err);
});

//загрузить карточки с сервера
api.getCards().then(data => {
  cardList.renderItems({ renderedItems: data })
  data.forEach(item => {
      cardList.addItem(createNewCard(item));
      document.querySelector('.card__like-counter').textContent = item.likes.length; //загрузить количество лайков
    })
  })
  .catch((err) => {
    console.log(err);
  });

let userId = null;

//функция создания новой карточки
const createNewCard = (data) => {
  const card = new Card(data, userId, '.card-template', {
  handleCardClick: () => {
    imagePopup.open(data); //берем данные из card и передаем их в класс попапа с картинкой
  },
  handleTrashClick: () => {
    deleteConfirmationPopup.open(); //открываем подтверждение удаления конкретной карты
    deleteConfirmationPopup.setSubmitAction(() => {
      api.deleteCard(data._id)
      .then(() => {
        card.deleteCard();
      })
      .catch((err) => {
        console.log(err);
      });
    });
    userId = data._id;
  },
  handleLike: () => {
    const isLiked = card.isLiked()
    if(isLiked) {
      api.deleteLike(data._id)
      .then(res => {
        card.toggleHeart();
        card.likesCount(res);
        card.updateLikes(res);
      })
      .catch((err) => {
        console.log(err);
      })
    } else {
      api.addLike(data._id)
      .then(res => {
        card.toggleHeart();
        card.likesCount(res);
        card.updateLikes(res);
      })
      .catch((err) => {
        console.log(err);
      })
    }
  }
});

  const cardElement = card.generateCard();
  return cardElement;
}

//создание Section и загрузка карточек из массива
const cardList = new Section({ renderer: createNewCard }, cardsContainer);

//попап корзины
const deleteConfirmationPopup = new PopupWithConfirmation('.popup_place_trash');
deleteConfirmationPopup.setEventListeners();

//класс профиля UserInfo
const profileInfo = new UserInfo({ name: '.profile__name', about: '.profile__status' });

//перенос данных в попап профиля
const editProfilePopup = () => {
  const {name, about} = profileInfo.getUserInfo();
  formProfileFieldName.value = name;
  formProfileFieldStatus.value = about;
}

//попап с картинкой
const imagePopup = new PopupWithImage('.popup_place_image');
imagePopup.setEventListeners();

//редактор профиля
const profilePopupForm = new PopupWithForm('.popup_place_profile', (info) =>{
  profileInfo.setUserInfo(info);
  api.editProfile(profilePopupForm.getInputValues()) //обновить данные пользователя
  .catch((err) => {
    console.log(err);
  });
});
profileButton.addEventListener('click', () => {
  profilePopupForm.open();
  editProfilePopup();
});
profilePopupForm.setEventListeners();

//создание новых карточек
const placePopupForm = new PopupWithForm('.popup_place_card', () =>{
  api.addCard(placePopupForm.getInputValues())
  .then(res => {
    cardList.addItem(createNewCard(res));//вызов функции создание карточки
  })
  .catch((err) => {
    console.log(err);
  });
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

