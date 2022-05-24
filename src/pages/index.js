    import './index.css';
    import {
        nameProfile,
        aboutProfile,
        avatarProfile,
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
    import Api from "../components/Api.js";
    import Card from "../components/Card.js";
    import FormValidator from "../components/FormValidator.js";
    import PopupConfirm from "../components/PopupConfirm.js";
    import PopupWithForm from "../components/PopupWithForm.js";
    import PopupWithImage from "../components/PopupWithImage.js";
    import Section from "../components/Section.js";
    import UserInfo from "../components/UserInfo.js";

    const userInfo = new UserInfo(nameProfile, aboutProfile, avatarProfile);
    const renderCards = new Section(cardContainer);
    const popupBigClass = new PopupWithImage(popupBig, popupImg, popupImgText);
    const popupConfirms = new PopupConfirm(popupConfirm);
    popupConfirms.setEventListeners()
    popupBigClass.setEventListeners()

    // Валидация
    const addCardFormValidator = new FormValidator(validationConfig, formAddCard);
    const editProfileFormValidator = new FormValidator(validationConfig, formEditProfile);
    const avatarForm = new FormValidator(validationConfig, saveNewAvatar);
    editProfileFormValidator.enableValidation();
    addCardFormValidator.enableValidation();
    avatarForm.enableValidation();


    const api = new Api({
        url: `https://mesto.nomoreparties.co/v1/cohort-41/`,
        headers: {
            authorization: 'c4e2fce1-46f1-4f6b-98ee-6e99b6737200',
            'Content-Type': 'application/json'
        }
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

                    const popupEdit = new PopupWithForm(popupProfile, inputsValue => {
                        const submitText = popupProfile.querySelector('.popup__save-button')
                        submitText.textContent = 'Сохранение ...'
                            // Отправка на сервер и рендер
                        console.log(inputsValue)
                        api.patchProfileInfo(inputsValue)
                            .then(data => {
                                submitText.textContent = 'Сохранить'
                                userInfo.setUserInfo(data)
                                popupEdit.close()
                            })
                            .catch(err => console.log(err))
                    })
                    popupEdit.setEventListeners()

                    // Попапа добавления
                    const popupAdd = new PopupWithForm(popupCard, inputsValue => {
                        const submitText = popupCard.querySelector('.popup__save-button')
                        submitText.textContent = 'Сохранение ...'
                            // Отправка на сервер и рендер
                        api.patchCard(inputsValue)
                            .then((data) => {
                                submitText.textContent = 'Сохранить'
                                renderCards.addItem(createNewCard(data))
                                popupAdd.close()
                            })
                            .catch(err => console.log(err))
                    })

                    // Новый аватар
                    const popupTypeAvatar = new PopupWithForm(popupAvatarSelector, inputsValue => {
                        const submitText = popupAvatarSelector.querySelector('.popup__save-button')
                        submitText.textContent = 'Сохранение ...'
                            // Отправка на сервер и рендер
                        api.newAvatar(inputsValue)
                            .then((data) => {
                                userInfo.setUserInfo(data)
                                submitText.textContent = 'Сохранить'
                                popupTypeAvatar.close()
                            })
                            .catch(err => console.log(err))
                    })
                    popupTypeAvatar.setEventListeners()

                    // Открыть карточку
                    openPopupCardButton.addEventListener('click', () => {
                        formAddCard.reset();
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