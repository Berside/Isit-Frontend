import React, { useState, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from "../../index";
import { MAIN } from "../../utils/consts";
import { useNavigate } from "react-router-dom";
import { login } from "../../http/userAPI";
import './Auth.css';

const AuthPage = observer(() => {
    const { user } = useContext(Context);
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');

    const click = async (e) => {
        e.preventDefault();
        try {
            let data;
            data = await login(username, password);
            user.setUser(user)
            user.setIsAuth(true)
            user.setIsEmail(username);
            navigate(MAIN)
            // window.location.reload();
        } catch (e) {
            alert(e.response.data.message)
        }
      }

    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-header">
                    <h2>Вход в систему</h2>
                    <p>Введите свои данные для входа</p>
                </div>
    
                {error && <div className="auth-error">{error}</div>}
    
                <form  className="auth-form" onSubmit={click}>
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
                    <button type="submit" className="auth-button">Войти</button>
                </form>
            </div>
        </div>
    );
});

export default AuthPage;