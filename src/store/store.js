import { createStore, applyMiddleware, compose } from 'redux';

import reducers from './reducers/reducers';
import Reactotron from '../services/reactotron';
import { createEpicMiddleware } from 'redux-observable';
import epics from './epics/epics';

const epicMiddleware = createEpicMiddleware();

let store = null;
if (process.env.NODE_ENV === 'development') {
  store = Reactotron.createStore(
    reducers,
    compose(
      applyMiddleware(epicMiddleware),
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
    )
  );
} else {
  store = createStore(reducers, applyMiddleware(epicMiddleware));
}

epicMiddleware.run(epics);

export default store;
