import { createStore, applyMiddleware } from 'redux';

import reducers from './reducers/reducers';
import Reactotron from '../services/reactotron';
import thunk from 'redux-thunk';
import * as api from '../services/api';

let store = null;
if (process.env.NODE_ENV === 'development') {
  store = Reactotron.createStore(
    reducers,
    applyMiddleware(thunk.withExtraArgument({ api }))
  );
} else {
  store = createStore(
    reducers,
    applyMiddleware(thunk.withExtraArgument({ api }))
  );
}

export default store;
