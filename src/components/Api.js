export default class Api {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    // Ошибка
    _checkError(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    // Данные текущего пользователя
    getUserInformation() {
        return fetch(`${this._baseUrl}/users/me`, {
                method: "GET",
                headers: this._headers
            })
            .then(this._checkError);
    }

    // Новое имя и новая информация о пользователе
    updateUserInformation(name, about) {
        return fetch(`${this._baseUrl}/users/me`, {
                method: 'PATCH',
                headers: this._headers,
                body: JSON.stringify({
                    name: name,
                    about: about
                })
            })
            .then(this._checkError);
    }

    // Новый аватар
    updateUserAvatar(link) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
                method: 'PATCH',
                headers: this._headers,
                body: JSON.stringify({
                    avatar: link
                })
            })
            .then(this._checkError);
    }

    // Отрисовка карточек
    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
                method: 'GET',
                headers: this._headers
            })
            .then(this._checkError);
    }

    // Добавление новой карточки
    addNewCardToServer(name, link) {
        return fetch(`${this._baseUrl}/cards`, {
                method: 'POST',
                headers: this._headers,
                body: JSON.stringify({
                    name: name,
                    link: link
                })
            })
            .then(this._checkError);
    }

    // Поставить лайк карточке
    _setLike(cardId) {
        return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
                method: 'PUT',
                headers: this._headers
            })
            .then(this._checkError);
    }

    // Удаление лайка с карточки
    _removeLike(cardId) {
        return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
                method: "DELETE",
                headers: this._headers
            })
            .then(this._checkError);
    }

    // Переключение лайка
    toggleLike(cardId, isLiked) {
        if (isLiked) {
            return this._removeike(cardId);
        } else {
            return this._setLike(cardId);
        }
    }

    // Удаление карточки
    deleteCard(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
                method: "DELETE",
                headers: this._headers
            })
            .then(this._checkError);
    }
}