import React, { useReducer } from 'react';
import {counterReducer} from '../store/index';

const init = (initArg) => {
    return initArg - 0
}
export default function HooksPage(props){
  const [state,dispatch]=useReducer(counterReducer,"0",init)

  return(
      <div>
          <h3>HooksPage</h3>
          <p>{state}</p>
          <button onClick={()=>dispatch({type:"ADD"})}>add</button>
      </div>
  )
}