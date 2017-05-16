import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import { Provider } from 'react-redux';
import store from './store.jsx';
import { Router, Route, IndexRoute, BrowserHistory } from 'react-router-dom';
import {userLogin} from './actions/action';

const user = localStorage.getItem('user');


if (user) {
    console.log(user)
    store.dispatch(userLogin())
}

ReactDOM.render(
<Provider store={store}>
    <App />
</Provider>, 
document.getElementById('root')
);
