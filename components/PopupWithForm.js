import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitCallback) {
        super(popupSelector); // Вызов конструктора базового класса с передачей селектора попапа
        this._submitCallback = submitCallback; // Сохранение функции-коллбэка для сабмита формы
        this._popupForm = this._popup.querySelector('.popup__form'); // Находим форму внутри попапа
        this._popupFormInput = this._popupForm.querySelectorAll('.popup__input'); // Находим все поля ввода внутри формы
    }

    // Приватный метод для получения значений полей ввода формы
    _getInputValues() {
        const values = {}; // Объект для хранения значений полей формы
        this._popupFormInput.forEach(input => {
            // Проходим по всем полям ввода формы
            values[input.name] = input.value; // Добавляем значение поля в объект по его имени
        });
        return values; // Возвращаем объект с значениями полей формы
    }

    setEventListeners() {
        // Вызываем метод установки обработчиков событий родителя класса
        super.setEventListeners();

        // Обработчик события отправки формы
        this._popupForm.addEventListener('submit', (evt) => {
            evt.preventDefault();
            // Вызываем функцию-коллбэк с передачей значений полей формы
            this._submitCallback(this._getInputValues());
            // Закрываем попап после отправки формы
            this.closePopup();
        })
    }

    closePopup() {
        super.closePopup(); // Вызываем метод закрытия попапа родителя класса
        this._popupForm.reset(); // Сбрасываем значения полей формы
    }
}