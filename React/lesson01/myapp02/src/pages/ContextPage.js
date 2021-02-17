import React, {Component} from "react";
import {ThemeProvider,UserProvider} from "../Context";
// import ContextTypePage from "./ContextTypePage";
// import {ThemeContext, UserContext} from "../Context";
import UseContextPage from "./UseContextPage";
import ConsumerPage from "./ConsumerPage";
// import AntdFormPage from './FormPage';
import MyRCFieldForm from './MyRCFieldForm';


export default class ContextPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            theme: {
                themeColor: "red"
            },
            user: {
                name: "xiaoming"
            }
        };
    }
    changeColor = () => {
        const {
            themeColor
        } = this.state.theme;
        this.setState({
            theme: {
                themeColor: themeColor === "red" ? "green" : "red"
            }
        });
    }
    render(){
        const {theme,user}=this.state;
        return (
            <div>
                <h3>ContextPage</h3>
                <ThemeProvider value={theme}>
                    <UserProvider value={user}>
                        <ConsumerPage/>
                        <UseContextPage/>
                    </UserProvider>
                </ThemeProvider>
                {/* <AntdFormPage/> */}
                <MyRCFieldForm/>
            </div>
        )
    }
}