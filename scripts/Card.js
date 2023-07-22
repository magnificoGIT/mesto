import { openPopup } from "./index.js";

export class Card {
    constructor(data, templateSelector) {
        this._name = data.name; // Присвоить свойству _name значение имени карточки из переданных данных
        this._link = data.link; // Присвоить свойству _link значение ссылки на изображение из переданных данных
        this._templateSelector = templateSelector; // Присвоить свойству _templateSelector значение селектора шаблона карточки из переданных данных
        this._element = this._getTemplate(); //Инициализировать элемент в конструкторе для взаимодействия методов класса с DOM-элементами
    }
    
    //Метод клонирования разметки карточки
    _getTemplate() {
        const cardElement = document 
        .querySelector(this._templateSelector) // Получить шаблон карточки из DOM по селектору в свойстве _templateSelector
        .content
        .querySelector('.elements__card')
        .cloneNode(true); // Клонировать всё, что содержится в шаблоне карточки

        return cardElement;
    }

    //Метод добавления слушателей
    _setEventListeners() {
        this._element.querySelector('.elements__button_type_delete').addEventListener('click', () => {
            this._handleDeleteCard()}); // Слушатель удаления карточки

        this._element.querySelector('.elements__button_type_heart').addEventListener('click', () => {
            this._addBlackLike()}); // Слушатель добавления черного лайка

        this._element.querySelector('.elements__image').addEventListener('click', () => {
            this._handleImageCard()}); // Слушатель отображения изображения по клику на картинку в карточке
    }

    //Метод добавления черного лайка
    _addBlackLike() {
        this._element
        .querySelector('.elements__button_type_heart')
        .classList.toggle('elements__button_type_heart-active'); // Изменить класс кнопки лайка для отображение тёмного лайка
    }

    //Метод удаления карточки из DOM
    _handleDeleteCard() {
        this._element.remove(); // Удалить карточку из DOM
    }

    //Метод для отображения изображения по клику на карточку
    _handleImageCard() {
        const popupImg = document.querySelector('.popup-img');
        const popupImage = popupImg.querySelector('.popup__image');
        const imageSubtitle = popupImg.querySelector('.popup__image-subtitle');

        openPopup(popupImg); // Использовать функцию openPopup для открытия попапа с изображением
        popupImage.src = this._link; // Вставить ссылку на изображение
        imageSubtitle.textContent = this._name; // Вставить название карточки
        popupImage.alt = this._name; // Вставить название карточки в alt для открытого изображения
    }

    generateCard() {
        const imageElement = this._element.querySelector('.elements__image');
        const titileElement = this._element.querySelector('.elements__title');

        imageElement.src = this._link; // Вставить ссылку на изображение в атрибут src
        imageElement.alt = this._name; // Вставить название карточки в alt
        titileElement.textContent = this._name; // Вставить название карточки для заголовка

        this._setEventListeners(); // Вызвать метод установки слушателей

        return this._element; // Вернуть элемент карточки
    }
    }