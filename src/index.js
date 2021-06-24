import React from 'react';
import ReactDOM from 'react-dom';


/*
  style
*/ 
import './index.css';

import reportWebVitals from './reportWebVitals';

/*
  components
*/
import HeaderCom from "./components/Header/Header";


ReactDOM.render(
  <div className="home-main-out-box">
    <HeaderCom></HeaderCom>
  </div>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
