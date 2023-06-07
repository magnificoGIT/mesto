const popup = document.querySelector('.popup');
const popupButtonClose = popup.querySelector('.popup__button_type_close');
const profile = document.querySelector('.profile');
const profileButtonTypeEdit = profile.querySelector('.profile__button_type_edit');
const profileTitle = profile.querySelector('.profile__title');
const profileSubtitle = profile.querySelector('.profile__subtitle');

let popupForm = popup.querySelector('.popup__form');
let popupInputName = popupForm.querySelector('.popup__input_type_name');
let popupInputAboutMyself = popupForm.querySelector('.popup__input_type_about-myself');

//Функции открытия и закрытия popup
function popupOpen() {
    popup.classList.add('popup_active');
    fillingFormPopup();
}
function popupClose() {
    popup.classList.remove('popup_active');
}
//Функция заполненых полей при открытии popup
function fillingFormPopup() {
    popupInputName.value = profileTitle.textContent;
    popupInputAboutMyself.value = profileSubtitle.textContent;
}
//Функциии для сохранения редактируемого текста  и закрытия popup на кнопку "Сохранить"
function savingTextFormPopup() {
    profileTitle.textContent = popupInputName.value;
    profileSubtitle.textContent = popupInputAboutMyself.value;
}
function handleFormSubmit (evt) {
    evt.preventDefault();
    savingTextFormPopup();
    popupClose();
}

//Слушатель сохранения редактируемого текста и закрытия popup на кнопку "Сохранить" или клавишу Enter
popupForm.addEventListener('submit', handleFormSubmit); 
//Слушатель на удаление класса popup_active для закрытия popup
popupButtonClose.addEventListener('click', popupClose);
//Слушатель на добавление класса popup_active для открытия popup при клике на кнопку редактировать
profileButtonTypeEdit.addEventListener('click', popupOpen);