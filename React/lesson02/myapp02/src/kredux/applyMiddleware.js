

function compose(...funcs) {
    if (funcs.length == 0) {
        return args => args
    }
    if (funcs.length == 1) {
        return funcs[0]
    }
    // console.log(funcs.reduce((total, current) => (...args) => total(current(...args))))
    // return funcs.reduce((total, current) => (...args) => total(current(...args)))
     return funcs.reduce((total, current) => (...args) => total(current(...args)))
}

export default function applyMiddleware(...middlewares) {
    return createStore => reducer => {
        const store = createStore(reducer)
        let dispatch = store.dispatch;

        const midApi = {
            getState: store.getState,
            dispatch: (action, ...args) => dispatch(action, ...args)
        }

        // 执行中间件
        const middlewareChain = middlewares.map(middleware => middleware(midApi))
        dispatch = compose(...middlewareChain)(store.dispatch)

        return {
            ...store,
            // 返回加强后的dispatch
            dispatch
        }
    }
}


