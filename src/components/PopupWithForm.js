import Popup from "./Popup.js";

// Работа с формой
export default class PopupWithForm extends Popup {
    constructor(popupSelector, callbackSubmitForm) {
        super(popupSelector);
        this._callbackSubmitForm = callbackSubmitForm;
        this._form = this._popup.querySelector('.popup__form');
        this._inputList = this._form.querySelectorAll('.popup__input');
        this._formValues = {};
    }

    // Сохранение ввода в объект
    _getInputValues() {
        this._form.querySelectorAll('.popup__input').forEach(input => {
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

    // Действия при сабмите и вызов callback-а
    _submit() {
        const buttonSave = this._form.querySelector('.popup__save-button');
        const tempText = 'Сохранение...';
        const originalText = button.textContent;

        buttonSave.disabled = true;
        buttonSave.textContent = tempText;
        this._callbackSubmitForm(this._getInputValues())
            .then(() => {
                buttonSave.textContent = originalText;
                buttonSave.disabled = false;
            });
    }

    // Закрытие
    close() {
        super.close()
        this._form.reset()
    }
}