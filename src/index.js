import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import { Provider } from 'react-redux'; //eslint-disable-line no-unused-vars
import store from './store.jsx';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'; //eslint-disable-line no-unused-vars
// import {userLogin} from './actions/action';

import Home from './components/home';
import Login from './components/login';
import Signup from './components/signup';
import Chat from './components/chat';


ReactDOM.render(
<Provider store={store}>
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Home} />
            <Route path='/login' component={Login}/>
            <Route path='/signup' component={Signup} />
            <Route path='/signout' component={Home} />
            <Route path='/chat' component={Chat}/>
        </Route>
    </Router>
</Provider>, 
document.getElementById('root')
);
