import React, { Component } from 'react';
import { RouterContext } from './Context';
import { matchPath } from 'react-router';

export default class Route extends Component {
    render() {
        // const {children,component,render,path} = this.props;
        return (
            <RouterContext.Consumer>
                {
                    context => {
                        const location = context.location;
                        const { children, component, render, path, computedMatch } = this.props;
                        const match = computedMatch ? computedMatch : path ? matchPath(location.pathname, this.props) : context.match;
                        const props = {
                            ...context,
                            match
                        }
                        // match children,component,render, null
                        // note match children(function),null
                        // return match ? React.createElement(component, props) : null
                        return <RouterContext.Provider value={props}>
                            {
                                match ?
                                    (children ? (typeof children === 'function' ? children(props) : children)
                                        : component ? React.createElement(component, props) : render ? render(props) : null) :
                                    (typeof children === 'function' ? children : null)
                            }
                        </RouterContext.Provider>

                    }
                }
            </RouterContext.Consumer>
            // React.createElement(component)
        )
    }
}