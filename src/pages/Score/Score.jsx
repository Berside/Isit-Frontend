import React, { useState, useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import './Score.css';
import { GetAllGrade } from '../../http/gradeAPI';
import { Context } from "../../index";

const Score = observer(() => {
    const {user} = useContext(Context);
    const id = localStorage.getItem('id');
    const [scores, setScores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        const fetchGrades = async () => {
            try {
                const response = await GetAllGrade(user.userID);
                if (response && response.data && Array.isArray(response.data)) {
                    const disciplinesMap = {};
                    
                    response.data.forEach(item => {
                        if (!disciplinesMap[item.discipline.id]) {
                            disciplinesMap[item.discipline.id] = {
                                id: item.discipline.id,
                                discipline: item.discipline.discipline_name,
                                module1: null,
                                module2: null,
                                credit: null,
                                exam: null
                            };
                        }
                        if (item.type.toLowerCase() === 'module1') {
                            disciplinesMap[item.discipline.id].module1 = item.value;
                        } else if (item.type.toLowerCase() === 'module2') {
                            disciplinesMap[item.discipline.id].module2 = item.value;
                        } else if (item.type.toLowerCase() === 'credit') {
                            disciplinesMap[item.discipline.id].credit = item.value >= 35 ? 'зачтено' : 'не зачтено';
                        } else if (item.type.toLowerCase() === 'exam') {
                            disciplinesMap[item.discipline.id].exam = item.value;
                        }
                    });

                    const formattedScores = Object.values(disciplinesMap);
                    setScores(formattedScores);
                }
            } catch (error) {
                console.error('Ошибка при загрузке оценок:', error);
            } finally {
                setLoading(false);
            }
        };
        
        fetchGrades();
    }, [id]);

    const filteredScores = scores.filter(score => {
        if (filter === 'all') return true;
        if (filter === 'completed') return score.exam !== null;
        if (filter === 'incomplete') return score.exam === null;
        return true;
    });

    const getGradeColor = (grade) => {
        if (grade === null || grade === 'не зачтено') return '#ff6b6b';
        if (typeof grade === 'number') {
            if (grade >= 45) return '#51cf66';
            if (grade >= 35) return '#94d82d';
            if (grade >= 25) return '#fcc419';
            return '#ff6b6b';
        }
        if (grade === 'зачтено') return '#51cf66';
        return '#868e96';
    };

    if (loading) {
        return <div className="score-container">Загрузка данных...</div>;
    }

    return (
        <div className="score-container">
            <h2 className="score-title">Успеваемость студента</h2>
            
            <div className="score-controls">
                <div className="filter-controls">
                    <span>Фильтр: </span>
                    <select 
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="filter-select"
                    >
                        <option value="all">Все дисциплины</option>
                        <option value="completed">Завершенные</option>
                        <option value="incomplete">Текущие</option>
                    </select>
                </div>
            </div>

            {scores.length === 0 ? (
                <div className="no-scores-message">Нет данных об оценках</div>
            ) : (
                <>
                    <div className="score-table-container">
                        <table className="score-table">
                            <thead>
                                <tr>
                                    <th>Дисциплина</th>
                                    <th>Первый модуль</th>
                                    <th>Второй модуль</th>
                                    <th>Зачет</th>
                                    <th>Экзамен</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredScores.map((score) => (
                                    <tr key={score.id}>
                                        <td>{score.discipline}</td>
                                        <td style={{ backgroundColor: getGradeColor(score.module1) }}>
                                            {score.module1 !== null ? score.module1 : '-'}
                                        </td>
                                        <td style={{ backgroundColor: getGradeColor(score.module2) }}>
                                            {score.module2 !== null ? score.module2 : '-'}
                                        </td>
                                        <td style={{ backgroundColor: getGradeColor(score.credit) }}>
                                            {score.credit !== null ? score.credit : '-'}
                                        </td>
                                        <td style={{ backgroundColor: getGradeColor(score.exam) }}>
                                            {score.exam !== null ? score.exam : '-'}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="score-legend">
                        <div className="legend-item">
                            <div className="legend-color" style={{ backgroundColor: '#51cf66' }}></div>
                            <span>Отлично</span>
                        </div>
                        <div className="legend-item">
                            <div className="legend-color" style={{ backgroundColor: '#94d82d' }}></div>
                            <span>Хорошо</span>
                        </div>
                        <div className="legend-item">
                            <div className="legend-color" style={{ backgroundColor: '#fcc419' }}></div>
                            <span>Удовлетворительно</span>
                        </div>
                        <div className="legend-item">
                            <div className="legend-color" style={{ backgroundColor: '#ff6b6b' }}></div>
                            <span>Неудовлетворительно</span>
                        </div>
                        <div className="legend-item">
                            <div className="legend-color" style={{ backgroundColor: '#868e96' }}></div>
                            <span>Нет данных</span>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
});

export default Score;