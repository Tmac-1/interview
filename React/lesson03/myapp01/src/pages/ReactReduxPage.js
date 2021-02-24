import React, { Component } from 'react';
// import store from '../store';
import { connect } from 'react-redux';

// @connect(
//     ({count})=>({count})
// )
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
        return (
            <div>
                <div>ReactReduxPage</div>
                <p>{count}</p>
                <button onClick={this.dispatchAdd}>dispatch add </button>
            </div>
        )
    }
}

export default ReactReduxPage