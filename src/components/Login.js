import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from './Header';

function Login() {
  return (
    <>
      <Header>
        <Link to="/sign-in" className="header__link">
          Регистрация
        </Link>
      </Header>
      <main className="content">
        <div className="login">
          <h2 className="login__title">Вход</h2>

          <form name="login-form" className="login__form" noValidate>
            <input
              id="email"
              name="enail"
              type="email"
              placeholder="Email"
              className="login__input"
              required
              minLength={2}
              maxLength={40}
            />
            
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Пароль"
              className="login__input"
              required
              minLength={8}
              maxLength={40}
            />
            
            <button
              name="save-button"
              type="submit"
              className="login__save-btn"
            >Войти</button>
          </form>
        </div>
      </main>
    </>
  );
}
export default Login;
