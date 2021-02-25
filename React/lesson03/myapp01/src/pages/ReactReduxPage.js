import React, { Component } from 'react';
// import store from '../store';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
@connect(
    // mapStateProps
    state=>({count:state}), 
    // mapDispatchToProps object | function
    // {
    //     add:()=>({
    //         type:"ADD"
    //     })
    // },
    // dispatch => {
    //     const add = ()=>dispatch({type:"ADD"})
    //     const minus = ()=>dispatch({type:"MINUS"})
    //     return {dispatch,add,minus}
    // },
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
    // componentDidMount(){
    //     this.unsubscribe = store.dispatch(()=>{
    //         this.forceUpdate()
    //     })
    // }
    // componentWillUnmount(){
    //     if(this.unsubscrib){
    //         this.unsubscribe()
    //     }  
    // }
    dispatchAdd = () => {
        this.props.dispatch({type:"ADD"})
    }
    render() {
        const {count,add,minus} = this.props;
        console.log('count',count)
        return (
            <div>
                <div>ReactReduxPage</div>
                <p>{count}</p>
                <button onClick={this.dispatchAdd}>dispatch add </button>
                <button onClick={add}> add </button>
                <button onClick={minus}> minus </button>
            </div>
        )
    }
}

export default ReactReduxPage