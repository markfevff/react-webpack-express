import { createStore,applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import reducer from './reducers/index';
import rootSaga from './saga/index.js'
const sagaMiddleware = createSagaMiddleware();

let store = createStore(
    reducer,
    applyMiddleware(
        sagaMiddleware,
        logger
    )
)
sagaMiddleware.run(rootSaga);

export default store;