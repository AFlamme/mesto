import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
    }

    open(card) {
        super.open()
        const popupCard = this._popupSelector.querySelector('.popup__image');
        const popupText = this._popupSelector.querySelector('.popup__figcaption');
        popupCard.src = card.src;
        popupCard.alt = card.alt;
        popupText.textContent = card.alt;
    }
}