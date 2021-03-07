// import React from 'react';
// import ReactDOM from 'react-dom';

import React from './kreact/index';
import ReactDOM from './kreact/react-dom';

// import App from './App';
const jsx = (
  <div>
  <p>我是内容</p>
  {/* <FuncCmp name="我是function组件" />
  <ClassCmp name="我是class组件" /> */}
  </div>
 );
 

ReactDOM.render(
  jsx,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

