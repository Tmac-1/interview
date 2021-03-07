// import React from 'react';
// import ReactDOM from 'react-dom';

import React from './kreact2/index';
import ReactDOM from './kreact2/react-dom';
import Component from "./kreact2/Component";

// import App from './App';

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
  return <div className="border">函数组件-{props.name}</div>;
}

const jsx = (
  <div>
    <p className="1231" onClick="1231314" a="111">我是内容</p>
    <ClassComponent name="class" color="red" />
    <FunctionComponent name="我是class组件" />
    <>
      <h1>aaa</h1>
      <h1>bbb</h1>
    </>
    {[1, 2].map(item => (
      <React.Fragment key={item}>{item}</React.Fragment>
    ))}
  </div>
);


ReactDOM.render(
  jsx,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

