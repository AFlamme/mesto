    // Поиск формы 
    const popupProfile = document.querySelector('#popupProfile');
    // Кнопка редактирования 
    const buttonEdit = document.querySelector('.profile__edit-button');
    // Кнопка закрытия 
    const buttonClose = document.querySelector('#closePopupProfile');
    // Попап по форме 
    const formProfile = document.querySelector('#form-popup');
    // Имя 
    const nameProfile = document.querySelector('.profile__name');
    // О себе 
    const aboutProfile = document.querySelector('.profile__about');
    // Значение 1. Строка с именем 
    const nameInput = document.querySelector('#input__popup-name');
    // Значение 2. Строка о себе 
    const aboutInput = document.querySelector('#input__popup-about');
    // Кнопка сохранения 
    const buttonSave = document.querySelector('#savePopupProfile');

    // Добавление карточек 
    // Форма 
    const popupCard = document.querySelector('#popupCard');
    // Добавление 
    const cardOpenButton = document.querySelector('.profile__add-button');
    // Закрытие 
    const cardCloseButton = document.querySelector('#closePopupCard');
    // Сохранение 
    const cardPopupSave = document.querySelector('#savePopupCard');
    // Значение 1. Строка с именем карточки 
    const inputCardAddName = document.querySelector('#input__popup-CardName');
    // Значение 2. Строка с ссылкой на картинку 
    const inputCardAddPhoto = document.querySelector('#input__popup-CardImg');
    // Форма карточки 
    const formCard = document.querySelector('#form-card');

    // Заготовки для карточки 
    const cardTemplate = document.querySelector('#templateCard').content;
    // Контейнер с карточками
    const cardContainer = document.querySelector('.cards');

    // Открытие картинки 
    // Сама картинка 
    const popupAddBig = document.querySelector('#addBigButton');
    // Изображение в popup 
    const popupImage = document.querySelector('.popup__image');
    // Подпись у изображения 
    const popupFigcaption = document.querySelector('.popup__figcaption');
    // Закрытие
    const popupCloseAddBig = document.querySelector('#closeAddPopupCard');

    // Массив карточек
    const initialCards = [{
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

    function openPopupBig(photo) {
        photo.addEventListener('click', () => {
            popupImage.src = photo.src;
            popupFigcaption.textContent = photo.alt;
            popupImage.alt = photo.alt;
            openPopup(popupAddBig);
        });
    }

    popupCloseAddBig.addEventListener('click', function() {
        closePopup(popupAddBig)
    })


    buttonEdit.addEventListener('click', function() {
        nameInput.value = nameProfile.textContent;
        aboutInput.value = aboutProfile.textContent;
        openPopup(popupProfile)
    })

    buttonClose.addEventListener('click', function() {
        closePopup(popupProfile)
    })

    cardOpenButton.addEventListener('click', function() {
        openPopup(popupCard)
    })

    cardCloseButton.addEventListener('click', function() {
        closePopup(popupCard)
    })


    // Редактирование 
    function submitFormHandler(evt) {
        evt.preventDefault();
        nameProfile.textContent = nameInput.value;
        aboutProfile.textContent = aboutInput.value;
        closePopup(popupProfile);
    }
    formProfile.addEventListener('submit', submitFormHandler);

    // Лайк
    function addLike(card) {
        const buttonLike = card.querySelector('.card__like');
        buttonLike.addEventListener('click', (e) => {
            e.target.classList.toggle('card__like_active');
        });
    }

    // Удаление
    function deleteCard(card) {
        const remove = card.querySelector('.card__delete');
        remove.addEventListener('click', (evt) => {
            evt.target.closest('.card').remove();
        });
    }


    // Добавление карточки
    function createCard(card) {
        const newCard = cardTemplate.querySelector('.card').cloneNode(true);
        const cardTitle = newCard.querySelector('.card__title');
        const cardPhoto = newCard.querySelector('.card__photo');
        cardTitle.textContent = card.name;
        cardPhoto.src = card.link;
        cardPhoto.alt = card.name;

        openPopupBig(cardPhoto);
        addLike(newCard);
        deleteCard(newCard);

        return newCard;
    }

    initialCards.forEach((item) => {
        addNewCards(
            createCard(item)
        );
    });

    // Добавление на страницу
    function addNewCards(element) {
        cardContainer.prepend(element)
    }


    // Добавление новой карточки на страницу
    function addCardForSumbitHandler(evt) {
        evt.preventDefault();
        const card = createCard({ name: inputCardAddName.value, link: inputCardAddPhoto.value });
        addNewCards(card);
        closePopup(popupCard);
        inputCardAddPhoto.value = '';
        inputCardAddName.value = '';
        cardPopupSave.setAttribute('disabled', true);
        cardPopupSave.classList.add('popup__save-button_disabled');
    }


    formCard.addEventListener('submit', addCardForSumbitHandler);