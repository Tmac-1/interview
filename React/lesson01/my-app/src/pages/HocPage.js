import React, { Component } from 'react';

// HOC 是个函数，参数为组件，返回也是组件

const foo = Cmp => props => {
    return (
        <div className="border">
            <Cmp {...props}/>
        </div>
    )
}

function Child(props){
    return <div className="border">Child-{props.name}</div>
}

const Foo = foo(foo(Child)) 

class HocPage extends Component {
    render() {
        return (
            <div>
                <h3>HocPage</h3>
                <Foo name="Tmac"/>
            </div>
        )
    }
}

export default HocPage