import React, { Component } from 'react';
import {ThemeConsumer,UserConsumer} from '../Context';
import {ThemeContext} from '../Context';

class ConsumerPage extends Component {
    // static contextType = ThemeContext
    componentDidMount(){
        console.log('context',this)
    }
    render(){
        console.log('render',this)
        return(
            <div>
                <h3>ConsumerPage</h3>
                <ThemeConsumer>
                    {
                     themeContext => <div className={themeContext.themeColor}>omg
                       <UserConsumer>
                            {userContext => <Child {...userContext}/>}
                       </UserConsumer>
                     </div>
                    }
                </ThemeConsumer>
            </div>
        )
    }
}

function Child(props){
    return <div>{props.name}</div>
}

export default ConsumerPage