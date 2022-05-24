export default class Api {
    constructor(confing) {
        this._headers = confing.headers
    }

    _checkError(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    // Получение списка всех карточек
    getInitialCards() {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-41/cards', {
                method: 'GET',
                headers: this._headers
            })
            .then(this._checkError);
    }


    // Получение информации пользователя
    getUserInfo() {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-41/users/me', {
                method: 'GET',
                headers: this._headers
            })
            .then(this._checkError);
    }

    // Обновление аватара 
    newAvatar(avatarUrl) {
        const newConfing = {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: avatarUrl['avatar']
            }),

        }
        return fetch(`https://mesto.nomoreparties.co/v1/cohort-41/users/me/avatar`, newConfing)
            .then(this._checkError);
    }

    // Удаление карточки
    removeCard(cardId) {
        const newConfing = {
            headers: this._headers,
            method: 'DELETE',
        }
        return fetch(`https://mesto.nomoreparties.co/v1/cohort-41/cards/${cardId}`, newConfing)
            .then(this._checkError);
    }

    // Лайк 
    putLike(cardId) {
        const newConfing = {
            headers: this._headers,
            method: 'PUT',
        }
        return fetch(`https://mesto.nomoreparties.co/v1/cohort-41/cards/likes/${cardId}`, newConfing)
            .then(this._checkError);
    }

    // Удалить лайк
    removeLike(cardId) {
        const newConfing = {
            headers: this._headers,
            method: 'DELETE',
        }
        return fetch(`https://mesto.nomoreparties.co/v1/cohort-41/cards/likes/${cardId}`, newConfing)
            .then(this._checkError);
    }

    // Отправить информацию 
    patchProfileInfo(data) {
        const newConfing = {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: data['input-name'],
                about: data['input-about']
            }),
        }
        return fetch('https://mesto.nomoreparties.co/v1/cohort-41/users/me', newConfing)
            .then(this._checkError);
    }

    // Отправить информацию о пользователе на сервер
    patchCard(data) {
        const newConfing = {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: data['InputNameCard'],
                link: data['InputImgCard']
            }),

        }
        return fetch('https://mesto.nomoreparties.co/v1/cohort-41/cards', newConfing)
            .then(this._checkError);
    }
}