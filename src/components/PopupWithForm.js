import Popup from "./Popup.js";

//попапы профиля и место
export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitForm) {
    super(popupSelector);
    this._form = this._popupElement.querySelector(".popup__form");
    this._submitForm = submitForm;
    this._inputs = Array.from(this._form.querySelectorAll(".popup__form-item"));
    this._submitButton = this._popupElement.querySelector(
      ".popup__save-button"
    );
  }

  _getInputValues() {
    //собрать значения инпутов
    const inputData = {};
    this._inputs.forEach((input) => {
      inputData[input.name] = input.value;
    });
    return inputData;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitForm(this._getInputValues());
    });
  }

  close() {
    super.close();
    this._form.reset();
  }

  setSubmitButtonText(text) {
    this._submitButton.textContent = text;
  }
}
