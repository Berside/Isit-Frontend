import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import './Score.css';

const Score = observer(() => {
    const [scores, setScores] = useState([
        { id: 1, discipline: 'Компьютерная графика и геометрическое моделирование', module1: 25, module2: 25, credit: 'зачтено', exam: 35 },
        { id: 2, discipline: 'Программирование', module1: 53, module2: 53, credit: 'зачтено', exam: 53 },
        { id: 2, discipline: 'Чилл', module1: 35, module2: 35, credit: 'зачтено', exam: 35 },
    ]);
    const [filter, setFilter] = useState('all');
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
        </div>
    );
});

export default Score;