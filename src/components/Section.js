export default class Section {
    // Конструктор класса, принимающий объект с массивом элементов и функцией для отрисовки элемента, а также селектор контейнера
    constructor({items, renderer}, containerSelector) {
        this._items = items; // Сохраняем массив элементов
        this._renderer = renderer; // Сохраняем функцию для отрисовки элемента
        this._container = document.querySelector(containerSelector); // Находим контейнер по переданному селектору
    }

    // Метод для отрисовки всех элементов массива
    renderItems() {
        this._items.forEach((item) => {
            this._renderer(item); // Вызываем функцию для отрисовки элемента, передавая текущий элемент массива
        });
    }

    // Метод для добавления элемента в контейнер
    addItem(element) {
        this._container.prepend(element); // Добавляем элемент в начало контейнера
    }
}