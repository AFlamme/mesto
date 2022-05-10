export default class Popup {
    constructor(popupSelector) {
        this._popupSelector = popupSelector
        this.close = this.close.bind(this)

    }

    _handleEscClose = (evt) => {
        if (evt.key === "Escape") {
            this.close()
        }
    }

    _closePopupOverlay = (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
            this.close()
        }
    }

    setEventListeners() {
        this._popupSelector.addEventListener('click', (evt) => {
            if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-button')) {
                this.close();
            }
        });
    }

    open() {
        this._popupSelector.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
    }

    close() {
        this._popupSelector.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose)
    }
}