// import { reducerName } form './reducer'
import { createStore,combineReducers} from 'redux';
// import thunk from 'redux-thunk';
// import logger from 'redux-logger';


export function counterReducer(state = 100, {type,payload=1})  {
  // console.log('state',state)
  switch (type) {
    case "ADD":
      return state + payload;
    case "MINUS":
      return state - payload;
    default:
      return state;
  }
}

const store = createStore(combineReducers({count:counterReducer}))



export default store