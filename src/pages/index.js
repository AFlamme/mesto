    import './index.css';
    import {
        elementsProfile,
        validationConfig,
        popupProfile,
        editButton,
        nameInput,
        aboutInput,
        formEditProfile,
        popupCard,
        openPopupCardButton,
        formAddCard,
        cardsTemplate,
        cardContainer,
        popupBig,
        popupConfirm,
        popupEditAvatar,
        saveNewAvatar,
        popupAvatarSelector,
        popupImg,
        popupImgText
    } from "../utils/constants.js";
    import { configApi } from '../utils/configApi.js';

    import Api from "../components/Api.js";
    import Card from "../components/Card.js";
    import FormValidator from "../components/FormValidator.js";
    import PopupConfirm from "../components/PopupConfirm.js";
    import PopupWithForm from "../components/PopupWithForm.js";
    import PopupWithImage from "../components/PopupWithImage.js";
    import Section from "../components/Section.js";
    import UserInfo from "../components/UserInfo.js";

    const formValidators = {}; // Хранение экземпляров валидаторов форм
    const cards = {}; // Хранение полученных карточек

    function validateForms(formSelectors) {
        const formElements = Array.from(document.querySelectorAll(formSelectors.formSelector));
        formElements.forEach(formElement => {
            const form = new FormValidator(formSelectors, formElement);
            formValidators[formElement.getAttribute('name')] = form;
            form.enableValidation();
        });
    }

    // Элемент карточки
    function renderCard(data) {
        const card = new Card(data, cardTemplateSelector, handleCardClick, handleDeleteCard, handleLikeCard, userInfo.id);
        cards[data._id] = card;
        return card.generateCard();
    }

    // Обработка нажатия на картинку
    function handleCardClick(linkImage, text) {
        imagePopup.open(linkImage, text);
    }

    // Обработка нажатия на удаление карточки
    function handleDeleteCard(cardId) {
        popupConfirm.setTarget(cardId);
        popupConfirm.open();
    }

    // Обработка нажатия на лайк в карточке
    function handleLikeCard(cardId, isLiked) {
        return api.toggleLike(cardId, isLiked)
            .then(likes => {
                cards[cardId].setLikes(likes);
            });
    }


    // Инициализация классов
    const api = new Api(configApi);
    const userInfo = new UserInfo({
        nameElement: elementsProfile.name,
        aboutElement: elementsProfile.about,
        avatarElement: elementsProfile.avatar
    });
    const cardsSection = new Section({
        items: [],
        renderer: renderCard
    }, cardContainer);

    // Попапы
    const profileEditPopup = new PopupWithForm(popupProfile, data => {
        return api.setUserInfo(data)
            .then(res => {
                userInfo.getInfoUser(res);
                userInfo.renderName();
                userInfo.renderAbout();
                profileEditPopup.close();
            });
    });

    const avatarChangePopup = new PopupWithForm(popupAvatarSelector, data => {
        return api.changeAvatar(data.link)
            .then((res) => {
                userInfo.getInfoUser(res);
                userInfo.renderAvatar();
                avatarChangePopup.close();
            });
    });

    const newCardPopup = new PopupWithForm(popupCard, data => {
        return api.addNewCard(data)
            .then(res => {
                cardsSection.addItem(renderCard(res), true);
                newCardPopup.close();
                formValidators[newCardForm.getAttribute('name')].disableButtonState();
            });
    });

    const imagePopup = new PopupWithImage(popupImg);

    const popupWithConfirm = new PopupConfirm(popupConfirm, (cardId) => {
        api.deleteCard(cardId)
            .then(() => {
                cards[cardId].delete();
                popupWithConfirm.close();
            })
    });

    // Первое получение данных от сервера
    api.getUserInfo()
        .then(res => {
            userInfo.getInfoUser(res);
            userInfo.renderName();
            userInfo.renderAbout();
            userInfo.renderAvatar();
        })
        .then(() => {
            return api.getInitialCards();
        })
        .then(res => {
            res.forEach(data => {
                const card = renderCard(data);
                cardsSection.addItem(card);
            });
        });


    // Установка слушателей
    // Редактирование информации
    profileEditPopup.setEventListeners();
    editButton.addEventListener('click', function() {
        ({
            name: nameInput.value,
            about: aboutInput.value
        } = userInfo.getUserInfo());
        nameInput.dispatchEvent(new Event('input'));
        aboutInput.dispatchEvent(new Event('input'));
        profileEditPopup.open();
    });

    // Обновления аватара
    avatarChangePopup.setEventListeners();
    popupEditAvatar.addEventListener('click', () => {
        avatarChangePopup.open();
    });

    // Добавления новой карточки
    newCardPopup.setEventListeners();
    openPopupCardButton.addEventListener('click', function() {
        newCardPopup.open();
    });

    // Подтверждение информации
    popupConfirm.setEventListeners();

    // Увеличение изображения
    imagePopup.setEventListeners();

    // Включение валидации
    validateForms(formSelectors);