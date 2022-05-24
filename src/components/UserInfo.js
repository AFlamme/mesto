// Хранение, доступ и вывод инормации о пользователе
export default class UserInfo {
    constructor(nameProfile, aboutProfile, avatarProfile) {
        this._userName = document.querySelector(nameProfile);
        this._userAbout = document.querySelector(aboutProfile);
        this._userAvatar = document.querySelector(avatarProfile);
    }

    // Возвращение имени пользователя и информации о нем
    getUserInfo() {
        return {
            userName: this._userName.textContent,
            userAbout: this._userAbout.textContent
        }
    }

    setUserInfo(item) {
        this._userName.textContent = item.name;
        this._userAbout.textContent = item.about;
        this._userAvatar.style.backgroundImage = `url(${item.avatar})`;
    }
}