import React , {createContext} from 'react';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import UserStore from "./store/UserStore";
import {createRoot} from 'react-dom/client'
export const Context = createContext(null)

createRoot(document.getElementById('root')).render(
  <Context.Provider value={{
      user: new UserStore(),
  }}>
      <BrowserRouter>
          <App />
      </BrowserRouter>
  </Context.Provider>
)