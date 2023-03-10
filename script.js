// Получить доступ к элементам
const contentElement = document.querySelector('.content');
const profileElement = contentElement.querySelector('.profile');
const popupElement = document.querySelector('.popup');
const elementItem = document.querySelector('.elements');
const profileName = profileElement.querySelector('.profile__name');
const profileStatus = profileElement.querySelector('.profile__status');

const editButton = profileElement.querySelector('.edit-button');
const addButton = profileElement.querySelector('.add-button');
const closeButton = popupElement.querySelector('.popup__close-btn');


const formName = popupElement.querySelector('.popup__form-item_el_name');
const formStatus = popupElement.querySelector('.popup__form-item_el_status');

// Функция вызова редактора профиля (если класс отсутствует, он добавляется)
function editProfile() {
  if (popupElement.classList.contains('popup_opened') === false) {
    popupElement.classList.add('popup_opened');
  } else {
    popupElement.classList.remove('popup_opened');
  }
  getNameAndStatusForForm();
}

// Вызов функции по нажатию на кнопку (открыть/закрыть редактор профиля)
editButton.addEventListener('click', editProfile);
closeButton.addEventListener('click', editProfile);

// Функция сохранения данных профиля в полях формы
function getNameAndStatusForForm() {
  formName.value = profileName.textContent;
  formStatus.value = profileStatus.textContent;
}

// При закрытии попапа на крест вызывает функцию и сохраняет данные из профиля
closeButton.addEventListener('click', getNameAndStatusForForm);

// функция перезаписывает данные профиля с полей ввода
function handleFormSubmit (evt) {
  evt.preventDefault();

  profileName.textContent = formName.value;
  profileStatus.textContent = formStatus.value;

  // нужно вызывать для пддержания логики закрытия попапа
  editProfile();
}

popupElement.addEventListener('submit', handleFormSubmit);

// обработчик черных сердец. На вход querySelectorAll приходит массив, циклом достаем элементы массива и добавляем каждому через лисинер логику(если класс отсутствует, он добавляется)
const likeButtons = elementItem.querySelectorAll('.card__like');

for (let i = 0; i < likeButtons.length; i += 1) {
  likeButtons[i].addEventListener('click', addLike);
}

function addLike() {
  if (this.classList.contains('card__like_active') === false) {
    this.classList.add('card__like_active');
  } else {
    this.classList.remove('card__like_active');
  }
}

