//Функционал открытия и закрытия popup
const popup = document.querySelector('.popup');
const profileButtonEdit = document.querySelector('.profile__button_edit');
const popupButtonClose = popup.querySelector('.popup__button_close');

function popupOpen() {
    popup.classList.add('popup__opened');
}

profileButtonEdit.addEventListener('click', popupOpen);

function popupClose() {
    popup.classList.remove('popup__opened');
}

popupButtonClose.addEventListener('click', popupClose);

//Функционал обработчика форм
let popupContainer = popup.querySelector('.popup__container');

let popupInputName = popup.querySelector('.popup__input_name');

let popupInputAboutMyself = popup.querySelector('.popup__input_about-myself');

function handleFormSubmit(evt) {
    evt.preventDefault();
    let nameValue = popupInputName.value;
    let aboutMyselfValue = popupInputAboutMyself.value;
}

//Функционал редактирования текста в полях ввода
