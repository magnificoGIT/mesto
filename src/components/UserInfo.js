export default class UserInfo {
    constructor({ nameSelector, aboutSelector, profileAvatar }) {
        // Находим элементы имени и описания пользователя по переданным селекторам
        this._nameElement = document.querySelector(nameSelector);
        this._aboutElement = document.querySelector(aboutSelector);
        this._profileAvatar = document.querySelector(profileAvatar);
    }

    // Метод для получения информации о пользователе
    getUserInfo() {
        // Возвращаем объект с данными имени и описания пользователя
        return {
            name: this._nameElement.textContent,
            about: this._aboutElement.textContent,
            avatar: this._profileAvatar.src
        }
    }

    // Метод для обновления информации о пользователе
    setUserInfo({ name, about, avatar }) {
        // Обновляем текстовое содержимое элементов имени и описания пользователя
        this._nameElement.textContent = name;
        this._aboutElement.textContent = about;
        this._profileAvatar.src = avatar;
    }
}