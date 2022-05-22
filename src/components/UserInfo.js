// Хранение, доступ и вывод инормации о пользователе
export default class UserInfo {
    constructor({ nameProfile, aboutProfile, avatarProfile }) {
        this._userName = nameProfile;
        this._userAbout = aboutProfile;
        this._userAvatar = avatarProfile;
    }

    // Сохранение информации о пользователе
    getInfoUser({ name, about, avatar, cohort, _id }) {
        this._name = name;
        this._about = about;
        this._avatar = avatar;
        this._cohort = cohort;
        this.id = _id;
    }

    // Возвращение имени пользователя и информации о нем
    getUserInfo() {
        return {
            userName: this._name,
            userAbout: this._about
        }
    }

    // Вывод имени пользователя на страницу  
    renderName() {
        this._userName.textContent = this._name;
    }

    // Вывод информации о пользователе на страницу  
    renderAbout() {
        this._userAbout.textContent = this._about;
    }

    // Вывод аватара пользователя на страницу  
    renderAvatar() {
        this._userAvatar.src = this._avatar;
    }
}