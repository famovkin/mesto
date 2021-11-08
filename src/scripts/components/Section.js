export default class Section {
  constructor({ items, renderer }, containerSelector, position) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
    this._position = position;
  }

  addItem(element) {
    if (this._position) {
      this._container.prepend(element);
    } else {
      this._container.append(element);
    }
  }

  renderItems() {
    this._renderedItems.forEach((item) => {
      this._renderer(item);
    });
  }
}
