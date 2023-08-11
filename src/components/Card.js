export default class Card {
    constructor(data, templateSelector, handleCardClick) {
        this._name = data.name; // Присвоить свойству _name значение имени карточки из переданных данных
        this._link = data.link; // Присвоить свойству _link значение ссылки на изображение из переданных данных
        this._templateSelector = templateSelector; // Присвоить свойству _templateSelector значение селектора шаблона карточки из переданных данных
        this._element = this._getTemplate(); //Инициализировать элемент в конструкторе для взаимодействия методов класса с DOM-элементами
        this._imageElement = this._element.querySelector('.elements__image');
        this._titileElement = this._element.querySelector('.elements__title');
        this._handleCardClick = handleCardClick; // Получить свойство handleOpenPopup
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
            this._toggleLike()}); // Слушатель добавления черного лайка

            this._imageElement.addEventListener('click', () => {
                this._handleCardClick({ name: this._name, link: this._link }); // Вызываем функцию открытия попапа с картинкой, передав имя и ссылку на изображение
            });
    }

    //Метод добавления черного лайка
    _toggleLike() {
        this._element
        .querySelector('.elements__button_type_heart')
        .classList.toggle('elements__button_type_heart-active'); // Изменить класс кнопки лайка для отображение тёмного лайка
    }

    //Метод удаления карточки из DOM
    _handleDeleteCard() {
        this._element.remove(); // Удалить карточку из DOM
    }

    generateCard() {
        this._imageElement.src = this._link; // Вставить ссылку на изображение в атрибут src
        this._imageElement.alt = this._name; // Вставить название карточки в alt
        this._titileElement.textContent = this._name; // Вставить название карточки для заголовка

        this._setEventListeners(); // Вызвать метод установки слушателей

        return this._element; // Вернуть элемент карточки
    }
    }