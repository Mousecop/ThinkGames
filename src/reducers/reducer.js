import * as actions from '../actions/action';

const initalState = {
    messages: [],
    currentUser: '',
    Users: [],
    isUserLoggedIn: false,
    errorMessage: null
}

export default (state = initalState, action) => {
    switch(action.type) {
        case actions.FETCH_USERS_SUCCESS:
            return {...state, Users: action.users}
        case actions.USER_LOGGED_IN:
            return {...state, isUserLoggedIn: true}
        case actions.CURRENT_USER:
            return {...state, currentUser: action.currentUser}
        case actions.AUTH_ERROR:
            return {...state, errorMessage: action.error}
        case actions.FETCH_MESSAGES_SUCCESS:
            return {...state, messages: [...state.messages, action.messages]}
        case actions.LOGOUT_USER:
            return {initalState}
        default:
            return state
    }
}