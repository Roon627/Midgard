import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

// Styles
import './styles/app.css';                    //app/global CSS
import 'bootstrap/dist/css/bootstrap.min.css'; //Bootstrap
import 'animate.css'; 


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
