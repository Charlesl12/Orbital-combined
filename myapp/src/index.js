// index.js or App.js (main entry file)

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import App from './App';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


ReactDOM.render(
  <BrowserRouter>
      <ToastContainer 
      position='top-right'
      autoClose={3000}
      hideProgressBar={true}
      newestOnTop={true}
      closeOnClick
      draggable
      pauseOnHover
      theme='light'
    />
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
