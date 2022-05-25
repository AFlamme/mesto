// Открытие и закрытие попапа
export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this.close = this.close.bind(this)
    }

    // Закрытие на Escape
    _handleEscClose = (evt) => {
        if (evt.key === "Escape") {
            this.close()
        }
    }

    // Закрытие на оверлей
    _closePopupOverlay = (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
            this.close()
        }
    }

    // Установка слушателя
    setEventListeners() {
        this._popup.addEventListener('click', (evt) => {
            if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-button')) {
                this.close();
            }
        });
    }

    // Открытие
    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
    }

    // Закрытие
    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }
}