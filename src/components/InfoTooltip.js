import successIcon from '../images/success-icon.svg';
import unsuccessIcon from '../images/unsuccess-icon.svg';

const InfoTooltip = ({ isOpen, isSuccess, text, onClose }) => {
  return (
    <div className={`popup ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container popup__container_signup">
        <button type="button" className="popup__close-btn" onClick={onClose} />
        <img
          src={ isSuccess ? successIcon : unsuccessIcon }
          alt={ isSuccess ? 'Успешно' : 'Не успешно' }
          className="popup__signup-icon"
        />
        <p className="popup__signup-title">
          { text }
        </p>
      </div>
    </div>
  );
};

export default InfoTooltip;