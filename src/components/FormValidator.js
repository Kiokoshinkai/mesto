export default class FormValidator {
  constructor(config, formElement) {
    this._formElement = formElement;
    this._config = config;
  }
  //показывает ошибку
  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.add(this._config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._config.errorClass);
  }
  //скрывает ошибку
  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.remove(this._config.inputErrorClass);
    errorElement.classList.remove(this._config.errorClass);
    errorElement.textContent = "";
  }

  //проверка валидности
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _hasInvalidInput() {
    return this.inputList.some((inputList) => {
      return !inputList.validity.valid || !inputList.value;
    });
  }

  //управление состоянием кнопки
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this.buttonElement.disabled = true;
      this.buttonElement.classList.add(this._config.inactiveButtonClass);
    } else {
      this.buttonElement.disabled = false;
      this.buttonElement.classList.remove(this._config.inactiveButtonClass);
    }
  }

  //слушатели
  _setEventListeners() {
    this.errors = Array.from(
      this._formElement.querySelectorAll(".popup__form-error")
    );
    this.errors.forEach((element) => {
      element.classList.remove(this._config.errorClass);
    });
    this.inputList = Array.from(
      this._formElement.querySelectorAll(this._config.inputSelector)
    );
    this.buttonElement = this._formElement.querySelector(
      this._config.submitButtonSelector
    );
    this.inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
    this._formElement.addEventListener("submit", () => {
      this._toggleButtonState();
    });
  }

  //включить валидацию
  enableValidation() {
    this._setEventListeners();
    this._toggleButtonState();
  }
}
