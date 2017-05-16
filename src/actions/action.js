export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USER_ERROR = 'FETCH_USERE_RROR';
export const FETCH_MESSAGES_SUCCESS = 'FETCH_MESSAGES_SUCCESS';
export const FETCH_CURRENT_USER_SUCCESS = 'FETCH_CURRENT_USER_SUCCESS';
export const USER_LOGGED_IN = 'USER_LOGGED_IN';
export const CURRENT_USER = 'CURRENT_USER';
export const AUTH_ERROR = 'AUTH_ERROR';

//List of async actions
export const fetchListOfUsers = () => dispatch => {
    fetch('/api/user')
        .then(response => {
            if (!response.ok) {
                    throw new Error(response.statusText);
            }
            return response.json();
        })
        .then(userList => {
            return dispatch(fetchUsersSuccess(userList))
        })
}

export const fetchMessages = () => dispatch => {
    fetch('/api/messages')
        .then(response => {
            if (!response.ok) {
                    throw new Error(response.statusText);
            }
            return response.json();
        })
        .then(messageList => {
            return dispatch(fetchMessagesSuccess(messageList))
        })
}

export const signupUser = userInfo => dispatch => {
    console.log(userInfo)
    fetch('/api/users/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(userInfo)
    })
    .then(response => {
        // localStorage.setItem('token', userInfo.username)
        dispatch(userLogin())
        return response.json()
    })
    .catch(err => {
        dispatch(authError(err))
    })
}

export const signinUser = userInfo => dispatch => {
    fetch('/api/users/signin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(userInfo)
    })
    .then(response => {
        dispatch(userLogin())
        localStorage.setItem('user', userInfo.username)
    })
    .catch(err => {
        console.log('signin error:',err);
        dispatch(authError('Bad login info'))
    })
}


//List of sync actions
export const fetchUsersSuccess = (users) => ({
    type: FETCH_USERS_SUCCESS,
    users
})

export const fetchCurrentUserSuccess = (currentUser) => ({
    type : FETCH_CURRENT_USER_SUCCESS,
    currentUser
})

export const fetchMessagesSuccess = (messages) => ({
    type: FETCH_MESSAGES_SUCCESS,
    messages
});

export const userLogin = () => ({
    type: USER_LOGGED_IN
})

export const currentUser = (currentUser) => ({
    type: CURRENT_USER,
    currentUser
})

export const authError = (error) => ({
    type: AUTH_ERROR,
    error
})