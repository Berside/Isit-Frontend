import { observer } from "mobx-react-lite";
import React from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import './Main.css';

import {MAIN,LOG, REG, PROF, EVENT, ABOUT, Allowance, Attendance, Disc, Discs, Sch, SCORE, Teach, Teachs} from "../../utils/consts"

const Main = observer(() => {
  const history = useNavigate();
  return (
    <div className="app">
      <h1  onClick={() => { history(ABOUT) }}> Страница о нас ✅ </h1>
      <h1  onClick={() => { history(Allowance) }}> Страница допуска ✅ </h1>
      <h1  onClick={() => { history(Attendance) }}> Страница посещаемости </h1>
      <h1  onClick={() => { history(Disc) }}> Страница дисциплины </h1>
      <h1  onClick={() => { history(Discs) }}> Страница дисциплин (50%)  </h1>
      <h1  onClick={() => { history(Sch) }}> Страница расписание ✅ </h1>
      <h1  onClick={() => { history(SCORE) }}> Страница оценок студента (50%) </h1>
      <h1  onClick={() => { history(Teach) }}> Страница преподавателя </h1>
      <h1  onClick={() => { history(Teachs) }}  > Страница преподавателей (50%) </h1>
                   <div className="event-card">
                <div className="event-header">
                    <h3>Ближайшее событие</h3>
                    <span className="event-badge">Новое</span>
                </div>
                <div className="event-content">
                    <h4>Продление студентических билетов</h4>
                    <p className="event-datee"> до 16:00 15 мая 2025</p>
                    <p className="event-location">Старый корпус, аудитория 231</p>
                    <p className="event-description">
                        Всем студентам МГТУ СТАНКИН нужно принести студентические билеты для продления!
                    </p>
                </div>
                <button className="event-button" onClick={() => { history(EVENT) }}>Подробнее</button>
            </div>
    </div>
  );
});

export default Main;