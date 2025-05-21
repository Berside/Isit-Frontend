import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import './Teachers.css';

const Teachers = observer(() => {
    const [teachers, setTeachers] = useState([
        {
            id: 1,
            name: 'Иванов Александр Петрович',
            photo: null,
            subjects: ['Математический анализ', 'Дискретная математика'],
            email: 'ivanov@university.edu'
        },
        {
            id: 2,
            name: 'Петрова Светлана Михайловна',
            photo: null,
            subjects: ['Программирование', 'Алгоритмы и структуры данных'],
            email: 'petrova@university.edu'
        },
        {
            id: 3,
            name: 'Сидоров Владимир Васильевич',
            photo: null,
            subjects: ['Физика', 'Теоретическая механика'],
            email: 'sidorov@university.edu'
        },
        {
            id: 4,
            name: 'Козлова Елена Павловна',
            photo: null,
            subjects: ['Базы данных', 'Веб-разработка'],
            email: 'kozlova@university.edu'
        },
        {
            id: 5,
            name: 'Фролов Дмитрий Сергеевич',
            photo: null,
            subjects: ['Иностранный язык'],
            email: 'frolov@university.edu'
        },
        {
            id: 6,
            name: 'Николаева Татьяна Константиновна',
            photo: null,
            subjects: ['История', 'Философия'],
            email: 'nikolaeva@university.edu'
        },
    ]);

    const [searchTerm, setSearchTerm] = useState('');

    const filteredTeachers = teachers.filter(teacher =>
        teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        teacher.subjects.some(subject =>
            subject.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    const getInitial = (name) => {
        return name.charAt(0).toUpperCase();
    };

    const avatarColors = ['#3498db', '#2ecc71', '#e74c3c', '#f39c12', '#9b59b6', '#1abc9c'];

    const getAvatarColor = (name) => {
        const charCode = name.charCodeAt(0);
        return avatarColors[charCode % avatarColors.length];
    };

    return (
        <div className="teachers-page">
            <h1 className="teachers-title">Преподаватели</h1>
            
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Поиск по имени или дисциплине..."
                    className="search-input"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            
            {filteredTeachers.length === 0 ? (
                <div className="no-results">Преподаватели не найдены</div>
            ) : (
                <div className="teachers-grid">
                    {filteredTeachers.map(teacher => (
                        <div key={teacher.id} className="teacher-card">
                            <div className="teacher-avatar">
                                {teacher.photo ? (
                                    <img src={teacher.photo} alt={teacher.name} className="teacher-photo" />
                                ) : (
                                    <div 
                                        className="teacher-initial" 
                                        style={{ backgroundColor: getAvatarColor(teacher.name) }}
                                    >
                                        {getInitial(teacher.name)}
                                    </div>
                                )}
                            </div>
                            
                            <div className="teacher-info">
                                <h2 className="teacher-name">{teacher.name}</h2>
                                <div className="teacher-subjects">
                                    {teacher.subjects.map((subject, index) => (
                                        <span key={index} className="subject-tag">{subject}</span>
                                    ))}
                                </div>
                                <a href={`mailto:${teacher.email}`} className="teacher-email">
                                    {teacher.email}
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
});

export default Teachers;