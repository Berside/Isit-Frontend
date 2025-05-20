import React, { useState, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import './About.css';

const About = observer(() => {
    return (
        <div className="main-content">
            <div className="about-card">
                <div className="about-header">
                    <h3>О нашей команде</h3>
                </div>
                
                <div className="about-content">
                    <h4>ИДБ-22-10 МГТУ СТАНКИН</h4>
                    
                    <p className="about-description">
                        Мы - команда студентов, создающих инновационные решения в области веб-разработки. 
                        Наш проект объединяет талантливых backend и frontend разработчиков, работающих 
                        вместе для достижения выдающихся результатов.
                    </p>
                    
                    <div className="team-section">
                        <h5>Роли в команде</h5>
                        
                        <div className="team-grid">
                            <div className="team-card">
                                <h6>Анкудинова Е.И.</h6>
                                <span className="role-badge backend">Backend разработчик</span>
                            </div>
                            
                            <div className="team-card">
                                <h6>Бурлинова А.Б.</h6>
                                <span className="role-badge frontend">Frontend разработчик</span>
                            </div>
                            
                            <div className="team-card">
                                <h6>Наумов Д.А.</h6>
                                <span className="role-badge backend">Backend разработчик</span>
                            </div>
                            
                            <div className="team-card">
                                <h6>Осипова К.А.</h6>
                                <span className="role-badge backend">Backend разработчик</span>
                            </div>
                            
                            <div className="team-card">
                                <h6>Поверинов И.В.</h6>
                                <span className="role-badge teamlead">Team Lead (Frontend)</span>
                            </div>
                            
                            <div className="team-card">
                                <h6>Полякова К.Е.</h6>
                                <span className="role-badge frontend">Frontend разработчик</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default About;