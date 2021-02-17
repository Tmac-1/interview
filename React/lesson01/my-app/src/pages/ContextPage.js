import React, { Component } from 'react';
import HomePage from './HomePage';
import UserPage from './UserPage';
import HocPage from './HocPage';
import {ThemeProvider} from '../Context';


class ContextPage extends Component {
    constructor(props){
        super(props)
        this.state = {
            theme: {
                themeColor: 'red'
            }
        }
    }

    render(){
        const {theme} = this.state
        return (
            <div>
                <h3>ContextPage</h3>
                {/* <HomePage theme={theme}/> */}
                <ThemeProvider value={theme}>
                    <HomePage/>
                    <UserPage/>
                </ThemeProvider>
                <HocPage/>
            </div>
        )
    }
}

export default ContextPage