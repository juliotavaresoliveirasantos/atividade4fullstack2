import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';  // Certifique-se de que está importando o App.js corretamente
import 'bootstrap/dist/css/bootstrap.min.css';  // Se estiver usando Bootstrap

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
