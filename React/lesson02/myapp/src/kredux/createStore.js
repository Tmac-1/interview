export default function createStore(reducer) {
    let currentState = null
    let currentListener = []
    function getState() {
        return currentState
    }
    function dispatch(action) {
        currentState = reducer(currentState, action)
        currentListener.forEach(listener => listener())
    }
    function subscribe(listener) {
        currentListener.push(listener)
    }
    return {
        getState,
        dispatch,
        subscribe
    }
}