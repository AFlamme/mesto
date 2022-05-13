export default class Popup {
    constructor(popupSelector) {
        this._popupSelector = popupSelector
        this.close = this.close.bind(this)

    }

    open() {
        this._popupSelector.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
    }

    close() {
        this._popupSelector.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose)
    }

    _handleEscClose = (evt) => {
        if (evt.key === "Escape") {
            const activePopup = document.querySelector(".popup_opened");
            this.close(activePopup)
        }
    }

    setEventListeners() {
        document.addEventListener('click', (evt) => {
            if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-button')) {
                this.close();
            }

        });
    }

}