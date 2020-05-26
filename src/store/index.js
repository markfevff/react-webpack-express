import { createStore,applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage/session';//sessionStorage
import reducer from './reducers/index';
import rootSaga from './saga/index.js';

const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
    key: 'root',
    storage,
}
const persistedReducer = persistReducer(persistConfig, reducer)

let store = createStore(
    persistedReducer,
    applyMiddleware(
        sagaMiddleware,
        logger
    )
)
sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store)

export default store;