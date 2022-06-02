import Popup from "./Popup.js";

// Работа с формой
export default class PopupWithForm extends Popup {
    constructor(popupSelector, callbackSubmitForm) {
        super(popupSelector);
        this._callbackSubmitForm = callbackSubmitForm;
        this._form = this._popup.querySelector('.popup__form');
        this._inputList = this._form.querySelectorAll('.popup__input');
        this._submitText = this._form.querySelector('.popup__save-button');
        this._submitTextInitialText = this._submitText.textContent;
    }

    // Сохранение ввода в объект
    _getInputValues() {
        this._formValues = {};
        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
        });

        return this._formValues;
    }

    // Установка слушателя
    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._callbackSubmitForm(this._getInputValues());
        });
    }

    // Закрытие
    close() {
        super.close()
        this._form.reset()
    }

    renderLoading(isLoading) {
        if (isLoading) {
            this._submitText.textContent = 'Сохранение...';
        } else {
            this._submitText.textContent = this._submitTextInitialText;
        }
    }
}