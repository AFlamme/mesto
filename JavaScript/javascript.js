    /* Поиск формы */
    let popupProfile = document.querySelector('#popup-profile');
    /* Кнопка редактирования */
    let editButton = document.querySelector('.profile__edit-button');
    /* Кнопка закрытия */
    let closeButton = document.querySelector('#popup__close-button');
    /* Попап по форме */
    let form = document.querySelector('#form-popup');
    /* Имя */
    let nameProfile = document.querySelector('.profile__name');
    /* О себе */
    let aboutProfile = document.querySelector('.profile__about');
    /* Значение 1. Строка с именем */
    let nameInput = document.querySelector('#input__popup-name');
    /* Значение 2. Строка о себе */
    let aboutInput = document.querySelector('#input__popup-about');
    /* Кнопка сохранения */
    let SaveButton = document.querySelector('#save-popup-profile');

    /* Добавление карточек */
    /* Форма */
    let popupCard = document.querySelector('#popup-card');
    /* Добавление */
    let CardOpenButton = document.querySelector('.profile__add');
    /* Закрытие */
    let CardCloseButton = document.querySelector('#close-popup-card');
    /* Сохранение */
    let SavePopupCard = document.querySelector('#save-popup-card');
    /* Значение 1. Строка с именем карточки */
    let inputCardAddName = document.querySelector('#input__popup-CardName');
    /* Значение 2. Строка с ссылкой на картинку */
    let inputCardAddPhoto = document.querySelector('#input__popup-CardImg');
    /* Форма карточки */
    let formCard = document.querySelector('#form-card');

    /* Заготовки для карточки */
    let cardTemplate = document.querySelector('#templatecard').content;
    /* Контейнер с карточками*/
    let cardContainer = document.querySelector('.cards');

    /* Открытие картинки */
    /* Сама картинка */
    let popupAddBig = document.querySelector('#add-big-button');
    /* Изображение в popup */
    let popupImage = document.querySelector('.popup__image');
    /* Подпись у изображения */
    let popupFigcaption = document.querySelector('.popup__figcaption');
    /* Закрытие */
    let closeAddBigPopup = document.querySelector('#close-popup-card');

    /* Открытие popup */
    function openPopup() {
        nameInput.value = nameProfile.textContent;
        aboutInput.value = aboutProfile.textContent;
        popup.classList.add('popup_opened');
    }

    /* Закрытие popup */
    function closePopup() {
        popup.classList.remove('popup_opened');
    }

    /* Редактирование */
    function formSubmitHandler(evt) {
        evt.preventDefault();
        nameProfile.textContent = nameInput.value;
        aboutProfile.textContent = aboutInput.value;
        closePopup(popupProfile);
    }

    /* Открытие картинки на весь экран */
    function popupAddBig(photo) {
        photo.addEventListener('click', () => {
            popupImage.src = photo.src;
            popupFigcaption.textContent = photo.alt;
            popupImage.alt = photo.alt;
            openPopup(popupAddBig);
        });
    }
    /* Закрытие */
    closeAddBigPopup.addEventListener('click', function() {
        closePopup(popupAddBig)
    })

    /* Лайк */
    function addlike(card) {
        let buttonLike = card.querySelector('.card__like');
        buttonLike.addEventListener('click', (evt) => {
            evt.target.classList.toggle('card__like_active');
        });
    }

    /* Удаление карточки */
    function deleteCard(card) {
        const remove = card.querySelector('.card__delete');
        remove.addEventListener('click', (evt) => {
            evt.target.closest('.card').remove();
        });
    }

    /* Массив карточек */
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

    /* Добавление карточки */
    function createCard(Card) {
        const newCard = cardTemplate.querySelector('.card').cloneNode(true);
        const cardTitle = newCard.querySelector('.card__title');
        const cardPhoto = newCard.querySelector('.card__photo');
        cardTitle.textContent = Card.name;
        cardPhoto.src = Card.link;
        cardPhoto.alt = Card.name;

        popupAddBig(cardPhoto);
        addlike(newCard);
        deleteCard(newCard);

        return newCard;
    }

    initialCards.forEach((item) => {
        addNewCards(
            createCard(item)
        );
    });

    /* Добавление на страницу */
    function addNewCards(element) {
        cardContainer.prepend(element)
    }

    /* Добавление новой карточки на страницу */
    function addCardForSumbitHandler(evt) {
        evt.preventDefault();
        const Card = createCard({ name: inputCardAddName.value, link: inputCardAddPhoto.value });
        addNewCards(Card);
        closePopup(popupCard);
        inputCardAddPhoto.value = '';
        inputCardAddName.value = '';
    }

    formCard.addEventListener('submit', addCardForSumbitHandler);

    form.addEventListener('submit', formSubmitHandler);
    /* Открытие */
    editButton.addEventListener('click', openPopup);
    /* Закрытие */
    closeButton.addEventListener('click', closePopup);

    closeButton.addEventListener('click', function() {
        closePopup(popupProfile)
    })

    CardOpenButton.addEventListener('click', function() {
        openPopup(popupCard)
    })

    CardCloseButton.addEventListener('click', function() {
        closePopup(popupCard)
    })