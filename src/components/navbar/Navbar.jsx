import { observer } from "mobx-react-lite";
import React, { useState, useContext } from "react";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import { MAIN, LOG, PROF, ABOUT, Allowance, Attendance, Disc, Discs, Sch, SCORE, Teach, Teachs, ProfScorE, RaspPROF, Dopusk} from "../../utils/consts";
import { Context } from "../../index";

const Navbar = observer(() => {
  const history = useNavigate();
  const {user} = useContext(Context);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const logOut = () => {
    localStorage.removeItem('id');
    localStorage.removeItem('token');
    localStorage.removeItem('IISaUTH');
    user.setUser({});
    user.setIsAdmin(false);
    user.setIsAuth(false);
    history(LOG);
    window.location.reload();
  };

const navItems = [
  { title: "Главная", path: MAIN },
  { title: "О нас", path: ABOUT },
  { title: "Дисциплины", path: Discs },
  { title: "Преподаватели", path: Teachs },
  ...(user.isAuth
    ? user.isProf
      ? [ 
          { title: "Оценки", path: ProfScorE },
          { title: "Допуски", path: Dopusk },
          { title: "Расписание", path: RaspPROF },
          { title: "Профиль", path: PROF },
          { title: "Выход", action: logOut }
        ]
      : [ 
          { title: "Допуск", path: Allowance },
          { title: "Посещаемость", path: Attendance },
          { title: "Расписание", path: Sch },
          { title: "Профиль", path: PROF },
          { title: "Оценки студента", path: SCORE },
          { title: "Выход", action: logOut }
        ]
    : [
        { title: "Войти", path: LOG }
      ])
];

  const handleNavigate = (item) => {
    if (item.action) {
      item.action();
    } else {
      history(item.path);
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <span  onClick={() => history(MAIN)} >Виртуальный деканат</span>
        </div>
        
        <div className="burger-menu">
          <button 
            className={`burger-button ${isMenuOpen ? "open" : ""}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Меню"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          
          <div className={`menu-content ${isMenuOpen ? "open" : ""}`}>
            {navItems.map((item, index) => (
              <div 
                key={index} 
                className="menu-item"
                onClick={() => handleNavigate(item)}
              >
                {item.title} {item.status && <span className="status">{item.status}</span>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
});

export default Navbar;