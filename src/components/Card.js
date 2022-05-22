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

    /**
     * Получает шаблон создаваемой карточки из разметки
     * @returns {object} Пустой элемент, созданный из шаблона
     */
    _getTemplate() {
        const cardTemplate = document
            .querySelector(this._templateSelector)
            .content
            .querySelector('.card')
            .cloneNode(true);
        return cardTemplate;
    }

    /**
     * Создает заполненную по исходным данным карточку
     * @returns {object} Карточка, готовая для вставки в разметку
     */
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

    /**
     * Устанавливает необходимые слушатели событий на элементы карточки
     */
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

    /**
     * Обрабатывает лайк карточки
     * @param {object} event - Событие клика
     */
    _likeCard(event) {
        event.target.disabled = true;
        this._handleLikeCard(this._id, this._isLiked)
            .then(() => {
                event.target.disabled = false;
            })
    }

    /**
     * Обрабатывает нажатие на удаление карточки
     */
    _handleDelete() {
        this._handleDeleteCard(this._id);
    }

    /**
     * Определяет, есть ли лайк пользователя на карточке
     * @returns {boolean}
     */
    _checkIsLiked() {
        return this._likes.some(person => person._id === this._userId);
    }

    /**
     * Обрабатывает массив лайков карточки:
     * - при наличии аргумента сохраняет новые лайки
     * - записывает количество лайков в разметку
     * - сохраняет и показывает в разметке текущее состяние лайка пользователя
     *
     * @param {Array} likes - Новые лайки карточки (необязательный параметр)
     */
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

    /**
     * Удаляет карточку из раметки
     */
    delete() {
        this._element.remove();
        this._element = null;
    }
}