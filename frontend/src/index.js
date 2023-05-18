import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import ThemeProvider from 'react-bootstrap/ThemeProvider'
import './assets/main.css'
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Context from './context/UserState';
// import dotenv from 'dotenv';

const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
  <React.StrictMode>
    <ThemeProvider>
      <Context>
        <BrowserRouter >
          <App />
        </BrowserRouter>
      </Context>
    </ThemeProvider>
  </React.StrictMode >
);

