export default class Card {
    constructor(cardsTemplate, cardData, handleCardClick) {
        this._cardTemplate = cardsTemplate;
        this._cardData = cardData;
        this._handleCardClick = handleCardClick;
    }

    // Разметка
    _getTemplate() {
        const cardTemp = this._cardTemplate.querySelector('.card').cloneNode(true);
        return cardTemp;
    }

    // Добавление
    getCard() {
        this._element = this._getTemplate();
        this._setEventListeners();
        const cardTitle = this._element.querySelector('.card__title');
        const cardPhoto = this._element.querySelector('.card__photo');
        cardTitle.textContent = this._cardData.name;
        cardPhoto.src = this._cardData.link;
        cardPhoto.alt = this._cardData.name;
        return this._element;
    }


    _setEventListeners() {
        const photo = this._element.querySelector('.card__photo')
        photo.addEventListener('click', () => {
            this._handleCardClick.open(photo);
            this._handleCardClick.setEventListeners()

        });



        // Лайк
        const buttonLike = this._element.querySelector('.card__like');

        buttonLike.addEventListener('click', (e) => {
            e.target.classList.toggle('card__like_active');
        });


        // Удаление 
        const remove = this._element.querySelector('.card__delete');
        remove.addEventListener('click', (evt) => {
            evt.target.closest('.card').remove();
        });
    }
}