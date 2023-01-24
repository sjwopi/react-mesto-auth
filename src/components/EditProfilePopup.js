import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup({ isOpen, onClose, onCloseOverlay, onUpdateUser }) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  React.useEffect(() => {
    if (isOpen) {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }
  }, [currentUser, isOpen]);

  function handleNameChange(evt) {
    setName(evt.target.value)
  }
  function handleAboutChange(evt) {
    setDescription(evt.target.value)
  }
  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }
  return (
    <PopupWithForm
      name="edit"
      title="Редактировать профиль"
      textBtn="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onCloseOverlay={onCloseOverlay}
      onSubmit={handleSubmit}
    >
      <input
        id="username"
        name="username"
        placeholder="Имя"
        value={name || ''}
        className="popup__input popup-edit__input-name"
        required
        minLength={2}
        maxLength={40}
        onChange={handleNameChange}
      />
      <span className="form__input-error username-error"></span>
      <input
        id="description"
        name="description"
        placeholder="Вид деятельности"
        value={description || ''}
        className="popup__input popup-edit__input-description"
        required
        minLength={2}
        maxLength={200}
        onChange={handleAboutChange}
      />
      <span className="form__input-error description-error"></span>
    </PopupWithForm>
  );
}
export default EditProfilePopup;