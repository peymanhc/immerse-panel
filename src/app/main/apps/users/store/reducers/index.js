import {combineReducers} from 'redux';
import users from './users.reducer';
import roles from './roles.reducer';

const reducer = combineReducers({users, roles});

export default reducer;