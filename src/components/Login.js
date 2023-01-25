import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';

function Login({onLogin}) {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  function handlePasswordInput(evt) {
    setPassword(evt.target.value);
  }

  function handleEmailInput(evt) {
    setEmail(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onLogin({ email, password });
  }
  return (
    <>
      <Header>
        <Link to="/sign-up" className="header__link">
          Регистрация
        </Link>
      </Header>
      <main className="content">
        <div className="auth">
          <h2 className="auth__title">Вход</h2>

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
              onInput={handleEmailInput}
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
              onInput={handlePasswordInput}
            />

            <button
              name="save-button"
              type="submit"
              className="auth__save-btn"
              onClick={handleSubmit}
            >
              Войти
            </button>
          </form>
        </div>
      </main>
    </>
  );
}
export default Login;
