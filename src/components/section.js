//отрисовка элементов на странице
export default class Section {
  constructor ({ renderer }, containerSelector) {
    this._renderer = renderer; //колбек
    this._container = document.querySelector(containerSelector);
  }

  addItem(element) {
    this._container.append(element); //добавление элемента
  }

  renderItems({ renderedItems }) {
    renderedItems.forEach(item => {
      this._renderer(item);
    });
  }
}
