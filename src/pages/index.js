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

    const renderCards = new Section(cardContainer);

    const popupBigClass = new PopupWithImage('.popup_type_big', popupImg, popupImgText);
    popupBigClass.setEventListeners();

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
        url: `https://mesto.nomoreparties.co/v1/cohort-41/`,
        headers: {
            authorization: 'c4e2fce1-46f1-4f6b-98ee-6e99b6737200',
            'Content-Type': 'application/json'
        }
    });

    const userInfo = new UserInfo({
        userNameSelector: '.profile__name',
        userAboutSelector: '.profile__about',
        userAvatarSelector: '.profile__avatar',
    });

    // Профиль пользователя
    api.getUserInfo()
        .then(({ name, about, avatar, _id }) => {
            const myId = _id
            userInfo.setUserInfo({ name, about, avatar })

            function handleOpenCard(title, link) {
                popupBigClass.open(title, link);
            }

            // Создание карточки
            const createNewCard = (element) => {
                const newCard = new Card(cardsTemplate, { myId, ...element }, handleOpenCard,

                    // Удаление карточки 
                    function removeCard(cardId) {
                        popupConfirms.open()
                        popupConfirms.setSubmitAction(() => {
                            api.removeCard(cardId)
                                .then(() => popupConfirms.close())
                                .then(() => newCard.remove())
                                .catch(err => console.log(err))
                        })
                    },

                    // Лайк 
                    function putLike(cardId, card) {
                        api.putLike(cardId)
                            .then((res) => {
                                card.setLikesInfo(res.likes.length)
                            })
                            .catch(err => console.log(err))
                    },
                    // Убрать лайк 
                    function removeLike(cardId, card) {
                        api.removeLike(cardId)
                            .then((res) => {
                                card.setLikesInfo(res.likes.length)
                            })
                            .catch(err => console.log(err))
                    }

                ).getCard()
                return newCard
            }

            // Получение карточки с сервера и рендер
            api.getInitialCards()
                .then((data) => {
                    renderCards.renderItems({
                        items: data,
                        renderer: (element) => {
                            const newCard = createNewCard(element)
                            renderCards.addItem(newCard)
                        }
                    })

                    const popupEdit = new PopupWithForm('.popup_type_profile', inputsValue => {
                        popupEdit.renderLoading(true);
                        console.log(inputsValue)
                        api.patchProfileInfo(inputsValue)
                            .then(data => {
                                userInfo.setUserInfo(data)
                                popupEdit.close()
                            })
                            .catch(err => console.log(err))
                            .finally(() => popupEdit.renderLoading(false))
                    })
                    popupEdit.setEventListeners()

                    // Попапа добавления
                    const popupAdd = new PopupWithForm('.popup_type_card', inputsValue => {
                        popupAdd.renderLoading(true);
                        api.patchCard(inputsValue)
                            .then((data) => {
                                renderCards.addItem(createNewCard(data))
                                popupAdd.close()
                            })
                            .catch(err => console.log(err))
                            .finally(() => popupAdd.renderLoading(false))
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
                        popupAdd.open();
                    });
                    popupAdd.setEventListeners();

                    // Открыть профиль
                    editButton.addEventListener('click', () => {
                        const userInformation = userInfo.getUserInfo();
                        nameInput.value = userInformation.userName;
                        aboutInput.value = userInformation.userAbout;
                        popupEdit.open();
                    });

                    // Открыть аватар
                    popupEditAvatar.addEventListener('click', () => {
                        popupTypeAvatar.open();
                        avatarForm.disableSubmitButton();
                    })
                })
        })