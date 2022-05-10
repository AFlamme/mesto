//массив карточек
export const initialCards = [{
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

export const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible',
    inputError: '.popup__error'
}

// Поиск формы 
export const popupProfile = document.querySelector('#popupProfile');
// Кнопка редактирования 
export const editButton = document.querySelector('.profile__edit-button');


// Имя 
export const nameProfile = document.querySelector('.profile__name');
// О себе 
export const aboutProfile = document.querySelector('.profile__about');
// Значение 1. Строка с именем 
export const nameInput = document.querySelector('#input__popup-name');
// Значение 2. Строка о себе 
export const aboutInput = document.querySelector('#input__popup-about');
// Попап по форме
export const formEditProfile = document.querySelector('#form-profile')

// Добавление карточек 
// Форма 
export const popupCard = document.querySelector('#popupCard');
// Добавление 
export const openPopupCardButton = document.querySelector('.profile__add-button');
// Форма карточки 
export const formAddCard = document.querySelector('#form-card');

// Заготовки для карточки 
export const cardsTemplate = document.querySelector('#templateCard').content;
// Контейнер с карточками
export const cardContainer = document.querySelector('.cards');

// Сама картинка 
export const popupBig = document.querySelector('#popupbig');
// Сохранение формы
export const popupCardSaveButton = document.querySelector('#save-popup-card');