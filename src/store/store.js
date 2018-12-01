import { createStore, applyMiddleware, compose } from 'redux';

import reducers from './reducers/reducers';
import Reactotron from '../services/reactotron';
import createSagaMiddleware from 'redux-saga';
import sagas from './sagas/rootSaga';

const sagaMiddleware = createSagaMiddleware();

let store = null;
if (process.env.NODE_ENV === 'development') {
  store = Reactotron.createStore(
    reducers,
    compose(
      applyMiddleware(sagaMiddleware),
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
    )
  );
} else {
  store = createStore(reducers, applyMiddleware(sagaMiddleware));
}

sagaMiddleware.run(sagas);

export default store;
