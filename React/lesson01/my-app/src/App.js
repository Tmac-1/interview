import React, { Component } from "react";
import ContextPage from "./pages/ContextPage";
import { Demo, DemoState, DemoState2, DemoUseMemo } from "./pages/hooks";

class App extends Component {
  render() {
    return (
      <div className="App">
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
