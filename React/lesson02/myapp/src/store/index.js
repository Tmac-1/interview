// import { reducerName } form './reducer'
// import { createStore} from 'redux';
import createStore from '../kredux/createStore';

export const counterReducer = (state=0,{type,payload=1}) => {
  switch(type) {
    case "ADD":
        return state + payload;
    case "MINus":
        return state - payload;
    default:
        return state;
  }
}

const store = createStore(counterReducer)

export default store