import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import './Discipline.css';
import { GetDiscByID } from '../../http/DiscAPI';

const Discipline = observer(() => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [disc, setDisc] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDisc = async () => {
            try {
                const response = await GetDiscByID(id);
                if (response.data) {
                    setDisc(response.data);
                } else {
                    setError('Дисциплина не найдена');
                }
            } catch (err) {
                setError(err.message || 'Ошибка загрузки данных');
            } finally {
                setLoading(false);
            }
        };
        fetchDisc();
    }, [id]);

    const getInitial = (name) => {
        return name?.charAt(0).toUpperCase() || '?';
    };

    const avatarColors = ['#3498db', '#2ecc71', '#e74c3c', '#f39c12', '#9b59b6', '#1abc9c'];

    const getAvatarColor = (name) => {
        if (!name) return avatarColors[0];
        const charCode = name.charCodeAt(0);
        return avatarColors[charCode % avatarColors.length];
    };

    const formatPracticeInfo = (hasPractice, hasLabs) => {
        if (hasPractice && hasLabs) return 'Практика и лабораторные';
        if (hasPractice) return 'Есть практика';
        if (hasLabs) return 'Есть лабораторные';
        return 'Нет практических занятий';
    };

    const formatAuthors = (authors) => {
        if (!authors) return 'Не указан';
        if (typeof authors === 'string') return authors;
        if (Array.isArray(authors)) return authors.map(a => a.name).join(', ');
        if (authors.name) return authors.name;
        return 'Не указан';
    };

    if (loading) {
        return <div className="loading">Загрузка данных...</div>;
    }

    if (error) {
        return <div className="error">Ошибка: {error}</div>;
    }

    if (!disc) {
        return <div className="not-found">Дисциплина не найдена</div>;
    }

    return (
        <div className="aaa">
            <button className="back-button" onClick={() => navigate(-1)}>
                ← Назад к списку дисциплин
            </button>
            
            <div className="aheader">
                <div className="aavatar">
                    <div 
                        className="ainitial" 
                        style={{ backgroundColor: getAvatarColor(disc.discipline_name) }}
                    >
                        {getInitial(disc.discipline_name)}
                    </div>
                </div>
                
                <div className="a-main-info">
                    <h1 className="a-title">{disc.discipline_name}</h1>
                    <p className="a-authors">
                        Автор: {formatAuthors(disc.authors)}
                    </p>
                </div>
            </div>
            
            <div className="a-content">
                <div className="a-section">
                    <h2 className="a-title">Описание</h2>
                    <p className="a-description">
                        {disc.description || 'Описание отсутствует'}
                    </p>
                </div>
                
                <div className="a-section">
                    <h2 className="a-title">Детали</h2>
                    <div className="a-grid">
                        <div className="a-item">
                            <span className="a-label">Тип занятий:</span>
                            <span className="a-value">
                                {formatPracticeInfo(disc.has_practice, disc.has_labs)}
                            </span>
                        </div>
                        <div className="a-item">
                            <span className="a-label">Количество часов:</span>
                            <span className="a-value">
                                {disc.hours || 'Не указано'}
                            </span>
                        </div>
                        <div className="a-item">
                            <span className="a-label">Семестр:</span>
                            <span className="a-value">
                                {disc.semester || 'Не указан'}
                            </span>
                        </div>
                    </div>
                </div>
                
                {disc.program && (
                    <div className="a-section">
                        <h2 className="a-title">Программа курса</h2>
                        <div className="a-content">
                            {disc.program}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
});

export default Discipline;