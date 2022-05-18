import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
    constructor(popupSelector, popupCard, popupText) {
        super(popupSelector);
        this._popupCard = popupCard;
        this._popupText = popupText;
    }

    open(card) {
        super.open()
        popupCard.src = card.src;
        popupCard.alt = card.alt;
        popupText.textContent = card.alt;
    }
}