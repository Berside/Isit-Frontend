import React, { useState, useEffect, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import './attendance.css';
import { GetAttendByID } from '../../http/Attendance';
import { Context } from '../../index';

const Attendance = observer(() => {
    const { user } = useContext(Context);
    const id = user.userID;
    const [attendanceData, setAttendanceData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedDiscipline, setSelectedDiscipline] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchAttendanceData = async () => {
            try {
                setIsLoading(true);
                const response = await GetAttendByID(id);
                if (response.message === "Success") {
                    setAttendanceData(response.data);
                    // Устанавливаем первую дисциплину как выбранную по умолчанию
                    if (response.data.length > 0) {
                        const firstDisciplineId = response.data[0].discipline.id;
                        setSelectedDiscipline(firstDisciplineId);
                    }
                } else {
                    setError("Failed to fetch attendance data");
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAttendanceData();
    }, [id]);

    // Получаем уникальные дисциплины из данных о посещаемости
    const getUniqueDisciplines = () => {
        const disciplinesMap = new Map();
        attendanceData.forEach(item => {
            if (!disciplinesMap.has(item.discipline.id)) {
                disciplinesMap.set(item.discipline.id, {
                    id: item.discipline.id,
                    name: item.discipline.discipline_name
                });
            }
        });
        return Array.from(disciplinesMap.values());
    };

    const disciplines = getUniqueDisciplines();

    const filteredDisciplines = disciplines.filter(discipline =>
        discipline.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Фильтруем данные по выбранной дисциплине
    const getCurrentAttendance = () => {
        if (!selectedDiscipline) return [];
        return attendanceData
            .filter(item => item.discipline.id === selectedDiscipline)
            .map(item => ({
                date: item.date,
                present: item.visited
            }))
            .sort((a, b) => new Date(b.date) - new Date(a.date)); // Сортируем по дате (новые сначала)
    };

    const currentAttendance = getCurrentAttendance();

    const formatDate = (dateString) => {
        const options = { day: 'numeric', month: 'long', year: 'numeric', weekday: 'short' };
        return new Date(dateString).toLocaleDateString('ru-RU', options);
    };

    const totalClasses = currentAttendance.length;
    const attendedClasses = currentAttendance.filter(item => item.present).length;
    const attendancePercentage = totalClasses > 0 ? Math.round((attendedClasses / totalClasses) * 100) : 0;

    if (isLoading) {
        return <div className="attendance-container">Загрузка данных о посещаемости...</div>;
    }

    if (error) {
        return <div className="attendance-container">Ошибка: {error}</div>;
    }

    if (attendanceData.length === 0) {
        return <div className="attendance-container">Нет данных о посещаемости</div>;
    }

    return (
        <div className="attendance-container">
            <h1 className="attendance-title">Посещаемость</h1>
            
            <div className="attendance-controls">
                <div className="discipline-selector">
                    <label htmlFor="discipline-select">Выберите дисциплину:</label>
                    <select
                        id="discipline-select"
                        value={selectedDiscipline || ''}
                        onChange={(e) => setSelectedDiscipline(Number(e.target.value))}
                        disabled={disciplines.length === 0}
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
                    <div className="no-data">Нет данных о посещаемости для выбранной дисциплины</div>
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