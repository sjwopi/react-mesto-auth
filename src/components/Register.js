import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header.js";

function Register() {
  return (
    <>
      <Header>
        <Link to="/sign-in" className="header__link">
          Войти
        </Link>
      </Header>
      <main className="content">
        <div className="auth">
          <h2 className="auth__title">Регистрация</h2>

          <form name="auth-form" className="auth__form" noValidate>
            <input
              id="email"
              name="enail"
              type="email"
              placeholder="Email"
              className="auth__input"
              required
              minLength={2}
              maxLength={40}
            />
            
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Пароль"
              className="auth__input"
              required
              minLength={8}
              maxLength={40}
            />
            
            <button
              name="save-button"
              type="submit"
              className="auth__save-btn"
            >Зарегистрироваться</button>
          </form>
          <Link to="/sign-in" className="auth__to-login">
            Уже зарегистрированы? Войти
          </Link>
        </div>
      </main>
    </>
  );
}

export default Register;