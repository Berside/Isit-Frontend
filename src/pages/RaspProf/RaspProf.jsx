import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import './RaspProf.css';

const RaspProf = observer(() => {
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const [selectedSubgroup, setSelectedSubgroup] = useState(null);
    const getWeekdayName = (date) => {
        const weekdays = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
        return weekdays[date.getDay()];
    };

    const generateCalendar = () => {
        const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
        const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
        const daysInMonth = lastDayOfMonth.getDate();
        const startingDay = firstDayOfMonth.getDay();

        const calendar = [];
        let day = 1;

        const weekdays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
        const headerRow = (
            <div className="calendar-weekdays">
                {weekdays.map((weekday, index) => (
                    <div key={index} className="calendar-weekday">{weekday}</div>
                ))}
            </div>
        );
        calendar.push(headerRow);

        for (let i = 0; i < 6; i++) {
            if (day > daysInMonth) break;

            const week = [];
            for (let j = 0; j < 7; j++) {
                if ((i === 0 && j < startingDay - 1) || day > daysInMonth) {
                    week.push(<div key={`empty-${i}-${j}`} className="calendar-day empty"></div>);
                } else {
                    const currentDate = new Date(currentYear, currentMonth, day);
                    const isToday = currentDate.toDateString() === new Date().toDateString();

                    week.push(
                        <div 
                            key={`day-${day}`} 
                            className={`aa-day ${isToday ? 'today' : ''}`}
                        >
                            <div className="day-header">
                                <div className="day-number">{day}</div>
                                <div className="weekday-name">{getWeekdayName(currentDate)}</div>
                            </div>
                        </div>
                    );
                    day++;
                }
            }
            calendar.push(
                <div key={`week-${i}`} className="calendar-week">
                    {week}
                </div>
            );
        }

        return calendar;
    };

    const changeMonth = (increment) => {
        setCurrentMonth(prev => {
            let newMonth = prev + increment;
            if (newMonth < 0) {
                newMonth = 11;
                setCurrentYear(prevYear => prevYear - 1);
            } else if (newMonth > 11) {
                newMonth = 0;
                setCurrentYear(prevYear => prevYear + 1);
            }
            return newMonth;
        });
    };

    const monthNames = [
        'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
        'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
    ];

    return (
        <div className="schedule-container">
            <div className="schedule-header">
                <h2>Расписание занятий ИДБ-22-10</h2>
                <div className="month-navigation">
                    <button onClick={() => changeMonth(-1)} className="nav-button">‹</button>
                    <h3>{monthNames[currentMonth]} {currentYear}</h3>
                    <button onClick={() => changeMonth(1)} className="nav-button">›</button>
                </div>
                <div className="subgroup-selector">
                    <label>Подгруппа: </label>
                    <select value={selectedSubgroup || 'all'} onChange={(e) => setSelectedSubgroup(e.target.value === 'all' ? null : e.target.value)}>
                        <option value="all">Все</option>
                        <option value="А">А</option>
                        <option value="Б">Б</option>
                    </select>
                </div>
            </div>

            <div className="calendar-container">
                {generateCalendar()}
            </div>

            <div className="schedule-legend">
                <div className="legend-item">
                    <div className="legend-color today"></div>
                    <span>Сегодня</span>
                </div>
            </div>
        </div>
    );
});

export default RaspProf;