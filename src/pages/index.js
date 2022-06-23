    import './index.css';
    import {
        validationConfig,
        editButton,
        nameInput,
        aboutInput,
        formEditProfile,
        openPopupCardButton,
        formAddCard,
        cardsTemplate,
        cardContainer,
        popupEditAvatar,
        saveNewAvatar,
        popupImg,
        popupImgText
    } from "../utils/constants.js";
    import Api from "../components/Api.js";
    import Card from "../components/Card.js";
    import FormValidator from "../components/FormValidator.js";
    import PopupConfirm from "../components/PopupConfirm.js";
    import PopupWithForm from "../components/PopupWithForm.js";
    import PopupWithImage from "../components/PopupWithImage.js";
    import Section from "../components/Section.js";
    import UserInfo from "../components/UserInfo.js";

    const cardList = new Section(cardContainer);

    const popupZoomImage = new PopupWithImage('.popup_type_big', popupImg, popupImgText);
    popupZoomImage.setEventListeners();

    const popupConfirms = new PopupConfirm('.popup_confirm');
    popupConfirms.setEventListeners();

    // Валидация
    const addCardFormValidator = new FormValidator(validationConfig, formAddCard);
    addCardFormValidator.enableValidation();

    const editProfileFormValidator = new FormValidator(validationConfig, formEditProfile);
    editProfileFormValidator.enableValidation();

    const avatarForm = new FormValidator(validationConfig, saveNewAvatar);
    avatarForm.enableValidation();


    const api = new Api({
        url: `https://mesto.nomoreparties.co/v1/cohort-43/`,
        headers: {
            authorization: '292cceda-e820-4d58-9be5-30225e20d80b',
            'Content-Type': 'application/json'
        }
    });

    const userInfo = new UserInfo({
        userNameSelector: '.profile__name',
        userAboutSelector: '.profile__about',
        userAvatarSelector: '.profile__avatar',
    });

    let myId = ""
        // Получение карточки с сервера и рендер
    api.getInitialCards()
        .then((data) => {
            cardList.renderItems({
                items: data,
                renderer: (element) => {
                    const newCard = createNewCard(element)
                    cardList.addItem(newCard)
                }
            })
        })

    // Профиль пользователя
    api.getUserInfo()
        .then((name, about, avatar, _id) => {
            myId = _id;
            userInfo.setUserInfo({ name, about, avatar })
        })

    // Создание карточки
    function createNewCard(element) {
        const newCard = new Card(cardsTemplate, { myId, ...element },
            (title, link) => {
                popupZoomImage.open(title, link)
            },

            (cardId, card) => {
                api.removeLike(cardId)
                    .then((res) => {
                        card.setLikesInfo(res.likes.length)
                    })
                    .catch((err) => console.log(err))
            },

            (cardId, card) => {
                api.putLike(cardId)
                    .then((res) => {
                        card.setLikesInfo(res.likes.length)
                    })
                    .catch((err) => console.log(err))
            },

            (cardId) => {
                popupConfirms.open()
                popupConfirms.setSubmitAction(() => {
                    api.removeCard(cardId)
                        .then(() => popupConfirms.close())
                        .then(() => newCard.remove())
                        .catch((err) => console.log(err))
                })
            }
        ).getCard()
        return newCard
    }

    const popupEditProfile = new PopupWithForm('.popup_type_profile', inputsValue => {
        popupEditProfile.renderLoading(true);
        console.log(inputsValue)
        api.patchProfileInfo(inputsValue)
            .then(data => {
                userInfo.setUserInfo(data)
                popupEditProfile.close()
            })
            .catch(err => console.log(err))
            .finally(() => popupEditProfile.renderLoading(false))
    })
    popupEditProfile.setEventListeners()

    // Попапа добавления
    const popupAddCard = new PopupWithForm('.popup_type_card', inputsValue => {
        popupAddCard.renderLoading(true);
        api.patchCard(inputsValue)
            .then((data) => {
                cardList.addItem(createNewCard(data))
                popupAddCard.close()
            })
            .catch(err => console.log(err))
            .finally(() => popupAddCard.renderLoading(false))
    })

    // Новый аватар
    const popupTypeAvatar = new PopupWithForm('.popup_type_avatar', inputsValue => {
        popupTypeAvatar.renderLoading(true);
        api.newAvatar(inputsValue)
            .then((data) => {
                userInfo.setUserInfo(data)
                popupTypeAvatar.close()
            })
            .catch(err => console.log(err))
            .finally(() => popupTypeAvatar.renderLoading(false))
    })
    popupTypeAvatar.setEventListeners()

    // Открыть карточку
    openPopupCardButton.addEventListener('click', () => {
        addCardFormValidator.disableSubmitButton();
        popupAddCard.open();
    });
    popupAddCard.setEventListeners();

    // Открыть профиль
    editButton.addEventListener('click', () => {
        const userInformation = userInfo.getUserInfo();
        nameInput.value = userInformation.userName;
        aboutInput.value = userInformation.userAbout;
        popupEditProfile.open();
    });

    // Открыть аватар
    popupEditAvatar.addEventListener('click', () => {
        popupTypeAvatar.open();
        avatarForm.disableSubmitButton();
    })