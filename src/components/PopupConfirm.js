import Popup from "./Popup.js";

// Взаимодейстие без формы с подтвержденим действия
export default class PopupConfirm extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._submitHandler = submitHandler;
        this._form = this._popupSelector.querySelector('.popup__container');
    }

    setSubmitAction(action) {
        this._action = action
    }

    setEventListeners() {
        super.setEventListeners()
        this._form.addEventListener('submit', evt => {
            evt.preventDefault()
            this._submitHandler()
        })
    }
}