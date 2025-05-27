import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useParams, useNavigate } from 'react-router-dom';
import './Teacher.css';
import { GetProfById } from '../../http/PrepodApi';

const Teacher = observer(() => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [teacher, setTeacher] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTeacher = async () => {
            try {
                const response = await GetProfById(id);
                if (response.data) {
                    setTeacher(response.data);
                } else {
                    setError('Преподаватель не найден');
                }
            } catch (err) {
                setError(err.message || 'Ошибка загрузки данных');
            } finally {
                setLoading(false);
            }
        };

        fetchTeacher();
    }, [id]);

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

    if (loading) {
        return <div className="loading">Загрузка данных...</div>;
    }

    if (error) {
        return <div className="error">Ошибка: {error}</div>;
    }

    if (!teacher) {
        return <div className="not-found">Преподаватель не найден</div>;
    }

    const fullName = `${teacher.last_name} ${teacher.first_name} ${teacher.middle_name}`;

    return (
        <div className="teacher-page">
            <button className="back-button" onClick={() => navigate(-1)}>
                ← Назад к списку преподавателей
            </button>
            
            <div className="teacher-header">
                <div className="teacher-avatar">
                    <div 
                        className="teacher-initial" 
                        style={{ backgroundColor: getAvatarColor(teacher.last_name) }}
                    >
                        {getInitial(teacher.last_name)}
                    </div>
                </div>
                
                <div className="teacher-main-info">
                    <h1 className="teacher-name">{fullName}</h1>
                    <p className="teacher-degree">
                        {formatAcademicDegree(teacher.academic_degree)}, стаж: {teacher.teaching_experience} лет
                    </p>
                </div>
            </div>
            
            <div className="teacher-details">
                <div className="teacher-section">
                    <h2 className="section-title">Контактная информация</h2>
                    <div className="contact-info">
                        <p><strong>Email:</strong> <a href={`mailto:${teacher.email}`}>{teacher.email}</a></p>
                        {teacher.phone_number && (
                            <p><strong>Телефон:</strong> <a href={`tel:${teacher.phone_number}`}>{teacher.phone_number}</a></p>
                        )}
                    </div>
                </div>
                
                <div className="teacher-section">
                    <h2 className="section-title">Дисциплины</h2>
                    {teacher.disciplines.length > 0 ? (
                        <div className="disciplines-list">
                            {teacher.disciplines.map((discipline, index) => (
                                <div key={index} className="discipline-item">
                                    <h3 className="discipline-name">{discipline.discipline_name}</h3>
                                    <p className="discipline-description">{discipline.description || 'Описание отсутствует'}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="no-disciplines">Нет дисциплин</p>
                    )}
                </div>
                
                {teacher.bio && (
                    <div className="teacher-section">
                        <h2 className="section-title">Биография</h2>
                        <p className="teacher-bio">{teacher.bio}</p>
                    </div>
                )}
            </div>
        </div>
    );
});

export default Teacher;