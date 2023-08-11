export default class UserInfo {
    constructor({ nameSelector, aboutSelector }) {
        // Находим элементы имени и описания пользователя по переданным селекторам
        this._nameElement = document.querySelector(nameSelector);
        this._aboutElement = document.querySelector(aboutSelector);
    }

    // Метод для получения информации о пользователе
    getUserInfo() {
        // Возвращаем объект с данными имени и описания пользователя
        return {
            name: this._nameElement.textContent,
            about: this._aboutElement.textContent
        };
    }

    // Метод для обновления информации о пользователе
    setUserInfo({ name, about }) {
        // Обновляем текстовое содержимое элементов имени и описания пользователя
        this._nameElement.textContent = name;
        this._aboutElement.textContent = about;
    }
}