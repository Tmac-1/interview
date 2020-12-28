// import React,{Component} from 'react';
import React from './kReact/myReact';

// import ReactDOM from 'react-dom';

// import ReactDOM from './ReactDOM';

// import App from './App';
// import reportWebVitals from './reportWebVitals';

// class ClassCmp extends Component {
//   render(){
//     return <div>name:{this.props.name}</div>
//   }
// }

let ReactDOM = React

function FunCmp(props) {
  return <div>{props.name}</div>
}

let jsx = 
  <div>
    <div>我是内容
      <p class="he">hahahh </p>
    </div>
    {/* <FunCmp name="我是function组件"/> */}
    {/* <ClassCmp name="我是class组件"/> */}
  </div>


// function App() {
//   return (
//     <div className="App">
//       <FunCmp name="我是function组件"/>
//       {/* <ClassCmp name="我是class组件"/> */}
//     </div>
//   );
// }


ReactDOM.render(
  // React.createElement(jsx),
  jsx,
  // <App/>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
