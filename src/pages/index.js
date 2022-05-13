    import './index.css';
    import {
        initialCards,
        validationConfig,
        popupProfile,
        editButton,
        nameInput,
        aboutInput,
        nameProfile,
        aboutProfile,
        formEditProfile,
        popupCard,
        openPopupCardButton,
        formAddCard,
        cardsTemplate,
        cardContainer,
        popupCardSaveButton,
        popupBig
    } from "../utils/constants.js";
    import PopupWithForm from "../components/PopupWithForm.js";
    import PopupWithImage from "../components/PopupWithImage.js";
    import Section from "../components/Section.js";
    import Card from "../components/Card.js";
    import FormValidator from "../components/Validate.js";
    import UserInfo from "../components/UserInfo.js";

    const userInfo = new UserInfo({ nameProfile, aboutProfile });
    const imagePopup = new PopupWithImage(popupBig);
    const popupAdd = new PopupWithForm(popupCard, addCardFormSubmit);
    const popupEdit = new PopupWithForm(popupProfile, editProfileFormSubmit);

    //Validation
    const addCardFormValidator = new FormValidator(validationConfig, formAddCard);
    const editProfileFormValidator = new FormValidator(validationConfig, formEditProfile);
    editProfileFormValidator.enableValidation();
    addCardFormValidator.enableValidation();

    function generateCard(item) {
        const newCard = new Card(cardsTemplate, item, imagePopup);
        const cardElement = newCard.getCard();
        return cardElement;
    }

    //Section 
    const renderCards = new Section({
            items: initialCards,
            renderer: (item) => {
                const cardElement = generateCard(item);
                renderCards.addItem(cardElement)
            }
        },
        cardContainer)

    renderCards.renderItems()

    //рендер на страницу новой карточки
    function addCardFormSubmit(data) {
        const cardElement = generateCard({ name: data['InputNameCard'], link: data['InputImgCard'] })
        cardContainer.prepend(cardElement);
        popupAdd.close();
        popupCardSaveButton.classList.add(validationConfig.inactiveButtonClass);
        popupCardSaveButton.setAttribute('disabled', 'disabled');
    }

    //открывает попап карточки
    openPopupCardButton.addEventListener('click', () => {
        formAddCard.reset();
        addCardFormValidator.enableValidation()
        popupCardSaveButton.classList.add(validationConfig.inactiveButtonClass);
        popupCardSaveButton.setAttribute('disabled', 'disabled');
        popupAdd.open();
    })

    //редактирование профиля
    function editProfileFormSubmit(data) {
        userInfo.setUserInfo(data);
        popupEdit.close();
    }

    // открывает попап профиля
    editButton.addEventListener('click', () => {
        const userInformation = userInfo.getUserInfo();
        nameInput.value = userInformation.name;
        aboutInput.value = userInformation.about;
        popupEdit.open();
    })

    popupEdit.setEventListeners();
    popupAdd.setEventListeners();
    imagePopup.setEventListeners();