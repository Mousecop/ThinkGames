import * as actions from '../actions/action';

const initalState = {
    messages: [],
    currentUser: '',
    Users: [],
    isUserLoggedIn: false
}

export default (state = initalState, action) => {
    switch(action.type) {
        case actions.FETCH_USERS_SUCCESS:
            return {...state, Users: action.users}
        default:
            return state
    }
}