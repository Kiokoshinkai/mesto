//функция валидации всех форм
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, config);
  });
}

//функция добавления слушателей
const setEventListeners = (formElement, config) => {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector)); //массив всех инпутов формы
  const buttonElement = formElement.querySelector(config.submitButtonSelector); //кнопка сабмит
  disableButton(buttonElement, config);  //проверка при первой загрузки страницы
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, config);
      if (hasInvalidInput(inputList)) { //проверка состяния кнопок при изменении символа
        disableButton(buttonElement, config);
      } else {
        enableButton(buttonElement, config);
      }
    });
  });
  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
  });
}

//функция добавления класса ошибки
const showInputError = (formElement, inputElement, errorMessage, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);//находит ошибку внутри formElement.//поиск элемента ошибки по уникальному классу(созданы заранее)
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage; //текст ошибки
  errorElement.classList.add(config.errorClass); //видимость ошибки
}

//функция удаления класса ошибки
const hideInputError = (formElement, inputElement, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = '';
}

//функция проверки на корректность введеных данных и применяет функции скрыть/показать ошибку
const checkInputValidity = (formElement, inputElement, config) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, config);
  } else {
    hideInputError(formElement, inputElement, config);
  }
}

//функция фалидации всех полей
const hasInvalidInput = (inputList) => {
  return inputList.some((inputList) => {  //проверяет пораметры методом some
    return !inputList.validity.valid  //возвращает true если в массиве есть невалидный input
  });
}

//функция разблокировки кнопки
const enableButton = (buttonElement, config) => {
  buttonElement.classList.remove(config.inactiveButtonClass);
  buttonElement.removeAttribute('disabled');
}
//функция блокировки кнопки
const disableButton = (buttonElement, config) => {
  buttonElement.classList.add(config.inactiveButtonClass);
  buttonElement.setAttribute('disabled', true);
}

enableValidation(validationConfig);
