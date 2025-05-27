import { observer } from "mobx-react-lite";
import Navbar from "./components/navbar/Navbar";
import AppRouter from "./components/AppRouter";
import "./App.css";
import React , {useContext, useState, useEffect} from 'react';
import { Context } from './index';
import {check} from "./http/userAPI";
import {Spinner} from "react-bootstrap";
const App = observer(() => {
  const {user} = useContext(Context);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    console.log(user);
     const token = localStorage.getItem('token');
    const initializeAuth = async () => {
      if ( token !== null ) {
        try {
          const response = await check();
          if (response?.data) {
            user.setUser(response.data);
            user.setIsAuth(true);
            user.setUserId(response.data.id)
            if (response.data.role.name == "professor") {
              user.setIsProf(true)
            }
            if (response.data.role.name == "student") {
              user.setIsStud(true)
            }
          }
        } catch (error) {
          console.error('Ошибка при проверке пользователя:', error);
          user.setIsAuth(false); 
        } finally {
          setLoading(false);
        }
      }
      setLoading(false);
    };
    initializeAuth();
  }, []); 

  if (loading) {
    return <Spinner animation="grow"/>;
  }
  return (
    <div className="app">
      <Navbar />
      <AppRouter/>
    </div>
  );
});

export default App;