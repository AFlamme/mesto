export default class FormValidator {
    constructor(validationConfig, formElement) {
        this._validationConfig = validationConfig;
        this._formElement = formElement;
        this._inputList = Array.from(this._formElement.querySelectorAll(this._validationConfig.inputSelector));
    }

    _setInputListeners() {
        this._buttonElement = this._formElement.querySelector(this._validationConfig.submitButtonSelector);
        this.toggleButtonState()
        this._inputList.forEach(inputElement => {
            inputElement.addEventListener('input', evt => {
                this._checkInput(inputElement);
                this.toggleButtonState();
            })
        });
    };

    disableButtonState = () => {
        this._buttonElement.classList.add(this._validationConfig.inactiveButtonClass);
        this._buttonElement.disabled = true;
    }

    enableButtonState = () => {
        this._buttonElement.classList.remove(this._validationConfig.inactiveButtonClass);
        this._buttonElement.disabled = false;
    }

    toggleButtonState = () => {
        const hasInvalidInput = this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
        if (hasInvalidInput) {
            this.disableButtonState();
        } else {
            this.enableButtonState();
        }
    };

    _getErrorElement = (inputElement) => {
        return this._formElement.querySelector(`#${inputElement.id}-error`);
    }

    _showInputError(inputElement, errorElement) {
        errorElement = this._getErrorElement(inputElement);
        inputElement.classList.add(this._validationConfig.inputErrorClass);
        errorElement.textContent = inputElement.validationMessage;
        errorElement.classList.add(this._validationConfig.errorClass);
    };



    _hideInputError(inputElement, errorElement) {
        errorElement = this._getErrorElement(inputElement);
        inputElement.classList.remove(this._validationConfig.inputErrorClass);
        errorElement.classList.remove(this._validationConfig.errorClass);
        errorElement.textContent = "";
    };

    _checkInput(inputElement) {
        if (inputElement.validity.valid) {
            this._hideInputError(inputElement);
        } else {
            this._showInputError(inputElement, inputElement.validationMessage);
        }
    }


    //удаление ошибок
    deleteErrors() {
        const errorsSpan = this._formElement.querySelectorAll(this._validationConfig.inputSelector);
        const errorsInput = this._formElement.querySelectorAll(this._validationConfig.inputError);
        errorsSpan.forEach((input) => {
            input.classList.remove(this._validationConfig.inputErrorClass);
        });
        errorsInput.forEach((error) => {
            error.classList.remove(this._validationConfig.errorClass);
        });
    }

    enableValidation() {
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        this._setInputListeners();
    }
}