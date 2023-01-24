import React from 'react';
import PopupWithForm from './PopupWithForm.js';

function AddPlacePopup({ isOpen, onClose, onCloseOverlay, onAddPlace }) {
  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  React.useEffect(() => {
    if (isOpen) {
      setName('');
      setLink('');
    }
  }, [isOpen]);

  function handleNameChange(evt) {
    setName(evt.target.value);
  }
  function handleLinkChange(evt) {
    setLink(evt.target.value);
  }
  function handleAddPlaceSubmit(evt) {
    evt.preventDefault();
    onAddPlace({ name, link });
  }
  return (
    <PopupWithForm
      name="add"
      title="Новое место"
      textBtn="Добавить"
      isOpen={isOpen}
      onClose={onClose}
      onCloseOverlay={onCloseOverlay}
      onSubmit={handleAddPlaceSubmit}
    >
      <input
        id="name"
        name="name"
        placeholder="Название"
        className="popup__input popup-add__input-name"
        required
        minLength={2}
        maxLength={30}
        value={name}
        onChange={handleNameChange}
      />
      <span className="form__input-error name-error"></span>

      <input
        id="url"
        type="url"
        name="url"
        placeholder="Ссылка на картинку"
        className="popup__input popup-add__input-link"
        required
        minLength={2}
        value={link}
        onChange={handleLinkChange}
      />
      <span className="form__input-error url-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
