export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USER_ERROR = 'FETCH_USERE_RROR';
export const FETCH_MESSAGES_SUCCESS = 'FETCH_MESSAGES_SUCCESS';
export const FETCH_CURRENT_USER_SUCCESS = 'FETCH_CURRENT_USER_SUCCESS';

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