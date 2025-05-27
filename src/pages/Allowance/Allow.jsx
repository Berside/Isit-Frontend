import React, { useState, useEffect, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import './Allow.css';
import { GetAllDisc } from '../../http/DiscAPI';
import { GetAllProf } from '../../http/PrepodApi';
import { CreateDopusk } from '../../http/dopusk';
import { Context } from '../../index';

const Allow = observer(() => {
  const { user } = useContext(Context);
  const [disciplines, setDisciplines] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [formData, setFormData] = useState({
    discipline_id: '',
    professor_id: '',
    date: '',
    type: 'zachet',
    student_id: user.user.id
  });
  
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [availableTeachers, setAvailableTeachers] = useState([]);
  const [createdDopusk, setCreatedDopusk] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [discResponse, profResponse] = await Promise.all([
          GetAllDisc(),
          GetAllProf()
        ]);
        
        if (discResponse.data) setDisciplines(discResponse.data);
        if (profResponse.data) setTeachers(profResponse.data);
      } catch (err) {
        setError(err.message || 'Ошибка загрузки данных');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (name === 'discipline_id') {
      const discipline = disciplines.find(d => d.id === Number(value));
      if (discipline) {
        const disciplineTeachers = teachers.filter(teacher => 
          teacher.disciplines.some(d => d.id === discipline.id)
        );
        setAvailableTeachers(disciplineTeachers);
      } else {
        setAvailableTeachers([]);
      }
      setFormData(prev => ({ ...prev, professor_id: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.discipline_id || !formData.professor_id || !formData.date) {
      alert('Пожалуйста, заполните все поля формы');
      return;
    }

    try {
      const data = await CreateDopusk(
        formData.student_id,
        formData.professor_id,
        formData.date,
        formData.type,
        formData.discipline_id
      );
      setCreatedDopusk(data.data);
      setSubmitted(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Ошибка при создании допуска');
    }
  };

  const getTypeName = (type) => {
    switch(type) {
      case 'zachet': return 'Зачет';
      case 'exam': return 'Экзамен';
      case 'module1': return 'Модуль 1';
      case 'module2': return 'Модуль 2';
      default: return type;
    }
  };

  if (loading) {
    return <div className="loading">Загрузка данных...</div>;
  }

  if (error) {
    return <div className="error">Ошибка: {error}</div>;
  }

  return (
    <div className="allow-container">
      <h2>Получение допуска к зачету/экзамену</h2>
      
      {!submitted ? (
        <form onSubmit={handleSubmit} className="allow-form">
          <div className="form-group">
            <label htmlFor="discipline_id">Дисциплина:</label>
            <select id="discipline_id"name="discipline_id"value={formData.discipline_id}onChange={handleChange}required>
              <option value="">Выберите дисциплину</option>
              {disciplines.map(discipline => (
                <option key={discipline.id} value={discipline.id}>
                  {discipline.discipline_name}
                </option>
              ))}
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="professor_id">Преподаватель:</label>
            <select id="professor_id"name="professor_id"value={formData.professor_id}onChange={handleChange}disabled={!formData.discipline_id}required>
              <option value="">Выберите преподавателя</option>
              {availableTeachers.map(teacher => (
                <option key={teacher.id} value={teacher.id}>
                  {`${teacher.last_name} ${teacher.first_name} ${teacher.middle_name}`}
                </option>
              ))}
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="date">Дата:</label>
            <input type="date"id="date"name="date"value={formData.date}onChange={handleChange}required/>
          </div>
          
          <div className="form-group">
            <label>Тип допуска:</label>
            <div className="radio-group">
              <label>
                <input type="radio"name="type"value="zachet"checked={formData.type === 'zachet'}onChange={handleChange}/>Зачет</label>
              <label>
                <input type="radio"name="type"value="exam"checked={formData.type === 'exam'}onChange={handleChange}/>Экзамен</label>
              <label>
                <input type="radio" name="type" value="module1"checked={formData.type === 'module1'}onChange={handleChange}/>Модуль 1</label>
              <label>
                <input type="radio" name="type" value="module2" checked={formData.type === 'module2'} onChange={handleChange}/> Модуль 2</label>
            </div>
          </div>
          
          <button type="submit" className="submit-btn">Сформировать допуск</button>
        </form>
      ) : (
        <div className="allow-result">
          <h3>Допуск успешно сформирован!</h3>
          
          {createdDopusk && (
            <div className="dopusk-info">
              <div className="info-row">
                <span className="info-label">Номер допуска:</span>
                <span className="info-value">{createdDopusk.id}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Студент:</span>
                <span className="info-value">
                  {`${createdDopusk.student.last_name} ${createdDopusk.student.first_name} ${createdDopusk.student.middle_name}`}
                </span>
              </div>
              <div className="info-row">
                <span className="info-label">Дисциплина:</span>
                <span className="info-value">{createdDopusk.discipline.discipline_name}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Преподаватель:</span>
                <span className="info-value">
                  {`${createdDopusk.professor.last_name} ${createdDopusk.professor.first_name} ${createdDopusk.professor.middle_name}`}
                </span>
              </div>
              <div className="info-row">
                <span className="info-label">Тип:</span>
                <span className="info-value">{getTypeName(createdDopusk.type)}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Дата создания:</span>
                <span className="info-value">
                  {new Date(createdDopusk.created_at).toLocaleString()}
                </span>
              </div>
            </div>
          )}
          <div className="action-buttons">
            <button onClick={() => setSubmitted(false)} className="new-request-btn">
              Создать новый запрос
            </button>
          </div>
        </div>
      )}
    </div>
  );
});

export default Allow;