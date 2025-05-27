import React, { useState, useEffect, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import './ProfScore.css';
import { GetAllGradeProf, CreateGrade, UpdateGrade, DeleteGrade } from '../../http/gradeAPI';
import { Context } from '../../index';

const ProfScore = observer(() => {
    const { user } = useContext(Context);
    const [grades, setGrades] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedDiscipline, setSelectedDiscipline] = useState('');
    const [selectedGroup, setSelectedGroup] = useState('');
    const [editingGrade, setEditingGrade] = useState(null);
    const [gradeValue, setGradeValue] = useState('');

    useEffect(() => {
        const fetchGrades = async () => {
            try {
                const response = await GetAllGradeProf(user.user.id);
                if (response.data) {
                    setGrades(response.data);
                }
            } catch (err) {
                setError(err.message || 'Ошибка загрузки данных');
            } finally {
                setLoading(false);
            }
        };
        fetchGrades();
    }, [user.user.id]);

    const disciplines = [...new Set(grades.map(grade => grade.discipline.id))]
        .map(id => {
            const grade = grades.find(g => g.discipline.id === id);
            return grade.discipline;
        });

    const groups = [...new Set(grades.map(grade => grade.student.group.id))];

        const filteredGrades = grades.filter(grade => {
            const matchesDiscipline = !selectedDiscipline || grade.discipline.id === Number(selectedDiscipline);
            const matchesGroup = !selectedGroup || grade.student.group.id === selectedGroup;
            return matchesDiscipline && matchesGroup;
        });
    const studentsMap = {};
    filteredGrades.forEach(grade => {
        if (!studentsMap[grade.student.id]) {
            studentsMap[grade.student.id] = {
                student: grade.student,
                grades: {}
            };
        }
        studentsMap[grade.student.id].grades[grade.type] = {
            id: grade.id,
            value: grade.value
        };
    });
    const students = Object.values(studentsMap);

    const handleDisciplineChange = (e) => {
        setSelectedDiscipline(e.target.value);
        setEditingGrade(null);
    };

    const handleGroupChange = (e) => {
        setSelectedGroup(e.target.value);
        setEditingGrade(null);
    };

    const handleEditClick = (studentId, gradeType, currentValue) => {
        setEditingGrade({ studentId, gradeType });
        setGradeValue(currentValue || '');
    };

    const handleCancelEdit = () => {
        setEditingGrade(null);
        setGradeValue('');
    };

    const handleGradeChange = (e) => {
        setGradeValue(e.target.value);
    };

    const handleSaveGrade = async (studentId, gradeType) => {
        if (!selectedDiscipline) {
            setError('Выберите дисциплину');
            return;
        }

        try {
            if (gradeValue === '') {
                setError('Введите значение оценки');
                return;
            }

            const numericValue = Number(gradeValue);
            if (isNaN(numericValue) || numericValue < 0 || numericValue > 100) {
                setError('Оценка должна быть числом от 0 до 100');
                return;
            }

            const student = students.find(s => s.student.id === studentId);
            
            if (student.grades[gradeType]?.id) {
                await UpdateGrade(student.grades[gradeType].id, numericValue);
            } else {
                await CreateGrade(
                    numericValue,
                    studentId,
                    user.user.id,
                    gradeType,
                    selectedDiscipline
                );
            }
            const response = await GetAllGradeProf(user.user.id);
            setGrades(response.data);
            setEditingGrade(null);
            setGradeValue('');
            setError(null);
        } catch (err) {
            setError(err.response?.data?.message || 'Ошибка при сохранении оценки');
        }
    };

    const handleDeleteGrade = async (gradeId) => {
        try {
            await DeleteGrade(gradeId);
            const response = await GetAllGradeProf(user.user.id);
            setGrades(response.data);
            setEditingGrade(null);
            setError(null);
        } catch (err) {
            setError(err.response?.data?.message || 'Ошибка при удалении оценки');
        }
    };

    if (loading) {
        return <div className="prof-score-container">Загрузка данных...</div>;
    }

    return (
        <div className="prof-score-container">
            <h2>Управление оценками студентов</h2>
            
            <div className="filters">
                <div className="filter-group">
                    <label htmlFor="discipline">Дисциплина:</label>
                    <select
                        id="discipline"
                        value={selectedDiscipline}
                        onChange={handleDisciplineChange}
                    >
                        <option value="">Все дисциплины</option>
                        {disciplines.map(discipline => (
                            <option key={discipline.id} value={discipline.id}>
                                {discipline.discipline_name}
                            </option>
                        ))}
                    </select>
                </div>
                
                <div className="filter-group">
                    <label htmlFor="group">Группа:</label>
                    <select
                        id="group"
                        value={selectedGroup}
                        onChange={handleGroupChange}
                    >
                        <option value="">Все группы</option>
                        {groups.map(group => (
                            <option key={group} value={group}>
                                {group}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            
            {error && <div className="error-message">{error}</div>}
            
            {students.length === 0 ? (
                <div className="no-students">Нет данных о студентах</div>
            ) : (
                <div className="students-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Студент</th>
                                <th>Группа</th>
                                <th>Модуль 1</th>
                                <th>Модуль 2</th>
                                <th>Зачет</th>
                                <th>Экзамен</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map(student => (
                                <tr key={student.student.id}>
                                    <td>
                                        {`${student.student.last_name} ${student.student.first_name} ${student.student.middle_name}`}
                                    </td>
                                    <td>{student.student.group.id}</td>
                                    
                                    {['module1', 'module2', 'credit', 'exam'].map(gradeType => (
                                        <td key={`${student.student.id}-${gradeType}`}>
                                            {editingGrade?.studentId === student.student.id && 
                                             editingGrade?.gradeType === gradeType ? (
                                                <div className="edit-grade">
                                                    <input
                                                        type="number"
                                                        value={gradeValue}
                                                        onChange={handleGradeChange}
                                                        min="0"
                                                        max="100"
                                                    />
                                                    <button 
                                                        onClick={() => handleSaveGrade(student.student.id, gradeType)}
                                                        className="save-btn"
                                                    >
                                                        Сохранить
                                                    </button>
                                                    <button 
                                                        onClick={handleCancelEdit}
                                                        className="cancel-btn"
                                                    >
                                                        Отмена
                                                    </button>
                                                </div>
                                            ) : (
                                                <div className="grade-cell">
                                                    <span>
                                                        {student.grades[gradeType]?.value || '-'}
                                                    </span>
                                                    <div className="grade-actions">
                                                        <button 
                                                            onClick={() => handleEditClick(
                                                                student.student.id, 
                                                                gradeType,
                                                                student.grades[gradeType]?.value
                                                            )}
                                                            className="edit-btn"
                                                        >
                                                            {student.grades[gradeType] ? 'Изменить' : 'Добавить'}
                                                        </button>
                                                        {student.grades[gradeType]?.id && (
                                                            <button 
                                                                onClick={() => handleDeleteGrade(student.grades[gradeType].id)}
                                                                className="delete-btn"
                                                            >
                                                                Удалить
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
});

export default ProfScore;