import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupButton, popupSelector, submitCallback) {
        // Вызов конструктора родительского класса с передачей селектора попапа
        super(popupSelector);
        // Сохранение функции-коллбэка для сабмита формы
        this._submitCallback = submitCallback;
        // Находим форму внутри попапа
        this._popupForm = this._popup.querySelector('.popup__form');
        // Находим все поля ввода внутри формы
        this._inputList = this._popupForm.querySelectorAll('.popup__input');
        this._popupButton = popupButton;
    }

    // Приватный метод для получения значений полей ввода формы
    _getInputValues() {
        // Объект для хранения значений полей формы
        const values = {};
        
        // Проходим по всем полям ввода формы
        this._inputList.forEach(input => {
            // Добавляем значение поля в объект по его имени
            values[input.name] = input.value;
        });

        // Возвращаем объект с значениями полей формы
        return values;
    }

    // Метод для вставки данных в инпуты
    setInputValues(data) {
        this._inputList.forEach((input) => {
            input.value = data[input.name];
          });
    }

    setEventListeners() {
        // Вызываем метод установки обработчиков событий родителя класса
        super.setEventListeners();

        // Обработчик события отправки формы
        this._popupForm.addEventListener('submit', (evt) => {
            evt.preventDefault();
            // Вызываем функцию-коллбэк с передачей значений полей формы
            this._submitCallback(this._getInputValues())
            .then(() => {
                this.closePopup();
            })
        })
    }

    closePopup() {
        // Вызываем метод закрытия попапа родителя класса
        super.closePopup();
        // Сбрасываем значения полей формы
        this._popupForm.reset();
    }
}