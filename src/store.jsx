import { createStore, applyMiddleware } from 'redux';

import reducer from './reducers/reducer.jsx';
import thunk from 'redux-thunk';

export default createStore(reducer, applyMiddleware(thunk));