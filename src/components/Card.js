// Создание и функционирование карточки
export default class Card {
    constructor(cardsTemplate, { myId, name, link, likes, owner, _id, userId }, handleCardClick,
            removeCard, putLike, removeLike) {
            this._cardTemplate = cardsTemplate;
            this._myId = myId;
            this._name = name;
            this._link = link;
            this._likes = likes;
            this._userId = userId;
            this._ownerCardId = owner._id;
            this._cardId = _id;
            this._handleCardClick = handleCardClick;
            this._removeCard = removeCard;
            this._putLike = putLike;
            this._removeLike = removeLike;

        }
        // Добавление карточки
    createNewCard() {
        const cardTemp = this._cardTemplate.querySelector('.card').cloneNode(true);
        const cardTitle = cardTemp.querySelector('.card__title');
        const cardPhoto = cardTemp.querySelector('.card__photo');
        cardTitle.textContent = this._name;
        cardPhoto.src = this._link;
        cardPhoto.alt = this._name;

        cardTemp.querySelector('.card__likes-container').textContent = this._likes.length // Счетчик поставленных лайков
            // Отображение активных лайков
        this._likes.forEach(like => {
                if (like._id === this._myId) {
                    cardTemp.querySelector('.card__like').classList.add('card__like_active')
                }
            })
            // Корзина
        if (this._myId === this._ownerCardId) {
            cardTemp.querySelector('.card__delete').classList.add('card__delete_from-me')
        }
        return cardTemp;
    }

    setLikesInfo(info) {
        this._elemLikeCont = this._element.querySelector('.card__likes-container');
        this._elemLikeCont.textContent = info;
        this._element.querySelector('.card__like').classList.toggle('card__like_active');
    };


    _setEventListeners() {
        this._buttonLike = this._element.querySelector('.card__like'); // Кнопка лайка. 
        this._buttonLike.addEventListener('click', () => {
            !this._buttonLike.classList.contains('card__like_active') ?
                this._putLike(this._cardId, this) :
                this._removeLike(this._cardId, this)
        });

        // На весь экран.
        const cardPhoto = this._element.querySelector('.card__photo')
        cardPhoto.addEventListener('click', () => this._handleCardClick(this._name, this._link));

        // Удаление. 
        const remove = this._element.querySelector('.card__delete');
        remove.addEventListener('click', () => {
            this._removeCard(this._cardId);
        });
    }

    getCard() {
        this._element = this.createNewCard();
        this._setEventListeners();
        return this._element
    }
}