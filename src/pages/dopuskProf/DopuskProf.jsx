import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import './DopuskProf.css';
import { GetAllDopusk } from '../../http/dopusk';

const DopuskProf = observer(() => {
    const name = localStorage.getItem('username')
    const [dopuskList, setDopuskList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchDopusk = async () => {
            try {
                const response = await GetAllDopusk();
                console.log(name);
                if (response.data) {
                    setDopuskList(response.data);
                }
            } catch (err) {
                setError(err.message || 'Ошибка загрузки данных');
            } finally {
                setLoading(false);
            }
        };

        fetchDopusk();
    }, []);

    const filteredDopusk = dopuskList.filter(item => {
        const isProfessorDopusk = item.professor.username === name;
        if (!isProfessorDopusk) return false;
        const studentName = item.student.last_name ? String(item.student.last_name).toLowerCase() : '';
        const disciplineName = item.discipline.discipline_name ? String(item.discipline.discipline_name).toLowerCase() : '';
        const datee = item.created_at ? new Date(item.created_at).toLocaleDateString() : '';
        const searchTermLower = searchTerm.toLowerCase();
        return studentName.includes(searchTermLower) || 
               disciplineName.includes(searchTermLower) || 
               datee.includes(searchTermLower);
    });
    
    if (loading) {
        return <div className="loading-container">Загрузка данных...</div>;
    }

    if (error) {
        return <div className="error-container">Ошибка: {error}</div>;
    }

    return (
        <div className="dopusk-prof-container">
            <h1 className="dopusk-title">Управление допусками</h1>
            
            <div className="asearch-container">
                <div className="search-filter">
                    <input
                        type="text"
                        placeholder="Поиск по студенту или..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                </div>
            </div>
            
            {filteredDopusk.length === 0 ? (
                <div className="no-results">Нет данных о допусках</div>
            ) : (
                <div className="dopusk-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Студент</th>
                                <th>Группа</th>
                                <th>Дисциплина</th>
                                <th>Тип работы</th>
                                <th>Дата подачи</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredDopusk.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.student.last_name || 'Не указано'} {item.student.first_name || 'Не указано'} {item.student.middle_name || 'Не указано'}</td>
                                    <td>{item.student.group.id || 'Не указана'}</td>
                                    <td>{item.discipline.discipline_name || 'Не указана'}</td>
                                    <td>{item.type || 'Не указан'}</td>
                                    <td>{item.created_at ? new Date(item.created_at).toLocaleDateString() : 'Не указана'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
});

export default DopuskProf;