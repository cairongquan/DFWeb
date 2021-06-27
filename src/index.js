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
import HomeCom from "./views/home/home.jsx";

/*
  ant
*/
// import zhCN from 'antd/lib/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import 'antd/dist/antd.css';
moment.locale('zh-cn');

ReactDOM.render(
  <div className="home-main-out-box">
    <HeaderCom></HeaderCom>
    <HomeCom></HomeCom>
  </div>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
