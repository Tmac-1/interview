import React, { Component } from 'react';
import  { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
// import { bindActionCreators,connect } from '../KReactRedux';

@connect(
    ({count})=>({count}),
    // {
    //     add: ()=>({type:"ADD"})
    // }
    dispatch => {
        // const add = ()=>dispatch({type:"ADD"})
        // const minus = ()=>dispatch({type:"MINUS"})
        let creators = {
            add: ()=>({type:"ADD"}),
            minus: ()=>({type:"MINUS"})
        }
        creators = bindActionCreators(creators,dispatch)
        return {dispatch,...creators}
    }
)
class ReactReduxPage extends Component {
    render(){
        const {count,dispatch,add} = this.props;
        console.log('----->',count)
        return(
            <>
               <h3>ReactReduxPage</h3>
               <p>{count}</p>
               <button onClick={()=>dispatch({type:"ADD"})}>dispatch ADD</button>
               <button onClick={add}>add</button>
            </>
        )
    }
}

export default ReactReduxPage