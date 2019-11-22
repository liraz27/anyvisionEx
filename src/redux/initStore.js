import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './rootReducer';

const initStore = {
	user : {
        userName: '',
        fullName: ''
    }
};

const store = createStore(
	rootReducer,
	initStore,
	compose(applyMiddleware(thunk))
);

export default store;
