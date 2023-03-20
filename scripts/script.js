// Получить доступ к элементам
const contentElement = document.querySelector('.content');
const profileElement = contentElement.querySelector('.profile');
const popupElement = document.querySelector('.popup');
const popupForm = popupElement.querySelector('.popup__form');
const profileName = profileElement.querySelector('.profile__name');
const profileStatus = profileElement.querySelector('.profile__status');

const profileButton = profileElement.querySelector('.profile__edit-button');
const closeButton = popupElement.querySelector('.popup__close-btn');

const formName = popupElement.querySelector('.popup__form-item_el_name');
const formStatus = popupElement.querySelector('.popup__form-item_el_status');

//получаем доступ к секции карточек, к темплейт элементу карточки
const cardElements = contentElement.querySelector('.elements');
const cardTemplate = contentElement.querySelector('#card').content;

// Функция вызова редактора профиля
function editProfile() {
    popupElement.classList.add('popup_opened');
  //данные забираются в момент открытия редактора профиля через функцию:
  getNameAndStatusForForm();
}

// Функция закрытия редактора профиля
function closeProfile() {
    popupElement.classList.remove('popup_opened');
}

// Функция сохранения данных профиля в полях формы
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
  closeProfile();
}

// Вызов функции по нажатию на кнопку (открыть/закрыть редактор профиля)
profileButton.addEventListener('click', editProfile);
closeButton.addEventListener('click', closeProfile);
// слушатель на форму т.к отправляем данные формы на сервер
popupForm.addEventListener('submit', handleFormSubmit);

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
function addCardContent(cardInfo) {
  const templateClone = cardTemplate.querySelector('.card').cloneNode(true);
  templateClone.querySelector('.card__image').src = cardInfo.link;
  templateClone.querySelector('.card__image').alt = cardInfo.name;
  templateClone.querySelector('.card__title').textContent = cardInfo.name;

  cardElements.prepend(templateClone);
}

//функция перебирает все данные массива и применяет функцию выше
function addAllCardsFromArray() {
  initialCards.forEach(arrayEl => addCardContent(arrayEl));
}

//вызов функции для добавления
addAllCardsFromArray();

//Другой вариант клона карточек:
// function cloneCards() {
//   initialCards.forEach((card) => {
//     const cardClone = cardTemplate.querySelector('.card').cloneNode(true);
//     cardClone.querySelector('.card__image').src = card.link;
//     cardClone.querySelector('.card__image').alt = card.name;
//     cardClone.querySelector('.card__title').textContent = card.name;

//     cardElements.append(cardClone);
//   });
// }

// cloneCards()


// обработчик черных сердец. На вход querySelectorAll приходит массив, циклом достаем элементы массива и добавляем каждому через лисинер логику(если класс отсутствует, он добавляется)
// const likeButtons = elementItem.querySelectorAll('.card__like');

// for (let i = 0; i < likeButtons.length; i += 1) {
//   likeButtons[i].addEventListener('click', addLike);
// }

// function addLike() {
//   if (this.classList.contains('card__like_active') === false) {
//     this.classList.add('card__like_active');
//   } else {
//     this.classList.remove('card__like_active');
//   }
// }
