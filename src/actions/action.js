export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USER_ERROR = 'FETCH_USERE_RROR';
export const FETCH_MESSAGES_SUCCESS = 'FETCH_MESSAGES_SUCCESS';
export const FETCH_CURRENT_USER_SUCCESS = 'FETCH_CURRENT_USER_SUCCESS';
export const USER_LOGGED_IN = 'USER_LOGGED_IN';
export const CURRENT_USER = 'CURRENT_USER';

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


//Best way to get the current user that just logged in? Necessary?
// export const fetchCurrentUser= (username) => dispatch => {
//     fetch('/api/user/')
// }


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

export const signupUser = (userInfo) => dispatch => {
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
        console.log(response)
        return response.json()
    })
    .then(userInfo => {
        dispatch(userLogin())
    })
}


//List of sync actions
export const fetchUsersSuccess = (users) => ({
    type: FETCH_USERS_SUCCESS,
    users
});

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