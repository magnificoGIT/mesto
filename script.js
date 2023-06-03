const popup = document.querySelector('.popup');
const profileButtonEdit = document.querySelector('.profile__button_edit');
const popupButtonClose = popup.querySelector('.popup__button_close');
const profile = document.querySelector('.profile');
const profileTitle = profile.querySelector('.profile__title');
const profileSubtitle = profile.querySelector('.profile__subtitle');

let popupContainer = popup.querySelector('.popup__container');
let popupInputName = popupContainer.querySelector('.popup__input_name');
let popupInputAboutMyself = popupContainer.querySelector('.popup__input_about-myself');

//Функционал открытия и закрытия popup
function popupOpen() {
    popup.classList.add('popup__opened');
}

profileButtonEdit.addEventListener('click', popupOpen);

function popupClose() {
    popup.classList.remove('popup__opened');
}

popupButtonClose.addEventListener('click', popupClose);

//Функционал заполненых полей при открытии popup
function fillingFormPopup() {
    popupInputName.value = profileTitle.textContent;
    popupInputAboutMyself.value = profileSubtitle.textContent;
}

profileButtonEdit.addEventListener('click', fillingFormPopup);

//Функционал сохранения редактируемого текста  и закрытия popup на кнопку "Сохранить"
function SavingTextFormPopup() {
    profileTitle.textContent = popupInputName.value;
    profileSubtitle.textContent = popupInputAboutMyself.value;
}

function handleFormSubmit (evt) {
    evt.preventDefault();
    SavingTextFormPopup();
    popupClose();
}

popupContainer.addEventListener('submit', handleFormSubmit); 