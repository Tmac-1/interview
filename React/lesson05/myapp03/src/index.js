// import React,{Component,useState} from 'react';
// import ReactDOM from 'react-dom';

import React from './kreact2/index';
import ReactDOM,{useState} from './kreact2/react-dom';
import Component from "./kreact2/Component";

// import React from './kreact/index';
// import ReactDOM from './kreact/react-dom';
// import Component from "./kreact/Component";

class ClassComponent extends Component {
  static defaultProps = {
    color: "pink"
  };
  render() {
    return (
      <div className="border">
        class组件-{this.props.name}
        <p className={this.props.color}>omg</p>
      </div>
    );
  }
}

function FunctionComponent(props) {
  const [count,setCount] = useState(0)
  return <div className="border">
      函数组件-{props.name}
      <button onClick={()=>setCount(count+1)}>{count}</button>
      {count % 2 ? <button>click</button> : <span>omg</span>}
  </div>;
}

function DiffPage(props) {
  const [count, setCount] = useState(0);
  return (
    <div className="border">
      <button onClick={() => setCount(count + 1)}>{count}： count add</button>

      {count % 2 ? (
        <ul>
          <li key="0">0</li>
          <li key="1">1</li>
          <li key="2">2</li>
          <li key="3">3</li>
          <li key="4">4</li>
        </ul>
      ) : (
        <ul>
          <li key="0">0</li>
          <li key="2">2</li>
          <li key="3">3</li>
          <li key="4">4</li>
        </ul>
      )}
    </div>
  );
}


const jsx = (
  <div>
    <DiffPage/>
    {/* <p className="1231"  key="111">我是内容</p>
    <h1>aaa</h1>
    <h2>222</h2> */}
    {/* <ClassComponent name="class" color="red" />
     <FunctionComponent name="我是Function组件" /> */}
    {/* <>
      <h1>ccc</h1>
      <h1>bbb</h1>
    </> */}
    {/* {[1, 2].map(item => (
      <React.Fragment key={item}>{item}</React.Fragment>
    ))} */}
  </div>
);


ReactDOM.render(
  jsx,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

