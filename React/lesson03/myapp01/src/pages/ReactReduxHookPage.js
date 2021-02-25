import React, { useCallback } from 'react';
import { useSelector,useDispatch  } from 'react-redux';

export default function ReactReduxHookPage(props) {
    const count = useSelector(state=>state)
    const dispatch = useDispatch()
    const add = useCallback(()=>{
        dispatch({type:"ADD"})
    },[])
    return(
        <div>
            <div>ReactReduxHookPage</div>
            <p>{count}</p>
            <button onClick={add}>add</button>
        </div>
    )
}