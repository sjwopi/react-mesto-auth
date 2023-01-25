import React from "react"
import headerLogo from '../images/logo.svg'

function Header({children}) {
  return (
    <header className="header">
      <img src={headerLogo} alt="логотип" className="header__logo" />
      {children}
    </header>
  );
}
export default Header