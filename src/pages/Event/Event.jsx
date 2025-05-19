import { observer } from "mobx-react-lite";
import React, { useState, useContext } from 'react';
import './Event.css';
import { Context } from "../../index";

const Event = observer(() => {
    const { user } = useContext(Context);
    const [isRegistered, setIsRegistered] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [eventData, setEventData] = useState({
        title: 'Продление студенческих билетов',
        date: 'До 16 мая 2025 года',
        slogan: 'Успейте продлить свой студенческий билет вовремя!',
        description: [
            'Ежегодная процедура продления студенческих билетов - важный процесс для продолжения вашего обучения и пользования всеми льготами.',
            'В этом году продление будет проходить в упрощенном формате с возможностью онлайн-подтверждения для студентов старших курсов.'
        ],
        location: {
            name: 'Единый деканат',
            address: 'г. Москва, Вадковский пер., 3А, стр. 1',
            details: 'Кабинет 205 (2 этаж) старый корпус'
        }
    });

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        course: '1',
        faculty: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Форма отправлена:', formData);
        setIsRegistered(true);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const eventSchedule = [
        { time: 'Понедельник-Пятница', event: 'Продление для 1-2 курсов', location: 'Отдел кадров' },
        { time: 'Понедельник-Пятница', event: 'Продление для 3-4 курсов', location: 'Отдел кадров' },
    ];

    const benefits = [
        'Сохраните доступ ко всем студенческим льготам',
        'Продлите проездной билет на общественный транспорт',
        'Получите доступ в библиотеку на следующий учебный год',
        'Подтвердите свой статус студента',
        'Избежите штрафных санкций за просрочку',
        'Получите новый стикер на текущий год'
    ];

    return (
        <div className="event-page">
            {user.isAdmin && (
                <div className="admin-actions">
                    <button 
                        className="admin-button edit-event-button"
                        onClick={() => setIsEditing(!isEditing)}
                    >
                        {isEditing ? 'Отменить редактирование' : 'Редактировать событие'}
                    </button>
                    
                    {isEditing && (
                        <button 
                            className="admin-button save-button"
                            onClick={() => setIsEditing(false)}
                        >
                            Сохранить изменения
                        </button>
                    )}
                    
                    <button 
                        className="admin-button delete-event-button"
                        onClick={() => console.log('Удаление события')}
                    >
                        Удалить событие
                    </button>
                </div>
            )}

            <section className="event-hero">
                <div className="event-hero-content">
                    <h1>{eventData.title}</h1>
                    <p className="event-date">{eventData.date}</p>
                    <p className="event-slogan">{eventData.slogan}</p>
                    <button 
                        className="cta-button"
                        onClick={() => document.getElementById('registration').scrollIntoView({ behavior: 'smooth' })}
                    >
                        Записаться на продление
                    </button>
                </div>
            </section>

            <section className="event-description-section">
                <div className="container">
                    <h2>О процедуре продления</h2>
                    <p>
                        {eventData.description[0]}
                    </p>
                    <p>
                        {eventData.description[1]}
                    </p>
                    <div className="highlight-box">
                        <h3>Почему важно продлить вовремя?</h3>
                        <ul className="benefits-list">
                            {benefits.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            <section className="schedule-section">
                <div className="container">
                    <h2>График продления</h2>
                    <div className="schedule-table">
                        {eventSchedule.map((item, index) => (
                            <div key={index} className="schedule-row">
                                <div className="time-cell">{item.time}</div>
                                <div className="event-cell">
                                    <h4>{item.event}</h4>
                                    <p className="location">{item.location}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="location-section">
                <div className="container">
                    <h2>Место продления</h2>
                    <div className="location-grid">
                        <div className="location-info">
                            <h3>{eventData.location.name}</h3>
                            <address>
                                <p>{eventData.location.address}</p>
                                <p>{eventData.location.details}</p>
                            </address>
                            <div className="transport-info">
                                <h4>Часы работы:</h4>
                                <p>🕘 Пн-Пт: 9:00 - 18:00</p>
                                <p>❌ Сб: выходной</p>
                                <p>❌ Вс: выходной</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

<section id="registration" className="registration-section">
    <div className="container">
        <h2>Запись на продление</h2>
        {isRegistered ? (
            <div className="success-message">
                <h3>Спасибо за запись!</h3>
                <p>
                    Ваша заявка на продление студенческого билета принята.
                    При себе необходимо иметь паспорт и старый студенческий билет.
                </p>
            </div>
        ) : user.isAuth ? (
            <form onSubmit={handleSubmit} className="registration-form">
                <div className="form-group">
                    <label htmlFor="course">Курс*</label>
                    <select 
                        id="course" 
                        name="course" 
                        value={formData.course}
                        onChange={handleChange}
                        required
                    >
                        <option value="1">1 курс</option>
                        <option value="2">2 курс</option>
                        <option value="3">3 курс</option>
                        <option value="4">4 курс</option>
                        <option value="master">Магистратура</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="faculty">Факультет*</label>
                    <input 
                        type="text" 
                        id="faculty" 
                        name="faculty" 
                        value={formData.faculty}
                        onChange={handleChange}
                        required 
                    />
                </div>
                <button type="submit" className="submit-button">Записаться</button>
            </form>
        ) : (
            <h1> Для записи надо быть студентом МГТУ "СТАНКИН"</h1>
        )}
    </div>
</section>

            <section className="faq-section">
                <div className="container">
                    <h2>Частые вопросы</h2>
                    <div className="faq-item">
                        <h3>Что нужно взять с собой?</h3>
                        <p>
                            Обязательно возьмите паспорт и старый студенческий билет.
                            Для студентов бюджетной формы обучения дополнительно нужна справка об отсутствии задолженностей.
                        </p>
                    </div>
                    <div className="faq-item">
                        <h3>Можно ли продлить билет дистанционно?</h3>
                        <p>
                            Для магистрантов доступно онлайн-продление через личный кабинет.
                            Студенты бакалавриата должны явиться лично для фотографирования.
                        </p>
                    </div>
                    <div className="faq-item">
                        <h3>Что делать, если не успеваю до 16 мая?</h3>
                        <p>
                            После указанной даты будет работать дополнительное окно продления
                            с 20 по 25 мая, но с уплатой штрафа в размере 500 рублей.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
});

export default Event;