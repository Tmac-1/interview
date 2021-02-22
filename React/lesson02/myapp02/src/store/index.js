// import { reducerName } form './reducer'
// import { createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import createStore from '../kredux/createStore';
import applyMiddleware from '../kredux/applyMiddleware';

function counterReducer(state = 100, action)  {
  // console.log('state',state)
  switch (action.type) {
    case "ADD":
      return state + 1;
    case "MINUS":
      return state - 1;
    default:
      return state;
  }
}

const store = createStore(counterReducer,applyMiddleware(thunk,logger))

export default store