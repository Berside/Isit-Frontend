import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import './Teachers.css';
import { GetAllProf } from '../../http/PrepodApi';

const Teachers = observer(() => {
    const [teachers, setTeachers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
        const fetchTeachers = async () => {
            try {
                const response = await GetAllProf();
                if (response.data) {
                    setTeachers(response.data);
                }
            } catch (err) {
                setError(err.message || 'Ошибка загрузки данных');
            } finally {
                setLoading(false);
            }
        };

        fetchTeachers();
    }, []);

    const filteredTeachers = teachers.filter(teacher => {
        const fullName = `${teacher.last_name} ${teacher.first_name} ${teacher.middle_name}`;
        return (fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||teacher.disciplines.some(discipline =>discipline.discipline_name.toLowerCase().includes(searchTerm.toLowerCase())));
    });

    const getInitial = (name) => {
        return name.charAt(0).toUpperCase();
    };

    const avatarColors = ['#3498db', '#2ecc71', '#e74c3c', '#f39c12', '#9b59b6', '#1abc9c'];

    const getAvatarColor = (name) => {
        const charCode = name.charCodeAt(0);
        return avatarColors[charCode % avatarColors.length];
    };

    const formatAcademicDegree = (degree) => {
        const degrees = {
            'docent': 'Доцент',
            'professor': 'Профессор',
            'phd': 'Кандидат наук',
            'doctor': 'Доктор наук'
        };
        return degrees[degree] || degree;
    };

    const handleTeacherClick = (teacherId) => {
        navigate(`/Teach/${teacherId}`);
    };

    if (loading) {
        return <div className="loading">Загрузка данных...</div>;
    }

    if (error) {
        return <div className="error">Ошибка: {error}</div>;
    }

    return (
        <div className="teachers-page">
            <h1 className="teachers-title">Преподаватели</h1>
            <div className="search-container">
                <input type="text" placeholder="Поиск по имени или дисциплине..." className="search-input" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
            </div>
            {filteredTeachers.length === 0 ? (
                <div className="no-results">Преподаватели не найдены</div>
            ) : (
                <div className="teachers-grid">
                    {filteredTeachers.map(teacher => {
                        const fullName = `${teacher.last_name} ${teacher.first_name} ${teacher.middle_name}`;
                        return (
                            <div key={teacher.id} className="teacher-card" onClick={() => handleTeacherClick(teacher.id)} style={{ cursor: 'pointer' }}>
                                <div className="teacher-avatar">
                                    <div className="teacher-initial" style={{ backgroundColor: getAvatarColor(teacher.last_name) }}>
                                        {getInitial(teacher.last_name)}
                                    </div>
                                </div>
                                
                                <div className="teacher-info">
                                    <h2 className="teacher-name">{fullName}</h2>
                                    <p className="teacher-degree">
                                        {formatAcademicDegree(teacher.academic_degree)}, стаж: {teacher.teaching_experience} лет
                                    </p>
                                    <div className="teacher-subjects">
                                        {teacher.disciplines.length > 0 ? (
                                            teacher.disciplines.map((discipline, index) => (
                                                <span key={index} className="subject-tag">
                                                    {discipline.discipline_name}
                                                </span>
                                            ))
                                        ) : (
                                            <span className="subject-tag no-disciplines">Нет дисциплин</span>
                                        )}
                                    </div>
                                    <div className="teacher-contacts">
                                        <a href={`mailto:${teacher.email}`} className="teacher-email" onClick={(e) => e.stopPropagation()}>
                                            {teacher.email}
                                        </a>
                                        {teacher.phone_number && (
                                            <a href={`tel:${teacher.phone_number}`} className="teacher-phone" onClick={(e) => e.stopPropagation()}>
                                                {teacher.phone_number}
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
});

export default Teachers;