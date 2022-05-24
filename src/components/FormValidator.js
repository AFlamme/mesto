// Валидация формы, отображение и скрывание ошибок, отображение кнопки отправки
export default class FormValidator {
    constructor(validationConfig, formElement) {
        this._validationConfig = validationConfig;
        this._formElement = formElement;
        this._buttonElement = this._formElement.querySelector(this._validationConfig.submitButtonSelector);
    }

    // Проверка формы на наличие невалидных полей
    _hasInvalidInput(inputlist) {
        return inputlist.some((inputElement) => {
            return !inputElement.validity.valid
        });
    };

    // Переключение состояния кнопки submit-а формы
    _toggleButtonState(inputlist, buttonElement) {
        if (this._hasInvalidInput(inputlist)) {
            this.disableSubmitButton();
        } else {
            buttonElement.classList.remove(this._validationConfig.inactiveButtonClass);
            buttonElement.removeAttribute('disabled');
        }
    };

    disableSubmitButton() {
        this._buttonElement.classList.add(this._validationConfig.inactiveButtonClass);
        this._buttonElement.setAttribute('disabled', 'disabled');
    }

    // Ошибка у поля ввода
    _showInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.add(this._validationConfig.inputErrorClass);
        errorElement.textContent = inputElement.validationMessage;
        errorElement.classList.add(this._validationConfig.errorClass);
    };

    // Скрыть ошибку у поля ввода
    _hideInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.remove(this._validationConfig.inputErrorClass);
        errorElement.classList.remove(this._validationConfig.errorClass);
        errorElement.textContent = "";
    };

    // Проверка элемента на валидность. Скрывание или отображание ошибки
    _checkInput(inputElement) {
        if (inputElement.validity.valid) {
            this._hideInputError(inputElement);
        } else {
            this._showInputError(inputElement, inputElement.validationMessage);
        }
    }

    // Установка слушателя событий
    _setInputListeners() {
        const inputlist = Array.from(this._formElement.querySelectorAll(this._validationConfig.inputSelector));
        const buttonElement = this._formElement.querySelector(this._validationConfig.submitButtonSelector);

        inputlist.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInput(inputElement);
                this._toggleButtonState(inputlist, buttonElement);
            });
            this._toggleButtonState(inputlist, buttonElement);
        });
    };

    // Удаление ошибок
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

    // Включение валидации
    enableValidation() {
        this._setInputListeners();
    }
}