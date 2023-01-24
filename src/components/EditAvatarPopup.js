import React from 'react';
import PopupWithForm from './PopupWithForm.js';

function EditAvatarPopup({ isOpen, onClose, onCloseOverlay, onUpdateAvatar}) {
  const avatarRef = React.useRef();
  React.useEffect(() => {
    avatarRef.current.value = "";
  }, [isOpen]);

  function handleSubmit(event) {
    event.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }
  return (
    <PopupWithForm
      name="avatar"
      title="Редактировать аватар"
      textBtn="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onCloseOverlay={onCloseOverlay}
      onSubmit={handleSubmit}
    >
      <input
        id="urlavatar"
        type="url"
        name="urlavatar"
        placeholder="Ссылка на картинку"
        className="popup__input popup-avatar__input-link"
        required
        minLength={2}
        ref={avatarRef}
      />
      <span className="form__input-error urlavatar-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
