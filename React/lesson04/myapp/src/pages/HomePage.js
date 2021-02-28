
import React,{Component} from 'react';

export default class HomePage extends Component {
    componentDidMount(){
        console.log('componentDidMount',this.props)
    }
    render(){
        return (
            <div>HomePage</div>
        )
    }
}
