import { observer } from "mobx-react-lite";
import React from 'react';
import { useNavigate } from "react-router-dom";
import './Main.css';
import { EVENT, Sch, SCORE, ABOUT } from "../../utils/consts";

const Main = observer(() => {
  const history = useNavigate();
  const announcements = [
    {
      id: 1,
      title: "Продление студенческих билетов",
      date: "до 16:00 15 мая 2025",
      location: "Старый корпус, аудитория 231",
      description: "Всем студентам МГТУ СТАНКИН нужно принести студенческие билеты для продления!",
      isNew: true
    },
    {
      id: 2,
      title: "Запись на пересдачи",
      date: "до 20 мая 2025",
      location: "Кафедры",
      description: "Студенты, имеющие академические задолженности, могут записаться на пересдачи.",
      isNew: false
    }
  ];

  const quickLinks = [
    { title: "Расписание", icon: "📅", path: Sch },
    { title: "Успеваемость", icon: "📊", path: SCORE },
    { title: "О нас", icon: "📞", path: ABOUT }
  ];

  return (
    <div className="app">
      <div className="main-header">
        <p>Добро пожаловать в систему электронного деканата</p>
      </div>

      <div className="dashboard-grid">
        <div className="quick-links">
          <h2>Быстрый доступ</h2>
          <div className="links-grid">
            {quickLinks.map((link, index) => (
              <div 
                key={index} 
                className="link-card"
                onClick={() => history(link.path)}
              >
                <span className="link-icon">{link.icon}</span>
                <span className="link-title">{link.title}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="announcements">
          <h2>Объявления</h2>
          {announcements.map(event => (
            <div key={event.id} className="event-card">
              <div className="event-header">
                <h3>{event.title}</h3>
                {event.isNew && <span className="event-badge">Новое</span>}
              </div>
              <div className="event-content">
                <p className="event-date">Срок: {event.date}</p>
                {event.location && <p className="event-location">Место: {event.location}</p>}
                <p className="event-description">{event.description}</p>
              </div>
              <button 
                className="event-button" 
                onClick={() => history(`${EVENT}`)}
              >
                Подробнее
              </button>
            </div>
          ))}
        </div>
        <div className="important-dates">
          <h2>Важные даты</h2>
          <ul className="dates-list">
            <li>20 мая - Начало летней сессии</li>
            <li>25 мая - Крайний срок оплаты обучения</li>
            <li>10 июня - Выдача справок об обучении</li>
            <li>30 июня - Заселение в общежитие</li>
          </ul>
        </div>
        <div className="contacts">
          <h2>Контакты деканата</h2>
          <div className="contact-info">
            <p><strong>Телефон:</strong> +7 (499) 972-94-56</p>
            <p><strong>Email:</strong> dekanat@stankin.ru</p>
            <p><strong>Адрес:</strong> Москва, Вадковский пер., 3А</p>
            <p><strong>Часы работы:</strong> Пн-Пт 9:00-17:00</p>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Main;