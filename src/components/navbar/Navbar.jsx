import { observer } from "mobx-react-lite";
import React, { useState, useContext  } from "react";
import "./Navbar.css";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import { MAIN, LOG, PROF } from "../../utils/consts";
import { Context } from "../../index";
const Navbar = observer(() => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const history = useNavigate();
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const {user} = useContext(Context)
  
  const logOut = () => {
      localStorage.removeItem('id');
      localStorage.removeItem('token');
      localStorage.removeItem('IISaUTH');
      user.setUser({})
      user.setIsAdmin(false)
      user.setIsAuth(false)
      history(LOG)
      window.location.reload();
  }
  return (
    <nav className="navbar">
        <div className="navbar-container">
            <div className="navbar-logo">
                <a onClick={() => { history(MAIN) }}>Виртуальный деканат</a>
            </div>
            {user.isAuth  && (
                          <div className={`navbar-links ${isMenuOpen ? "active" : ""}`}>
                          <a onClick={() => { history(PROF) }} className="navbar-link">Профиль</a>
                          <a onClick={logOut} className="navbar-link">Выход</a>
                      </div>
            )}
                        {!user.isAuth  && (
                          <div className={`navbar-links ${isMenuOpen ? "active" : ""}`}>
                          <a onClick={() => { history(LOG) }} className="navbar-link">Войти</a>
                      </div>
            )}

            <div className="navbar-hamburger" onClick={toggleMenu}>
                <div className={`hamburger-line ${isMenuOpen ? "line1" : ""}`}></div>
                <div className={`hamburger-line ${isMenuOpen ? "line2" : ""}`}></div>
                <div className={`hamburger-line ${isMenuOpen ? "line3" : ""}`}></div>
            </div>
        </div>
    </nav>
);
});

export default Navbar;