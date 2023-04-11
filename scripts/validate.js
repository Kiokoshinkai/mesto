//функция добавления класса ошибки
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);//находит ошибку внутри formElement.//поиск элемента ошибки по уникальному классу(созданы заранее)
  inputElement.classList.add(formData.inputErrorClass);
  errorElement.textContent = errorMessage; //текст ошибки
  errorElement.classList.add(formData.errorClass); //видимость ошибки
}

//функция удаления класса ошибки
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(formData.inputErrorClass);
  errorElement.classList.remove(formData.errorClass);
  errorElement.textContent = '';
}

//функция проверки на корректность введеных данных и применяет функции скрыть/показать ошибку
const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);//второй аргумент сообщение об ошибке
  } else {
    hideInputError(formElement, inputElement);
  }
}

//функция валидации всех форм
const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(formData.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
}

//функция фалидации всех полей
const hasInvalidInput = (inputList) => {
  return inputList.some((inputList) => {  //проверяет пораметры методом some
    return !inputList.validity.valid  //возвращает true если в массиве есть невалидный input
  });
}

//функция блокировки кнопки
const toggleButtonState = (inputList, buttonElement) => {// первый массив полей, второй кнопка.
  if (hasInvalidInput(inputList)) {// если есть невалидные поля
    buttonElement.classList.add(formData.inactiveButtonClass); //добавляем класс неактивной кнопки
  } else buttonElement.classList.remove(formData.inactiveButtonClass); // все ок - снимаем
}

//функция добавления слушателей
const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(formData.inputSelector)); //массив всех инпутов формы
  const buttonElement = formElement.querySelector(formData.submitButtonSelector); //кнопка сабмит
  toggleButtonState(inputList, buttonElement); //проверка при первой загрузки страницы
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      toggleButtonState(inputList, buttonElement); //проверка состяния кнопок при изменении символа
      checkInputValidity(formElement, inputElement);
    });
  });
}

enableValidation(formData);
