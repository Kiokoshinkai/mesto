class FormValidator {
  constructor(config, formElement) {
    this._formElement = formElement;
    this._config = config;
  }
//показывает ошибку
  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._config.errorClass);
  }
//скрывает ошибку
  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._config.inputErrorClass);
    errorElement.classList.remove(this._config.errorClass);
    errorElement.textContent = '';
  }
//очистка ошибок форм
  _clearFormError() {
    const errors = Array.from(this._formElement.querySelectorAll('.popup__form-error'));
    const inputs = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
    errors.forEach((element) => {
      element.classList.remove(this._config.errorClass);
    });
    inputs.forEach((element) => {
      element.classList.remove(this._config.inputErrorClass);
    });
  }

//проверка валидности
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage)
    } else {
      this._hideInputError(inputElement);
    }
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputList) => {
      return !inputList.validity.valid
    });
  }
//отключение кнопки
  _disableButton() {
    this.buttonElement.setAttribute('disabled', true);
    this.buttonElement.classList.add(this._config.inactiveButtonClass);
  }
//включение кнопки
  _enableButton() {
    this.buttonElement.removeAttribute('disabled');
    this.buttonElement.classList.remove(this._config.inactiveButtonClass);
  }
//слушатели
  _setEventListeners() {
    this.inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
    this.buttonElement = this._formElement.querySelector(this._config.submitButtonSelector);
    this._disableButton(this.buttonElement);
    this.inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        if (this._hasInvalidInput(this.inputList)) {
          this._disableButton(this.buttonElement);
        } else {
          this._enableButton(this.buttonElement);
        }
      });
    });
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
  }
//включить валидацию
  enableValidation() {
    this._setEventListeners(this._formElement);
    this._clearFormError();
  }
}

export default FormValidator;
