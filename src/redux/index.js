import {combineReducers, createStore, applyMiddleware} from 'redux';
import authReducers from './auth/authReducers';
import itemlistReducers from './itemList/itemlistReducers';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
  authReducers,
  itemlistReducers,
});

const middleware = [thunk];

const store = createStore(rootReducer, applyMiddleware(...middleware));

export default store;
