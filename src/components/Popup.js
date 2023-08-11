export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector); // Находим элемент попапа по селектору
        this._handleEscClose = this._handleEscClose.bind(this); // Привязываем контекст для обработчика клавиши Esc
        this._popupButtonClose = this._popup.querySelector('.popup__button_type_close'); // Находим кнопку закрытия попапа
    }

    openPopup() {
        this._popup.classList.add('popup_active'); // Добавляем класс, делающий попап видимым
        document.addEventListener('keydown', this._handleEscClose); // Добавляем обработчик для закрытия попапа по клавише Esc
    }

    closePopup() {
        this._popup.classList.remove('popup_active');// Удаляем класс, отвечающий за видимость попапа
        document.removeEventListener('keydown', this._handleEscClose); // Удаляем обработчик клавиши Esc
    }

    // Приватный метод для обработки события клавиши Esc
    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.closePopup();
        }
    }

    setEventListeners() {
        this._popupButtonClose.addEventListener('click', this.closePopup.bind(this)); // Обработчик клика по кнопке закрытия попапа
        
        // Обработчик клика по оверлею попапа для закрытия
        this._popup.addEventListener('click', (evt) => {
            if (evt.target.classList.contains('popup_active')) {
                this.closePopup();
            }
        });
        document.addEventListener('keydown', this._handleEscClose); // Обработчик для закрытия попапа по клавише Esc
    }
}