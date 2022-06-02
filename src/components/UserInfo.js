// Хранение, доступ и вывод инормации о пользователе
export default class UserInfo {
    constructor({ userNameSelector, userAboutSelector, userAvatarSelector }) {
        this._userNameElement = document.querySelector(userNameSelector);
        this._userAboutElement = document.querySelector(userAboutSelector);
        this._userAvatarElement = document.querySelector(userAvatarSelector)
    }

    // Возвращение имени пользователя и информации о нем
    getUserInfo() {
        const userInfo = {
            userName: this._userNameElement.textContent,
            userAbout: this._userAboutElement.textContent,
            userAvatar: this._userAvatarElement.src,
        }
        return userInfo;
    }

    setUserInfo(item) {
        this._userNameElement.textContent = item.name;
        this._userAboutElement.textContent = item.about;
        this._userAvatarElement.src = item.avatar;
    }
}