import {combineReducers} from 'redux';
import fuse from './fuse';
import auth from 'app/auth/store/reducers';
import Intl from './translate/intl.reducer';
 

const createReducer = (asyncReducers) =>
    combineReducers({
		Intl,
        auth,
        fuse,
        ...asyncReducers
    });

export default createReducer;
