import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import AppSaga from '../sagas/sagas';
import reducers from './reducers/reducers';
import Reactotron from '../services/reactotron';

const sagaMiddleware = createSagaMiddleware();

let store = null;
if (process.env.NODE_ENV === 'development') {
  store = Reactotron.createStore(reducers, applyMiddleware(sagaMiddleware));
} else {
  store = createStore(reducers, applyMiddleware(sagaMiddleware));
}

sagaMiddleware.run(AppSaga);

export default store;
