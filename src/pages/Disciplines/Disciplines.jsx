import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import './Disciplines.css';
import { GetAllDisc } from '../../http/DiscAPI';

const Disciplines = observer(() => {
    const [disciplines, setDisciplines] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
        const fetchDisciplines = async () => {
            try {
                const response = await GetAllDisc();
                if (response.data) {
                    setDisciplines(response.data);
                }
            } catch (err) {
                setError(err.message || 'Ошибка загрузки данных');
            } finally {
                setLoading(false);
            }
        };

        fetchDisciplines();
    }, []);

        const filteredDisciplines = disciplines.filter(discipline => {
            const nameMatch = discipline.discipline_name.toLowerCase().includes(searchTerm.toLowerCase());
            const authorsMatch = discipline.authors 
                ? String(discipline.authors).toLowerCase().includes(searchTerm.toLowerCase())
                : false;
            return nameMatch || authorsMatch;
        });

    const getInitial = (name) => {
        return name.charAt(0).toUpperCase();
    };

    const avatarColors = ['#3498db', '#2ecc71', '#e74c3c', '#f39c12', '#9b59b6', '#1abc9c'];

    const getAvatarColor = (name) => {
        const charCode = name.charCodeAt(0);
        return avatarColors[charCode % avatarColors.length];
    };

    const formatPracticeInfo = (hasPractice, hasLabs) => {
        if (hasPractice && hasLabs) return 'Практика и лабораторные';
        if (hasPractice) return 'Есть практика';
        if (hasLabs) return 'Есть лабораторные';
        return 'Нет практических занятий';
    };

    const handleDisckClick = (DiscId) => {
        navigate(`/Disc/${DiscId}`);
    };

    if (loading) {
        return <div className="loading">Загрузка данных...</div>;
    }

    if (error) {
        return <div className="error">Ошибка: {error}</div>;
    }

    return (
        <div className="disciplines-page">
            <h1 className="disciplines-title">Дисциплины</h1>
            
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Поиск по названию дисциплины или автору..."
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
                        <div key={discipline.id} className="discipline-card" onClick={() => handleDisckClick(discipline.id)}>
                            <div className="discipline-header">
                                <div 
                                    className="discipline-avatar" 
                                    style={{ backgroundColor: getAvatarColor(discipline.discipline_name) }}
                                >
                                    {getInitial(discipline.discipline_name)}
                                </div>
                                <h2 className="discipline-name">{discipline.discipline_name}</h2>
                            </div>
                            
                            <div className="discipline-body">
                                <p className="discipline-description">{discipline.description}</p>
                                
                                <div className="discipline-details">
                                    <div className="detail-item">
                                        <span className="detail-label">Автор:</span>
                                        <span className="detail-value">{discipline.authors || 'Не указан'}</span>
                                    </div>
                                    <div className="detail-item">
                                        <span className="detail-label">Тип занятий:</span>
                                        <span className="detail-value">
                                            {formatPracticeInfo(discipline.has_practice, discipline.has_labs)}
                                        </span>
                                    </div>
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