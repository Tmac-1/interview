export default function createStore(reducer) {
    let currentState;
    let currentListeners = []
    function getState() {
        return currentState
    }
    function dispatch(action) {
        console.log('currentState', currentState)
        currentState = reducer(currentState, action)
        currentListeners.forEach(listener => listener())
    }
    function subscribe(listener) {
        currentListeners.push(listener)
        return () => {
            currentListeners = []
        }
    }
    dispatch({ type: "REDUX/KKKB" })
    return {
        getState,
        dispatch,
        subscribe
    }
}