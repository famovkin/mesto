import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor({ name, link }, popupSelector) {
    super(popupSelector);
    this._headingInPopupImage = this._popup.querySelector('.popup__heading');
    this._imageInPopupImage = this._popup.querySelector('.popup__image');
    this._name = name;
    this._link = link;
  }

  open() {
    this._headingInPopupImage.textContent = this._name;
    this._imageInPopupImage.src = this._link;
    this._imageInPopupImage.alt = this._name;
    super.open();
  }
}
