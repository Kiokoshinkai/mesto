class FormValidator {
  constructor(config, formElement) {
    this._formElement = formElement;
    this._config = config;
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._config.errorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._config.inputErrorClass);
    errorElement.classList.remove(this._config.errorClass);
    errorElement.textContent = '';
  }

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

  _disableButton(buttonElement) {
    buttonElement.setAttribute('disabled', true);
    buttonElement.classList.add(this._config.inactiveButtonClass);
  }

  _enableButton(buttonElement) {
    buttonElement.removeAttribute('disabled');
    buttonElement.classList.remove(this._config.inactiveButtonClass);
  }

  _setEventListeners() {
    const inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
    const buttonElement = this._formElement.querySelector(this._config.submitButtonSelector);
    this._disableButton(buttonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        if (this._hasInvalidInput(inputList)) {
          this._disableButton(buttonElement);
        } else {
          this._enableButton(buttonElement);
        }
      });
    });
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
  }

  enableValidation() {
    const formList = Array.from(document.querySelectorAll(this._config.formSelector));
    formList.forEach((formElement) => {
      this._setEventListeners(formElement);
    });
  }
}

const profileValidator = new FormValidator(validationConfig, profileForm);
const cardValidator = new FormValidator(validationConfig, placeForm);

profileValidator.enableValidation();
cardValidator.enableValidation();
