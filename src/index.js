import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import { Provider } from 'react-redux';
import store from './store.jsx';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import {userLogin} from './actions/action';

import Home from './components/home';
import Login from './components/login';
import Signup from './components/signup';
import Signout from './components/signout';
import RequireAuth from './components/require_auth';
import Chat from './components/chat';



const user = localStorage.getItem('user');


if (user) {
    console.log(user)
    store.dispatch(userLogin())
}

ReactDOM.render(
<Provider store={store}>
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Home} />
            <Route path='/login' component={Login}/>
            <Route path='/signup' component={Signup} />
            <Route path='/signout' component={Signout} />
            <Route path='/chat' component={RequireAuth(Chat)} />
        </Route>
    </Router>
</Provider>, 
document.getElementById('root')
);
