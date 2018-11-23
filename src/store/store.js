import { createStore, applyMiddleware, compose } from 'redux';

import reducers from './reducers/reducers';
import Reactotron from '../services/reactotron';
import thunk from 'redux-thunk';
import * as api from '../services/api';

let store = null;
if (process.env.NODE_ENV === 'development') {
  store = Reactotron.createStore(
    reducers,
    compose(
      applyMiddleware(thunk.withExtraArgument({ api })),
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
    )
  );
} else {
  store = createStore(
    reducers,

    applyMiddleware(thunk.withExtraArgument({ api }))
  );
}

export default store;
