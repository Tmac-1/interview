import React, {Component} from 'react';
import ContextPage from './pages/ContextPage';
import  Demo  from './pages/hooks';

class App extends Component {
  render(){
    return (
      <div className="App">
        111
          <Demo/>
          <ContextPage/>
      </div>
    )
  }
}

export default App;
