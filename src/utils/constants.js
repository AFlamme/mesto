// Элементы страницы и селекторы
// Общее
export const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible',
    inputError: '.popup__error'
}

export const popupProfile = document.querySelector('.popupProfile'); // Поиск формы. 
export const popupAvatarSelector = document.querySelector('.popup_avatar');
export const popupCard = document.querySelector('.popupCard'); // Форма. 

export const editButton = document.querySelector('.profile__edit-button'); // Кнопка редактирования. 

export const nameInput = document.querySelector('#input__popup-name'); // Значение 1. Строка с именем. 
export const aboutInput = document.querySelector('#input__popup-about'); // Значение 2. Строка о себе. 
export const formEditProfile = document.querySelector('#form-profile'); // Попап по форме.

// Добавление карточек 
export const openPopupCardButton = document.querySelector('.profile__add-button'); // Добавление.
export const formAddCard = document.querySelector('#form-card'); // Форма карточки.

export const cardsTemplate = document.querySelector('#templateCard').content; // Заготовки для карточки. 
export const cardContainer = document.querySelector('.cards'); // Контейнер с карточками.

export const popupBig = document.querySelector('#popupbig'); // Сама картинка. 
export const popupCardSaveButton = document.querySelector('#save-popup-card'); // Сохранение формы.

export const nameProfile = '.profile__name'; // Имя. 
export const aboutProfile = '.profile__about'; // О себе. 
export const avatarProfile = '.profile__avatar'; // Аватар.

export const popupConfirm = document.querySelector('.popup_confirm'); // Форма подтверждения удаления.
export const popupEditAvatar = document.querySelector('.profile__avatar') // Попап аватара.
export const saveNewAvatar = document.querySelector('#form-avatar') // Форма аватара.

export const popupImg = document.querySelector('.popup__image'); // Картинка 
export const popupImgText = document.querySelector('.popup__figcaption'); // Подпись к картинке.
export const likeButton = document.querySelector('.card__like'); // Лайк.