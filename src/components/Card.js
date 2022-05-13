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
        this._like = this._element.querySelector('.card__like');
        this._remove = this._element.querySelector('.card__delete');
        this._setEventListeners();
        const cardTitle = this._element.querySelector('.card__title');
        const cardPhoto = this._element.querySelector('.card__photo');
        cardTitle.textContent = this._cardData.name;
        cardPhoto.src = this._cardData.link;
        cardPhoto.alt = this._cardData.name;
        return this._element;
    }


    // скрытые слушатели
    _toogleLike() {
        this._like.classList.toggle('card__like_active');
    };

    _removeCard() {
        this._element.remove();
    };


    _setEventListeners() {
        this._like.addEventListener('click', () => this._toogleLike());
        this._remove.addEventListener('click', () => this._removeCard());

        const photo = this._element.querySelector('.card__photo')
        photo.addEventListener('click', () => this._handleCardClick.open(photo))
    }
}