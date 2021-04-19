import React, { Component } from "react";
import ContextPage from "./pages/ContextPage";
import { Demo, DemoState, DemoState2, DemoUseMemo } from "./pages/hooks";


class Test extends Component {
  state = {
    num: 1
  }
  handleClick = ()=>{
    this.setState({
      num: this.state.num++
    })
    this.setState({
      num: this.state.num++
    })
    // this.setState({
    //   num: ++this.state.num
    // })
    // this.setState({
    //   num: ++this.state.num
    // })
    console.log(this.state.num)
  }
  render(){
    // console.log('render')
    let {num} = this.state
    return <div>
      <button onClick={this.handleClick}>{num}test1</button>
    </div>
  }
}
class App extends Component {
  render() {
    return (
      <div className="App">
        <Test/>
        <Demo />
        <DemoState />
        <DemoState2 />
        <DemoUseMemo />
        <ContextPage />
      </div>
    );
  }
}

export default App;
