import Card from "../components/card.js";

//отрисовка элементов на странице
export default class Section {
  constructor ({ items, renderer }, containerSelector) {
    this._renderedItems = items;
    this._container = document.querySelector(containerSelector);
  }

  addItem(element) {
    this._container.append(element);
  }

  renderItems() {
    this._renderedItems.forEach(item => {
      const card = new Card(item, '.card-template')

      const cardElement = card.generateCard();
      this.addItem(cardElement);
    });
  }
}
