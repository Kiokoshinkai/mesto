// Получить доступ к элементам
const contentElement = document.querySelector('.content');
const profileElement = contentElement.querySelector('.profile');
const profilePopup = document.querySelector('.popup_place_profile');
const cardPopup = document.querySelector('.popup_place_card');
const imagePopup = document.querySelector('.popup_place_image');
const popupProfileForm = profilePopup.querySelector('.popup__form_el_profile');
const popupCardForm = cardPopup.querySelector('.popup__form_el_card');
const profileName = profileElement.querySelector('.profile__name');
const profileStatus = profileElement.querySelector('.profile__status');

const profileButton = profileElement.querySelector('.profile__edit-button');
const cardButton = profileElement.querySelector('.profile__add-button');
const profileCloseButton = profilePopup.querySelector('.popup__close-btn_place_profile');
const cardCloseButton = cardPopup.querySelector('.popup__close-btn_place_card');
const imageCloseButton = imagePopup.querySelector('.popup__close-btn_place_image');

const formName = profilePopup.querySelector('.popup__form-item_el_name');
const formStatus = profilePopup.querySelector('.popup__form-item_el_status');
const placeName = cardPopup.querySelector('.popup__form-item_el_place-name');
const placeLink = cardPopup.querySelector('.popup__form-item_el_place-link');

//Получаем доступ к секции карточек, к темплейт элементу карточки
const cardElements = contentElement.querySelector('.elements');
const cardTemplate = contentElement.querySelector('.card-template').content;

//функция открытия попапа с аргументом для переиспользования
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

//Функция закрытия попапа с аргументом для переиспользования
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

//Функция сохранения данных профиля в полях формы
function getNameAndStatusForForm() {
  formName.value = profileName.textContent;
  formStatus.value = profileStatus.textContent;
}

// функция перезаписывает данные профиля с полей ввода
function handleFormSubmit (evt) {
  evt.preventDefault();

  profileName.textContent = formName.value;
  profileStatus.textContent = formStatus.value;

  // нужно вызывать для пддержания логики закрытия попапа
  closePopup(profilePopup);
}

// функция добавления карточки
function savePlaceSubmit (evt) {
  evt.preventDefault();

  const placeValueObject = {
    name: placeName.value,
    link: placeLink.value
  };
  //вызываем функцию для клона карточки и передаем в нее параметры с полей ввода
  createCard(placeValueObject);
  // нужно вызывать для пддержания логики закрытия попапа
  closePopup(cardPopup);
}

// Вызов функции по нажатию на кнопку (открыть/закрыть редактор профиля, добавить место)
profileButton.addEventListener('click', () => {
  openPopup(profilePopup), getNameAndStatusForForm();//перенос данных профиля в форму
});
cardButton.addEventListener('click', () => {
  openPopup(cardPopup);
});
profileCloseButton.addEventListener('click', () => {
  closePopup(profilePopup);
});
cardCloseButton.addEventListener('click' , () => {
  closePopup(cardPopup);
});
imageCloseButton.addEventListener('click', () => {
  closePopup(imagePopup);
});
// слушатель на форму т.к отправляем данные формы на сервер
popupProfileForm.addEventListener('submit', handleFormSubmit);
popupCardForm.addEventListener('submit', savePlaceSubmit);

//массив для карточек
const initialCards = [
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

//функция клонирует один элемент(карточку) и заносит в него данные из массива, добавляет карточку первым элементом
function createCard(cardInfo) {
  const templateClone = cardTemplate.querySelector('.card').cloneNode(true);
  templateClone.querySelector('.card__image').src = cardInfo.link;
  templateClone.querySelector('.card__image').alt = cardInfo.name;
  templateClone.querySelector('.card__title').textContent = cardInfo.name;
  //обработчик черных сердец
  templateClone.querySelector('.card__like').addEventListener('click', (evt) => {
    evt.target.classList.toggle('card__like_active');
    });
  //удаление карточек
  templateClone.querySelector('.card__trash').addEventListener('click', (evt) => {
    evt.target.closest('.card').remove();
    });
  //обработка клика по картинке
  templateClone.querySelector('.card__image').addEventListener('click', () => {
    imagePopup.querySelector('.popup__image').src = cardInfo.link;
    imagePopup.querySelector('.popup__image').alt = cardInfo.name;
    imagePopup.querySelector('.popup__figcaption').textContent = cardInfo.name;
    openPopup(imagePopup)
  });

  cardElements.prepend(templateClone);
}

//функция перебирает все данные массива и применяет функцию выше
function addAllCardsFromArray() {
  initialCards.forEach(arrayEl => createCard(arrayEl));
}
//вызов функции для добавления всех карточек из массива
addAllCardsFromArray();
