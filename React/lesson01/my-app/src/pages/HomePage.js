import React, { Component } from 'react';
import {ThemeContext} from '../Context';

class HomePage extends Component {
    // static contextType = ThemeContext
    render(){
        // const {themeColor}=this.props.theme;
        const {themeColor}=this.context;
        return (
            <div>
                <h3 className={themeColor}>HomePage</h3>
            </div>
        )
    }
}

HomePage.contextType = ThemeContext

export default HomePage