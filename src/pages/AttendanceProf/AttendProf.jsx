import React, { useState, useEffect, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import './AttendProf.css';
import { CreateAttend, DeleteAttend, UpdateAttend, GetAttendByProfid } from '../../http/Attendance';
import { Context } from '../../index';
import { GetAllDisc } from '../../http/DiscAPI';
const AttendProf = observer(() => {
    const { user } = useContext(Context);
    const id = user.userID;
    const [attendanceData, setAttendanceData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedDiscipline, setSelectedDiscipline] = useState(null);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [dateFilter, setDateFilter] = useState('');
    const [newAttendance, setNewAttendance] = useState({
        student_id: '',
        discipline_id: '',
        date: new Date().toISOString().split('T')[0],
        visited: true
    });
    const [showAddForm, setShowAddForm] = useState(false);

    useEffect(() => {
        const fetchAttendanceData = async () => {
            try {
                setIsLoading(true);
                const response = await GetAttendByProfid();
                console.log(response)
                if (response.message === "Success") {
                    setAttendanceData(response.data);
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
    }, []);
    const getUniqueDisciplines = () => {
        const disciplinesMap = new Map();
        attendanceData.forEach(item => {
            if (!disciplinesMap.has(item.discipline.id)) {
                disciplinesMap.set(item.discipline.id, item.discipline);
            }
        });
        return Array.from(disciplinesMap.values());
    };

    const getUniqueStudents = () => {
        const studentsMap = new Map();
        attendanceData.forEach(item => {
            if (!studentsMap.has(item.student.id)) {
                studentsMap.set(item.student.id, item.student);
            }
        });
        return Array.from(studentsMap.values());
    };
    const getFilteredAttendance = () => {
        return attendanceData.filter(item => {
            const disciplineMatch = selectedDiscipline ? item.discipline.id === selectedDiscipline : true;
            const studentMatch = selectedStudent ? item.student.id === selectedStudent : true;
            const dateMatch = dateFilter ? item.date === dateFilter : true;
            return disciplineMatch && studentMatch && dateMatch;
        }).sort((a, b) => new Date(b.date) - new Date(a.date));
    };

    const handleUpdateAttendance = async (id, visited) => {
        try {
            await UpdateAttend(id, visited);
            setAttendanceData(prev => prev.map(item => 
                item.id === id ? { ...item, visited } : item
            ));
        } catch (err) {
            setError(`Ошибка при обновлении: ${err.message}`);
        }
    };

    const handleDeleteAttendance = async (id) => {
        try {
            await DeleteAttend(id);
            setAttendanceData(prev => prev.filter(item => item.id !== id));
        } catch (err) {
            setError(`Ошибка при удалении: ${err.message}`);
        }
    };

    const handleAddAttendance = async () => {
        try {
            console.log(newAttendance);
            const response = await CreateAttend(
                newAttendance.student_id,
                newAttendance.discipline_id,
                newAttendance.date,
                newAttendance.visited
            );
            console.log(response);
            
            if (response.message === "Success") {
                setAttendanceData(prev => [...prev, response.data]);
                setShowAddForm(false);
                setNewAttendance({
                    student_id: '',
                    discipline_id: '',
                    date: new Date().toISOString().split('T')[0],
                    visited: true
                });
            }
            window.location.reload();
        } catch (err) {
            setError(`Ошибка при добавлении: ${err.message}`);
        }
    };

    const disciplines = getUniqueDisciplines();
    const students = getUniqueStudents();
    const filteredAttendance = getFilteredAttendance();

    if (isLoading) {
        return <div className="attend-prof-container">Загрузка данных...</div>;
    }

    if (error) {
        return <div className="attend-prof-container">Ошибка: {error}</div>;
    }

    return (
        <div className="attend-prof-container">
            <h1>Управление посещаемостью</h1>
            
            <div className="filters">
                <div className="filter-group">
                    <label>Дисциплина:</label>
                    <select
                        value={selectedDiscipline || ''}
                        onChange={(e) => setSelectedDiscipline(e.target.value ? Number(e.target.value) : null)}
                    >
                        <option value="">Все дисциплины</option>
                        {disciplines.map(d => (
                            <option key={d.id} value={d.id}>{d.discipline_name}</option>
                        ))}
                    </select>
                </div>
                
                <div className="filter-group">
                    <label>Студент:</label>
                    <select
                        value={selectedStudent || ''}
                        onChange={(e) => setSelectedStudent(e.target.value ? Number(e.target.value) : null)}
                    >
                        <option value="">Все студенты</option>
                        {students.map(s => (
                            <option key={s.id} value={s.id}>
                                {`${s.last_name} ${s.first_name} ${s.middle_name} (${s.group.id})`}
                            </option>
                        ))}
                    </select>
                </div>
                
                <div className="filter-group">
                    <label>Дата:</label>
                    <input
                        type="date"
                        value={dateFilter}
                        onChange={(e) => setDateFilter(e.target.value)}
                    />
                    {dateFilter && (
                        <button 
                            className="clear-date-filter"
                            onClick={() => setDateFilter('')}
                        >
                            ×
                        </button>
                    )}
                </div>
                
                <button 
                    className="add-button"
                    onClick={() => setShowAddForm(true)}
                >
                    Добавить запись
                </button>
            </div>
            
            {showAddForm && (
                <div className="add-form">
                    <h3>Добавить запись о посещаемости</h3>
                    <div className="form-group">
                        <label>Студент:</label>
                        <select
                            value={newAttendance.student_id}
                            onChange={(e) => setNewAttendance({...newAttendance, student_id: e.target.value})}
                            required
                        >
                            <option value="">Выберите студента</option>
                            {students.map(s => (
                                <option key={s.id} value={s.id}>
                                    {`${s.last_name} ${s.first_name} ${s.middle_name} (${s.group.id})`}
                                </option>
                            ))}
                        </select>
                    </div>
                    
                    <div className="form-group">
                        <label>Дисциплина:</label>
                        <select
                            value={newAttendance.discipline_id}
                            onChange={(e) => setNewAttendance({...newAttendance, discipline_id: e.target.value})}
                            required
                        >
                            <option value="">Выберите дисциплину</option>
                            {disciplines.map(d => (
                                <option key={d.id} value={d.id}>{d.discipline_name}</option>
                            ))}
                        </select>
                    </div>
                    
                    <div className="aform-group">
                        <label>Дата:</label>
                        <input
                            type="date"
                            value={newAttendance.date}
                            onChange={(e) => setNewAttendance({...newAttendance, date: e.target.value})}
                            required
                        />
                    </div>
                    
                    <div className="form-group">
                        <label>Посещение:</label>
                        <select
                            value={newAttendance.visited}
                            onChange={(e) => setNewAttendance({...newAttendance, visited: e.target.value === 'true'})}
                        >
                            <option value="true">Присутствовал</option>
                            <option value="false">Отсутствовал</option>
                        </select>
                    </div>
                    
                    <div className="form-actions">
                        <button onClick={handleAddAttendance}>Сохранить</button>
                        <button onClick={() => setShowAddForm(false)}>Отмена</button>
                    </div>
                </div>
            )}
            
            <div className="attendance-list">
                <div className="aattendance-header">
                    <span className="header-date">Дата</span>
                    <span className="header-student">Студент</span>
                    <span className="header-discipline">Дисциплина</span>
                    <span className="header-status">Статус</span>
                    <span className="header-actions">Действия</span>
                </div>
                
                {filteredAttendance.length === 0 ? (
                    <div className="no-data">Нет данных о посещаемости</div>
                ) : (
                    filteredAttendance.map((item) => (
                        <div key={item.id} className="aattendance-item">
                            <span className="attendance-date">
                                {new Date(item.date).toLocaleDateString('ru-RU')}
                            </span>
                            <span className="attendance-student">
                                {`${item.student.last_name} ${item.student.first_name} ${item.student.middle_name}`}
                                <br />
                                <small>{item.student.group.id}</small>
                            </span>
                            <span className="attendance-discipline">
                                {item.discipline.discipline_name}
                            </span>
                            <span className="attendance-status">
                                <select
                                    value={item.visited}
                                    onChange={(e) => handleUpdateAttendance(item.id, e.target.value === 'true')}
                                >
                                    <option value="true">Присутствовал</option>
                                    <option value="false">Отсутствовал</option>
                                </select>
                            </span>
                            <span className="attendance-actions">
                                <button 
                                    className="delete-button"
                                    onClick={() => handleDeleteAttendance(item.id)}
                                >
                                    Удалить
                                </button>
                            </span>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
});

export default AttendProf;