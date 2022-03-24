const objects = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}


const hasInvalidInput = (inputlist) => {
    return inputlist.some((inputElement) => {
        return !inputElement.validity.valid
    });
};

const toggleButtonState = (inputlist, buttonElement, objects) => {
    if (hasInvalidInput(inputlist)) {
        buttonElement.classList.add(objects.inactiveButtonClass);
        buttonElement.setAttribute('disabled', true);
    } else {
        buttonElement.classList.remove(objects.inactiveButtonClass);
        buttonElement.removeAttribute('disabled');
    }
};

const showInputError = (formElement, inputElement, objects) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(objects.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(objects.errorClass);
};


const hideInputError = (formElement, inputElement, objects) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(objects.inputErrorClass);
    errorElement.classList.remove(objects.errorClass);
    errorElement.textContent = "";
};

const checkInput = (formElement, inputElement, objects) => {
    if (inputElement.validity.valid) {
        hideInputError(formElement, inputElement, objects);
    } else {
        showInputError(formElement, inputElement, objects);
    }
}

const setInputListeners = (formElement, objects) => {
    const inputlist = Array.from(formElement.querySelectorAll(objects.inputSelector));
    const buttonElement = formElement.querySelector(objects.submitButtonSelector);

    inputlist.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            checkInput(formElement, inputElement, objects);
            toggleButtonState(inputlist, buttonElement, objects);
        });
        toggleButtonState(inputlist, buttonElement, objects);
    });
};


const enableValidation = (objects) => {
    const formList = Array.from(document.querySelectorAll(objects.formSelector));

    formList.forEach(formElement => {
        formElement.addEventListener('submit', (event) => {
            event.preventDefault();
        });
        setInputListeners(formElement, objects);
    });
};

enableValidation(objects);