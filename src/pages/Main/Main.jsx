import { observer } from "mobx-react-lite";
import React from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { EVENT } from "../../utils/consts";
import './Main.css';
const Main = observer(() => {
  const history = useNavigate();
  return (
    <div className="app">
                   <div className="event-card">
                <div className="event-header">
                    <h3>Ближайшее событие</h3>
                    <span className="event-badge">Новое</span>
                </div>
                <div className="event-content">
                    <h4>Продление студентических билетов</h4>
                    <p className="event-datee"> до 16:00 15 мая 2025</p>
                    <p className="event-location">Старый корпус, аудитория 231</p>
                    <p className="event-description">
                        Всем студентам МГТУ СТАНКИН нужно принести студентические билеты для продления!
                    </p>
                </div>
                <button className="event-button" onClick={() => { history(EVENT) }}>Подробнее</button>
            </div>
    </div>
  );
});

export default Main;