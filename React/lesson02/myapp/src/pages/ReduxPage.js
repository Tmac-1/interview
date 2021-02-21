import React, { Component } from 'react';
import store from '../store/index';


export default class ReducPage extends Component {
    componentDidMount() {
        store.subscribe(()=>{
            this.forceUpdate()
        })
    }
    add = () => {
        store.dispatch({type:'ADD',payload:100})
    }
    render(){
        return (
            <div>
                <h3>Redux Page</h3>
                <div>{store.getState()}</div>
                <button onClick={this.add}>add</button>
            </div>
        )
    }
}