import Popup from "./Popup.js";

// Увеличение изображения
export default class PopupWithImage extends Popup {
    constructor(popupSelector, popupCard, popupText) {
        super(popupSelector);
        this._imageElement = this._popup.querySelector('.popup__image');
        this._figcaptionElement = this._popup.querySelector('.popup__figcaption');
    }

    // Открытие и заполнение значениями
    open(linkImage, text) {
        super.open();
        this._imageElement.src = linkImage;
        this._imageElement.alt = text;
        this._figcaptionElement.textContent = text;
    }
}