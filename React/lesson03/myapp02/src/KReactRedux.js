import React, { useContext, useReducer, useEffect, useLayoutEffect } from 'react';

const Conetext = React.createContext()

function bindActionCreator(creator, dispatch) {
    return (...args) => dispatch(creator(...args))
}

export function bindActionCreators(creators, dispatch) {
    const obj = {};
    for (let key in creators) {
        obj[key] = bindActionCreator(creators[key], dispatch)
    }
    return obj
}

export const connect = (
    mapStateToProps = state => state,
    mapDispatchToProps
) => WrappedComponent => props => {
    // 读取 store state
    const store = useContext(Conetext)
    const { getState, dispatch, subscribe } = store;
    const stateProps = mapStateToProps(getState())
    let dispatchProps = { dispatch }
    const [ignored, forceUpdate] = useReducer(x => x + 1, 0)

    if(typeof mapDispatchToProps ==='function'){
       dispatchProps = mapDispatchToProps(dispatch)
    }else if(typeof mapDispatchToProps ==='object'){
       dispatchProps = bindActionCreators(mapDispatchToProps,dispatch)
    }
    useLayoutEffect(() => {
        const unsubscribe = subscribe(() => {
            forceUpdate()
        })
        return () => {
            unsubscribe()
        }
    }, [store])

    return <WrappedComponent {...props} {...stateProps} {...dispatchProps} />
}

export function Provider({ store, children }) {
    return <Conetext.Provider value={store}>
        {children}
    </Conetext.Provider>
}

export function useSelector(selector){
    const store = useStore()
    const {getState,subscribe} = store;
    const selectedState = selector(getState())
    const [ignored, forceUpdate] = useReducer(x => x + 1, 0)
    useLayoutEffect(() => {
        const unsubscribe = subscribe(() => {
            forceUpdate()
        })
        return () => {
            unsubscribe()
        }
    }, [store])
    return selectedState
}

export function useDispatch(){
    const store = useStore()
    return store.dispatch
}

function useStore(){
    const store = useContext(Conetext)
    return store
}