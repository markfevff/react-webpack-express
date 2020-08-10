import { createStore,applyMiddleware,compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage/session';//sessionStorage
import reducer from './reducers/index';
import rootSaga from './saga/index.js';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import history from '../utils/history'

const sagaMiddleware = createSagaMiddleware();
// let reducers = connectRouter(history)(reducer)
const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, reducer)

let store = createStore(
    persistedReducer,
    compose(
        applyMiddleware(
            sagaMiddleware,
            routerMiddleware(history),
            logger
        )
    )
    
)
sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store)

export default store;