import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import './attendance.css';

const Attendance = observer(() => {
    const disciplines = [
        { id: 1, name: 'Математический анализ' },
        { id: 2, name: 'Программирование' },
        { id: 3, name: 'Физика' },
        { id: 4, name: 'Базы данных' },
    ];

    const attendanceData = {
        1: [
            { date: '2023-09-01', present: true },
            { date: '2023-09-08', present: false },
            { date: '2023-09-15', present: true },
            { date: '2023-09-22', present: true },
            { date: '2023-09-29', present: false },
        ],
        2: [
            { date: '2023-09-02', present: true },
            { date: '2023-09-09', present: true },
            { date: '2023-09-16', present: false },
            { date: '2023-09-23', present: true },
        ],
        3: [
            { date: '2023-09-03', present: false },
            { date: '2023-09-10', present: false },
            { date: '2023-09-17', present: true },
        ],
        4: [
            { date: '2023-09-05', present: true },
            { date: '2023-09-12', present: true },
            { date: '2023-09-19', present: true },
            { date: '2023-09-26', present: false },
        ],
    };

    const [selectedDiscipline, setSelectedDiscipline] = useState(disciplines[0].id);
    const [searchTerm, setSearchTerm] = useState('');
    const filteredDisciplines = disciplines.filter(discipline =>
        discipline.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const currentAttendance = attendanceData[selectedDiscipline] || [];
    const formatDate = (dateString) => {
        const options = { day: 'numeric', month: 'long', year: 'numeric', weekday: 'short' };
        return new Date(dateString).toLocaleDateString('ru-RU', options);
    };
    const totalClasses = currentAttendance.length;
    const attendedClasses = currentAttendance.filter(item => item.present).length;
    const attendancePercentage = totalClasses > 0 ? Math.round((attendedClasses / totalClasses) * 100) : 0;
    return (
        <div className="attendance-container">
            <h1 className="attendance-title">Посещаемость</h1>
            
            <div className="attendance-controls">
                <div className="discipline-selector">
                    <label htmlFor="discipline-select">Выберите дисциплину:</label>
                    <select
                        id="discipline-select"
                        value={selectedDiscipline}
                        onChange={(e) => setSelectedDiscipline(Number(e.target.value))}
                    >
                        {filteredDisciplines.map(discipline => (
                            <option key={discipline.id} value={discipline.id}>
                                {discipline.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            
            <div className="attendance-stats">
                <div className="stat-item">
                    <span className="stat-label">Всего занятий:</span>
                    <span className="stat-value">{totalClasses}</span>
                </div>
                <div className="stat-item">
                    <span className="stat-label">Посещено:</span>
                    <span className="stat-value">{attendedClasses}</span>
                </div>
                <div className="stat-item">
                    <span className="stat-label">Процент посещаемости:</span>
                    <span className="stat-value">{attendancePercentage}%</span>
                </div>
            </div>
            
            <div className="attendance-list">
                <div className="attendance-header">
                    <span className="header-date">Дата</span>
                    <span className="header-status">Посещение</span>
                </div>
                
                {currentAttendance.length === 0 ? (
                    <div className="no-data">Нет данных о посещаемости</div>
                ) : (
                    currentAttendance.map((item, index) => (
                        <div key={index} className="attendance-item">
                            <span className="attendance-date">{formatDate(item.date)}</span>
                            <span className={`attendance-status ${item.present ? 'present' : 'absent'}`}>
                                {item.present ? 'Присутствовал' : 'Отсутствовал'}
                            </span>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
});

export default Attendance;