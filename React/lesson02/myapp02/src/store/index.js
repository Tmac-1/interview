// import { reducerName } form './reducer'
// import { createStore, applyMiddleware} from 'redux';
// import thunk from 'redux-thunk';
// import logger from 'redux-logger';
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


function logger({ getState }) {
  return next => action => {
      console.log("====================================");
      console.log(action.type + "执⾏了！"); //sy-log
      const prevState = getState();
      console.log("prev state", prevState); //sy-log
      // console.log('NEXT',next,action)
      const returnValue = next(action);
      const nextState = getState();
      console.log("next state", nextState); //sy-log
      console.log("====================================");
      return returnValue;
  };
}

function thunk({dispatch, getState}) {
  return next => action => {
  if (typeof action === "function") {
    return action(dispatch, getState);
  }
    return next(action);
  };
 }

export default store