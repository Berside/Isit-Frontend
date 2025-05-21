import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import './Disciplines.css';

const Disciplines = observer(() => {
    const [disciplines, setDisciplines] = useState([
        {
            id: 1,
            name: 'Математический анализ',
            description: 'Фундаментальный курс математики, изучающий функции, пределы, производные и интегралы.',
            teachers: ['Иванов А.П.', 'Смирнова О.И.']
        },
        {
            id: 2,
            name: 'Программирование',
            description: 'Изучение основ программирования на современных языках.',
            teachers: ['Петрова С.М.', 'Козлов Д.В.']
        },
        {
            id: 3,
            name: 'Физика',
            description: 'Классическая и современная физика для технических специальностей.',
            teachers: ['Сидоров В.В.', 'Фролова Е.П.']
        },
        {
            id: 4,
            name: 'Базы данных',
            description: 'Проектирование и работа с реляционными и NoSQL базами данных.',
            teachers: ['Николаева Т.К.', 'Григорьев М.М.']
        },
        {
            id: 5,
            name: 'Веб-разработка',
            description: 'Современные технологии создания веб-приложений.',
            teachers: ['Кузнецов А.А.', 'Михайлова Л.Н.']
        },
        {
            id: 6,
            name: 'Теория алгоритмов',
            description: 'Изучение алгоритмов и структур данных.',
            teachers: ['Алексеев П.Р.', 'Борисова В.С.']
        }
    ]);

    const [searchTerm, setSearchTerm] = useState('');
    const filteredDisciplines = disciplines.filter(discipline =>
        discipline.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        discipline.teachers.some(teacher =>
            teacher.toLowerCase().includes(searchTerm.toLowerCase())
    ));
    const getInitial = (name) => {
        return name.charAt(0).toUpperCase();
    };
    const avatarColors = ['#3498db', '#2ecc71', '#e74c3c', '#f39c12', '#9b59b6', '#1abc9c'];

    const getAvatarColor = (name) => {
        const charCode = name.charCodeAt(0);
        return avatarColors[charCode % avatarColors.length];
    };

    return (
        <div className="disciplines-page">
            <h1 className="disciplines-title">Дисциплины</h1>
            
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Поиск по названию дисциплины или преподавателю..."
                    className="search-input"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            
            {filteredDisciplines.length === 0 ? (
                <div className="no-results">Дисциплины не найдены</div>
            ) : (
                <div className="disciplines-grid">
                    {filteredDisciplines.map(discipline => (
                        <div key={discipline.id} className="discipline-card">
                            <div className="discipline-header">
                                <div 
                                    className="discipline-avatar" 
                                    style={{ backgroundColor: getAvatarColor(discipline.name) }}
                                >
                                    {getInitial(discipline.name)}
                                </div>
                                <h2 className="discipline-name">{discipline.name}</h2>
                            </div>
                            
                            <div className="discipline-body">
                                <p className="discipline-description">{discipline.description}</p>
                                
                                <div className="discipline-teachers">
                                    <h3>Преподаватели:</h3>
                                    <ul className="teachers-list">
                                        {discipline.teachers.map((teacher, index) => (
                                            <li key={index} className="teacher-item">
                                                {teacher}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
});

export default Disciplines;