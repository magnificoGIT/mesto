export default class Card {
    constructor(data, templateSelector, handleCardClick) {
        // Присвоить свойству _name значение имени карточки из переданных данных
        this._name = data.name;
        // Присвоить свойству _link значение ссылки на изображение из переданных данных
        this._link = data.link;
        // Присвоить свойству _templateSelector значение селектора шаблона карточки из переданных данных
        this._templateSelector = templateSelector;
        //Инициализировать элемент в конструкторе для взаимодействия методов класса с DOM-элементами
        this._element = this._getTemplate();
        this._imageElement = this._element.querySelector('.elements__image');
        this._titleElement = this._element.querySelector('.elements__title');
        this._heartButton = this._element.querySelector('.elements__button_type_heart');
        // Получить функцию handleCardClick в index.js
        this._handleCardClick = handleCardClick;
    }
    
    //Метод клонирования разметки карточки
    _getTemplate() {
        const cardElement = document 
        // Получить шаблон карточки из DOM по селектору в свойстве _templateSelector
        .querySelector(this._templateSelector)
        .content
        .querySelector('.elements__card')
        // Клонировать всё, что содержится в шаблоне карточки
        .cloneNode(true);

        return cardElement;
    }

    //Метод добавления слушателей
    _setEventListeners() {
        // Слушатель удаления карточки
        this._element.querySelector('.elements__button_type_delete').addEventListener('click', () => {
            this._handleDeleteCard()
        });
        // Слушатель добавления черного лайка
        this._heartButton.addEventListener('click', () => {
            this._toggleLike();
        });
        // Вызываем функцию открытия попапа с картинкой, передав имя и ссылку на изображение
        this._imageElement.addEventListener('click', () => {
            this._handleCardClick({ name: this._name, link: this._link });
        });
    }

    //Метод добавления черного лайка
    _toggleLike() {
        // Изменить класс кнопки лайка для отображение тёмного лайка
        this._heartButton.classList.toggle('elements__button_type_heart-active');
    }

    //Метод удаления карточки из DOM
    _handleDeleteCard() {
        // Удалить карточку из DOM
        this._element.remove();
        // Очистить ссылку на DOM-элемент
        this._element = null;
    }

    generateCard() {
        // Вставить ссылку на изображение в атрибут src 
        this._imageElement.src = this._link;
        // Вставить название карточки в alt
        this._imageElement.alt = this._name;
        // Вставить название карточки для заголовка
        this._titleElement.textContent = this._name;

        // Вызвать метод установки слушателей
        this._setEventListeners();

        // Вернуть элемент карточки
        return this._element; 
    } 
}