import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import App from './App';
import Home from './routes/Home';
import Background from './routes/Background';
import Pagenav from './routes/Pagenav';
import { BrowserRouter } from 'react-router-dom';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

// root.render(
//   <BrowserRouter>
//     <Background />
//   </BrowserRouter>
// );
// root.render(
//   <BrowserRouter>
//     <Home />
//   </BrowserRouter>
// );

root.render(
  <div>
 
   <Home/>
   
    <Background/>
    <Pagenav/>

  </div>,
  document.body
)

