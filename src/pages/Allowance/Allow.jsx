import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import './Allow.css';

const subjects = [
  { id: 1, name: 'Математический анализ', teachers: ['Иванов А.А.', 'Петрова С.М.'] },
  { id: 2, name: 'Программирование', teachers: ['Сидоров В.В.', 'Козлова Е.П.'] },
  { id: 3, name: 'Физика', teachers: ['Фролов Д.С.'] },
  { id: 4, name: 'Базы данных', teachers: ['Николаева Т.К.', 'Григорьев М.М.'] },
];

const Allow = observer(() => {
  const [formData, setFormData] = useState({
    subject: '',
    teacher: '',
    date: '',
    type: 'credit',
    studentName: 'Иванов Иван Иванович', 
    group: 'ИДБ-22-10' 
  });
  
  const [submitted, setSubmitted] = useState(false);
  const [availableTeachers, setAvailableTeachers] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (name === 'subject') {
      const selectedSubject = subjects.find(subj => subj.name === value);
      setAvailableTeachers(selectedSubject ? selectedSubject.teachers : []);
      setFormData(prev => ({ ...prev, teacher: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.subject || !formData.teacher || !formData.date) {
      alert('Пожалуйста, заполните все поля формы');
      return;
    }
    setSubmitted(true);
  };

  return (
    <div className="allow-container">
      <h2>Получение допуска к зачету/экзамену</h2>
      
      {!submitted ? (
        <form onSubmit={handleSubmit} className="allow-form">
          <div className="form-group">
            <label htmlFor="subject">Дисциплина:</label>
            <select
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
            >
              <option value="">Выберите дисциплину</option>
              {subjects.map(subj => (
                <option key={subj.id} value={subj.name}>{subj.name}</option>
              ))}
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="teacher">Преподаватель:</label>
            <select
              id="teacher"
              name="teacher"
              value={formData.teacher}
              onChange={handleChange}
              disabled={!formData.subject}
              required
            >
              <option value="">Выберите преподавателя</option>
              {availableTeachers.map((teacher, index) => (
                <option key={index} value={teacher}>{teacher}</option>
              ))}
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="date">Дата:</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Тип:</label>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="type"
                  value="credit"
                  checked={formData.type === 'credit'}
                  onChange={handleChange}
                />
                Зачет
              </label>
              <label>
                <input
                  type="radio"
                  name="type"
                  value="exam"
                  checked={formData.type === 'exam'}
                  onChange={handleChange}
                />
                Экзамен
              </label>
            </div>
          </div>
          
          <button type="submit" className="submit-btn">Сформировать допуск</button>
        </form>
      ) : (
        <div className="allow-result">
          <h3>Допуск успешно сформирован!</h3>
          
          <button 
            onClick={() => setSubmitted(false)} 
            className="new-request-btn"
          >
            Создать новый запрос
          </button>
        </div>
      )}
    </div>
  );
});

export default Allow;