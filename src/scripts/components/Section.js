export default class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItem(element, position) {
    if (position) {
      this._container.prepend(element);
    } else {
      this._container.append(element);
    }
  }

  renderItems(items) {
    this._renderedItems = items;
    this._renderedItems.forEach((item) => {
      this._renderer(item);
    });
  }
}
