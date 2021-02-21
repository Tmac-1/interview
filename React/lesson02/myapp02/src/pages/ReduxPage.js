import React, { Component } from 'react';
import store from '../store/index';


export default class ReducPage extends Component {
    componentDidMount() {
      this.unsubscribe = store.subscribe(()=>{
            this.forceUpdate()
        })
    }
    componentWillUnmount() {
        if(this.unsubscribe){
            this.unsubscribe()
        }
    }
    add = () => {
        store.dispatch({type:'ADD',payload:100})
    }
    render(){
        // console.log("store", store.getState());
        return (
            <div>
                <h3>Redux Page</h3>
                <div>{store.getState()}</div>
                <button onClick={this.add}>add</button>
            </div>
        )
    }
}