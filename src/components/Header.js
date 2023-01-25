import React from 'react';
import { Link } from "react-router-dom";
import headerLogo from '../images/logo.svg';

function Header({ children, userEmail, onSignOut }) {
  return (
    <header className="header">
      <img src={headerLogo} alt="логотип" className="header__logo" />
      {children ? (
        children
      ) : (
        <div className='header__info'>
          <p className='header__email'>{userEmail}</p>
          <Link to="/sign-in" className="header__link header__link_out" onClick={onSignOut} >
            Выйти
          </Link>
        </div>
      )}
    </header>
  );
}
export default Header;
