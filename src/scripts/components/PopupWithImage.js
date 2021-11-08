import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._headingInPopupImage = this._popup.querySelector('.popup__heading');
    this._imageInPopupImage = this._popup.querySelector('.popup__image');
  }

  open(cardName, cardLink) {
    this._headingInPopupImage.textContent = cardName;
    this._imageInPopupImage.src = cardLink;
    this._imageInPopupImage.alt = cardName;
    super.open();
  }
}
