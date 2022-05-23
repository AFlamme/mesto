// Создание и функционирование карточки
export default class Card {
    constructor({ name, link, likes, owner, createdAt, _id },
        templateSelector,
        handleCardClick,
        handleDeleteCard,
        handleLikeCard,
        userId) {
        this._name = name;
        this._link = link;
        this._likes = likes;
        this._owner = owner;
        this._createdAt = createdAt;
        this._id = _id;
        this._userId = userId;
        this._isLiked = this._checkIsLiked();

        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
        this._handleDeleteCard = handleDeleteCard;
        this._handleLikeCard = handleLikeCard;
    }

    // Шаблон создаваемой карточки из разметки
    _getTemplate() {
        const cardTemplate = document
            .querySelector(this._templateSelector)
            .content
            .querySelector('.card')
            .cloneNode(true);
        return cardTemplate;
    }

    // Заполнение карточки по исходным данным
    generateCard() {
        this._element = this._getTemplate();

        // Заполнение содержимого
        const image = this._element.querySelector('.card__photo');
        image.src = this._link;
        image.alt = this._name;
        this._element.querySelector('.card__title').textContent = this._name;

        this.setLikes();

        if (this._owner._id !== this._userId) {
            this._element.querySelector('.card__delete').remove();
        }

        // Обработчики нажатий
        this._setEventlisteners();

        return this._element;
    }

    // Устанавка слушателей событий    
    _setEventlisteners() {
        // Лайк карточки
        this._element.querySelector('.card__like').addEventListener('click', (event) => this._likeCard(event));
        // Клик по картинке
        this._element.querySelector('.card__photo').addEventListener('click', () => this._handleCardClick(this._link, this._name));
        // Кнопка удаления карточки, при наличии
        if (this._element.querySelector('.card__delete')) {
            this._element.querySelector('.card__delete').addEventListener('click', () => this._handleDelete());
        }
    }

    // Обработка лайка
    _likeCard(event) {
        event.target.disabled = true;
        this._handleLikeCard(this._id, this._isLiked)
            .then(() => {
                event.target.disabled = false;
            })
    }

    // Удаление
    _handleDelete() {
        this._handleDeleteCard(this._id);
    }

    // Подтверждение лайка
    _checkIsLiked() {
        return this._likes.some(person => person._id === this._userId);
    }

    setLikes(likes) {
        const likeCount = this._element.querySelector('.card__like-countainer');
        const likeButton = this._element.querySelector('.card__like');

        if (likes) {
            this._likes = likes;
            this._isLiked = this._checkIsLiked();
        }

        likeCount.textContent = this._likes.length;

        if (this._isLiked) {
            likeButton.classList.add('card__like_active');
        } else {
            likeButton.classList.remove('card__like_active');
        }
    }

    // Удаляет карточки
    delete() {
        this._element.remove();
        this._element = null;
    }
}