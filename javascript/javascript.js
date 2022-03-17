    // Поиск формы 
    let popupProfile = document.querySelector('#popupProfile');
    // Кнопка редактирования 
    let editButton = document.querySelector('.profile__edit-button');
    // Кнопка закрытия 
    let closeButton = document.querySelector('#closePopupProfile');
    // Попап по форме 
    let form = document.querySelector('#form-popup');
    // Имя 
    let nameProfile = document.querySelector('.profile__name');
    // О себе 
    let aboutProfile = document.querySelector('.profile__about');
    // Значение 1. Строка с именем 
    let nameInput = document.querySelector('#input__popup-name');
    // Значение 2. Строка о себе 
    let aboutInput = document.querySelector('#input__popup-about');
    // Кнопка сохранения 
    let SaveButton = document.querySelector('#savePopupProfile');

    // Добавление карточек 
    // Форма 
    let popupCard = document.querySelector('#popupCard');
    // Добавление 
    let CardOpenButton = document.querySelector('.profile__add-button');
    // Закрытие 
    let CardCloseButton = document.querySelector('#closePopupCard');
    // Сохранение 
    let SavePopupCard = document.querySelector('#savePopupCard');
    // Значение 1. Строка с именем карточки 
    let inputCardAddName = document.querySelector('#input__popup-CardName');
    // Значение 2. Строка с ссылкой на картинку 
    let inputCardAddPhoto = document.querySelector('#input__popup-CardImg');
    // Форма карточки 
    let formCard = document.querySelector('#form-card');

    // Заготовки для карточки 
    let cardTemplate = document.querySelector('#templateCard').content;
    // Контейнер с карточками
    let cardContainer = document.querySelector('.cards');

    // Открытие картинки 
    // Сама картинка 
    let popupAddBig = document.querySelector('#addBigButton');
    // Изображение в popup 
    let popupImage = document.querySelector('.popup__image');
    // Подпись у изображения 
    let popupFigcaption = document.querySelector('.popup__figcaption');
    // Закрытие
    let closeAddBigPopup = document.querySelector('#closeAddPopupCard');

    function popupBig(photo) {
        photo.addEventListener('click', () => {
            popupImage.src = photo.src;
            popupFigcaption.textContent = photo.alt;
            popupImage.alt = photo.alt;
            openPopup(popupAddBig);
        });
    }

    closeAddBigPopup.addEventListener('click', function() {
        closePopup(popupAddBig)
    })

    // Открытие popup
    function openPopup(popup) {
        popup.classList.add('popup_opened');
    }

    // Закрытие popup
    function closePopup(popup) {
        popup.classList.remove('popup_opened');
    }

    editButton.addEventListener('click', function() {
        nameInput.value = nameProfile.textContent;
        aboutInput.value = aboutProfile.textContent;
        openPopup(popupProfile)
    })

    closeButton.addEventListener('click', function() {
        closePopup(popupProfile)
    })

    CardOpenButton.addEventListener('click', function() {
        openPopup(popupCard)
    })

    CardCloseButton.addEventListener('click', function() {
        closePopup(popupCard)
    })


    // Редактирование 
    function formSubmitHandler(evt) {
        evt.preventDefault();
        nameProfile.textContent = nameInput.value;
        aboutProfile.textContent = aboutInput.value;
        closePopup(popupProfile);
    }
    form.addEventListener('submit', formSubmitHandler);

    // Лайк
    function addLike(card) {
        let buttonLike = card.querySelector('.card__like');
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

    // Добавление карточки
    function createCard(Card) {
        const newCard = cardTemplate.querySelector('.card').cloneNode(true);
        const cardTitle = newCard.querySelector('.card__title');
        const cardPhoto = newCard.querySelector('.card__photo');
        cardTitle.textContent = Card.name;
        cardPhoto.src = Card.link;
        cardPhoto.alt = Card.name;

        popupBig(cardPhoto);
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
        const Card = createCard({ name: inputCardAddName.value, link: inputCardAddPhoto.value });
        addNewCards(Card);
        closePopup(popupCard);
        inputCardAddPhoto.value = '';
        inputCardAddName.value = '';
    }
    formCard.addEventListener('submit', addCardForSumbitHandler);