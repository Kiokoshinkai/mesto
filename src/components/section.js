//отрисовка элементов на странице
export default class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer; //колбек
    this._container = document.querySelector(containerSelector);
  }

  addItem(element) {
    this._container.prepend(element); //добавление элементов наверх
  }

  appendItem(element) {
    this._container.append(element); //добавление элементов сверху вниз
  }

  renderItems({ renderedItems }) {
    //рендер карточек
    renderedItems.forEach((item) => {
      this._renderer(item);
    });
  }
}
