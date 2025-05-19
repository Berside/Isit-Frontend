import React, { useState, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from "../../index";
import { LOG, REG, MAIN } from "../../utils/consts";
import { useLocation, useNavigate } from "react-router-dom";
import { login, registration } from "../../http/userAPI";
import './Auth.css';

const AuthPage = observer(() => {
    const { user } = useContext(Context);
    const location = useLocation();
    const navigate = useNavigate();
    const isLogin = location.pathname === LOG;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');

    const click = async (e) => {
        e.preventDefault();
        try {
            let data;
            if (isLogin) {
                data = await login(email, password);
                user.setUser(user)
                user.setIsAuth(true)
                user.setIsEmail(email);
                navigate(MAIN)
                window.location.reload();
            } else {
                data = await registration(username, email, password);
                try {
                  alert('Вы успешно зарегистрированы!')
                } catch (e) {
                  alert(e.response.data.message)
                }
            }
        } catch (e) {
            alert(e.response.data.message)
        }
      }

    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-header">
                    <h2>{isLogin ? 'Вход в систему' : 'Регистрация'}</h2>
                    <p>{isLogin ? 'Введите свои данные для входа' : 'Создайте новую учетную запись'}</p>
                </div>
    
                {error && <div className="auth-error">{error}</div>}
    
                <form  className="auth-form" onSubmit={click}>
                    {!isLogin && (
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                id="username"
                                value={username}
                                onChange={(e) => {
                                    setUsername(e.target.value);
                                    setError('');
                                }}
                                placeholder="Username"
                                required
                            />
                        </div>
                    )} 
    
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                setError('');
                            }}
                            placeholder="example@mail.com"
                            required
                        />
                    </div>
    
                    <div className="form-group">
                        <label htmlFor="password">Пароль</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setError('');
                            }}
                            placeholder="Не менее 6 символов"
                            minLength="2"
                            required
                        />
                    </div>
    
                    <button type="submit" className="auth-button">
                        {isLogin ? 'Войти' : 'Зарегистрироваться'}
                    </button>
                </form>
    
                <div className="auth-footer">
                    {isLogin ? (
                        <p>
                            Нет аккаунта?{' '}
                            <a href={REG} className="auth-link">
                                Зарегистрируйтесь
                            </a>
                        </p>
                    ) : (
                        <p>
                            Уже есть аккаунт?{' '}
                            <a href={LOG} className="auth-link">
                                Войдите
                            </a>
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
});

export default AuthPage;