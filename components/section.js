//отрисовка элементов на странице
export default class Section {
  constructor ({ items, renderer }, containerSelector) {
    this._renderedItems = items;
    this._renderer = renderer; //колбек
    this._container = document.querySelector(containerSelector);
  }

  addItem(element) {
    this._container.prepend(element); //добавление элемента
  }

  renderItems() {
    this._renderedItems.forEach(item => {
      this._renderer(item);
    });
  }
}
