    import Card from "./card.js"
    import FormValidate from "./validate.js"

    // Поиск формы 
    const popupProfile = document.querySelector('#popupProfile');
    // Кнопка редактирования 
    const buttonEdit = document.querySelector('.profile__edit-button');
    // Кнопка закрытия 
    const buttonClose = document.querySelector('#closePopupProfile');
    // Форма
    const popupForm = document.querySelectorAll('.popup__form');
    // Имя 
    const nameProfile = document.querySelector('.profile__name');
    // О себе 
    const aboutProfile = document.querySelector('.profile__about');
    // Значение 1. Строка с именем 
    const nameInput = document.querySelector('#input__popup-name');
    // Значение 2. Строка о себе 
    const aboutInput = document.querySelector('#input__popup-about');
    // Попап по форме
    const formEditProfile = document.querySelector('#form-profile')

    // Добавление карточек 
    // Форма 
    const popupCard = document.querySelector('#popupCard');
    // Добавление 
    const cardOpenButton = document.querySelector('.profile__add-button');
    // Закрытие 
    const cardCloseButton = document.querySelector('#closePopupCard');
    // Значение 1. Строка с именем карточки 
    const inputCardAddName = document.querySelector('#input__popup-CardName');
    // Значение 2. Строка с ссылкой на картинку 
    const inputCardAddPhoto = document.querySelector('#input__popup-CardImg');
    // Форма карточки 
    const formAddCard = document.querySelector('#form-card');

    // Заготовки для карточки 
    const cardTemplate = document.querySelector('#templateCard').content;
    // Контейнер с карточками
    const cardContainer = document.querySelector('.cards');

    // Открытие картинки 
    // Сама картинка 
    const popupAddBig = document.querySelector('#addBigButton');
    // Закрытие
    const popupCloseAddBig = document.querySelector('#closeAddPopupCard');
    // Сохранение формы
    const popupCardSaveButton = document.querySelector('#save-popup-card');

    const validationConfig = {
        formSelector: '.popup__form',
        inputSelector: '.popup__input',
        submitButtonSelector: '.popup__save-button',
        inactiveButtonClass: 'popup__button_disabled',
        inputErrorClass: 'popup__input_type_error',
        errorClass: 'popup__error_visible',
        inputError: '.popup__error'
    }

    const addCardFormValidate = new FormValidate(validationConfig, formAddCard);
    const editProfileFormValidate = new FormValidate(validationConfig, formEditProfile);
    editProfileFormValidate.enableValidation();
    addCardFormValidate.enableValidation();

    // Закрытие на оверлэй
    const closePopupOverlay = (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
            closePopup(evt.target);
        }
    }

    // Закрытие на ESC
    const closePopupEscape = (evt) => {
        const openPopup = document.querySelector('.popup_opened');
        if (evt.key === "Escape") {
            closePopup(openPopup);
        }
    }

    // Открытие popup
    function openPopup(popup) {
        popup.classList.add('popup_opened');
        popup.addEventListener('mousedown', closePopupOverlay);
        document.addEventListener('keydown', closePopupEscape);
    }

    // Закрытие popup
    function closePopup(popup) {
        popup.classList.remove('popup_opened');
        popup.removeEventListener('mousedown', closePopupOverlay);
        document.removeEventListener('keydown', closePopupEscape);
    }

    // Cостояние кнопки
    function buttonCondition() {
        popupCardSaveButton.setAttribute('disabled', 'disabled');
        popupCardSaveButton.classList.add(validationConfig.inactiveButtonClass);
    }
    // открывает попап профиля
    buttonEdit.addEventListener('click', function() {
        nameInput.value = nameProfile.textContent;
        aboutInput.value = aboutProfile.textContent;
        editProfileFormValidate.deleteErrors();
        openPopup(popupProfile)
    })

    //закрывает попап профиля
    buttonClose.addEventListener('click', function() {
        closePopup(popupProfile)
    })

    //открывает попап карточки
    cardOpenButton.addEventListener('click', function() {
        formAddCard.reset();
        addCardFormValidate.deleteErrors();
        openPopup(popupCard)
    })

    //закрывает попап карточки
    cardCloseButton.addEventListener('click', function() {
        closePopup(popupCard)
    })

    popupCloseAddBig.addEventListener('click', function() {
        closePopup(popupAddBig);
    })

    // Редактирование 
    function submitEditProfileForm(evt) {
        evt.preventDefault();
        nameProfile.textContent = nameInput.value;
        aboutProfile.textContent = aboutInput.value;
        closePopup(popupProfile);
    }
    formEditProfile.addEventListener('submit', submitEditProfileForm);

    function createCard(item) {
        const card = new Card(cardTemplate, item, openPopup, closePopup);
        const cardElement = card.getCard();
        return cardElement;
    }

    initialCards.forEach(item => {
        const newcard = createCard(item);
        cardContainer.prepend(newcard);
    });
    // добавление на страницу новой карточки
    function addCardFormSubmitHandler(evt) {
        evt.preventDefault();
        const card = createCard({ name: inputCardAddName.value, link: inputCardAddPhoto.value });
        cardContainer.prepend(card)
        closePopup(popupCard);
        buttonCondition();
        formAddCard.reset()
    }

    formAddCard.addEventListener('submit', addCardFormSubmitHandler);