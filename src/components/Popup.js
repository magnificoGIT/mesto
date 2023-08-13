export default class Popup {
    constructor(popupSelector) {
        // Находим элемент попапа по селектору
        this._popup = document.querySelector(popupSelector);
        // Привязываем контекст для обработчика клавиши Esc
        this._handleEscClose = this._handleEscClose.bind(this);
        // Находим кнопку закрытия попапа
        this._popupButtonClose = this._popup.querySelector('.popup__button_type_close');
    }

    openPopup() {
        // Добавляем класс, делающий попап видимым
        this._popup.classList.add('popup_active');
        // Добавляем обработчик для закрытия попапа по клавише Esc
        document.addEventListener('keydown', this._handleEscClose);
    }

    closePopup() {
        // Удаляем класс, отвечающий за видимость попапа
        this._popup.classList.remove('popup_active');
        // Удаляем обработчик клавиши Esc
        document.removeEventListener('keydown', this._handleEscClose);
    }

    // Приватный метод для обработки события клавиши Esc
    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.closePopup();
        }
    }

    setEventListeners() {
        // Обработчик клика по кнопке закрытия попапа
        this._popupButtonClose.addEventListener('click', this.closePopup.bind(this));
        
        // Обработчик клика по оверлею попапа для закрытия
        this._popup.addEventListener('click', (evt) => {
            if (evt.target.classList.contains('popup_active')) {
                this.closePopup();
            }
        });
    }
}